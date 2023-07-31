import "./prompt.css"
import MicSVG from "./assets/mic.svg"
import SendSVG from "./assets/send.svg"
import { Spin, Tooltip, message } from "antd/es"
import { ReactMediaRecorder } from "react-media-recorder"
import { useState } from "react"
import { LoadingOutlined } from "@ant-design/icons"
const Prompt = ({ setState, state, getChatGPTAnswer, onStop }) => {
    const [text, setText] = useState('')
    const [isLoading, setIsLoading] = useState({isText: false, isMic: false})
    /*
    
    */
   const onTextAsk = async ()=>{
    if(text.length > 0){
        console.log("BEFORE")
        setIsLoading(prev=>{
            return {...prev, isText: true, isMic: true}
        })
        setState(prev=>{
            return {...prev, conversation: {...prev.conversation, data: [...prev.conversation.data, {type: 1, content: text}]}}
          })

        setText('')
        await getChatGPTAnswer(text)
        setIsLoading(prev=>{
            return {...prev, isText: false, isMic: false}
        })
        console.log("AFTER")

    }else{
        message.info("Please type something")
    }
    

   }
   const onRecordStop = (blobURL, blob)=>{
    onStop(blobURL, blob)
   }
   const onEnterKey = (e)=>{
    if(e.keyCode === 13){
        onTextAsk()
    }
   }
    return <div className="main-prompt">
        <div>
            <input type="text" disabled={isLoading.isMic || isLoading.isText} onKeyUp={onEnterKey} onChange={e=>setText(e.target.value)} value={text} placeholder="Please Type here your prompt..." />
            <div className="mic" onClick={(isLoading.isMic || isLoading.isText) ? ()=>message.info("Please Wait prev Request is processing!") : onTextAsk}>
                <div   >              
                    {isLoading.isText ? <LoadingOutlined style={{ fontSize: 24 }} spin /> : <img src={SendSVG} width={"24px"} />}
                </div>
            </div>
            <div className="mic">
                <div>
                <ReactMediaRecorder
                    audio
                    onStop={onRecordStop}
                    render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                        <div onMouseDown={startRecording} onMouseUp={ stopRecording }>
                            <Tooltip title={status}>         
                            {isLoading.isText ? <LoadingOutlined style={{ fontSize: 24 }} spin /> :  <img src={MicSVG} width={"24px"} /> }
                               
                            </Tooltip>

                        </div>
                    )}
                    />
                    
                </div>
            </div>
        </div>
    </div>
}
export default Prompt;