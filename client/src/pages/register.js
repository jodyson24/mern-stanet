import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { register } from '../redux/actions/authAction'

export default function Register() {
    const { auth, alert } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    const initialState = {
        fullname: '',
        username: '',
        password: '',
        email: '',
        cf_password: '',
        gender: 'male'
    }

    const [userData, setUserData] = useState(initialState)
    const { fullname, username, password, email, cf_password } = userData

    const [typePass, setTypePass] = useState(false)
    const [typeCfPass, setTypeCfPass] = useState(false)

    useEffect(() => {
        if (auth.token) history.push("/")
    }, [auth.token, history])


    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(userData))
    }

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit} >
                <h3 className="text-uppercase text-caps mb-4"> InstaNet</h3>

                <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">Full name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1"
                        aria-describedby="fullname"
                        onChange={handleChangeInput} value={fullname} name="fullname"
                        style={{ background: `${alert.fullname ? '#fd2d6a14' : ''}` }} />

                    <div id="emailHelp" className="form-text">
                        {alert.fullname ? alert.fullname : ''}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="exampleInputEmail1"
                        aria-describedby="username"
                        onChange={handleChangeInput} value={username.toLowerCase().replace(/ /g, '')} name="username"
                        style={{ background: `${alert.username ? '#fd2d6a14' : ''}` }} />

                    <div id="emailHelp" className="form-text">
                        {alert.username ? alert.username : ''}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={handleChangeInput} value={email} name="email"
                        style={{ background: `${alert.email ? '#fd2d6a14' : ''}` }} />
                    <div id="emailHelp" className="form-text">
                        {alert.email ? alert.email : `We'll never share your email with anyone else.`}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <div className="pass">
                        <input type={typePass ? "text" : "password"} className="form-control"
                            id="exampleInputPassword1"
                            onChange={handleChangeInput} value={password} name="password"
                            style={{ background: `${alert.password ? '#fd2d6a14' : ''}` }} />

                        <small onClick={() => setTypePass(!typePass)} >
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>
                    <div id="emailHelp" className="form-text">
                        {alert.password ? alert.password : ``}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="cf_password" className="form-label">Confirm Password</label>
                    <div className="pass">
                        <input type={typeCfPass ? "text" : "password"} className="form-control"
                            id="cf_password"
                            onChange={handleChangeInput} value={cf_password} name="cf_password"
                            style={{ background: `${alert.cf_password ? '#fd2d6a14' : ''}` }} />
                        <small onClick={() => setTypeCfPass(!typeCfPass)} >
                            {typeCfPass ? 'Hide' : 'Show'}
                        </small>
                    </div>
                    <div id="emailHelp" className="form-text">
                        {alert.cf_password ? alert.cf_password : ``}
                    </div>
                </div>

                <div className="d-flex justify-content-between mx-0 mb-2">
                    <div>
                        <label htmlFor="male">
                            Male: <input type="radio" id="male" name="gender" value="male"
                                defaultChecked onChange={handleChangeInput} />
                        </label>
                    </div>

                    <div>
                        <label htmlFor="female">
                            Female: <input type="radio" id="female" name="gender" value="female"
                                onChange={handleChangeInput} />
                        </label>
                    </div>

                    <div>
                        <label htmlFor="other">
                            Other: <input type="radio" id="other" name="gender" value="other"
                                onChange={handleChangeInput} />
                        </label>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark w-100">
                    Register</button>

                <p className="my-2">
                    Already have an account?
                    <Link to="/" className="px-1" style={{ color: "crimson" }} >Login now</Link>
                </p>
            </form>
        </div>
    )
}
