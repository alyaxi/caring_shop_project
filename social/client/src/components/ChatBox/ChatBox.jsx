import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { addMessage, getMessages } from "../../api/MessageRequest";
import { getUser } from "../../api/UserRequest";
import "./ChatBox.css";
import { format } from "timeago.js";
import UserList from "./UserList";
import InputEmoji from "react-input-emoji";

const ChatBox = ({
  chat,
  currentUser,
  setSendMessage,
  recieveMessage,
  setChats,
}) => {
  const [userData, setUserData] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const scroll = useRef();
  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);

        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  //fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        //console.log(data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (newMessage) => {
    //console.log('message ',newMessage.target.value)
    setNewMessage(newMessage.target.value);
  };
  // send message to database
  const handleSend = async () => {
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    // console.log('This is Message',message)

    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
    //send message to socket server
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };
  // Always scroll to last message
  useEffect(() => {
    return scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.png"
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chatbox Messages*/}
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji
                placeholder={newMessage ? null : "Enter your message"}
                value={newMessage}
                onChange={setNewMessage}
                height={25}
                cleanOnEnter
                onEnter={handleSend}
              />
              {/* <input
                placeholder="Enter your message"
                type={"text"}
                value={newMessage}
                onKeyPress={(event) => {
                  if (event.key === "Enter") handleSend(event);
                }}
                // onChange={setNewMessage}
                onChange={(evt) => handleChange(evt)}
                // onEnter={handleChange}
              /> */}
              {/* <InputEmoji
            placeholder="Enter your message"
      value={newMessage}
      onChange={setNewMessage}
      cleanOnEnter
      onEnter={handleChange}
    /> */}
              <button
                disabled={!newMessage}
                style={{ height: "70%", padding: "0px 15px 0px 15px" }}
                className="send-button button"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="d-flex align-items-center justify-content-center flex-column chat-empty-con">
            <span className="chatbox-empty-message">
              Tap the button below to start a new chat.
            </span>
            <button className="iconButton" onClick={() => setShowModal(true)}>
              <i className="fas fa-plus-circle fa-2x" />
            </button>
          </div>
        )}
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

export default ChatBox;
