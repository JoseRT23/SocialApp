import React, { useContext, useEffect, useRef, useState } from 'react'
import './Messenger.css'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Conversation from '../../components/Conversations/Conversation'
import Message from '../../components/Message/Message'
import ChatOnline from '../../components/ChatOnline/ChatOnline'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import {io} from 'socket.io-client'

const Messenger = () => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();
  
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    //Obtener mensaje con soket io
    socket.current.on("getMessage", data => {
        setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now()
        });
    });
  }, []);

  //verificar de que chat llega el mensaje
  useEffect(() => {
    arrivalMessage && 
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  
  //encontrar usuario en linea
  useEffect(() => {
    let isMounted = true;
    socket.current.emit('addUser', user._id);
    socket.current.on('getUsers', users => {
        if(isMounted) {
            setOnlineUsers(user.followings.filter((f) => users.some((u) => u.userId === f)));
        }
    });

    return () => {
        isMounted = false;
    };

  }, [user]);

  useEffect(() => {
    const conversations = async () => {
        try {
            const res = await axios.get(`/conversations/${user._id}`);
            setConversations(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    conversations();
  }, [user._id]);
  
  useEffect(() => {
    const getMessages = async () => {
        try {
            const res = await axios.get(`/messages/${currentChat?._id}`);
            setMessages(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
      e.preventDefault();
    const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id
    }

    //enviar mensaje con socket io
    const receiverId = currentChat.members.find((member) => member !== user._id);
    socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage
    });    

    try {
        const res = await axios.post(`/messages`, message);
        setMessages([...messages, res.data]);
        setNewMessage("");
        
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth"})
  }, [messages])
  
 
  return (
      <>
        <Navbar />
        <div className='messenger'>
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input type="text" className='chatMenuInput' placeholder='Buscar amigos' />
                    {conversations.map(c => (
                        <div key={c._id} onClick={() => setCurrentChat(c)}>
                            <Conversation conversation={c} currentUser={user} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    { currentChat ? (
                        <>
                            <div className="chatBoxTop">
                                {messages.map(m => (
                                    <div  key={m._id} ref={scrollRef}>
                                        <Message message={m} own={m.sender === user._id} />
                                    </div>
                                ))}
                            </div>
                            <div className="chatBoxBottom">
                                <textarea className='chatMessageInput' 
                                          placeholder='Mensaje'
                                          onChange={(e) => setNewMessage(e.target.value)}
                                          value={newMessage}>                                          
                                </textarea>
                                <button className='chatSubmitButton'
                                        onClick={handleSubmit}>
                                    Enviar
                                </button>
                            </div>
                        </> 
                    ) : (
                        <span className='noConversationText'>
                            Abre una conversación para iniciar un chat
                        </span>
                    )}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline key={user._id}
                                onlineUsers={onlineUsers} 
                                currentUser={user._id} 
                                setCurrentChat={setCurrentChat} />
                </div>
            </div>
        </div>
      </>
  )
}

export default Messenger