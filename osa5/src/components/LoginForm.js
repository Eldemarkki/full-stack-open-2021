import { PropTypes } from "prop-types"
import React from "react"

const LoginForm = ({ handleLogin, setUsername, setPassword }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>Username: <input required type="text" name="username" id="usernameField" onChange={({ target }) => { setUsername(target.value) }} /></label>
        <br />
        <label>Password: <input required type="password" name="password" id="passwordField" onChange={({ target }) => { setPassword(target.value) }} /> </label>
        <br />
        <input type="submit" id="login-button" value="Log in" />
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm