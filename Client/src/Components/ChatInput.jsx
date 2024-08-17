import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoSend } from "react-icons/io5";
import { BsEmojiSmileFill } from "react-icons/bs";
const ChatInput = ({ handleSendMessage }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [messages, setMessages] = useState("");

  const handleEmojiPicker = () => {
    setShowPicker(!showPicker);
  };
  const handleEmojis = (emoji) => {
    // console.log(emoji)
    let newMsg = messages;
    newMsg += emoji.emoji;
    setMessages(newMsg);
  };

  const sendChat = (e) => {
    e.preventDefault();
    handleSendMessage(messages);
    setMessages("");
  };
  return (
    <div className="">
          <form onSubmit={(e) => sendChat(e)}>
      <div className="d-flex align-items-center">
        <div className="mb-3 me-4">
          {showPicker && (
            <div style={{ position: "absolute", top: "80px", zIndex: "1" }}>
              <Picker onEmojiClick={handleEmojis} />
            </div>
          )}
        </div>
        <div className="input-group mb-2 ms-0" style={{ width: "100%" }}>
          <div className="input-group-prepend rounded-0">

            <span
              className="input-group-text rounded-0"
              style={{ backgroundColor: "white", height: "3rem" }}
              id="basic-addon1"
            >
              <BsEmojiSmileFill onClick={handleEmojiPicker} size={22} />
            </span>
          </div>
            <input
              type="text"
              className="form-control "
              placeholder="Type your message"
              aria-describedby="basic-addon2"
              value={messages}
              style={{ height: "3rem" }}
              onChange={(e) => setMessages(e.target.value)}
            />
            {messages.trim() !== "" && (
              <span className="input-group-text bg-info" id="basic-addon2">
                <button type="submit" className="btn btn-sm">
                  <IoSend color="white" size={22} />
                </button>
              </span>
            )}
        </div>
      </div>
          </form>
    </div>
  );
};

export default ChatInput;
