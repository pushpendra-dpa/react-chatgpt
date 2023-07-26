import "./chats.css"
import UserSVG from "./assets/user.svg"
import ServerSVG from "./assets/server.svg"
import PasteSVG from "./assets/paste.svg"
import LikeSVG from "./assets/like.svg"
import DislikeSVG from "./assets/dislike.svg"
const EachChat = ({ eachChat }) => {
    return <div className={(eachChat.type == 1 ? "type1" : "type2") + " eachConversation"} style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "50%", display: "flex", justifyContent: "space-between" }}>

            <div className="chat-content"><div><img src={eachChat.type == 1 ? UserSVG : ServerSVG} width={"24px"} /></div>
                {eachChat.type == 1 ? "User" : "Robot"} conversation
            </div>
            <div className="chat-actions">
                <button className="btn"><img src={PasteSVG} width={"16px"} className="pst-btn" /></button>

                <button className="btn"><img src={LikeSVG} width={"16px"} className="like-btn" /></button>
                <button className="btn"><img src={DislikeSVG} width={"16px"} className="dislike-btn" /></button>
            </div>




        </div>
    </div>
}
const Chats = () => {
    const chats = [
        { type: 1 },
        { type: 2 },
        { type: 1 },
        { type: 2 },
        { type: 1 },
        { type: 2 },
        { type: 1 },
        { type: 2 },
        { type: 1 },
        { type: 2 },
        { type: 1 },
        { type: 2 },
        { type: 1 },
        { type: 2 },
        { type: 2 },
        { type: 1 },
        { type: 2 },
        { type: 1 },
        { type: 2 },
    ]
    return <div >
        <div className="conversations" style={{ height: "calc(100vh)", overflowY: "scroll", paddingBottom: "75px" }}>
            {chats.map((eachChat, eachIndex) => {
                return <EachChat eachChat={eachChat} key={eachIndex} />
            })}
        </div>
    </div>
}
export default Chats