import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "../App.css";
import { AuthContext } from "../contexts/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const Main = () => {
  const { loading } = useContext(AuthContext);

  return (
    <div className="bg-primaryBG">
      {loading ? 
        <LoadingSpinner />
       : 
        <div>
          <Navbar />
          <div className="min-h-screen"><Outlet /></div>
          
          <Footer />
        </div>
      }
    </div>
  );
};

export default Main;
