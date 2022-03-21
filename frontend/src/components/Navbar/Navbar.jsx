import React from 'react'
import './Navbar.css'
import { Search, Person, Chat, Notifications } from '@mui/icons-material'

const Navbar = () => {
  return (
    <div className='navbarContainer'>
        <div className="navbarLeft">
            <span className="logo">SOCIAL APP</span>
        </div>
        <div className="navbarCenter">
            <div className="searchBar">
                <Search />
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
                    <span className="novbarIconBadge">1</span>
                </div>
                <div className="navbarIconItem">
                    <Chat />
                    <span className="novbarIconBadge">1</span>
                </div>
                <div className="navbarIconItem">
                    <Notifications />
                    <span className="novbarIconBadge">1</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar