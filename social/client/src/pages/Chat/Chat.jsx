import React, { useRef } from "react";
import "./Chat.css";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import NavIcons from "../../components/NavIcons/NavIcons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { userChats } from "../../api/ChatRequests";
import Conversation from "../../components/Conversation/Conversation";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import UserList from "../../components/ChatBox/UserList";

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const socket = useRef();

  //send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("http://13.212.97.43:8100");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);
  // recieve message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      console.log("Data Received in parent Chat.jsx", data);
      setRecieveMessage(data);
    });
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <>
      <div className="Chat">
        {/* Left Side */}
        <div className="Left-side-chat">
          <LogoSearch />
          <div className="Chat-container">
            <h2>Chats</h2>
            <div>
              {chats.map((chat) => (
                <div onClick={() => setCurrentChat(chat)}>
                  <Conversation
                    data={chat}
                    currentUserId={user._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))}
              {chats.length > 0 && (
                <div onClick={() => setShowModal(true)}>
                  <Conversation
                    data={{ members: [] }}
                    message="Start new conversation"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="Right-side-chat">
          <div style={{ width: "20rem", alignSelf: "flex-end" }}>
            <NavIcons />
          </div>
          <ChatBox
            chat={currentChat}
            setChats={setChats}
            currentUser={user._id}
            setSendMessage={setSendMessage}
            recieveMessage={recieveMessage}
          />
        </div>
      </div>
      {showModal && (
        <UserList
          visible
          onClose={() => setShowModal(false)}
          onFinish={setChats}
        />
      )}
    </>
  );
};

export default Chat;
