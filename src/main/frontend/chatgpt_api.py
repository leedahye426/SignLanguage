import openai
from dotenv import load_dotenv
import os

def call_chatgpt_api(sentense, system):
    load_dotenv()  # .env 파일을 로드합니다.
    openai.api_key = os.getenv("OPENAI_API_KEY")  # API 키를 가져옵니다.

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

