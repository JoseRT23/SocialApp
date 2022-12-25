import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Search, Person, Chat, Notifications } from '@mui/icons-material'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import SearchResults from './SearchResults'
import axios from 'axios'

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    const handleChange = (e) => {
        setSearch(e.target.value);
        if (search.length === 1) {
            setUsers([])
        }
      }

    const handleSubmit = async () => {
        try {
            const res = await axios.get(`/users/search?username=${search}`);
            setUsers(res.data);
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className='navbarContainer'>
        <div className="navbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
                <span className="logo">SOCIAL APP</span>
            </Link>
        </div>
        <div className="navbarCenter">
            <div className="searchBar" style={{borderRadius:`${users.length === 0 ? '30px ' : '30px 30px 30px 0px'}`}}>
                <input type="text"
                       onChange={handleChange}
                       placeholder="Busca amigos, publicaciones o videos" 
                       className="searchInput" />
                <Search className='searchIcon' onClick={handleSubmit} />
            </div>
        </div>
        <div className="navbarRight">
            <div className="navbarIcons">
                <div className="navbarIconItem">
                    <Person />
                    <span className="navbarIconBadge">1</span>
                </div>
                <div className="navbarIconItem">
                    <Link style={{color:"white"}} to={"/messenger"}>
                        <Chat />
                        <span className="navbarIconBadge">9</span>
                    </Link>
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
            <button>LogOut</button>
        </div>
        <div className='results' style={{visibility:`${users.length === 0 ? 'hidden' : 'visible'}`}}>
            {users.map(u => (
                <SearchResults key={u._id} users={u}/>
            ))}
        </div>
    </div>
  )
}

export default Navbar