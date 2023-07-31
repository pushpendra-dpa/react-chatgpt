import requests
import os

endpoint = "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM/"
headers = {
    "accept": "audio/mpeg",
    "xi-api-key": os.getenv("ELEVENLABS_APIKEY"),
    "Content-Type": "application/json"
}

def TextToVoice(text):
    
    url = "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM"

    headers = {
    "Accept": "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key":os.getenv("ELEVENLABS_APIKEY")
    }
    print(text)
    data = {
    "text": text,
    "model_id": "eleven_monolingual_v1",
    "voice_settings": {
        "stability": 0.5,
        "similarity_boost": 0.5
    }
    }
    response = requests.post(url, json=data, headers=headers)
    print(response.headers)
    return response


