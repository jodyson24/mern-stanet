import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { updateProfileUser } from '../../redux/actions/profileAction'
import { checkImage } from '../../utils/imageUpload'

export default function EditProfile({ user, setOnEdit }) {
    const initialState = {
        fullname: '', mobile: '', address: '', website: '', story: '', gender: ''
    }

    const [userData, setUserData] = useState(initialState)
    const { fullname, mobile, address, website, story, gender } = userData

    const [avatar, setAvatar] = useState('')

    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        setUserData(user)
    },[user])

    const changeAvatar = (e) => {
        const file = e.target.files[0]
        const err = checkImage(file)
        
        if(err) return dispatch({
            type: GLOBALTYPES.ALERT, payload: {error: err}
        })

        setAvatar(file)
    }

    const handleInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProfileUser({userData, avatar, auth}))
    }

    return (
        <div className="edit_profile">
            <button className="btn btn-danger btn_close"
                onClick={() => setOnEdit(false)} >
                close
            </button>

            <form onSubmit={handleSubmit} >
                <div className="info_avatar">
                    <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="avatar"
                        style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                    <span>
                        <i className="fa fa-camera" />
                        <p>Change</p>
                        <input type="file" name="file" id="file_up" accept="image/*"
                            onChange={changeAvatar} />
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <div className="position-relative">
                        <input type="text" className="form-control" id="fullname"
                            name="fullname" value={fullname} onChange={handleInput} />
                        <small className="text-danger position-absolute"
                            style={{ top: '50%', right: '5px', transform: 'translateY(-50%)' }} >
                            {fullname.length}/25
                        </small>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="number" name="mobile" id="mobile" className="form-control"
                        value={mobile} onChange={handleInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" id="address" className="form-control"
                        value={address} onChange={handleInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input type="text" name="website" id="website" className="form-control"
                        value={website} onChange={handleInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="story">Story</label>
                    <textarea name="story" id="story" className="form-control" cols="30" rows="4"
                        value={story} onChange={handleInput} />
                    <small className="text-danger d-block text-right" >
                        {story.length}/200
                        </small>
                </div>

                <label htmlFor="gender">Gender</label>
                <div className="input-group-prepend px-0 mb-4">
                    <select name="gender" id="gender" value={gender} className="form-control custom-select text-capitalize"
                    onChange={handleInput} >
                        {/* <option value={gender}> {user.gender} </option> */}
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <button className="btn btn-info w-100" type="submit">Save</button>
            </form>
        </div>
    )
}
