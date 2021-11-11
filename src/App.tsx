import React from 'react';
import HNavbar from './components/HNavbar';
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import Testimonials from "./components/Testimonials";
import UserHome from "./components/UserHome";
import './App.css';

function App() {
  return (
    <div className="App">
      <HNavbar />
      <Home />
      <Testimonials/>
      <ContactUs/>
      <UserHome/>
    </div>
  );
}

export default App;
