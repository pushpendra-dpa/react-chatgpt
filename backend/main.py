import os
import openai
from typing import Union
from fastapi import FastAPI, File, UploadFile, HTTPException, Request, Body
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from modules.ChatGPT import ChatGPTAsk
from modules.VoiceToText import VoiceToText
from modules.TextToVoice import TextToVoice
import string
import random


# Importing ENV Variables
from dotenv import load_dotenv
load_dotenv()

# Declaring OPENAI Vars
openai.org = os.getenv("OPENAI_ORG")
openai.api_key = os.getenv('OPENAI_APIKEY')




app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def generate_random_string(length):
    # Get all the ASCII letters in lowercase and uppercase
    letters = string.ascii_letters
    # Randomly choose characters from letters for the given length of the string
    random_string = ''.join(random.choice(letters) for i in range(length))
    return random_string
 

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/ask/")
async def getChatGPTAnswer(payload:Request):
    text = await payload.json()
    chatGPTAnswer=ChatGPTAsk(text["content"])
    return chatGPTAnswer

@app.post("/uploadfile/")
async def postAudioFile(file = File()):
    
    filename=generate_random_string(10)
    print(str(filename))
    filePath = "files/"+filename+".wav"
    opener = open(filePath,"wb")
    opener.write(file.file.read())
    opener.close()

    fileBinary = open(filePath, "rb")
    answer = VoiceToText(filename)
    print(answer)
    os.remove(filePath)
    chatGPTAnswer=ChatGPTAsk(answer["text"])
    print(chatGPTAnswer)
    response = TextToVoice(chatGPTAnswer["content"])
    audio_output=response.content
    def iterfile():

        yield audio_output

 

    # Use for Post: Return output audio

    return StreamingResponse(iterfile(), media_type="application/octet-stream")
