import cv2
import mediapipe as mp
import math
import numpy as np

mp_drawing = mp.solutions.drawing_utils
mp_holistic = mp.solutions.holistic
mediapipeHolistic = mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)

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
        tmp = "X"
        return tmp
    elif (current_angles[1] < (correct_angles[1] * 0.5)) or (current_angles[1] > (correct_angles[1] * 1.5)):        
        tmp = "X"
        return tmp
    elif (current_angles[2] < (correct_angles[2] * 0.5)) or (current_angles[2] > (correct_angles[2] * 1.5)):
        tmp = "X"
        return tmp
    elif (current_angles[3] < (correct_angles[3] * 0.5)) or (current_angles[3] > (correct_angles[3] * 1.5)):        
        tmp = "X"
        return tmp
    # 아무런 교정이 필요없다면, 즉, 완벽한 자세라면 자세 교정 문구로 OK를 리턴
    else:
        tmp = "OK"
        return tmp

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 800)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)


def correct_poses(word):
        #ret, frame = cap.read()


        image = cv2.imread('canvas3.png')
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False

        results = mediapipeHolistic.process(image)

        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        

        current_angle= []

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
            text1 = correctPose(current_angle,word)

        
        return text1