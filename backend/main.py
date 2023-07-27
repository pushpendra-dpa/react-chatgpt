import os
import openai
from typing import Union
from fastapi import FastAPI
from modules.ChatGPT import ChatGPTAsk
from modules.VoiceToText import VoiceToText
from modules.TextToVoice import TextToVoice


# Importing ENV Variables
from dotenv import load_dotenv
load_dotenv()

# Declaring OPENAI Vars
openai.org = os.getenv("OPENAI_ORG")
openai.api_key = os.getenv('OPENAI_APIKEY')



app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/ask_text/{text}")
def read_item(text: str, q: Union[str, None] = None):
    return ChatGPTAsk(text)

@app.get("/ask/")
def getAudioToChatGPTAnswer():
    answer = VoiceToText()
    chatGPTAnswer=ChatGPTAsk(answer["text"])
    return TextToVoice(chatGPTAnswer)