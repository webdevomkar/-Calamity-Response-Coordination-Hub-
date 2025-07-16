const ENDPOINT = "/api";
import axios from "axios";
import socket from "./socket";
 

const getChatList = async (name, setChats) => {
  try {
    if (name) {
      const res = await axios.get(ENDPOINT + "/chat/chats", {
        withCredentials: true,
      });

      // const chats = res.data.map((chat) => {
      //   if (!chat.isGroup) {
      //     const chatName = chat.members.find(
      //       (mem) => mem.username !== username
      //     ).username;
      //     return { chatName, ...chat };
      //   } else {
      //     return chat;
      //   }
      // });

      setChats(res.data);
    }
  } catch (error) {
    console.log(error);
  }
};

const getChat = async (chatId, setChat, setMessages) => {
  try {
    const messages = await axios.get(ENDPOINT + `/chat/${chatId}/messages`, {
      withCredentials: true,
    });

    let chat = await axios.get(ENDPOINT + `/chat/${chatId}`, {
      withCredentials: true,
    });
    setChat(chat.data);
    socket.emit("join-room", chatId);
    setMessages(messages.data.messages);
  } catch (error) {
    console.log(error);
  }
};

export { getChatList, getChat };
