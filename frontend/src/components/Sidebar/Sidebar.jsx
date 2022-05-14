import React from 'react'
import { RssFeed, Chat, PlayCircle, Group } from '@mui/icons-material'
import CloseFriend from '../CloseFriend/CloseFriend'
import { Users } from '../../dummyData'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebarContainer'>
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className='sidebarIcon' />
            <span className="sidebarListItemText">
              Feed
            </span>
          </li>
          <li className="sidebarListItem">
            <Chat className='sidebarIcon' />
            <span className="sidebarListItemText">
              Chats
            </span>
          </li>
          <li className="sidebarListItem">
            <PlayCircle className='sidebarIcon' />
            <span className="sidebarListItemText">
              Videos
            </span>
          </li>
          <li className="sidebarListItem">
            <Group className='sidebarIcon' />
            <span className="sidebarListItemText">
              Grupos
            </span>
          </li>
        </ul>
        <button className="sidebarButton">Ver más</button>
        <hr className='sidebarHr' />
        <ul className="sidebarFriendList">
          {Users.map(user => (
            <CloseFriend key={user.id} user={user}/>
          ))}
        </ul>
      </div>   
    </div>
  )
}

export default Sidebar