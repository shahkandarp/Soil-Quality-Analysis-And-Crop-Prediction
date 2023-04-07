import React from 'react'
import { NavLink } from 'react-router-dom'
import home from "../images/w1.jpg"
import "../styles/Home.css"

const Home = () => {
  return (
    <div className='home'>
      <img src={home} alt="" className='homeImg'/>
      <p className='h-p1'>Welcome to our <br /> crop prediction website</p>
      <p className='h-p2'>This website provides information on crop prediction using machine learning algorithms.</p>
      <NavLink className="h-nav" to="/login"><button className='h-button'>Get Started</button></NavLink>
      
    </div>
  )
}

export default Home
