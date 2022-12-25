import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Messenger from './pages/messenger/Messenger'
import Profile from './pages/Profile/Profile'
import Register from './pages/register/Register'
import Setings from './pages/Setings_Profile/Setings'

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
           {user ? <Home/> : <Login/>}
        </Route>

        <Route exact path="/login">
           {user ? <Redirect to="/" /> : <Register/>}
        </Route>

        <Route exact path="/register">
           {user ? <Redirect to="/" /> : <Register/>}
        </Route>

        <Route exact path="/messenger">
           {!user ? <Redirect to="/" /> : <Messenger/>}
        </Route>

        <Route exact path="/profile/:username">
           <Profile/>
        </Route>

        <Route exact path="/profile/:username/setings">
           <Setings/>
        </Route>

      </Switch>
    </Router>
  )
}

export default App