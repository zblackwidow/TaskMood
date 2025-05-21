import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Home from "./Pages/HomePage";
import Welcome from "./Pages/Welcome";
import { useTema } from "./DarkMode/TemaContext";

function AppContent() {
  const { tema } = useTema();
  const location = useLocation();

  const estaEnWelcome = location.pathname === "/";

  return (
    <div
      className={
        tema === "oscuro" ? "bg-white text-black" : "bg-gray-900 text-white"
      }
    >
      {!estaEnWelcome && <Navbar />}

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Task-board" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
