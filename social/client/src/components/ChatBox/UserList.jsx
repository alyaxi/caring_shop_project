import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { useSelector } from "react-redux";
import { createChat, userChats } from "../../api/ChatRequests";
import { getAllUser } from "../../api/UserRequest";

const UserList = ({ visible, onClose, onFinish, chats = [] }) => {
  const theme = useMantineTheme();
  const auth = useSelector((state) => state.authReducer.authData);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getAllUser();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const onMessage = (otherUser) =>
    createChat({
      senderId: auth.user._id,
      receiverId: otherUser._id,
    }).then(() =>
      userChats(auth.user._id).then((res) => {
        onFinish(res.data);
        onClose();
      })
    );

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="65%"
      opened={visible}
      onClose={onClose}
      overflow="inside"
    >
      <div className="d-flex flex-column user-list">
        {users.filter(
          (user) => user._id !== auth.user._id && chats.indexOf(user._id) === -1
        ).length > 0 ? (
          users
            .filter(
              (user) =>
                user._id !== auth.user._id && chats.indexOf(user._id) === -1
            )
            .map((user, index) => (
              <div
                key={user._id}
                className={`user-list-item ${
                  index !== users.length - 1 ? "border-bottom-1-grey" : ""
                }`}
              >
                <div className="d-flex align-items-center" style={{ gap: 10 }}>
                  <img
                    src={
                      user?.profilePicture
                        ? `${process.env.REACT_APP_PUBLIC_FOLDER}${user.profilePicture}`
                        : `${process.env.REACT_APP_PUBLIC_FOLDER}defaultProfile.jpg`
                    }
                    alt="profile"
                    className="followerImage"
                  ></img>
                  <div className="name">
                    <span>
                      {user.firstname} {user.lastname}
                    </span>
                    <span>{user.username}</span>
                  </div>
                </div>
                <div>
                  <button
                    className="icon-button"
                    onClick={() => onMessage(user)}
                  >
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHwSURBVHgB7VYxS8NQEL5LI4KDRAdxfGAKIkY6OqaLtE79B+ovkI5OTTdH/QXq5KiTLTiYf2CxVQRT6OygHRU05730pTatSlKiIPoNefeOy/vu3nv37hAGIIRt6NNT20Bk89SGcYDQIKL9drN+GFUrmMsFmxAPWCEgBRBAh4dyu1k77ROZK+sVjsJRFi5/ql6r7sIYyFqFTR+w0ncY0fGuzqqYXVrPUYYueyQBgQMpgHfIYZKKWjefmZ03j0Gyp0gi8XDvuTNz2RlEWGVCoYE69Bf9aQ9Sxqs+6Sgxp4XKTsPtQsroNE7DNQ0Nfgh/jEjml2kVKcizhLpERO9JrMYkuoRE1ciYRDcElCFLwWvWEL4B4fr/1/t3EAXvkSx8kDLEYkEosavxldyXkqyuC9ZaCVKCdDwzgRfB2gRHKHIlQ/efL7iy5gILrvksj7zk+PpSvrs5bwx7rE/gwbAtIQgkVWG5YnutWn6wZ3A4qo0vegaXcy0f8doqSo/tT+y7crfCYjqSpEFp13wjokQ84a/B1mXvqhYUyLDPCJsQJOrvAvpa9+7mLBJ9rNdgwSqW2PBE/VEm0B6R/EM5JaCt4dbqI2QgBh7vvdvZORM5MpunBQTqXRp+29qteqwWIBaRhGw2JBmfowi2wYcd77q+G/f/NymA2hfSakBxAAAAAElFTkSuQmCC"
                      alt=""
                    ></img>
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p style={{ textAlign: "center" }}>No users found</p>
        )}
      </div>
    </Modal>
  );
};
export default UserList;
