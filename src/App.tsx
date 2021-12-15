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
function App() {
  const { token, setToken } = useToken();

  return (
    <Provider store={store}>
      <div className="App">
        <HNavbar Token={token} SetToken={setToken} />
        <Home Token={token} SetToken={setToken} />
        <AboutUs />
        <Services Token={token} SetToken={setToken} />
        <RoadSideAssitanceModal  Token={token} SetToken={setToken} />
        <Testimonials />
        <ContactUs />
      </div >
    </Provider>
  );
}

export default App;
