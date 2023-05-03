import React, { useState, useEffect, useContext } from 'react'
import {
  FileImageOutlined,
  FileAddOutlined
} from '@ant-design/icons';
import { authentication } from '../../app/stores/commonStore';
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatContext } from '../../context/ChatContext';
import { db } from "../../app/stores/commonStore";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import {v4 as uuid} from 'uuid';


const Input = () => {
  const [text, setText] = useState("")

  const [user, loading, error] = useAuthState(authentication);
  const { data } = useContext(ChatContext);

  const user_uid:any = user?.uid;
  
  const handleSend = async () => {
      await updateDoc(doc(db,"chats", data.chatId),{
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user?.uid,
          date: Timestamp.now()
        })
      })

      await updateDoc(doc(db,"userChats", user_uid),{
        [data.chatId+".lastMessage"]:{
          text,
        },
        [data.chatId+".date"]:serverTimestamp(),
      })

      await updateDoc(doc(db,"userChats", data.user.uid),{
        [data.chatId+".lastMessage"]:{
          text,
        },
        [data.chatId+".date"]:serverTimestamp(),
      })
    
    setText("")
  }

  return (
    <div className='input'>
      <input type='text' placeholder='Type message...' onChange={(e: any) => {
        setText(e.target.value);
      }} 
      value={text}
      
      />
      <div className="send">
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input;