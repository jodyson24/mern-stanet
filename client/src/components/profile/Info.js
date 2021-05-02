import React, { useState, useEffect } from 'react'
import Avatar from '../../components/Avatar'
import EditProfile from './EditProfile'
import FollowBtn from '../FollowBtn'
import Followers from './Followers'
import Following from './Following'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'


export default function Info({ id, auth, profile, dispatch }) {
    const [userData, setUserData] = useState([])
    const [onEdit, setOnEdit] = useState(false)

    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)

    useEffect(() => {
        if (id === auth.user._id) {
            setUserData([auth.user])
        } else {
            const newData = profile.users.filter(user => user._id === id)
            setUserData(newData)
        }
    }, [id, auth, dispatch, profile.users])

    useEffect(() => {
        if (showFollowers || showFollowing || onEdit) {
            dispatch({ type: GLOBALTYPES.MODAL, payload: true })
        } else {
            dispatch({ type: GLOBALTYPES.MODAL, payload: false })
        }
    }, [showFollowers, showFollowing, onEdit, dispatch])

    return (
        <div className="info">
            {
                userData.map(user => (
                    <div className="info_container" key={user._id} >
                        <Avatar src={user.avatar} size="super-avatar" />

                        <div className="info_content">
                            <div className="info_content_title">
                                <h2> {user.fullname} </h2>

                                {
                                    user._id === auth.user._id ?
                                        <button className="f-btn"
                                            onClick={() => setOnEdit(true)} >
                                            Edit Profile
                                   </button>
                                        : <FollowBtn user={user} />
                                }

                            </div>

                            <div className="follow_btn">
                                <span className="me-4">
                                    {
                                        profile.posts.map((e, index) => (
                                            <span key={index}>{e.totalPosts} posts</span>
                                        ))
                                    }
                               </span>
                                <span className="mx-4" onClick={() => setShowFollowers(true)} >
                                    {user.followers.length} followers
                               </span>
                                <span className="ms-4" onClick={() => setShowFollowing(true)}>
                                    {user.following.length} following
                               </span>
                            </div>

                            <h6> {user.username} <span className="text-danger ms-3">{user.mobile}</span> </h6>
                            <p className="m-0"> {user.address} </p>
                            <h6> {user.email} </h6>
                            <a href={user.website} target="_blank" rel="noreferrer" >
                                {user.website}
                            </a>
                            <p> {user.story} </p>
                        </div>


                        {
                            onEdit &&
                            <EditProfile user={user}
                                setOnEdit={setOnEdit} />
                        }

                        {
                            showFollowers &&
                            <Followers users={user.followers}
                                setShowFollowers={setShowFollowers} />
                        }

                        {
                            showFollowing &&
                            <Following users={user.following}
                                setShowFollowing={setShowFollowing} />
                        }
                    </div>
                ))
            }
        </div>
    )
}
