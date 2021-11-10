import React from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import Testimonials from "./components/Testimonials";
// import UserHome from "./components/UserHome";
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <Testimonials/>
      <ContactUs/>
      {/* <UserHome/> */}
    </div>
  );
}

export default App;
