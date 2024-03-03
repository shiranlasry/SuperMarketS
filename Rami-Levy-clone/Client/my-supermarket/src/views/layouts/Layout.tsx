import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./layout.scss";

const Layout = () => {
  return (
    <>
      <>cart</>
      {/* // conditional rendering when user loggerd in */}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
