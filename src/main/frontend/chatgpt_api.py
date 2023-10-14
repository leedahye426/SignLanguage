import requests
import openai

def call_chatgpt_api(sentense, system):
    openai.api_key = "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"

    completion = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = [
            {"role":"system", "content":system},
            {"role":"user", "content":sentense}
        ]
    )

    chat_response = completion.choices[0].message.content
    print(f'USER:{sentense}')
    print(f'ChatGPT:{chat_response}')
    return chat_response;

# def call_chatgpt_api(prompt):
#     url = "https://api.openai.com/v1/chat/completions"
#     secret_key = "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"
#
#     headers = {
#         "Authorization": f"Bearer {secret_key}",
#         "Content-Type": "application/json"
#     }
#
#     data = {
#         "messages": [
#             {"role": "system", "content": "You are a helpful assistant."},
#             {"role": "user", "content": prompt}
#         ]
#     }
#
#     response = requests.post(url, headers=headers, json=data)
#
#     if response.status_code == 200:
#         chatgpt_response = response.json()
#         assistant_reply = chatgpt_response["choices"][0]["message"]["content"]
#         return assistant_reply
#     else:
#         print("Error:", response.status_code)
#         return None

# 사용 예시
# prompt = "Translate the following English text to French: 'Hello, how are you?'"
# assistant_reply = call_chatgpt_api(prompt)
# print("Assistant's reply:", assistant_reply)
