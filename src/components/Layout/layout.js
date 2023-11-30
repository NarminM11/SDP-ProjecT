import React from 'react'
import Navbar from '../navbar'
import Footer from '../footer'


const Layout = ({children}) => {
  return (
  <>
   <Navbar></Navbar>
    {children}
    <Footer></Footer>
  </>
  )
}

export default Layout
