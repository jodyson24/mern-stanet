import React, { useState, useEffect } from 'react'

import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import Saved from '../../components/profile/Saved'

import { useSelector, useDispatch } from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'
import { useParams } from 'react-router-dom'



export default function Profile() {
    const { profile, auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const { id } = useParams()
    const [saveTab, setSavedTab] = useState(false)

    useEffect(() => {
        if (profile.ids.every(item => item !== id)) {
            dispatch(getProfileUsers({ id, auth }))
        }
    }, [id, auth, profile.ids, dispatch])

    return (
        <div className="profile">
            <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

            {
                auth.user._id === id &&
                <div className="profile_tab d-flex justify-content-center py-1 pt-2">
                    <button className={saveTab ? '' : 'active'} onClick={() =>  setSavedTab(false)} > Posts </button>
                    <button className={saveTab ? 'active' : ''} onClick={() =>  setSavedTab(true)} > Saved </button>
                </div>
            }


            {
                profile.loading ?
                    <img className="d-block mx-auto my-4" src={LoadIcon} alt="loading" />
                    : <>
                        {
                            saveTab
                            ? <Saved auth={auth} dispatch={dispatch} />
                            : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
                        }
                    </>
            }

        </div>
    )
}
