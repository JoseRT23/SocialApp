import React from 'react'
import { Link } from 'react-router-dom'

const SearchResults = ({users}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
        <Link to={`/profile/${users.username}`} style={{textDecoration:"none", color:"black"}}>
            <div className='containerResult'>
                <img className='imageResult ms-3 my-1' src={users.profilePicture 
                                                ? PF+users.profilePicture
                                                : PF+"person/noAvatar.png" } />
                <p className='mx-3 my-1'>{users.username}</p>
            </div>
        </Link>
    </>
  )
}

export default SearchResults