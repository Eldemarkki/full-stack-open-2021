
import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { LOGIN } from '../queries';

const LoginForm = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if(result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem("library-user-token", token)
      props.setError(null)
      setUsername("")
      setPassword("")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  if(!props.show) return null;

  const onSubmitLoginForm = (e) => {
    e.preventDefault();
    login({ variables: { username, password }})
  }

  return (
    <div>
      <form onSubmit={onSubmitLoginForm}>
        Username: <input value={username} onChange={e => setUsername(e.target.value)}/>
        <br />
        Password: <input value={password} onChange={e => setPassword(e.target.value)} type="password"/>
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default LoginForm