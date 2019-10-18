import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Form, Button } from 'semantic-ui-react'
import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-grow: 2;
	flex-direction: column;
	margin-top: 4rem;
	align-items: center;
	padding-bottom: 45vh;
`

export const Underlined = styled.span`
	text-decoration: underline
`	

export const P = styled.p`
	margin: 1rem 0;
`

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
        <Container>
            <h2>Register</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Username</label>
                    <input 
                        name="username"
                        type="text" 
                        onChange={handleInput}
                        value={creds.username}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Password</label>
                    <input 
                        name="password"
                        type="password" 
                        onChange={handleInput}
                        value={creds.password}
                    />
                </Form.Field>
                
                <Button type="submit">Login</Button>
                <P><strong>Already a user?</strong> <Link to="/register"><Underlined>Login now.</Underlined></Link></P>
            </Form>
        </Container>
    )
}