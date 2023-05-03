import React from "react";
import { Card } from "antd";
import Sidebar from "./Sidebar";
import Chat from "./Chat";

const ChatCard = () => {
return (
    <>
        <div className="chat-card">
            <div className="container">
                <Sidebar/>
                <Chat/>
            </div>
        </div>
    </>
);
};

export default ChatCard;
