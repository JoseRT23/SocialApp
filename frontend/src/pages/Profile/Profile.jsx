import React, { useEffect, useState } from 'react'
import Feed from '../../components/Feed/Feed'
import Navbar from '../../components/Navbar/Navbar'
import Rightbar from '../../components/Rightbar/Rightbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Profile.css'
import axios from "axios";
import { useParams } from 'react-router-dom'

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  console.log('USUARIO', user)
  const params = useParams();

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(`/users?username=${params.username}`);
      setUser(res.data);
    };
    getUsers();
  }, [params.username]);

  return (
    <>
    <Navbar />
    <div className="profileContainer">
      <Sidebar />
      <div className="profileRight">
          <div className="profileRightTop">
              <div className="profileCover">
                <img className='profileCoverImg' src={user.coverPicture || PF+"person/noCover.png"} />
                <img className='profileUserImg' src={user.profilePicture || PF+"person/noAvatar.png"} />
              </div>
              <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.description}</span>
              </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={params.username} />
            <Rightbar user={user} />
          </div>
      </div>
    </div>
  </>
  )
}

export default Profile