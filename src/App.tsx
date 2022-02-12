import { useState, useEffect } from 'react';
import HNavbar from './components/HNavbar';
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import RoadSideAssitanceModal from './components/RoadSideAssitanceModal';
import { Provider } from "react-redux";
import store from "./store";
import './App.css';
import useToken from './useToken';
import City from './components/CityModal';

function App() {

  const { token, setToken } = useToken();
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const [cityData, setCitySelected] = useState<any>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

 
  return (
    <Provider store={store}>
      <div className="App">
        <City open={open} handleClose={handleClose} onCitySelected={city => setCitySelected(city)} />
        <HNavbar Token={token} SetToken={setToken} City={cityData} onCitySelected={city => setCitySelected(city)} />
        <Home Token={token} SetToken={setToken} City={cityData} />
        <AboutUs />
        <Services Token={token} SetToken={setToken} City={cityData}/>
        <RoadSideAssitanceModal Token={token} SetToken={setToken} City={cityData} />
        <Testimonials />
        <ContactUs />
      </div >
    </Provider>
  );
}

export default App;
