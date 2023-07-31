import { Button, Modal, Tooltip, message } from "antd";
import "./navigation.css";
import { ExclamationCircleFilled, InfoCircleOutlined, MessageOutlined } from "@ant-design/icons";
const svg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>
const Navigation = ({state, setState, setIsModalOpen}) => {
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
    return <div style={{ background: "#202123" }} className="navigation">
        <div className="topnav">
            <button onClick={newChatHandle} disabled={state.conversation.data.length === 0} className={state.conversation.data.length === 0 ? "disabled":''} style={{border: '1px solid #dedede'}} >New Chat</button>
            <Tooltip placement="right" title={state.conversation.data.length === 0 ? "Please have some conversation to save" : ""}><button onClick={state.conversation.data.length === 0 ? ()=>{}:saveConversation} disabled={state.conversation.data.length === 0} className={state.conversation.data.length === 0 ? "disabled":''} style={{border: '1px solid #dedede'}}>Save Chat</button></Tooltip>
            <button onClick={()=>setIsModalOpen(true)}><InfoCircleOutlined /></button>
        </div>
        <div>
            <div style={{ padding: "10px", fontSize: '14px', textAlign:"center" }}>Previous conversations</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "10px", alignItems:"center" }}>
                {state.previousConversations.map((eachPrev, eachIndex) => {
                    return <button key={eachIndex} style={{ textAlign: "center", display: "flex", justifyContent: "center" }} onClick={()=>openOldConversation(eachIndex)}>
                        <div style={{margin: 'auto 0'}}>                        
                            <MessageOutlined />
                        </div>
                        {eachPrev.name}</button>
                })}
            </div>
        </div>
    </div>
}
export default Navigation