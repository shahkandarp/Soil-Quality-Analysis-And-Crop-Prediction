import React, { useState } from 'react'
import axios from 'axios'
import "../styles/Login.css"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post("http://15.207.18.13:3001/api/v1/user/login", {
        email, password
      })
      const data = await res.data;
      
      if (data.user.role === "CUSTOMER") {
        window.localStorage.setItem("token", data.token)
        window.localStorage.setItem("isAdmin", "no")
        window.location.href = "/display"
      }else{
        window.localStorage.setItem("isAdmin", "yes")
        window.location.href = "/signup"
      }

    } catch (error) {
      if (error.response.data.res === 'error') {
        window.alert(error.response.data.msg)
      }
    }
  }

  return (
    <div className='div-login'>
      <div className='div-l-2'>
        <form method='post' id='login'>

          <label className='login-label' htmlFor="email">Email : </label>
          <input type="text" name="email" id='email' className='email' placeholder='Enter email id : '
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          <br /><br /><br />

          <label className='login-label' htmlFor="password">Password : </label>
          <input type="text" name="password" id='password' className='password' placeholder='Enter password :' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <br /><br />

          <input type="submit" value="Login" name='login' id='login' className='login' onClick={login} />

        </form>
      </div>
    </div>
  )
}

export default Login
