import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Home from "./Pages/HomePage";
import Welcome from "./Pages/Welcome";
import { useTema } from "./DarkMode/TemaContext";



function App() {
  const { tema } = useTema();
  return (
    <>
      <BrowserRouter>
      <div className={tema === "oscuro" ? "bg-white text-black" : "bg-gray-900 text-white"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Task-board" element={<Home />} />
          </Routes>
        <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
