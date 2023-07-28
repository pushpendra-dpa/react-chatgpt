import "./prompt.css"
import MicSVG from "./assets/mic.svg"
import SendSVG from "./assets/send.svg"
import { ReactMediaRecorder } from "react-media-recorder";
import React from 'react'
import axios from 'axios'


const Prompt = ({ setState, state }) => {

    const [TotalMessages, SetTotal] = React.useState([])

    function ConvertBlobToUrl(data) {
        const blob = new Blob([data], { type: "audio/mpeg" })
        const rachelblobUrl = window.URL.createObjectURL(blob)
        return rachelblobUrl
    }

    const handleStop = async (mediaBlobUrl) => {
        console.log(mediaBlobUrl)
        const myMessage = { "sender": "me", "audiobloburl": mediaBlobUrl }
        const collectionOfMessages = [...TotalMessages, myMessage]


        const response = await fetch(mediaBlobUrl)
        const raw_data = await response.blob()
        console.log(raw_data)

        const form = new FormData()

        form.append("file", raw_data, "myrecord.wav")

        const res = await axios.post("http://127.0.0.1:8000/post-audio", form,

            {

                headers: { "Content-Type": "audio/mpeg" },
                responseType: "arraybuffer"


            }

        )

        console.log(res)

        const binary_file = res.data
        const rachelUrl = ConvertBlobToUrl(binary_file)
        const rachelMessage = { sender: "rachel", audiobloburl: rachelUrl }
        collectionOfMessages.push(rachelMessage)

        console.log(collectionOfMessages)
        SetTotal(collectionOfMessages)

    }
    return <div className="main-prompt">
        <div>
            <input type="text" placeholder="Please Type here your prompt..." />
            <div className="mic" onClick={() => setState(prev => { return { ...prev, isNewSession: false } })}>
                <img src={SendSVG} width={"24px"} />
            </div>
            <div className="mic">
                <ReactMediaRecorder
                    audio
                    onStop={handleStop}
                    render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                        <div onMouseDown={startRecording} onMouseUp={stopRecording}>
                            <img src={MicSVG} width={"24px"} />
                        </div>
                    )}
                />
            </div>
        </div>
    </div>
}

export default Prompt;