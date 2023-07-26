import "./prompt.css"
import MicSVG from "./assets/mic.svg"
import SendSVG from "./assets/send.svg"
const Prompt = ({ setState, state }) => {

    return <div className="main-prompt">
        <div>
            <input type="text" placeholder="Please Type here your prompt..." />
            <div className="mic" onClick={() => setState(prev => { return { ...prev, isNewSession: false } })}>
                <img src={SendSVG} width={"24px"} />
            </div>
            <div className="mic">
                <img src={MicSVG} width={"24px"} />
            </div>
        </div>
    </div>
}
export default Prompt;