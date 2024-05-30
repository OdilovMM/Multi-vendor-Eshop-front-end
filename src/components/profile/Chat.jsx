import { AiOutlinePlus } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addFriendChat,
  messageClear,
  sendMessage,
  updateMessage,
} from "../../store/reducers/chatReducer";
import { API_BASE_URL } from "../../utils/backendUrl";
import { GrChatOption } from "react-icons/gr";
import toast from "react-hot-toast";

import io from "socket.io-client";
import { useRef } from "react";
const socket = io(API_BASE_URL);

const Chat = () => {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.customerAuth);
  const { currentFriend, successMessage, myFriends, friendMessages } =
    useSelector((state) => state.chat);
  const [message, setMessage] = useState("");
  const { sellerId } = useParams();
  const [incomingMessage, setIncomingMessage] = useState("");
  const [activeSeller, setActiveSeller] = useState([]);

  useEffect(() => {
    socket.emit("addUser", userInfo.id, userInfo);
  }, [userInfo]);

  useEffect(() => {
    dispatch(
      addFriendChat({
        sellerId: sellerId || "",
        userId: userInfo.id,
      })
    );
  }, [dispatch, sellerId, userInfo]);

  const handleSendMessage = () => {
    if (message) {
      dispatch(
        sendMessage({
          userId: userInfo.id,
          message,
          sellerId,
          name: userInfo.name,
        })
      );
      setMessage("");
    } else {
      toast.error("Enter your message");
      return;
    }
  };

  useEffect(() => {
    socket.on("sellerMessage", (msg) => {
      setIncomingMessage(msg);
    });
    socket.on("activeSeller", (sellers) => {
      setActiveSeller(sellers);
    });
  }, []);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "sendMessageCustomer",
        friendMessages[friendMessages.length - 1]
      );
      dispatch(messageClear());
    }
  }, [successMessage, dispatch, friendMessages]);

  useEffect(() => {
    if (incomingMessage) {
      if (
        sellerId === incomingMessage.senderId &&
        userInfo.id === incomingMessage.receiverId
      ) {
        dispatch(updateMessage(incomingMessage));
      } else {
        toast.success(incomingMessage.senderName + " " + "Send a message");
        dispatch(messageClear());
      }
    }
  }, [incomingMessage, dispatch, sellerId, userInfo]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [friendMessages]);

  return (
    <div className="bg-white p-3 sm:bg-slate-600 rounded-md">
      <div className="w-full flex sm:items-center ">
        <div className="w-[230px]">
          <div className="flex justify-start  gap-3 rounded-md items-center px-2 text-slate-600 text-xl h-[30px] my-2">
            <span>
              <GrChatOption size={24} />
            </span>
            <span>Message</span>
          </div>
          <ul className="w-full sm:w-[150px] flex flex-col items-start  justify-start text-slate-600 gap-1 h-[400px] pr-2 border-r right-2">
            {myFriends.map((friend, ind) => (
              <li
                key={ind}
                className="flex hover:bg-slate-300  flex-row justify-start items-center py-1 border-b bottom-1 w-full"
              >
                <Link
                  to={`/dashboard/chat/${friend.fdId}`}
                  className={`flex gap-2 flex-row active:bg-slate-300 justify-start items-center pl-2`}
                >
                  <div className="relative">
                    <div className="w-[35px] h-[35px] border-black relative">
                      <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                      <img
                        src={friend.image}
                        alt=""
                        className=" object-cover rounded-full shadow-lg w-[35px] h-[35px]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span>{friend.name}</span>
                    <div>
                      {activeSeller.some((c) => c.sellerId === friend.fdId) ? (
                        <span className="text-[13px] text-blue-600 font-bold">
                          Online
                        </span>
                      ) : (
                        <span className="text-[13px] text-black font-bold">
                          Offline
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[calc(100%-230px)] ">
          {currentFriend ? (
            <div className="w-full h-full">
              <div className="flex justify-between  bg-slate-200 items-center text-slate-600 text-xl h-[40px] px-2">
                <span>{currentFriend.name}</span>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    {activeSeller.some(
                      (c) => c.sellerId === currentFriend.fdId
                    ) ? (
                      <span className="text-[13px] text-blue-600 font-bold">
                        Online
                      </span>
                    ) : (
                      <span className="text-[13px] text-black font-bold">
                        Offline
                      </span>
                    )}
                  </div>
                  <div className="w-[38px] h-[38px]  border-black relative">
                    <img
                      src={currentFriend.image}
                      className=" object-cover sm:hidden rounded-full shadow-lg w-[38px] h-[38px]"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="h-[400px] w-full bg-slate-100 py-3 rounded-md">
                <div className="w-full h-full overflow-y-auto flex flex-col gap-3">
                  {friendMessages?.map((m, i) => {
                    if (currentFriend?.fdId !== m.receiverId) {
                      return (
                        <div
                          ref={scrollRef}
                          key={i}
                          className="w-full flex gap-2 justify-start items-center text-[14px]"
                        >
                          <img
                            className="w-[30px] h-[30px] sm:hidden rounded-full "
                            src={currentFriend.image}
                            alt=""
                          />
                          <div className="flex justify-center items-start flex-col bg-blue-300 text-[#333]  px-2 rounded-tl-full rounded-tr-full rounded-br-full">
                            <span>{m?.message}</span>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          ref={scrollRef}
                          key={i}
                          className="w-full flex gap-2 justify-end items-center text-[14px]"
                        >
                          <div className="flex justify-center items-start flex-col bg-blue-300 text-[#333] px-2 rounded-tl-full rounded-bl-full rounded-tr-full ">
                            <span>{m?.message}</span>
                          </div>
                          {/* <img
                            className="w-[30px] h-[30px] "
                            src="http://localhost:3000/images/user.png"
                            alt=""
                          /> */}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="flex p-2 justify-between items-center w-full">
                <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full">
                  <label className="cursor-pointer" htmlFor="">
                    <AiOutlinePlus />
                  </label>
                  <input className="hidden" type="file" />
                </div>
                <div className="border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message"
                    className="w-full rounded-full h-full outline-none p-3"
                  />
                  <div className="text-2xl right-2 top-2 absolute cursor-auto">
                    <span>
                      <GrEmoji />
                    </span>
                  </div>
                </div>
                <div className="w-[40px] p-2 justify-center items-center rounded-full">
                  <button
                    onClick={handleSendMessage}
                    className="text-2xl cursor-pointer"
                  >
                    <IoSend />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center bg-slate-50">
              <span className="text-[16px]">Select a Seller</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
