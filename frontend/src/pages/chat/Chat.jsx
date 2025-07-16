import React, { useState } from "react";
import ChatBox from "../../components/Chat/ChatBox";
import ChatList from "../../components/Chat/ChatList";

const Chat = ({
  name,
  chat,
  setChat,
  chats,
  setChats,
  messages,
  setMessages,
}) => {

  return (
    name && (
      <div className="chat grid overlay">
        <ChatList
          setChat={setChat}
          setMessages={setMessages}
          chats={chats}
          setChats={setChats}
          name={name}
        />
        <ChatBox
          chat={chat}
          messages={messages}
          setMessages={setMessages}
          name={name}
        />
      </div>
    )
  );
};

export default Chat;
