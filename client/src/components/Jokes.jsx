import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Jokes(props) {
    const [jokes, setJokes] = React.useState([])

    React.useEffect(() => {
        console.log('TOKEN', props.token)
        axios.get('http://localhost:3300/api/jokes', {
            headers: {
                authorization: props.token
            }
        })
        .then(res =>{console.log(jokes); setJokes(res.data) })
        .catch(err => console.error(err))
    }, [])

    return (
        <div>
            <Link to='/register'>Register</Link>
            <Link to='/'>Login</Link>
            <ul>
                {jokes.map(({joke, id}) => <li key={id}>{joke}</li>)}
            </ul>
        </div>
    )
}