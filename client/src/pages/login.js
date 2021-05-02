import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { login } from '../redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'

export default function Login() {
    const initialState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData

    const [typePass, setTypePass] = useState(false)

    const history = useHistory()
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        if (auth.token) history.push("/")
    }, [auth.token, history])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(userData)
        dispatch(login(userData))
    }

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit} >
                <h3 className="text-uppercase text-caps mb-4"> InstaNet</h3>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={handleChangeInput} value={email} name="email" />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <div className="pass">
                        <input type={typePass ? "text" : "password"} className="form-control"
                            id="exampleInputPassword1"
                            onChange={handleChangeInput} value={password} name="password" />
                        <small onClick={() => setTypePass(!typePass)} >
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>
                </div>
                <button type="submit" className="btn btn-dark w-100"
                    disabled={email && password ? false : true}
                >Login</button>

                <p className="my-2">
                    You don't have an account?
                    <Link to="/register" className="px-1" style={{ color: "crimson" }} >Register Now</Link>
                </p>
            </form>
        </div>
    )
}
