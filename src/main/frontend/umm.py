import cv2
import mediapipe as mp
import math
import numpy as np
import time, os

mp_drawing = mp.solutions.drawing_utils
mp_holistic = mp.solutions.holistic
mediapipeHolistic = mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    max_num_hands=2,  # 2로 바꾸기
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

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
    if angle > 180:
        angle = 360 - angle

    return angle

cap = cv2.VideoCapture('D:/캡스톤 연습/vedio/turnOn.mp4')
cap.set(cv2.CAP_PROP_FPS, 10)

angle_list = []
tmp0_list = []
tmp1_list = []
tmp2_list = []
tmp3_list = []
thumb_angles = []
index_angles = []
middle_angles = []
ring_angles = []
pinky_angles = []

current_angle = []

while cap.isOpened():
    

    ret, frame = cap.read()

    if not ret:
        break

    image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False

    results = mediapipeHolistic.process(image)
    results_hands = hands.process(image=image)

    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    start_time = time.time()
    if results is not None:
        # 0 : 왼쪽 팔꿈치 각도
        left_elbow_angle = calculateAngle(results.pose_landmarks.landmark[LEFT_SHOULDER],
                                          results.pose_landmarks.landmark[LEFT_ELBOW],
                                          results.pose_landmarks.landmark[LEFT_WRIST])
        tmp0_list.append(left_elbow_angle)

        # 1 : 오른쪽 팔꿈치 각도
        right_elbow_angle = calculateAngle(results.pose_landmarks.landmark[RIGHT_SHOULDER],
                                           results.pose_landmarks.landmark[RIGHT_ELBOW],
                                           results.pose_landmarks.landmark[RIGHT_WRIST])
        tmp1_list.append(right_elbow_angle)

        # 2 : 왼쪽 어깨 각도
        left_shoulder_angle = calculateAngle(results.pose_landmarks.landmark[LEFT_ELBOW],
                                             results.pose_landmarks.landmark[LEFT_SHOULDER],
                                             results.pose_landmarks.landmark[LEFT_HIP])
        tmp2_list.append(left_shoulder_angle)

        # 3 : 오른쪽 어깨 각도
        right_shoulder_angle = calculateAngle(results.pose_landmarks.landmark[RIGHT_ELBOW],
                                              results.pose_landmarks.landmark[RIGHT_SHOULDER],
                                              results.pose_landmarks.landmark[RIGHT_HIP])
        tmp3_list.append(right_shoulder_angle)

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
    
            current_angle.extend(angle.tolist())
            end_time = time.time()
            print(end_time - start_time)
            print("=========================")

cap.release()
cv2.destroyAllWindows()

mid_index = len(tmp0_list) // 2

angle_list.append(int(tmp0_list[mid_index]))
angle_list.append(int(tmp1_list[mid_index]))
angle_list.append(int(tmp2_list[mid_index]))
angle_list.append(int(tmp3_list[mid_index]))
angle_list.extend(current_angle)

# 리스트를 배열로 변환
angle_array = np.array(current_angle)

# 각도 값 저장
np.savetxt('D:/캡스톤 연습/angles/turnOnAngles4.txt', [angle_array], fmt="%d")
