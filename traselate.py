import cv2
import mediapipe as mp
import numpy as np
from keras.models import load_model
import os


os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

actions = ['graduate', 
           'practice', 
           'write', 
           'spaghetti',
           'candy',
           'noodles'] 

seq_length = 30

# 카테고리 별로 모델을 다르게 만들 수 있을 것 같음
# 대신 카테고리 별로 test 하는 함수를 다르게 짜야 할 것 같긴 함
model = load_model('models/model3.h5') #모델이름을 edu_models로

# MediaPipe hands model
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(
    max_num_hands=2,  #2로 바꾸기
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5)

cap = cv2.VideoCapture(0)


seq = []
action_seq = []

def output_label():
    
    IMAGE_FILES = ['canvas2.png']

    img = cv2.imread('canvas2.png')
    if img is None:
        return "fail"
    img = cv2.flip(img, 1)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    result = hands.process(img)
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
            angle = np.arccos(np.einsum('nt,nt->n',
                v[[0,1,2,4,5,6,8,9,10,12,13,14,16,17,18],:], 
                v[[1,2,3,5,6,7,9,10,11,13,14,15,17,18,19],:])) # [15,]

            angle = np.degrees(angle) # Convert radian to degree

            d = np.concatenate([joint.flatten(), angle])

            seq.append(d)

            mp_drawing.draw_landmarks(img, res, mp_hands.HAND_CONNECTIONS)

            if len(seq) < seq_length:
                continue

            input_data = np.expand_dims(np.array(seq[-seq_length:], dtype=np.float32), axis=0)

            #결과가 저장 
            y_pred = model.predict(input_data).squeeze()

            i_pred = int(np.argmax(y_pred))
            conf = y_pred[i_pred]

            if conf < 0.9:
                continue

            action = actions[i_pred]
            action_seq.append(action)

            if len(action_seq) < 3:
                continue

            # 마지막에 같은 동작이 반복되면 액션이 맞다고 판단   
            # Flag 변수로 True/ Flase 따지고
            # 실제 test 함수에서는 this_action 문자열을 리턴      
            this_action = '?'
            flag = True
            for i in action_seq[-3:]:
                if action != i:
                    flag = False
                    break
            if flag: this_action = action 
            if this_action != '?' :
                return this_action
            else:
                return "fail"
            #return this_action
