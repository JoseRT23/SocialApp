import React from 'react'
import moment from 'moment'
import 'moment/locale/es';
import './Message.css'

const Message = ({message, own}) => {
  console.log(message.text)
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            {/* <img className='messageImg' src="" alt="" /> */}
            <p className='messageText'>{message?.text}</p>
        </div>
        <div className="messageBottom">
            {moment(message.createdAt).fromNow()}
        </div>
    </div>
  )
}

export default Message