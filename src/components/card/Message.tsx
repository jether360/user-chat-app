import React, { useContext }  from 'react'
import { authentication } from '../../app/stores/commonStore';
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatContext } from '../../context/ChatContext';



const Message = ({message}:any) => {
    const [user, loading, error] = useAuthState(authentication);
    const {data} = useContext(ChatContext);
return (
    <div className={`message ${message.senderId === user?.uid && "owner"}`}>
        <div className="messageInfo">
            <img alt='' src={message.senderId === user?.uid ? user?.photoURL : data.user.photoURL}/>
            <span>Just now</span>
        </div>
        <div className="messageContent">
            <p>{message.text}</p>
            {
                message.image && <img alt='' src={message.image}/>  
            }
        </div>
    </div>
)
}

export default Message;