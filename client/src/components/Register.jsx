import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Login(props) {
    const [creds, setCreds] = React.useState({
        username: '',
        password: ''
    })

    const handleInput = e => {
        setCreds({...creds, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.post('http://localhost:3300/api/auth/register', creds)
        .then(res => {
            console.log(res)
            props.history.push('/') // redirect user to login screen
        })
        .catch(err => {
            console.error(err)
        })
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    name="username"
                    type="text" 
                    onChange={handleInput}
                    value={creds.username}
                />

                <input 
                    name="password"
                    type="password" 
                    onChange={handleInput}
                    value={creds.password}
                />
                <button type="submit">Register</button>
            </form>
            <Link to='/'>Already a user? Login</Link>
        </div>
    )
}