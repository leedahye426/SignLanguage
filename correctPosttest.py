import cv2
import mediapipe as mp
import math
import numpy as np

mp_drawing = mp.solutions.drawing_utils
mp_holistic = mp.solutions.holistic
mediapipeHolistic = mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    max_num_hands=2,  #2로 바꾸기
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
    
        # Add 360 to the found angle.
        angle += 360
    
    # Return the calculated angle.
    if angle > 180 :
         angle = 360 - angle

        
    return angle


def correctPose(current_angles1, word):

    # 현재 학습하고 있는 단어의 알맞는 동작의 각도들이 저장되어 있는 배열을 로드
    angle_path = 'D:/캡스톤 연습/angles/' + word
    correct_angles_np = np.loadtxt(angle_path, dtype=int)

    # 로드한 배열을 리스트로 변환
    correct_angles = correct_angles_np.tolist()
    current_angles = current_angles1[:]
    
    # 자세 교정 문구 초기화
    tmp= ""
    
    # 알맞은 동작의 각도와 현재 캡쳐한 사진 속 동작의 각도를 비교하여 알맞은 교정 문구를 리턴
    if (current_angles[0] < (correct_angles[0] * 0.5)) or (current_angles[0] > (correct_angles[0] * 1.5)) :
        tmp = "left_elbow"
        return tmp
    elif (current_angles[1] < (correct_angles[1] * 0.5)) or (current_angles[1] > (correct_angles[1] * 1.5)):        
        tmp = "right_elbow"
        return tmp
    elif (current_angles[2] < (correct_angles[2] * 0.5)) or (current_angles[2] > (correct_angles[2] * 1.5)):
        tmp = "left_shoulder"
        return tmp
    elif (current_angles[3] < (correct_angles[3] * 0.5)) or (current_angles[3] > (correct_angles[3] * 1.5)):        
        tmp = "right_shoulder"
        return tmp
    
    #엄지
    elif (current_angles[4] < (correct_angles[4] * 0.5)) or (current_angles[4] > (correct_angles[4] * 1.5)):        
        tmp = "right_thunb"
        return tmp
    elif (current_angles[5] < (correct_angles[5] * 0.5)) or (current_angles[5] > (correct_angles[5] * 1.5)):
        tmp = "left_thumb"
        return tmp
    
    #검지
    elif (current_angles[6] < (correct_angles[6] * 0.5)) or (current_angles[6] > (correct_angles[6] * 1.5)):        
        tmp = "right_index"
        return tmp
    elif (current_angles[7] < (correct_angles[7] * 0.5)) or (current_angles[7] > (correct_angles[7] * 1.5)):        
        tmp = "left_index"
        return tmp
    
    #중지
    elif (current_angles[8] < (correct_angles[8] * 0.5)) or (current_angles[8] > (correct_angles[8] * 1.5)):
        tmp = "right_middle"
        return tmp
    elif (current_angles[9] < (correct_angles[9] * 0.5)) or (current_angles[9] > (correct_angles[9] * 1.5)):        
        tmp = "left_middle"
        return tmp
    
    #약지
    elif (current_angles[10] < (correct_angles[10] * 0.5)) or (current_angles[10] > (correct_angles[10] * 1.5)):        
        tmp = "right_ring"
        return tmp
    elif (current_angles[11] < (correct_angles[11] * 0.5)) or (current_angles[11] > (correct_angles[11] * 1.5)):
        tmp = "left_ring"
        return tmp
    

    # 아무런 교정이 필요없다면, 즉, 완벽한 자세라면 자세 교정 문구로 OK를 리턴
    else:
        tmp = "OK"
        return tmp

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 800)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)


while cap.isOpened():
        word = "candy1"
        ret, frame = cap.read()

        img = cv2.flip(frame, 1)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)



        #image.flags.writeable = False
        
        results = mediapipeHolistic.process(img)
        results_hands = hands.process(image=img)

        #image.flags.writeable = True
        img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        

        current_angle= []
        left_hand_angle_lists = []  # 5개의 손가락에 대한 각도 리스트
        right_hand_angle_lists = []  # 5개의 손가락에 대한 각도 리스트

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


            current_angle.extend([left_elbow_angle,right_elbow_angle,left_shoulder_angle,right_shoulder_angle])

        if results_hands.multi_hand_landmarks is not None:
            # Hands 모델의 손가락 관절 각도 계산
            for hand_landmarks in results_hands.multi_hand_landmarks:
                joint = np.zeros((21, 4))
                for j, lm in enumerate(hand_landmarks.landmark):
                    joint[j] = [lm.x, lm.y, lm.z, lm.visibility]

                v1 = joint[[0,1,2,3,0,5,6,7,0,9,10,11,0,13,14,15,0,17,18,19], :3] # Parent joint
                v2 = joint[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], :3] # Child joint
                v = v2 - v1 # [20, 3]
                v = v / np.linalg.norm(v, axis=1)[:, np.newaxis]

                angle = np.arccos(np.einsum('nt,nt->n',
                                v[[0,1,2,4,5,6,8,9,10,12,13,14,16,17,18],:], 
                                v[[1,2,3,5,6,7,9,10,11,13,14,15,17,18,19],:])) # [15,]
                angle = np.degrees(angle) # Convert radian to degree

                if hand_landmarks == results_hands.multi_hand_landmarks[0]:  # 왼손
                    left_hand_angle_lists.append(angle)
                else:  # 오른손

                    right_hand_angle_lists.append(angle)

            current_angle.extend(left_hand_angle_lists)
            current_angle.extend(right_hand_angle_lists)
            print(current_angle)
            
        text1 = correctPose(current_angle,word)
        cv2.putText(img, text1 , org=(50, 50), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=(255, 255, 255), thickness=2)


        
        cv2.imshow('img', img)
        if cv2.waitKey(1) == ord('q'):
            break