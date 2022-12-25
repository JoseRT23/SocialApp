import React, { useContext, useEffect, useState } from 'react'
import './Rightbar.css'
import Online from '../Online/Online'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { PersonAdd, PersonRemove, Settings } from '@mui/icons-material'
import Modal from 'react-bootstrap/Modal';

const Rightbar = ({user, onlineUsers}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [show, setShow] = useState(false);
  const {user:currentUser, dispatch} = useContext(AuthContext);
  const [followed, setFollowed ] = useState(currentUser.followings.includes(user?.id));
  
  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id))
  }, [currentUser, user])

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`/users/friends/${currentUser._id}`);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    }
    getFriends();
  }, [user])

    //Obtener amigos online
    useEffect(() => {
      setOnlineFriends(friends.filter(f => onlineUsers.includes(f._id)));
    }, [friends, onlineUsers]);

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
          {onlineFriends.map(user => (
            <Online key={user?._id} user={user} /> 
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
        // <Link to={`/profile/${currentUser.username}/setings`}>
          <button className="rightbarSetingsButton" onClick={() => setShow(true)}>
            <Settings className='me-2'/> Editar perfil 
          </button>
        // </Link>
      )}
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <h4 className="rightbarTitle">Información del usuario</h4>
            <span className="rightbarInfoKey">Ciudad:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Ciudad de origen:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
        </div>
        <div className="rightbarFollowings">
        <h4 className="rightbarTitle">Amigos</h4>
        <p>{friends.length} amigos</p>
        <div className="followingsContainer">
          {friends.map((friend) => (
            <Link key={friend._id} to={`/profile/${friend.username}`} style={{textDecoration:"none", color:"black"}}>
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
        </div>
      </>
    )
  }

  return (
    <div className='rightbarContainer'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
      {/* onHide={handleClose} */}
      <Modal show={show}>
          <Modal.Header closeButton>
          <Modal.Title>Editar perfil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className='text-center'>
              <div className='infProfilePicture'>
                      <img className='informationUserImg my-4' 
                            src={currentUser.profilePicture ? PF + currentUser.profilePicture : PF+"person/noAvatar.png"}
                      />
                    </div>
              <label className="form-label lead">Nombres</label>
                  <input className="form-control mb-3" 
                        type="text"
                        name='username'
                        // onChange={handleChange} 
                        value={currentUser.username}
                  />
              <label className="form-label lead">Ciudad</label>
                  <input className="form-control mb-3" 
                          type="text"
                          name='city'
                          // onChange={handleChange} 
                          value={currentUser.city}
                  />
              <label className="form-label lead">Presentación</label>
                  <input className="form-control mb-3" 
                        type="text"
                        name='description'
                        // onChange={handleChange}  
                        value={currentUser.description}
                  />
              <label className="form-label lead">Ciudad de nacimiento</label>
                  <input className="form-control" 
                        type="text"
                        name='from'
                        // onChange={handleChange} 
                        value={currentUser.from}
                  />
              </div>
          </Modal.Body>
          <Modal.Footer>
              <button className="btn btn-primary" onClick={() => setShow(false)}>
                  Cerrar
              </button>
          </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Rightbar