import requests
import os

endpoint = "https://api.elevenlabs.io/v1/text-to-speech/"+str(os.getenv("ELEVENLABS_VOICE_ID"))
headers = {
    "accept": "audio/mpeg",
    "xi-api-key": os.getenv("ELEVENLABS_APIKEY"),
    "Content-Type": "application/json"
}

def TextToVoice(text):
    body=({"text": "Hi! My name is Bella, nice to meet you!","model_id": "eleven_monolingual_v1","voice_settings": {"stability": 0.5,"similarity_boost": 0.5}})

    response = requests.post(endpoint, json=body, headers=headers)
    return response