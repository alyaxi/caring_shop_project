import React, { useEffect, useState, useRef } from "react";
import { Button, Modal } from "@mantine/core";
import { Menu, MenuItem } from "@szhsin/react-menu";
import InputEmoji from "react-input-emoji";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const Comment = ({
  userId,
  comment,
  firstname,
  lastname,
  profilePicture,
  user,
  onEdit,
  onDelete,
}) => {
  const emojiRef = useRef();
  const [com, setCom] = useState("");
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (emojiRef.current) {
        emojiRef.current.value = comment;
      }
    }, 0);
  }, [isEdit]);

  const handleEdit = () => {
    setEdit(false);
    onEdit(com);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center single-comment">
          <img
            src={`${process.env.REACT_APP_PUBLIC_FOLDER}${profilePicture}`}
            class="comment-image"
            alt="user-pic"
          />
          <div class="name">
            <span>
              {firstname} {lastname}
            </span>
            <span>{comment}</span>
          </div>
        </div>
        {userId === user._id && (
          <Menu
            menuButton={
              <div className="isClickable menu-button">
                <i className="fas fa-ellipsis-h"></i>
              </div>
            }
            direction="left"
            transition
          >
            <MenuItem className="font-slate" onClick={() => setEdit(true)}>
              <i className="fas fa-pen fa-sm" style={{ marginRight: 10 }}></i>
              Edit
            </MenuItem>
            <MenuItem className="font-red" onClick={onDelete}>
              <i
                className="fas fa-trash-alt fa-sm"
                style={{ marginRight: 10 }}
              ></i>
              Delete
            </MenuItem>
          </Menu>
        )}
      </div>
      <Modal opened={isEdit} onClose={() => setEdit(false)} centered>
        <InputEmoji
          ref={emojiRef}
          value={com}
          placeholder={com ? null : "Enter Comment"}
          onChange={setCom}
          height={25}
        />
        <div className="d-flex justify-content-end" style={{ marginTop: 20 }}>
          <Button onClick={handleEdit}>Update</Button>
        </div>
      </Modal>
    </>
  );
};

export default Comment;
