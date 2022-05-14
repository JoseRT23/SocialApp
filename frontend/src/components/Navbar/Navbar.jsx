import React, { useContext } from 'react'
import './Navbar.css'
import { Search, Person, Chat, Notifications } from '@mui/icons-material'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='navbarContainer'>
        <div className="navbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
                <span className="logo">SOCIAL APP</span>
            </Link>
        </div>
        <div className="navbarCenter">
            <div className="searchBar">
                <Search className='searchIcon' />
                <input type="text" placeholder="Busca amigos, publicaciones o videos" className="searchInput" />
            </div>
        </div>
        <div className="navbarRight">
            <div className="navbarLinks">
                <span className="navbarLink">Inicio</span>
                <span className="navbarLink">Timeline</span>
            </div>
            <div className="navbarIcons">
                <div className="navbarIconItem">
                    <Person />
                    <span className="navbarIconBadge">1</span>
                </div>
                <div className="navbarIconItem">
                    <Chat />
                    <span className="navbarIconBadge">9</span>
                </div>
                <div className="navbarIconItem">
                    <Notifications />
                    <span className="navbarIconBadge">1</span>
                </div>
            </div>
            <Link to={`/profile/${user.username}`}>
                <img src={user.profilePicture
                        ? PF + user.profilePicture
                        : PF + "person/noAvatar.png"} 
                    alt="" 
                    className='navbarImg' />
            </Link>
        </div>
    </div>
  )
}

export default Navbar