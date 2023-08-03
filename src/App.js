import './App.css';
import Navigation from './Navigation';
import Example from './Example';
import Prompt from './Prompt';
import Chats from './Chats';
import { useEffect, useState } from 'react';
import { Avatar, List, Modal, Typography, message } from 'antd';
let host = "https://chatgpt-server.pushpendrahpx.me/";
function App() {
  const [state, setState] = useState({ isLoaded: false, isNewSession: true, conversation: {name: `Conversation ${((new Date()).getTime())} `, data: []}, previousConversations: []})
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const [forcedText, setForcedText] = useState('')
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

      messageApi.loading({
        type: 'loading',
        content: 'Responding to your message..',
        duration: 0,
      })
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
        messageApi.destroy()

        message.success("Got the response")
        resolve(true)
      } catch (error) {
        messageApi.destroy()

        message.error("Failed to Response")
        reject(false)
      }
    })
  }
 const onStop = async (blobURL, blob)=>{
  messageApi.loading({
    type: 'loading',
    content: 'Converting your audio to text...',
    duration: 0,
  })
  try {
     // setState(prev=>{
  //   return {...prev, conversation: {...prev.conversation, data: [...prev.conversation.data, {role: "user", content: '', contentType: 'audio', url: blobURL}]}}
  // })
  let reader = new FileReader();
  reader.addEventListener('load', () => {
    localStorage.setItem(blobURL, reader.result);
  });
  // Read the contents of the specified Blob or File
  reader.readAsDataURL(blob);



  
  let allData = state.conversation.data.map((each)=>{
    return {role:each.role, content: each.content}
  })
  let formData = new FormData()
  formData.append("file", blob)
  formData.append("messages", JSON.stringify(allData))
  let response = await fetch(host+"voiceToText/",{
    method:"POST",
    headers:{
      // 'responseType':'arraybuffer'
      'accept':'application/json'
    },
    body: formData
  })
  if(!response.ok){
    message.error("Failed to upload audio")
    return;
  }
  let voiceToTextData = await response.json()
  voiceToTextData = voiceToTextData.content.text
  let prevOlds = state.conversation.data.map((each)=>{
    return each
  })
  let allMessages = state.conversation.data.map((each)=>{
    if('url' in each){
      return {role: each.role, content: each.content}
    }else{
      return each;
    }
  })
  allMessages.push({role: 'user', content: voiceToTextData})
  prevOlds.push({role: 'user', content: voiceToTextData})
  console.log(allMessages)
  messageApi.destroy()
  messageApi.loading({
    type: 'loading',
    content: 'Getting Response from Bot...',
    duration: 0,
  })
  // Now asking to ChatGPT
  response = await fetch(host+"ask/",{
    method:"POST",
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify(allMessages)
  })
  if(!response.ok){
    message.error("Failed in ChatGPT step")
    return;
  }
  let data = await response.json()
  console.log(data)
  allMessages[allMessages.length-1].contentType = 'audio';
  allMessages[allMessages.length-1].url = blobURL
  allMessages.push({role: 'assistant', content: data.content})
  
  prevOlds[prevOlds.length-1].contentType = 'audio';
  prevOlds[prevOlds.length-1].url = blobURL
  prevOlds.push({role: 'assistant', content: data.content})

  setState(prev=>{
    return {...prev, conversation: {...prev.conversation, data: prevOlds}}
  })

  messageApi.destroy()
  messageApi.loading({
    type: 'loading',
    content: 'Converting Response into Audio...',
    duration: 0,
  })

  // Text to voice
  response = await fetch(host+"textToVoice/",{
    method:"POST",
    headers:{
      'responseType':'arraybuffer'
      // 'accept':'application/json'
    },
    body: JSON.stringify({text: data.content })
  })
  if(!response.ok){
    message.error("Failed to get Audio from Text")
    return;
  }
  let buffer = await response.arrayBuffer()
  let audioBlob = await new Blob([buffer],  { type: 'audio/wav' })

  let audioURL = URL.createObjectURL(audioBlob)
  
  reader = new FileReader();
  reader.addEventListener('load', () => {
    localStorage.setItem(audioURL, reader.result);
  });
  reader.readAsDataURL(audioBlob);

  // Read the contents of the specified Blob or File
  allMessages[allMessages.length-1].contentType = 'audio'
  allMessages[allMessages.length-1].url = audioURL;
  
  prevOlds[prevOlds.length-1].contentType = 'audio'
  prevOlds[prevOlds.length-1].url = audioURL;
  
  setState(prev=>{
    return {...prev, conversation: {...prev.conversation, data: prevOlds}}
  })

  messageApi.destroy()
  messageApi.success("Response Completed!")
  // console.log(response)



  // let buffer = await response.arrayBuffer()
  // let audioBlob = await new Blob([buffer])
  
  // let audioURL = URL.createObjectURL(audioBlob)
  // setState(prev=>{
  //   return {...prev, conversation: {...prev.conversation, data: [...prev.conversation.data, {role:"assistant", content: '', contentType: 'audio', url: audioURL}]}}
  // })

  } catch (error) {
    
  messageApi.destroy()
  messageApi.error("Something Failed!")
  }
 } 
 const data = [{
  href: 'https://pushpendrahpx.me',
  title: <u>Pushpendra Vishwakarma</u>,
  avatar: `https://avatars.githubusercontent.com/u/48829314?v=4`,
 },{
  href: 'https://github.com/durgesh2216',
  title: <u>Durgesh Bagade</u>,
  avatar: `https://avatars.githubusercontent.com/u/140599158?v=4`,
 },{
  href: 'https://github.com/ashrith-dpa',
  title: <u>Ashrith Kumar</u>,
  avatar: `https://avatars.githubusercontent.com/u/140599227?v=4`,
 },{
  href: 'https://github.com/hitesh-dpa',
  title: <u>Hitesh Kumawat</u>,
  avatar: `https://avatars.githubusercontent.com/u/140599266?v=4`,
 },{
  title: 'Siddhant Yadav',
  avatar: `https://avatars.githubusercontent.com/u/140601433?v=4`,
 },{
  title: 'Surendra Kumar',
  avatar: `https://avatars.githubusercontent.com/u/140600696?v=4`,
 },]
  return (
    <div className="App">
      {contextHolder}
      <Navigation state={state} setState={setState} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      <div className='main-screen'>
        {state.conversation.data.length == 0 ? <Example setForcedText={setForcedText} /> : <Chats content={state.conversation.data} />}
        <Prompt setState={setState} state={state} getChatGPTAnswer={getChatGPTAnswer} onStop={onStop} forcedText={forcedText} />
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
      <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-body">
              <h2>Welcome to ChatGPT+</h2>
              <p>
                You are using a ChatGPT+ UI. This is a simple web app that provides an interactive chat
                experience using the GPT-3.5 language model.
              </p>
              <p>
                You can type your messages in the chat input, and the AI will respond to your queries and provide
                relevant information.
              </p>
              <p>
                Please note that this is a demo application, and the AI's responses are generated based on the data it
                has been trained on. Therefore, it may not always provide accurate or complete information.
              </p>
              <p>Enjoy your experience with ChatGPT+!</p>


              <Typography.Title level={5}>Developed by</Typography.Title >
              <List
                itemLayout="vertical"
                size="large"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item
                    key={item.title}
                    style={{padding: 0}}
                   
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
              {/* <ol>
                <li><a href="https://pushpendrahpx.me"><u>Pushpendra Vishwakarma</u></a></li>
                <li><a href="https://github.com/durgesh2216">Durgesh Bagade</a></li>
                <li>Ashrith Kumar</li>
                <li>Hitesh Kumawat</li>
                <li>Siddhant Yadav</li>
                <li>Surendra Kumar</li>
              </ol> */}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
