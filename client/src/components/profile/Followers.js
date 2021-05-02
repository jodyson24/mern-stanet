import React from 'react'
import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import { useSelector } from 'react-redux'

export default function Followers({ users, setShowFollowers }) {
    const { auth } = useSelector(state => state)

    return (
        <div className="follow">
            <div className="follow_box">
                <h5 className="text-start">followers</h5>
                <hr />

                {
                    users.map(user => (
                        <UserCard key={user._id} user={user} setShowFollowers={setShowFollowers} >
                            {
                                auth.user._id !== user._id && <FollowBtn user={user} />
                            }
                        </UserCard>
                    ))
                }

                <div className="close" onClick={() => setShowFollowers(false)} >
                    &times;
            </div>
            </div>
        </div>
    )
}
