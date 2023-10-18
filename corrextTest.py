import cv2
import mediapipe as mp
import math
import numpy as np
from PIL import Image

mp_drawing = mp.solutions.drawing_utils
mp_holistic = mp.solutions.holistic
mediapipeHolistic = mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    max_num_hands=2,
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

cap = cv2.VideoCapture('D:/캡스톤 연습/vedio/candy.mp4')
cap.set(cv2.CAP_PROP_FPS, 10)

frame_counter = 0
frame_to_save = cap.get(cv2.CAP_PROP_FPS) * 5  # 5초 후의 프레임 저장

angle_list = []
tmp0_list = []
tmp1_list = []
tmp2_list = []
tmp3_list = []
left_hand_angle_lists = [[] for _ in range(5)]  # 5개의 손가락에 대한 각도 리스트
right_hand_angle_lists = [[] for _ in range(5)]  # 5개의 손가락에 대한 각도 리스트

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

    if results is not None:
        # 0: 왼쪽 팔꿈치 각도
        left_elbow_angle = calculateAngle(results.pose_landmarks.landmark[LEFT_SHOULDER],
                                          results.pose_landmarks.landmark[LEFT_ELBOW],
                                          results.pose_landmarks.landmark[LEFT_WRIST])
        tmp0_list.append(left_elbow_angle)

        # 1: 오른쪽 팔꿈치 각도
        right_elbow_angle = calculateAngle(results.pose_landmarks.landmark[RIGHT_SHOULDER],
                                           results.pose_landmarks.landmark[RIGHT_ELBOW],
                                           results.pose_landmarks.landmark[RIGHT_WRIST])
        tmp1_list.append(right_elbow_angle)

        # 2: 왼쪽 어깨 각도
        left_shoulder_angle = calculateAngle(results.pose_landmarks.landmark[LEFT_ELBOW],
                                             results.pose_landmarks.landmark[LEFT_SHOULDER],
                                             results.pose_landmarks.landmark[LEFT_HIP])
        tmp2_list.append(left_shoulder_angle)

        # 3: 오른쪽 어깨 각도
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

            if hand_landmarks == results_hands.multi_hand_landmarks[0]:  # 왼손
                for i in range(5):
                    left_hand_angle_lists[i].append(angle[i])
            else:  # 오른손
                for i in range(5):
                    right_hand_angle_lists[i].append(angle[i])

    if frame_counter == frame_to_save:
        # 중간 시점 이미지를 PIL의 Image 객체로 변환
        captured_image = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

        # 중간 시점 이미지 저장
        captured_image.save("D:/캡스톤 연습/중간시점이미지.png")

    frame_counter += 1

cap.release()
cv2.destroyAllWindows()
