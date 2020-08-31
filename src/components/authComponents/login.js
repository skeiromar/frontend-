import React, { Component } from 'react';

import '../../styles/authStyles.css';

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: "",
  };

  handleChange = (e) => {
    console.log(e);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = () => {
    const { username, password } = this.state;
    let user = {
      username: username,
      password: password
    };

      //   axios
      // .post("http://localhost:3001/login", { user }, { withCredentials: false})
      // .then((response) => {
      //     console.log(response.data)
      //     this.props.handleLogin(response.data);
      //     this.redirect();
      // })
      // .catch((error) => console.log("api errors:", error));

    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password
        }
      })
    })
      .then(r => r.json())
      .then(data => {
        localStorage.setItem('token', data.jwt)
        this.props.history.push('/browse');
      })
  };
  redirect = () => {
    this.props.history.push("/");
  };
  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </div>
    );
  };
  render() {
    return (
      <div>
        <div className="loginPageContainer">
          <h3 className="loginHeader">
            Welcome Back!
          </h3>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            className="loginUsername"
            placeholder="username"
            type="text" />
          <input
            className="loginPassword"
            placeholder="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            type="password" />

          <button
            onClick={this.handleSubmit}
            className="loginSubmitButton"
          >Log In</button>
        </div>
      </div>
    )
  }
}


{/* <h1>Log In</h1>
<form onSubmit={this.handleSubmit}>
  <input
    placeholder="username"
    type="text"
    name="username"
    value={this.state.username}
    onChange={this.handleChange}
  />
  <input
    placeholder="password"
    type="password"
    name="password"
    value={this.state.password}
    onChange={this.handleChange}
  />
  <button placeholder="submit" type="submit">
    Log In
  </button>
  <div>
    or <Link to="/signup">sign up</Link>
  </div>
</form> */}
