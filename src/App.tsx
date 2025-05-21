import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Home from "./Pages/HomePage";
import Welcome from "./Pages/Welcome";



function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Task-board" element={<Home />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
