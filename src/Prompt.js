import "./prompt.css"
import MicSVG from "./assets/mic.svg"
import SendSVG from "./assets/send.svg"
import { Tooltip, message } from "antd/es"
import { ReactMediaRecorder } from "react-media-recorder"
import { useState } from "react"
const Prompt = ({ setState, state, getChatGPTAnswer, onStop }) => {
    const [text, setText] = useState('')
    /*
    
    */
   const onTextAsk = ()=>{
    if(text.length > 0){
        setState(prev=>{
            return {...prev, conversation: {...prev.conversation, data: [...prev.conversation.data, {type: 1, content: text}]}}
          })
        getChatGPTAnswer(text)
        setText('')

    }else{
        message.info("Please type something")
    }
    

   }
   const onRecordStop = (blobURL, blob)=>{
    onStop(blobURL, blob)
   }
    return <div className="main-prompt">
        <div>
            <input type="text" onChange={e=>setText(e.target.value)} value={text} placeholder="Please Type here your prompt..." />
            <div className="mic" onClick={onTextAsk}>
                <div   >              
                    <img src={SendSVG} width={"24px"} />
                </div>
            </div>
            <div className="mic">
                <div>
                <ReactMediaRecorder
                    audio
                    onStop={onRecordStop}
                    render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                        <div onMouseDown={startRecording} onMouseUp={stopRecording}>
                            <Tooltip title={status}>                    
                                <img src={MicSVG} width={"24px"} />
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