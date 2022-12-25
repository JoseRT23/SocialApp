import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './ChatOnline.css'

const ChatOnline = ({ onlineUsers, currentUser, setCurrentChat }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get(`/users/friends/${currentUser}`);
            setFriends(res.data);
        }
        getFriends();
    }, [currentUser]);

    useEffect(() => {
        setOnlineFriends(friends.filter(f => onlineUsers.includes(f._id)));
    }, [friends, onlineUsers]);

    const handleClick = async (user) => {
        try {
            const res = await axios.get(`/conversations/find/${currentUser}/${user._id}`);
            setCurrentChat(res.data);
        } catch (error) {
            console.log(error)
        }
    }
    

  return (
        <>
            <div className="chatOnline">
                {onlineFriends.map((o) => (
                    <div className="chatOnlineFriend" onClick={()=>{handleClick(o)}}>
                        <div className="chatOnlineImgContainer">
                            <img className='chatOnlineImg' 
                                 src={o?.profilePicture
                                      ? PF + o?.profilePicture
                                      : PF + "person/noAvatar.png"}  
                            />
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineName">{o?.username}</span>
                    </div>
                ))}
            </div>
        </>
  )
}

export default ChatOnline