import React, { useState, FormEvent } from 'react';

const Register: React.FunctionComponent = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id={username}
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
        >
          Create account
        </button>
      </form>
    </div>
  )
}

export default Register;