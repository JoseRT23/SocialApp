import React from 'react'
import './Online.css'

const Online = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (    
        <li className="rightbarFriend">
            <div className="rightbarProfileImageContainer">
                <img src={user?.profilePicture 
                          ? PF+user?.profilePicture
                          : PF+"person/noAvatar.png"}
                     className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user?.username}</span>
        </li>
  )
}

export default Online