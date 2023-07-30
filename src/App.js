import './App.css';
import Navigation from './Navigation';
import Example from './Example';
import Prompt from './Prompt';
import Chats from './Chats';
import { useEffect, useState } from 'react';

function App() {
  const [state, setState] = useState({ isNewSession: true, conversation: {name: "Conversation 1", data: []}, previousConversations: []})
  
  const getChatGPTAnswer = async (text)=>{
    let response = await fetch("https://pushpendra-dpa-musical-space-giggle-wr7rr4qgv9x6hg9g6-8000.preview.app.github.dev/ask/",{
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
 
  useEffect(()=>{
    
  },[])
  return (
    <div className="App">
      <Navigation />
      <div className='main-screen'>
        {state.conversation.data.length == 0 ? <Example /> : <Chats content={state.conversation.data} />}
        <Prompt setState={setState} state={state} getChatGPTAnswer={getChatGPTAnswer} />
      </div>
    </div>
  );
}

export default App;
