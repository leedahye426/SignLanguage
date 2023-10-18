import cv2
import mediapipe as mp
import numpy as np
from keras.models import load_model
import os
import time
import math

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

actions = ['me','you','hand_sign', 'hi', 'everyone']
seq_length = 30

model = load_model('D:/캡스톤 연습/models/model6.h5')  

# MediaPipe hands model
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(
    max_num_hands=2,  #2로 바꾸기
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5)
mp_holistic = mp.solutions.holistic
mediapipeHolistic = mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)

video_path = 'D:/캡스톤 연습/video/test_model.mp4'  
cap = cv2.VideoCapture(video_path)
cap.set(cv2.CAP_PROP_FPS, 10)
predicted_actions = []

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
    
        # Add 360 to the found angle.
        angle += 360
    
    # Return the calculated angle.
    if angle > 180 :
         angle = 360 - angle

        
    return angle

seq = []
action_seq = []

while cap.isOpened():
    start_time = time.time()
    ret, img = cap.read()
    

    if not ret:
        break
    img0 = img.copy()
    img = cv2.flip(img, 1)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    result = hands.process(img)
    results = mediapipeHolistic.process(img)
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    if result.multi_hand_landmarks is not None:
        for res in result.multi_hand_landmarks:
            joint = np.zeros((21, 4))
            for j, lm in enumerate(res.landmark):
                joint[j] = [lm.x, lm.y, lm.z, lm.visibility]

            # Compute angles between joints
            v1 = joint[[0,1,2,3,0,5,6,7,0,9,10,11,0,13,14,15,0,17,18,19], :3] # Parent joint
            v2 = joint[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], :3] # Child joint
            v = v2 - v1 # [20, 3]
            # Normalize v
            v = v / np.linalg.norm(v, axis=1)[:, np.newaxis]

            # Get angle using arcos of dot product
            angle_fingers = np.arccos(np.einsum('nt,nt->n',
                v[[0,1,2,4,5,6,8,9,10,12,13,14,16,17,18],:], 
                v[[1,2,3,5,6,7,9,10,11,13,14,15,17,18,19],:])) # [15,]
            
            angle_fingers = np.degrees(angle_fingers)
            mp_drawing.draw_landmarks(img, res, mp_hands.HAND_CONNECTIONS)

        if results.pose_landmarks is not None:
            left_shoulder_angle = calculateAngle(results.pose_landmarks.landmark[LEFT_ELBOW],
                                          results.pose_landmarks.landmark[LEFT_SHOULDER],
                                        results.pose_landmarks.landmark[LEFT_HIP])
            
            right_shoulder_angle = calculateAngle(results.pose_landmarks.landmark[RIGHT_ELBOW],
                                          results.pose_landmarks.landmark[RIGHT_SHOULDER],
                                        results.pose_landmarks.landmark[RIGHT_HIP])
            
            left_elbow_angle = calculateAngle(results.pose_landmarks.landmark[LEFT_SHOULDER],
                                      results.pose_landmarks.landmark[LEFT_ELBOW],
                                    results.pose_landmarks.landmark[LEFT_WRIST])

            right_elbow_angle = calculateAngle(results.pose_landmarks.landmark[RIGHT_SHOULDER],
                                      results.pose_landmarks.landmark[RIGHT_ELBOW],
                                    results.pose_landmarks.landmark[RIGHT_WRIST])


            all_angles = np.append(angle_fingers, [left_elbow_angle, right_elbow_angle, left_shoulder_angle, right_shoulder_angle])
            d = np.concatenate([joint.flatten(), all_angles])

            seq.append(d)

           
            mp_drawing.draw_landmarks(img, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS)

            if len(seq) < seq_length:
                continue

            input_data = np.expand_dims(np.array(seq[-seq_length:], dtype=np.float32), axis=0)

            y_pred = model.predict(input_data).squeeze()

            i_pred = int(np.argmax(y_pred))
            conf = y_pred[i_pred]

            if conf < 0.5:
                continue

            action = actions[i_pred]
            action_seq.append(action)
            predicted_actions.append(action)

            if len(action_seq) < 3:
                continue

            this_action = '?'
            flag = True
            for i in action_seq[-3:]:
                if action != i:
                    flag = False
                    break
            if flag: this_action = action 
            end_time = time.time()
            
cap.release()
cv2.destroyAllWindows()

print("Predicted Actions:")
for action in predicted_actions:
    print(action)