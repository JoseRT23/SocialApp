import React, { useContext, useEffect, useRef, useState } from 'react'
import Feed from '../../components/Feed/Feed'
import Navbar from '../../components/Navbar/Navbar'
import Rightbar from '../../components/Rightbar/Rightbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import {io} from 'socket.io-client'
import { AuthContext } from '../../context/AuthContext'
import './Home.css'

const Home = () => {
  const { user } = useContext(AuthContext);
  const socket = useRef();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    let abortController = new AbortController();
    socket.current = io("ws://localhost:8900");
    return () => {  
      abortController.abort();  
    } 
  }, []);

  useEffect(() => {
    let isMounted = true;
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", users => {
      if (isMounted) {
        setOnlineUsers(user.followings.filter((f) => users.some((u) => u.userId === f)));
      }
    });

    return () => {
      isMounted = false;
    };

  }, [user]);

  return (
    <>
      <Navbar />
      <div className="homeContainer">
        {/* <Sidebar /> */}
        <Feed />
        {/* <Rightbar onlineUsers={onlineUsers} /> */}
      </div>
    </>
  )
}

export default Home