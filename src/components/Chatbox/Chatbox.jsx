import React, { useEffect, useRef, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import { useUser } from "../../context/UserContextProvider";
import "./Chatbox.css";

const Chatbox = ({
  setMessage,
  handleSubmit,
  message,
  currentConversation,
}) => {
  const listRef = useRef(null);
  const { decodeToken } = useUser();
  const userId = decodeToken(JSON.parse(localStorage.getItem("userToken"))).id;

  const scrollToBottom = useCallback(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(
        currentConversation?.messages?.length - 1,
        "end",
      );
    }
  }, [currentConversation?.messages]);

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages, scrollToBottom]);

  const Row = ({ index, style }) => {
    const msg = currentConversation?.messages[index];
    const isUserMessage = msg.senderId === userId;

    // Debugging to check senderId and userId
    // console.log('Message:', msg.message);
    // console.log('senderId:', msg.senderId, 'userId:', userId);
    // console.log('isUserMessage:', isUserMessage);

    return (
      <div
        style={{
          ...style,
          display: "flex",
          justifyContent: isUserMessage ? "flex-end" : "flex-start",
        }}
        key={index}
        className="p-4"
      >
        <div
          className={`rounded-lg p-2 ${isUserMessage ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
        >
          <p className="text-lg font-bold">{msg.sender}</p>
          <p>{msg.message}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="chatbox-container">
      {/* Virtualized message list */}
      <div className="messages-container">
        {currentConversation?.messages ? (
          <List
            height={300}
            itemCount={currentConversation.messages.length}
            itemSize={70}
            ref={listRef}
          >
            {Row}
          </List>
        ) : (
          <p>No messages available</p>
        )}
      </div>

      {/* Form for sending messages */}
      <form onSubmit={handleSubmit}>
        <div className="p-4">
          <textarea
            placeholder="Type your message here"
            className="w-full rounded-lg bg-white/5 p-3 text-white focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="mr-4 rounded border border-white bg-transparent p-2 px-6 py-2 font-semibold text-white transition hover:bg-gray-300 hover:text-black"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbox;
