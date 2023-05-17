from time import sleep
import cv2
import mediapipe as mp
import numpy as np
from keras.models import load_model
import tensorflow as tf

# gpu
gpus = tf.config.experimental.list_physical_devices('GPU')
for gpu in gpus:
  tf.config.experimental.set_memory_growth(gpu, True)

model = load_model('models/model.h5')# 모델 불러오기

seq_length = 30



# MediaPipe hands model
mp_drawing = mp.solutions.drawing_utils
mp_holistic = mp.solutions.holistic
hands = mp_holistic.Holistic(
    static_image_mode=False,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5)

cap = cv2.VideoCapture(0)

actions = ['graduate', 'mis_graduate', 'practice', 'mis_practice1','mis_practice2', 'write']


seq = []
action_seq = []

while cap.isOpened():
    ret, img = cap.read()
    img0 = img.copy()

    img = cv2.flip(img, 1)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    result = hands.process(img)
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    if result.left_hand_landmarks is not None:
        for res in result.left_hand_landmarks.landmark:
            joint = np.zeros((21, 4))
            for j, lm in enumerate(res):
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

            mp_drawing.draw_landmarks(img, res, mp_holistic.HAND_CONNECTIONS)

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

            #마지막에 같은 동작이 반복되면 액션이 맞다고 판단        
            this_action = '?'
            if action_seq[-1] == action_seq[-2] == action_seq[-3]:
                this_action = action

            cv2.putText(img, f'{this_action.upper()}', org=(int(res.landmark[0].x * img.shape[1]), int(res.landmark[0].y * img.shape[0] + 20)), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=(0, 0, 0), thickness=2)

    # out.write(img0)
    # out2.write(img)
    cv2.imshow('img', img)
    if cv2.waitKey(1) == ord('q'):
        break