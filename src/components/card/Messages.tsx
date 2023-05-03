import React,{useContext,useState, useEffect} from 'react'
import Message from './Message';
import { ChatContext } from '../../context/ChatContext';
import { db } from "../../app/stores/commonStore";
import { doc,onSnapshot } from "firebase/firestore";

const Messages = ()=> {
    const [messages, setMessages] = useState<null|any >([])
    const {data} = useContext(ChatContext);

    useEffect(()=>{
        const unsub = onSnapshot(doc(db,"chats", data.chatId),(doc:any)=>{
            doc.exists && setMessages(doc.data().messages)
        })

        return()=>{
            unsub()
        }
    },[data.chatId])


return (
    <div className='messages'>
        {messages.map((m:any, index:any)=>{
            return(
                <Message message={m} key={index}/>
            )
        })}
    </div>
)
}

export default Messages;