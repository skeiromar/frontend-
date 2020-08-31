import React, { Component } from 'react';

import '../../styles/authStyles.css'

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    errors: "",
  };

  handleChange = (e) => {
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
    fetch('http://localhost:3001/users', {
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
      .then(res => {
        localStorage.setItem('token', res.jwt)
        this.props.history.push('/browse');
      })

    // axios
    //   .post("http://localhost:3001/users", { user }, { withCredentials: true })
    //   .then((response) => {
    //     if (response.data.status === "created") {
    //       this.props.handleLogin(response.data);
    //       this.redirect();
    //     } else {
    //       this.setState({
    //         errors: response.data.errors,
    //       });
    //     }
    //   })
    //   .catch((error) => console.log("api errors:", error));
  };

  redirect = () => {
    this.props.history.push("/");
  };
  handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}
        </ul>
      </div>
    )
  }
  render() {
    return (
      <div>
        <div className="loginPageContainer">
          <h3 className="loginHeader">
            Create an account!
          </h3>
          <input
            className="loginUsername"
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
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
          >Sign Up</button>
        </div>
      </div>
    )
  }
}


{/* <h1>Sign Up</h1>
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
