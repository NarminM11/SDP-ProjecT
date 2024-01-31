import React from "react";
import Navbar from "../nav-bar/navbar";
import Footer from "../footer-components/footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </>
  );
};

export default Layout;
