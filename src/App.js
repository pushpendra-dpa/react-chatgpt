import './App.css';
import Navigation from './Navigation';
import Example from './Example';
import Prompt from './Prompt';
import Chats from './Chats';
import { useEffect, useState } from 'react';
import { Modal, message } from 'antd';
let host = "https://chatgpt-server.pushpendrahpx.me/";
function App() {
  const [state, setState] = useState({ isLoaded: false, isNewSession: true, conversation: {name: `Conversation ${((new Date()).getTime())} `, data: []}, previousConversations: []})
  const [isModalOpen, setIsModalOpen] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(()=>{
      let data = localStorage.getItem("store")
      console.log("INIT",data)
      if(data){
        
        let json = JSON.parse(data)
        console.log(json)
        if(json){
          json.isLoaded = true
          setState(json)
        }
      }
  },[])
  useEffect(()=>{
    console.log("AFTER2")
    localStorage.setItem("store", JSON.stringify(state))
  },[state])
  const getChatGPTAnswer = async (messages)=>{
    return new Promise(async (resolve, reject)=>{
      try {
        let response = await fetch(host+"ask/",{
          method:"POST",
          headers:{
            'content-type':'application/json'
          },
          body: JSON.stringify(messages)
        })
        let data = await response.json()
        setState(prev=>{
          return {...prev, conversation: {...prev.conversation, data: [...prev.conversation.data, {role: "assistant", content: data.content}]}}
        })
        resolve(true)
      } catch (error) {
        reject(false)
      }
    })
  }
 const onStop = async (blobURL, blob)=>{
  setState(prev=>{
    return {...prev, conversation: {...prev.conversation, data: [...prev.conversation.data, {role: "user", content: blobURL, contentType: 'audio', url: blobURL}]}}
  })
  let formData = new FormData()
  formData.append("file", blob)
  let response = await fetch(host+"uploadfile/",{
    method:"POST",
    headers:{
      'responseType':'arraybuffer'
    },
    body: formData
  })
  if(!response.ok){
    message.error("Failed to upload/fetch audio")
    return;
  }
  let buffer = await response.arrayBuffer()
  let audioBlob = await new Blob([buffer])
  
  let audioURL = URL.createObjectURL(audioBlob)
  setState(prev=>{
    return {...prev, conversation: {...prev.conversation, data: [...prev.conversation.data, {role:"assistant", content: audioURL, contentType: 'audio', url: audioURL}]}}
  })

 } 
  return (
    <div className="App">
      <Navigation state={state} setState={setState} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      <div className='main-screen'>
        {state.conversation.data.length == 0 ? <Example /> : <Chats content={state.conversation.data} />}
        <Prompt setState={setState} state={state} getChatGPTAnswer={getChatGPTAnswer} onStop={onStop} />
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
      <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-body">
              <h2>Welcome to ChatGPT Clone</h2>
              <p>
                You are using a clone of the ChatGPT UI. This is a simple web app that provides an interactive chat
                experience using the GPT-3.5 language model.
              </p>
              <p>
                You can type your messages in the chat input, and the AI will respond to your queries and provide
                relevant information.
              </p>
              <h3>How to use:</h3>
              <ol>
                <li>Type your message in the chat input box.</li>
                <li>Press Enter or click on the Send button to send the message.</li>
                <li>Wait for the AI's response to appear in the chat window.</li>
                <li>
                  Have fun experimenting with different queries and engaging in natural conversations with the AI!
                </li>
              </ol>
              <p>
                Please note that this is a demo application, and the AI's responses are generated based on the data it
                has been trained on. Therefore, it may not always provide accurate or complete information.
              </p>
              <p>Enjoy your experience with ChatGPT Clone!</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
