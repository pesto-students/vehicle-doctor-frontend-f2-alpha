import React from 'react';
import HNavbar from './components/HNavbar';
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import './App.css';

function App() {
  return (
    <div className="App">
      <HNavbar />
      <Home />
      <Services/>
      <Testimonials/>
      <ContactUs/>
    </div>
  );
}

export default App;
