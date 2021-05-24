import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

export default function UserCard({ children, user, border, handleClose, setShowFollowers, setShowFollowing, msg, theme }) {

    const handleCloseAll = () => {
        if (handleClose) handleClose()
        if (setShowFollowers) setShowFollowers(false)
        if (setShowFollowing) setShowFollowing(false)
    }

    return (
        <div className={`d-flex p-2 align-items-center justify-content-between ${border} w-100`} style={{ zIndex: 100 }}>
            <div>
                <Link to={`/profile/${user._id}`} onClick={handleCloseAll}
                    className="d-flex align-align-items-center" >
                    <Avatar src={user.avatar} size="big-avatar" />
                    <div className="p-1 ml-1" style={{ transform: 'translateY(-2px)' }}>
                        <span className="d-block"> {user.fullname} </span>

                        <small style={{ opacity: 0.7 }}>
                            {
                                msg
                                    ? <>
                                        <div style={{
                                            filter: theme ? 'invert(1)' : 'invert(0)'
                                        }}> {user.text} </div>
                                        {
                                            user.media.length > 0 &&
                                            <div>
                                                user.media.length <i className="fas fa-image" />
                                            </div>
                                        }
                                    </>
                                    : user.username
                            }
                        </small>
                    </div>
                </Link>
            </div>

            {
                children
            }
        </div>
    )
}
