import React from 'react'
import Avatar from '../Avatar'
import { useDispatch, useSelector} from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

export default function Status() {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div className="status my-3 d-flex">
            <Avatar src={auth.user.avatar} size="big-avatar" />

            <button className="statusBtn flex-fill" 
            onClick={() => dispatch({type: GLOBALTYPES.STATUS, payload: true})} >
                {auth.user.fullname}, what are you thinking?
            </button>
        </div>
    )
}
