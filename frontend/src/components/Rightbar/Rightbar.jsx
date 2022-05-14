import React, { useContext, useEffect, useState } from 'react'
import './Rightbar.css'
import Online from '../Online/Online'
import { Users } from '../../dummyData'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { PersonAdd, PersonRemove, Settings } from '@mui/icons-material'

const Rightbar = ({user}) => {
  console.log('user', user)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const {user:currentUser, dispatch} = useContext(AuthContext);
  const [followed, setFollowed ] = useState(currentUser.followings.includes(user?.id));

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id))
  }, [currentUser, user])
  

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`/users/friends/${user._id}`);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    }
    getFriends();
  }, [user])

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          idUser:currentUser._id
        });
        dispatch({type:"UNFOLLOW", payload:user._id});
      }else{
        await axios.put(`/users/${user._id}/follow`, {
          idUser:currentUser._id
        });
        dispatch({type:"FOLLOW", payload:user._id});
      }    
    } catch (error) {
      console.log(error)
    }
    setFollowed(!followed);
  }
  

  const HomeRightBar = () => {
    return (
    <>
        <div className="birthdayContainer">
          <img src="/assets/gift.png" alt="" className="birthdayImg" />
          <span className='birthdayText'>
            <b>Pola Foster</b> y <b>3 amigos</b> cumplen años hoy.
          </span>
        </div>
        <img src="/assets/ad.png" alt="" className="rightbarAdd" />
        <h4 className="rightbarTitle">Amigos en linea</h4>

        <ul className="rightbarFriendList">
          {Users.map(user => (
            <Online key={user.id} user={user} /> 
          ))}
        </ul>
    </>
  )
  }

  const ProfileRightBar = () => {
    return (
      <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? <PersonRemove className='me-2'/>  : <PersonAdd className='me-2'/>}
          {followed ? "Dejar de seguir " : "Seguir "}
        </button>
      )}

      {user.username === currentUser.username && (
        <Link to={`/profile/${currentUser.username}/setings`}>
          <button className="rightbarSetingsButton" onClick={handleClick}>
            <Settings className='me-2'/> Editar perfil 
          </button>
        </Link>
      )}
      <h4 className="rightbarTitle">Información del usuario</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Ciudad:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Ciudad de origen:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">Amigos</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link to={`/profile/${friend.username}`} style={{textDecoration:"none", color:"black"}}>
              <div className="rightbarFollowing">
                <img
                  src={friend.profilePicture 
                    ? PF+friend.profilePicture
                    : PF+"person/noAvatar.png" }
                    alt=""
                    className="rightbarFollowingImg"
                    />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className='rightbarContainer'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  )
}

export default Rightbar