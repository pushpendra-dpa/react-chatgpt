import "./chats.css"
import UserSVG from "./assets/user.svg"
import ServerSVG from "./assets/server.svg"
import PasteSVG from "./assets/paste.svg"
import LikeSVG from "./assets/like.svg"
import DislikeSVG from "./assets/dislike.svg"
import { Tooltip } from "antd"
import { useEffect, useState } from "react"
const EachChat = ({ eachChat }) => {
    const [copyState, setCopyState] = useState(false)
    const copyContent = async (text) => {
        try {
          await navigator.clipboard.writeText(text);
          console.log('Content copied to clipboard');
          setCopyState(true)
          setTimeout(()=>{
            setCopyState(false)
          },3000)
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      }
      
    const AudioJSX = (url, content)=>{
        
        return (<div>{url ? <audio src={localStorage.getItem(url) ? localStorage.getItem(url) : url} width={500} height={500} controls /> : ''}</div>)
    }
    return <div className={(eachChat.role == "user" ? "type1" : "type2") + " eachConversation"} style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "50%", display: "flex", justifyContent: "space-between" }}>

            <div className="chat-content"><div><img src={eachChat.role == "user" ? UserSVG : ServerSVG} width={"24px"} style={{minWidth:'24px'}} /></div>
            <div style={{display:"flex", flexDirection:"column"}}>
                <div>{eachChat.content}</div> <br /> {eachChat.contentType === 'audio' ?  AudioJSX(eachChat.url, eachChat.content) : ''}   
            </div>
            </div>
        {eachChat.role == "assistant" ?             <div className="chat-actions">
                <Tooltip title={copyState ? "✅ Response Copied!":"Paste"}><button onClick={()=>copyContent(eachChat.content)} className="btn"><img src={PasteSVG} width={"16px"} className="pst-btn" /></button></Tooltip>

                <Tooltip title="Like"><button className="btn"><img src={LikeSVG} width={"16px"} className="like-btn" /></button></Tooltip>
                <Tooltip title="Dislike"><button className="btn"><img src={DislikeSVG} width={"16px"} className="dislike-btn" /></button></Tooltip>
            </div> 
        :
        ''
        }




        </div>
    </div>
}
const Chats = ({content}) => {
    
    return <div >
        <div className="conversations" style={{ height: "calc(100vh)", overflowY: "scroll", paddingBottom: "75px" }}>
            { content && content.map((eachChat, eachIndex) => {
                return <EachChat eachChat={eachChat} key={eachIndex} />
            })}
        </div>
    </div>
}
export default Chats