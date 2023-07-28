import os
import openai


# Declaring OPENAI Vars
openai.org = os.getenv("OPENAI_ORG")
openai.api_key = os.getenv('OPENAI_APIKEY')

def VoiceToText(filename):    
    audio_file= open("files/"+str(filename)+".wav", "rb")
    transcript = openai.Audio.transcribe("whisper-1", audio_file)
    return transcript