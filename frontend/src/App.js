import React from 'react'
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home.js"
import Signup from "./components/Signup.js"
import Login from "./components/Login"
import Error from "./components/Error.js"
import Display from "./components/Display.js"
import Update from "./components/Update.js"

const App = () => {
  return (
    <>
      <Routes>

        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/display' element={<Display />} />
        <Route path='/update' element={<Update />} />
        <Route path='/*' element={<Error />} />

      </Routes>
    </>
  )
}

export default App
