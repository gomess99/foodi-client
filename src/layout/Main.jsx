import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import "../App.css"

const Main = () => {
  return (
    <div>
      <Navbar/>
      <div className='min-h-screen'><Outlet/></div>
      <Footer/>
    </div>
  )
}

export default Main
