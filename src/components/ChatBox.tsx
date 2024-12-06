"use client";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import EmojiClickData from "@emoji-mart/react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import icon from "../../public/ai-logo.png";
import ai from "../../public/ai-icon.png";
import smily from "../../public/emoji-pink.png";
import msg from "../../public/send-msg.png";
import { Move } from "lucide-react";
import down from "../../public/down-icon.png";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { handleChatBot, testchatBot } from "@/app/redux/slice/chatbotSlice";
import Avatar from "../../public/bot-avatar-icon-chat.png";
import { useRouter } from "next/navigation";
import link from "../../public/pvt-space-two.png";

interface EmojiObject {
  native: string;
}

interface ChatBot {
  auth: string | null;
  question: string;
  ids: string;
}

interface ChatMessage {
  sender: string | "bot";
  message: string;
  properties: Property[];
}

interface Property {
  _id: string;
  location: {
    city_address: string;
  };
  images: {
    path: string;
  }[];
}

export default function ChatBox() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.chatbot);
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { sender: "bot", message: "Hi, How can I help you?", properties: [] },
  ]);
  const chatboxRef = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });
  // console.log("user", user);
  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };
  // console.log("user")
  const handleMouseDown = (e: React.MouseEvent) => {
    if (chatboxRef.current) {
      setIsDragging(true);
      const rect = chatboxRef.current.getBoundingClientRect();
      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && chatboxRef.current) {
      const maxX = window.innerWidth - chatboxRef.current.offsetWidth;
      const maxY = window.innerHeight - chatboxRef.current.offsetHeight;
      let newX = e.clientX - offset.current.x;
      let newY = e.clientY - offset.current.y;
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
      chatboxRef.current.style.left = `${newX}px`;
      chatboxRef.current.style.top = `${newY}px`;
      chatboxRef.current.style.bottom = "auto";
      chatboxRef.current.style.right = "auto";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const addEmoji = (emoji: EmojiObject) => {
    setMessage(message + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    setChatHistory((prev) => [
      ...prev,
      { sender: "user", message, properties: [] },
    ]);
    try {
      const data: ChatBot = {
        auth: token ? token : null,
        question: message,
        ids: "asdfasdsdfasddsd",
      };
      const response = await dispatch(handleChatBot(data));
      console.log("response", response);
      // Add the bot's response to chat history
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          message: response?.payload?.response || "Sorry, no response.",
          properties: response?.payload?.property_details,
        },
      ]);
      setMessage("");
    } catch (error) {
      console.log("error", error);
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          message: "An error occurred. Please try again.",
          properties: [],
        },
      ]);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="relative ">
      <button onClick={toggleChatbox} className="fixed bottom-8 right-8">
        <Image src={ai} alt="" />
      </button>

      {isOpen && (
        <div
          ref={chatboxRef}
          className="fixed bottom-20 md:right-5 right-0 md:w-96 w-full bg-white rounded-2xl shadow-lg overflow-hidden"
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          <div
            className="bg-[#FDE6F4] border-b border-[#F796D0] p-4 rounded-t-2xl flex items-center justify-between"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center">
              <Image src={icon} alt="" />
            </div>
            <div className="flex items-center gap-2">
              <button className="cursor-pointer" onClick={toggleChatbox}>
                <Image src={down} alt="" />
              </button>

              <Move className="text-[#201D1F] cursor-grab" />
            </div>
          </div>
          {/* chat bot */}
          <div className="p-5 space-y-4 max-h-96 overflow-y-auto custom-scrollbar relative">
            {chatHistory?.map((chat, index) => (
              <div
                key={index}
                className={`flex flex-col items-start relative ${
                  chat.sender === "user" ? "items-end" : ""
                }`}
              >
                {/* Bot's Avatar */}
                {chat.sender === "bot" && (
                  <Image
                    src="/Boat-icon-chat.png"
                    alt="Bot Avatar"
                    width={30}
                    height={30}
                    className="rounded-full absolute"
                  />
                )}

                {/* Message Bubble */}
                <div
                  className={`ml-10 mr-10 py-2 px-3 rounded-lg ${
                    chat.sender === "user"
                      ? "bg-[#443F6D] rounded-tr-none"
                      : "bg-[#EF2BA0] rounded-tl-none"
                  } text-white max-w-[80%]`}
                >
                  {chat.message}
                </div>

                {/* User's Avatar */}
                {chat.sender === "user" && (
                  <Image
                    src={
                      user &&
                      user.images &&
                      user.images[0] &&
                      user.images[0].path
                        ? `${process.env.NEXT_PUBLIC_API_URL}${user.images[0].path}`
                        : Avatar
                    }
                    alt="User Avatar"
                    width={30}
                    height={30}
                    className="rounded-full object-cover absolute"
                  />
                )}

                {/* Property Suggestions */}
                {chat.sender === "bot" && chat?.properties?.length > 0 && (
                  <div className="mt-4 space-y-2 w-full">
                    {chat?.properties?.map((property, propertyIndex) => (
                      <div
                        key={propertyIndex}
                        className="flex border p-1 rounded-md bg-white shadow-sm"
                      >
                        {/* Property Image */}
                        <Image
                          src={
                            property?.images?.[0]?.path
                              ? `${process.env.NEXT_PUBLIC_API_URL}${property.images[0].path}`
                              : link // Provide a default image path
                          }
                          alt={`Property ${propertyIndex}`}
                          width={52}
                          height={39}
                          className="object-contain"
                        />
                        {/* Property Details */}
                        <div className="text-black text-[12px] p-1">
                          <p>{property?.location?.city_address}</p>
                          <p
                            className="text-[#EF2BA0] cursor-pointer"
                            onClick={() =>
                              router.push(`/single-property/${property?._id}`)
                            }
                          >
                            View Property
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Typing animation when bot is loading */}
          {loading && (
            <div className="flex items-center ml-2 mr-2 py-2 px-3">
              <div className="dot-pulse">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          <div className="p-4 bg-white rounded-b-2xl flex items-center relative gap-2">
            <button
              className=""
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Image src={smily} alt="" width={30} height={30} />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              className="flex-1 py-2 px-5 rounded-full border border-[#EF2BA0] outline-none"
            />

            <button
              className="absolute right-6 top-1/2 transform -translate-y-1/2 "
              onClick={handleSendMessage}
            >
              <Image src={msg} alt="" width={20} height={20} />
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-full  right-0 mb-2 w-full m-auto flex justify-center items-center">
                <Picker data={data} onEmojiSelect={addEmoji} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
