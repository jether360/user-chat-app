import { createContext, useEffect, useReducer, useState } from 'react'
import { authentication } from '../app/stores/commonStore'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth";


export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const [user, loading, error] = useAuthState(authentication);
    const user_uid = user?.uid;
    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    }

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId:
                            user_uid > action.payload.uid
                            ? user_uid +action.payload.uid :
                            action.payload.uid + user_uid,
                };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer,INITIAL_STATE)

    return (
        <ChatContext.Provider value={{data:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}