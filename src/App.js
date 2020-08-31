import React from 'react';
import axios from "axios";
import { Route, Switch, withRouter } from "react-router-dom";

import Browse from './components/browse';
import Signup from './components/authComponents/signup';
import Login from './components/authComponents/login';
import SplashPage from './components/splashPage';
import NavigationBar from './components/navigationBar';
import CartPage from './components/cartPage';
import {ProtectedRoute, AuthRoute} from './utils/routeUtils';

import './styles/app.css'
import ProductDisplayPage from './components/productDisplayPage';

class App extends React.Component {

  state = {
    isLoggedIn: null,
    user: {}
  }

  componentDidMount() {
    this.loginStatus()
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }
  handleLogout = () => {
    localStorage.removeItem('token');
    // this.props.history.push('/login')
    // this.props.history.push('/login')
    this.props.history.user = undefined;
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }
  loginStatus = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3001/logged_in", {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`}
      }).then(res => res.json())
      .then(loggedInStatusResponse => {
        console.log(loggedInStatusResponse, this.props)
        if (loggedInStatusResponse.logged_in) {
          this.setState({
            isLoggedIn: true,
            user: loggedInStatusResponse.user
          })
          this.props.history.user = loggedInStatusResponse.user;
        } else {
          this.setState({
            isLoggedIn: false
          })
        }
      })
    } else {
      // this.props.history.push('/signup')
      this.setState({
        isLoggedIn: false
      })
    }
  }

  render() {
    return (
      <div>
        {/* <button onClick={this.handleLogout}>logout</button> */}
      {/* <NavigationBar {...props}/> */}
      {this.state.isLoggedIn !== null ?
        <>
          <Route path="" render={(props) =>
            <NavigationBar handleLogout={this.handleLogout} user={this.state.user} isLoggedIn={this.state.isLoggedIn} {...props} />} />
          <Route path="/cartPage" render={(props) => <CartPage {...props} handleLogin={this.handleLogin} user={this.state.user}/>} />
        </>
        : ""
      }
        {/* <Browse/> */}
      <Switch>
        <Route exact path="/" render={(props) => <SplashPage {...props} loggedInStatus={this.state.isLoggedIn}/>} />
        <Route path="/login" render={(props) => <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />} />
        <Route path="/signup" render={(props) => <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>} />
        <Route path="/browse" component={Browse} user={this.state.user} />
        <Route path='/productDisplayPage/:productId' component={ProductDisplayPage}/>
      </Switch>
    </div>
    );
  }
}

export default withRouter(App);
