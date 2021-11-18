import React from 'react';
import HNavbar from './components/HNavbar';
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs"
import logo from './img/banner.jpg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import DealerListPage from './components/elements/DealerNav';

function App() {
  return (
    <div className="App">
      <HNavbar />
            <Router>
                  <Switch>
                  <Route exact path="/">
                    <Home />
                    <AboutUs />
                    <Services />
                    <Testimonials />
                  </Route>
                  <Route path="/dealers">
                    <DealerListPage />
                  </Route>
                  </Switch>
            </Router>
        <ContactUs />
    </div>
  );
}

export default App;
