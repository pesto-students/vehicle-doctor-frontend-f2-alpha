import React from 'react';
import HNavbar from './components/HNavbar';
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs"
import logo from './img/banner.jpg';
import Marquee from "react-fast-marquee";
import './App.css';

function App() {
  return (
    <div className="App">
      <HNavbar />
      <Home />
      <AboutUs />
      <Services />
      <Testimonials />
      <Marquee>
        <img src={logo} alt="logo" />
      </Marquee>
      <ContactUs />
    </div>
  );
}

export default App;
