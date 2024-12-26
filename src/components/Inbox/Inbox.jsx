import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useUser } from "../../context/UserContextProvider";
import { constants } from "../../utility/constants";
import { mentorMessages } from "../../lib/constants/data";
import { useSocket } from "../../context/SocketProvider";
import Chatbox from "../Chatbox/Chatbox";

export default function Inbox() {
  const location = useLocation();
  const { axiosPost, axiosGet } = useAxiosPrivate();
  const { decodeToken, isMentor } = useUser();
  const socket = useSocket();
  const userId = decodeToken(JSON.parse(localStorage.getItem("userToken"))).id;

  const [conversationList, setConversationList] = useState([]);
  const [currentConversation, setCurrentConversation] = useState([]);
  const [messageSend, setMessageSend] = useState(false);
  const [message, setMessage] = useState("");

  // console.log("current conversation: ", currentConversation);
  console.log("conversation list: ", conversationList);

  useEffect(() => {
    socket.emit("addUser", userId);
    socket.on("getMessage", (data) => {
      // console.log("message received: ", data);

      setCurrentConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, data],
      }));
    });
  }, [socket]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        if (isMentor) {
          const response = await axiosGet(
            constants.GETPRODUCTCONVERSATION + userId,
          );

          // console.log("Is mentor call", response);
          setConversationList(response.conversationData);
          // console.log("URL", constants.GETPRODUCTCONVERSATION + userId);
        } else {
          const response = await axiosGet(
            constants.GETMENTORCONVERSATION + userId,
          );
          // console.log("URL", constants.GETMENTORCONVERSATION + userId);

          // console.log("Product call", response);
          setConversationList(response.conversationData);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchConversations();
  }, []);

  // useEffect(() => {
  //   console.log("conversation list: ", conversationList);
  // }, [conversationList]);

  // static data to remove
  const [currMentor, setCurrMentor] = useState(() => {
    if (location.state) {
      const filterMentor = mentorMessages.filter(
        (mentor) => mentor.mentorName === location.state.mentorName,
      );
      if (filterMentor.length > 0) {
        return filterMentor[0];
      }
    }
    return {
      mentorName: "",
      messages: [],
    };
  });

  const fetchMessages = async (convId) => {
    try {
      if (!convId) return;
      const response = await axiosGet(constants.GETMENTORMESSAGES + convId);
      // console.log("mentor messages: ", response);
      return response.messageData;
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message === "") return;
    try {
      setMessageSend(!messageSend);
      // console.log("sender id:", userId);
      //to check
      const response = await axiosPost(constants.SENDMESSAGE, {
        conversationId: currentConversation.conversationId,
        senderId: userId,
        message,
        receiverId: currentConversation.receiverId,
      });
      const msgs = await fetchMessages(currentConversation.conversationId);
      socket.emit("sendMessage", {
        senderId: userId,
        recieverId: currentConversation.receiverId,
        message,
        conversationId: currentConversation.conversationId,
      });

      setCurrentConversation({
        ...currentConversation,
        messages: msgs,
      });
      console.log("send message:", response);
      setMessage("");
      setMessageSend(!messageSend);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="my-32 flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
      <div
        className={`h-[600px] w-80 bg-accent/80 text-center ${currMentor !== "" ? "max-sm:hidden" : ""}`}
      >
        <div className="border-b-4 border-white/10 p-4 sm:p-8">
          <p className="text-4xl">Messages</p>
        </div>
        <div className="mentor-scroolbar h-[480px] overflow-y-scroll">
          <ul>
            {conversationList?.map((mentor, index) => (
              <li
                key={index}
                onClick={async () => {
                  const msgs = await fetchMessages(mentor.conversationId);
                  setCurrentConversation({
                    conversationId: mentor.conversationId,
                    mentorName: mentor.details.fullName,
                    receiverId: mentor.details.recieverId,
                    email: mentor.details.email,
                    messages: msgs, // change with on click call using conv id
                  });
                }}
              >
                <div className="my-2 border-b-4 border-white/10 p-4 hover:cursor-pointer">
                  <p className="text-lg font-semibold">
                    {mentor.details?.fullName}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={`h-[600px] w-full bg-accent sm:w-[600px] ${currentConversation ? "" : "max-sm:hidden"}`}
      >
        <div className="relative p-4 text-center">
          {currMentor.mentorName !== "" && (
            <button
              onClick={() => {
                setCurrMentor("");
              }}
              className="absolute left-5 sm:hidden"
            >
              Back
            </button>
          )}
          <p className="text-3xl">
            {currentConversation
              ? currentConversation.mentorName
              : "Select a mentor"}
          </p>
        </div>

        {/* CHATBOX */}
        <div className={`${currentConversation === "" ? "hidden" : ""}`}>
          <Chatbox
            handleSubmit={handleSubmit}
            setMessage={setMessage}
            message={message}
            currentConversation={currentConversation}
            userId={userId}
          />
        </div>
      </div>
    </section>
  );
}
