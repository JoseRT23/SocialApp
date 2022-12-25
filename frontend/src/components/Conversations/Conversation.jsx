import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Conversation.css'

const Conversation = ({conversation, currentUser}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState('');

  useEffect(() => {
    const friendId = conversation.members.find((f) => f !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${friendId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  }, [conversation, currentUser]);

  return (
    <>
      <div className="conversation">
        <img className='conversationImg' src={ user?.profilePicture
                                              ? PF + user?.profilePicture
                                              : PF + "person/noAvatar.png" }  />
        <span className="conversationName">{user?.username}</span>
      </div>
    </>
  )
}

export default Conversation