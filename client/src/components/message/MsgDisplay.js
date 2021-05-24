import React from 'react'
import { imageShow, videoShow } from '../../utils/mediaShow'
import Avatar from '../Avatar'

export default function MsgDisplay({ user, msg, theme }) {
    return (
        <>
            <div className="chat_title">
                <Avatar src={user.avatar} size="small-avatar" />
                <span> {user.fullname} </span>
            </div>

            {
                msg.text && 
                <div className="chat_text"
                style={{
                    filter: theme ? 'invert(1)' : 'invert(0)'
                }}>
                   {msg.text}
                </div>
            }
            {
                msg.media.map((item, index) => (
                    <div key={index}>
                        {
                            item.url.match(/video/i)
                            ? videoShow(item.url, theme)
                            : imageShow(item.url, theme)
                        }
                    </div>
                ))
            }

            <div className="chat_time">
               {new Date(msg.createdAt).toLocaleString()}
            </div>
        </>
    )
}
