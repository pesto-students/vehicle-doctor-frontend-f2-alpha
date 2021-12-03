import HNavbar from './components/HNavbar';
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs"
import './App.css';
import useToken from './useToken';
function App() {
  const { token, setToken } = useToken();

  return (
    <div className="App">
      <HNavbar Token={token} SetToken={setToken}  />
      <Home Token={token} SetToken={setToken} />
      <AboutUs />
      <Services Token={token} SetToken={setToken} />
      <Testimonials />
      <ContactUs />
    </div >
  );
}

export default App;
