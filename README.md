# ChatGPT+ - An Enhanced Chatbot Application

Welcome to the **ChatGPT+** repository! ChatGPT+ is an enhanced chatbot application, based on the GPT-3.5 architecture, which adds several exciting features to the original ChatGPT.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Team Members](#team-members)
- [Deployment](#deployment)
- [Usage](#usage)
- [License](#license)

## Overview

ChatGPT+ is an AI-powered chatbot that has been built upon OpenAI's GPT-3.5 model. It aims to enhance the user experience by incorporating new features like the ability to answer questions in the context of previous questions and responding to voice-based queries with both voice and text responses.

## Features

1. **Contextual Answers**: Unlike traditional chatbots, ChatGPT+ can maintain context across multiple questions. This means users can ask follow-up questions or refer back to previous queries, and ChatGPT+ will remember the conversation flow to provide more relevant and coherent responses.

2. **Voice Interaction**: ChatGPT+ is equipped with voice recognition capabilities, allowing users to ask questions using their voice. The application processes the voice input, generates a response, and can also provide the answer in both voice and text formats, offering a seamless voice-based interaction.

3. **Enhanced Natural Language Understanding**: With the power of GPT-3.5, ChatGPT+ boasts an improved understanding of natural language. It can comprehend complex queries, colloquial language, and even handle some language-specific nuances.

4. **Interactive Conversations**: Engage in interactive and dynamic conversations with ChatGPT+. The chatbot can maintain continuity and context, leading to more natural and human-like interactions.

5. **Customization Options**: Fine-tune the behavior of ChatGPT+ to align with your specific use cases. Adjust parameters like temperature and max tokens to control the creativity and length of responses.

6. **Multi-Platform Accessibility**: ChatGPT+ is designed to be accessible across various platforms, including web browsers, mobile devices, and voice assistants, ensuring a seamless user experience.

## Installation

To run ChatGPT+ locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/your-username/chatgpt-plus.git
```

2. Install the required dependencies:

```bash
cd chatgpt-plus
npm install
```

3. Set up the backend:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

4. Set up the frontend:

```bash
cd ../frontend
npm install
npm start
```

5. The application should now be running locally at [http://localhost:3000](http://localhost:3000).

## Team Members

- Pushpendra Vishwakarma
- Durgesh Bagade
- Ashrith Kumar
- Hitesh Kumawat
- Siddhant Yadav
- Surendra Kumar

## Deployment

ChatGPT+ is deployed on AWS and Netlify:

- Backend: Hosted on AWS - [https://chatgpt-server.pushpendrahpx.me](https://chatgpt-server.pushpendrahpx.me)
- Frontend: Hosted on Netlify - [https://chatgpt.pushpendrahpx.me](https://chatgpt.pushpendrahpx.me)

## Usage

1. Open the ChatGPT+ application in your web browser or mobile device.

2. Type or speak your question, and ChatGPT+ will respond accordingly.

3. To ask a voice-based question, click the microphone icon and speak your query. ChatGPT+ will respond both vocally and in text.

4. Engage in dynamic conversations, referring back to previous questions, and witness ChatGPT+ maintaining context throughout the interaction.


Thank you for exploring ChatGPT+! We hope you enjoy using the enhanced features and having interactive conversations with our AI-powered chatbot. If you encounter any issues or have feedback, feel free to create an issue or contact our team members. Happy chatting!
