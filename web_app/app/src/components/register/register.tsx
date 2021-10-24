import React, { useState } from 'react';
import './register.css'

const Register: React.FunctionComponent = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newUser = { username, password }

    fetch('http://localhost:4000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(newUser),
    }).then((res) => res.json())
      .then((data) => {
        console.log(`New user added ${data}`)
      })
  }

  return (
    <div>
      <div className="register-div">
        <form onSubmit={handleSubmit} className="register-form">
          <label
            htmlFor="username"
            className="username-label"
          >
            Username
          </label>
          <input
          type="text"
          id={username}
          name="username"
          value={username}
          className="username-input"
          placeholder="Enter username.."
          onChange={(e) => setUsername(e.target.value)}
          />
          <label
            htmlFor="password"
            className="password-label"
          >
            Password
          </label>
          <input
          type="password"
          name="password"
          value={password}
          className="password-input"
          placeholder="Enter password.."
          onChange={(e) => setPassword(e.target.value)}
          />
          <button
          type="submit"
          className="submit-button"
          >
          Register account
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register