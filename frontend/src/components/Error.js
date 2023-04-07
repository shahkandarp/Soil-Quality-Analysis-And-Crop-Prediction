import React from 'react'
import { NavLink } from 'react-router-dom'
import "../styles/Error.css"

const Error = () => {
  return (
    <div className='error-div'><br />
      404 : ` Page not found !` <br /><br />
      <NavLink to="/"><button className='err-btn'>Home page</button></NavLink>
    </div>
  )
}

export default Error
