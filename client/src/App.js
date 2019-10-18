import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Jokes from './components/Jokes'

function App() {
  const [token, setToken] = React.useState('')

  return (
    <div className="App">
      <Route exact path="/" render={(props) => {
        return <Login setToken={setToken} {...props} />
      }}/>
       <Route path="/jokes" render={(props) => {
        return <Jokes token={token} {...props} />
      }}/>
      <Route path="/register" component={Register} />
    </div>
  );
}

export default App;
