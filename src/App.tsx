import HNavbar from './components/HNavbar';
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import { Provider } from "react-redux";
import store from "./store";
import './App.css';
function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <HNavbar />
        <Home />
        <AboutUs />
        <Services />
        <Testimonials />
        <ContactUs />
      </div >
    </Provider>
  );
}

export default App;
