import React, { useState, useEffect,useContext } from 'react'
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../app/stores/commonStore";
import { authentication } from '../../app/stores/commonStore';
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatContext } from '../../context/ChatContext';

const Chats = () => {
    const [user, loading, error] = useAuthState(authentication);
    const {dispatch} = useContext(ChatContext);
    const [chats, setChats] = useState([])
    const user_uid: any = user?.uid;

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", user_uid), (doc: any) => {
                setChats(doc.data())
            });
            return () => {
                unsub()
            }
        }
        user_uid && getChats()
    }, [user_uid])

    const handleSelect = (u:any) =>{
        dispatch({type:"CHANGE_USER", payload:u})
    }
    
    return (
        <div className='chats'> 
            {Object.entries(chats)?.sort((a:any,b:any)=>b[1].date - a[1].date).map((chat:any, index) => {
                return (
                        <div className='userChat' key={chat[0]} onClick={()=>{
                            handleSelect(chat[1].userInfo)}
                        }>
                            <img alt='' src={chat[1].userInfo.image} />
                            <div className='userChatInfo'>
                                <span>{chat[1].userInfo.name}</span>
                                <p>{chat[1].lastMessage?.text}</p>
                            </div>
                        </div>
                )
            })}
        </div>
    )
}

export default Chats;