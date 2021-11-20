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
  Link,
  useParams
} from "react-router-dom";
import DealerListPage from './components/DealerList';
function App() {
  
  return (
    <div className="App">
      
            <Router>
            <HNavbar />
                  <Switch>
                  <Route exact path="/">
                    <Home />
                    <AboutUs />
                    <Services />
                    <Testimonials />
                  </Route>
                  <Route path='/dealers/:id'>
                    <DealerListPage />
                  </Route>
                  </Switch>
                  <ContactUs />
            </Router>
       
    </div>
  );
}

export default App;
