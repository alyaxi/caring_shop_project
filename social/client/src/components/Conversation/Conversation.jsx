import React, { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../api/UserRequest";

const Conversation = ({ data, currentUserId, online, message }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) getUserData();
  }, []);

  return (
    <>
      <div className="follower conversation">
        {message ? (
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>{message}</span>
          </div>
        ) : (
          <div>
            {online && <div className="online-dot"></div>}
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
            <div className="name" style={{ fontSize: "0.8rem" }}>
              <span>
                {userData?.firstname} {userData?.lastname}
              </span>
              <span>{online ? "Online" : "Offline"}</span>
            </div>
          </div>
        )}
      </div>
      {!message && (
        <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
      )}
    </>
  );
};

export default Conversation;