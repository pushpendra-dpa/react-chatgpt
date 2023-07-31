import './App.css';
import Navigation from './Navigation';
import Example from './Example';
import Prompt from './Prompt';
import Chats from './Chats';
import { useEffect, useState } from 'react';
import { message } from 'antd';
let host = "https://chatgpt-server.pushpendrahpx.me/"
function App() {
  const [state, setState] = useState({ isNewSession: true, conversation: {name: `Conversation ${((new Date()).getTime())}}`, data: []}, previousConversations: []})
  useEffect(()=>{
    console.log("S", state)
    localStorage.setItem("store", JSON.stringify(state))
  },[state])
  useEffect(()=>{
    if(state.previousConversations.length == 0){
      let data = localStorage.getItem("store")
      if(data){
        let json = JSON.parse(data)
        if(json){
          setState(json)
        }
      }
    }
  },[])
  const getChatGPTAnswer = async (text)=>{
    let response = await fetch(host+"ask/",{
      method:"POST",
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify({content: text})
    })
    let data = await response.json()
    setState(prev=>{
      return {...prev, conversation: {...prev.conversation, data: [...prev.conversation.data, {type: 2, content: data.content}]}}
    })
  }
 const onStop = async (blobURL, blob)=>{
  setState(prev=>{
    return {...prev, conversation: {...prev.conversation, data: [...prev.conversation.data, {type: 1, content: blobURL, contentType: 'audio', url: blobURL}]}}
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
    return {...prev, conversation: {...prev.conversation, data: [...prev.conversation.data, {type: 2, content: audioURL, contentType: 'audio', url: audioURL}]}}
  })

 } 
  return (
    <div className="App">
      <Navigation />
      <div className='main-screen'>
        {state.conversation.data.length == 0 ? <Example /> : <Chats content={state.conversation.data} />}
        <Prompt setState={setState} state={state} getChatGPTAnswer={getChatGPTAnswer} onStop={onStop} />
      </div>
    </div>
  );
}

export default App;
