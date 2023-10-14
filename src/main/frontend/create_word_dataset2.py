import cv2
import mediapipe as mp
import numpy as np
import time, os
import math

actions = ['me','you','hand_sign', 'hi', 'everyone']


seq_length = 30 
secs_for_action = 30

# MediaPipe hands model
mp_hands = mp.solutions.hands
mp_holistic = mp.solutions.holistic
mp_drawing = mp.solutions.drawing_utils

mediapipeHolistic = mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)

hands = mp_hands.Hands(
    max_num_hands=2,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5)

LEFT_SHOULDER = mp_holistic.PoseLandmark.LEFT_SHOULDER
LEFT_ELBOW = mp_holistic.PoseLandmark.LEFT_ELBOW
LEFT_WRIST = mp_holistic.PoseLandmark.LEFT_WRIST
RIGHT_SHOULDER = mp_holistic.PoseLandmark.RIGHT_SHOULDER
RIGHT_ELBOW = mp_holistic.PoseLandmark.RIGHT_ELBOW
RIGHT_WRIST = mp_holistic.PoseLandmark.RIGHT_WRIST
LEFT_HIP = mp_holistic.PoseLandmark.LEFT_HIP
RIGHT_HIP = mp_holistic.PoseLandmark.RIGHT_HIP

def calculateAngle(landmark1, landmark2, landmark3):
    
    x1, y1, _ = landmark1.x, landmark1.y, landmark1.z
    x2, y2, _ = landmark2.x, landmark2.y, landmark2.z
    x3, y3, _ = landmark3.x, landmark3.y, landmark3.z

    # Calculate the angle between the three points
    radians = math.atan2(y3 - y2, x3 - x2) - math.atan2(y1 - y2, x1 - x2)
    angle = math.degrees(radians)
    
    # Check if the angle is less than zero.
    if angle < 0:
    
        # Add 360 to the found angle.q
        angle += 360
    
    # Return the calculated angle.
    if angle > 180 :
         angle = 360 - angle

        
    return angle


cap = cv2.VideoCapture(0)

created_time = int(time.time())
os.makedirs('net_test', exist_ok=True)

while cap.isOpened():
    for idx, action in enumerate(actions):
        data = []

        ret, img = cap.read()

        img = cv2.flip(img, 1)

        cv2.putText(img, f'Waiting for collecting {action.upper()} action...', org=(10, 30), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=(255, 255, 255), thickness=2)
        cv2.imshow('img', img)
        cv2.waitKey(3000)

        start_time = time.time()

        while time.time() - start_time < secs_for_action:
            ret, img = cap.read()

            img = cv2.flip(img, 1)
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            results_hands = hands.process(img)
            results = mediapipeHolistic.process(img)
            img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

            if results_hands.multi_hand_landmarks is not None:
                for res in results_hands.multi_hand_landmarks:
                    joint = np.zeros((21, 4))
                    for j, lm in enumerate(res.landmark):
                        joint[j] = [lm.x, lm.y, lm.z, lm.visibility]

                    
                    v1 = joint[[0,1,2,3,0,5,6,7,0,9,10,11,0,13,14,15,0,17,18,19], :3] 
                    v2 = joint[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], :3] 
                    v = v2 - v1 
                   
                    v = v / np.linalg.norm(v, axis=1)[:, np.newaxis]

                   
                    angle = np.arccos(np.einsum('nt,nt->n',
                        v[[0,1,2,4,5,6,8,9,10,12,13,14,16,17,18],:], 
                        v[[1,2,3,5,6,7,9,10,11,13,14,15,17,18,19],:])) 

                    angle = np.degrees(angle) 
                    angle_label = np.array([angle], dtype=np.float32)
                    mp_drawing.draw_landmarks(img, res, mp_hands.HAND_CONNECTIONS)
                    
                    if results.pose_landmarks is not None:
                        left_elbow_angle = calculateAngle(results.pose_landmarks.landmark[LEFT_SHOULDER],
                                                  results.pose_landmarks.landmark[LEFT_ELBOW],
                                                results.pose_landmarks.landmark[LEFT_WRIST])
                        # 1 : 오른쪽 팔꿈치 각도
                        right_elbow_angle = calculateAngle(results.pose_landmarks.landmark[RIGHT_SHOULDER],
                                                  results.pose_landmarks.landmark[RIGHT_ELBOW],
                                                results.pose_landmarks.landmark[RIGHT_WRIST])

                        # 2 : 왼쪽 어깨 각도
                        left_shoulder_angle = calculateAngle(results.pose_landmarks.landmark[LEFT_ELBOW],
                                                  results.pose_landmarks.landmark[LEFT_SHOULDER],
                                                results.pose_landmarks.landmark[LEFT_HIP])

                        # 3 : 오른쪽 어깨 각도
                        right_shoulder_angle = calculateAngle(results.pose_landmarks.landmark[RIGHT_ELBOW],
                                                  results.pose_landmarks.landmark[RIGHT_SHOULDER],
                                                results.pose_landmarks.landmark[RIGHT_HIP])
                        
                        angle_label = np.append(angle_label, [left_elbow_angle, right_elbow_angle, left_shoulder_angle, right_shoulder_angle])
                        angle_label = np.append(angle_label, idx)
                        d = np.concatenate([joint.flatten(), angle_label])

                        data.append(d)
                        mp_drawing.draw_landmarks(img, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS)

            cv2.imshow('img', img)
            if cv2.waitKey(1) == ord('q'):
                break

        data = np.array(data)
        ##print(action, data.shape)
        np.save(os.path.join('net_test', f'raw_{action}_{created_time}'), data)

        # Create sequence data
        full_seq_data = []
        for seq in range(len(data) - seq_length):
            full_seq_data.append(data[seq:seq + seq_length])

        full_seq_data = np.array(full_seq_data)
        ##print(action, full_seq_data.shape)
        np.save(os.path.join('net_test', f'seq_{action}_{created_time}'), full_seq_data)
    break