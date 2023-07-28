import os
import openai



def ChatGPTAsk(text):
    completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": text}
    ]
    )

    return completion.choices[0].message