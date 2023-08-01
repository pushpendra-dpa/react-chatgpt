import { Button, Input, Modal, Tooltip, Typography, message } from "antd";
import "./navigation.css";
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, InfoCircleOutlined, MessageOutlined } from "@ant-design/icons";
import { useState } from "react";
const svg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>
const EachConversation = ({eachIndex, eachPrev, openOldConversation, deleteConversation, openEditModal})=>{
    // const []
    return  (<button key={eachIndex} style={{ textAlign: "center", display: "flex", justifyContent: "space-around", padding:"10px", width:'100%', alignItems:"center" }} >
    <div style={{margin: 'auto 0'}}>                        
        <MessageOutlined />
    </div>
    <div type="text" onClick={()=>openOldConversation(eachIndex)} style={{padding:'0 10px', minWidth: '100px'}}>{eachPrev.name}</div>
    <div style={{display:'flex'}}>
      <div style={{margin: 'auto 2px'}}>                        
          <Button icon={<EditOutlined />} onClick={()=>openEditModal(eachIndex)} />
      </div>
      <div style={{margin: 'auto 0'}}>                        
          <Button icon={<DeleteOutlined />} onClick={()=>deleteConversation(eachIndex)} />
      </div>
    </div>
    </button>);
}
const Navigation = ({state, setState, setIsModalOpen}) => {
    const [editModal, setEditModal] = useState({isOpen: false, text: '', index: -1})
    const [modalInput, setModalInput] = useState('')
    const prevConversations = [
        "Assiting User Requests",
        "Playing with user",
        "Instagram users"
    ]
    const saveConversation = ()=>{
        setState((prev)=>{
            let currentConversation = prev.conversation;
            return {...prev, conversation:{name: `Conversation ${((new Date()).getTime())}`, data: []}, previousConversations: [ ...prev.previousConversations, currentConversation]}
        })
        message.success("Conversation Saved in Local Storage!")
    }
    const newChatHandle = ()=>{
        Modal.confirm({
            title: 'Are you sure you want to start a new session?',
            icon: <ExclamationCircleFilled />,
            content: 'Current Conversation will be deleted and a fresh new conversation will start',
            onOk() {
              console.log('OK');
              setState((prev)=>{
                    return {...prev, conversation:{name: `Conversation ${((new Date()).getTime())}`, data: []}}
                })
            },
            onCancel() {
              console.log('Cancel');
            },
            okType:'danger'
          });
    }
    const openOldConversationController = (i)=>{
        console.log('OK');
        setState((prev)=>{
            let item = prev.previousConversations.filter((each, index)=>index==i);
            console.log(item)
                item = item[0]
              return {...prev, conversation:item}
          })
    }
    const openOldConversation = (i)=>{
        if(state.conversation.data.length > 0){
            Modal.confirm({
                title: 'Are you sure you want to open a old conversation?',
                icon: <ExclamationCircleFilled />,
                onOk() {
                  openOldConversationController(i)
                },
                onCancel() {
                  console.log('Cancel');
                },
                okType:'danger'
              });
        }else{
            openOldConversationController(i)
        }
    }
    const deleteConversation = (i)=>{
        Modal.confirm({
            title: 'Are you sure you want to delete this conversation?',
            icon: <ExclamationCircleFilled />,
            onOk() {
              setState(prev=>{
                let olds = prev.previousConversations.filter((each,eachi) =>eachi !== i)
                return {...prev, previousConversations: olds}
              })
            },
            onCancel() {
              console.log('Cancel');
            },
            okType:'danger'
          });
    }
    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setState(prev=>{
          let changedConvs = prev.previousConversations.map((eachValue, eachi)=>{
            if(eachi === editModal.index){
              return {...eachValue,name : modalInput}
            }else{
              return eachValue
            }
          })

          console.log(editModal)
          console.log(changedConvs)
          return {...prev, previousConversations: changedConvs}
        })
        setEditModal(prev=>{return {...prev, isOpen:false, text: '', index: -1}});
      };
    
      const handleCancel = () => {
        setEditModal(prev=>{return {...prev, isOpen:false, text: '', index: -1}});
      };
      const openEditModal = (i)=>{
        let conv = state.previousConversations.filter((each, eachi) => eachi === i)
        conv = conv[0]
        setEditModal(prev=>{return {...prev, isOpen: true, text: conv.name, index: i}})
      }
    return <div style={{ background: "#202123" }} className="navigation">
        <div className="topnav">
            <Tooltip placement="right" title={"Create new session and delete current unsaved conversation"} ><Button onClick={newChatHandle} disabled={state.conversation.data.length === 0} className={state.conversation.data.length === 0 ? "disabled":''} style={{border: '1px solid #dedede',color:"#fff"}} >New Chat</Button></Tooltip>
            <Tooltip placement="right" title={state.conversation.data.length === 0 ? "Please have some conversation to save" : ""}><Button onClick={state.conversation.data.length === 0 ? ()=>{}:saveConversation} disabled={state.conversation.data.length === 0} className={state.conversation.data.length === 0 ? "disabled":''} style={{border: '1px solid #dedede',color:"#fff"}}>Save Chat</Button></Tooltip>
            <button onClick={()=>setIsModalOpen(true)}><InfoCircleOutlined /></button>
        </div>
        <div>
            <div style={{ padding: "10px", fontSize: '14px', textAlign:"center" }}>Previous conversations</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "10px", alignItems:"center" }}>
                {state.previousConversations.map((eachPrev, eachIndex) => {
                    return <EachConversation eachIndex={eachIndex} eachPrev={eachPrev} openOldConversation={openOldConversation}  deleteConversation={deleteConversation} openEditModal={openEditModal}/>
                })}
            </div>
        </div>
        <Modal open={editModal.isOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Typography.Title level={4}> Edit Conversation</Typography.Title>
                <Input value={modalInput}  onChange={(e)=>setModalInput(e.target.value)} placeholder={editModal.text} onKeyUp={(e)=>{
                  console.log(e.keyCode)
                  if(e.keyCode === 13){
                    handleOk()
                  }
                }} />
                <br />
                <br />
                <div style={{display:"flex", justifyContent:"end"}}><Button danger style={{margin: '0 10px'}} onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleOk} >Update</Button>
                </div>
        </Modal>    
    </div>
}
export default Navigation