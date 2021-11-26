import React from 'react';
import HNavbar from './components/HNavbar';
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs"
import logo from './img/banner.jpg';
import './App.css';
import DealerListPage from './components/DealerList';
function App() {

  return (
    <div className="App">
      <HNavbar />
      <Home />
      <AboutUs />
      <Services />
      <Testimonials />
      <ContactUs />
    </div >
  );
}

export default App;
