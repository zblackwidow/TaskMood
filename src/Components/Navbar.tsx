import { useState } from "react";
import { useTema } from "../DarkMode/TemaContext";

const moods = [
  "😊 Feliz",
  "😢 Triste",
  "😠 Enojado",
  "😴 Cansado",
  "😎 Relajado",
  "🤯 Estresado",
  "🤔 Pensativo",
  "😍 Enamorado"
];

const moodToTheme = (mood: string) => {
  if (["😢 Triste", "😠 Enojado", "🤯 Estresado"].includes(mood)) return "oscuro";
  return "claro";
};


export default function Navbar() {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { tema, setTema } = useTema();


  const handleMoodChange = (mood: string) => {
    setSelectedMood(mood);
     setTema(moodToTheme(mood));
  };

  return (
    <nav className="flex items-center justify-center" >
      <div className={`w-11/12 p-6 flex justify-center mt-4 items-center rounded-4xl shadow-md transition-colors
        ${tema === "oscuro" ? "bg-white text-black" : "bg-gray-800 text-white"}`}>
        <div className="flex items-center gap-4">
          <p className="font-bold">Bienvenido (nombre)</p>
          
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${tema === "oscuro" ? "bg-gray-700 hover:bg-gray-600" : "bg-white/20 hover:bg-white/30"}`}
            >
              {selectedMood || "¿Cómo te sentís hoy?"}
              <span className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            
            {isDropdownOpen && (
              <div className={`absolute z-10 mt-2 w-48 rounded-md shadow-lg
                ${tema === "oscuro" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
                {moods.map((mood) => (
                  <div
                    key={mood}
                    onClick={() => {
                      handleMoodChange(mood); // Usa la función que cambia el tema
                      setIsDropdownOpen(false);
                    }}
                    className={`px-4 py-2 cursor-pointer flex items-center gap-2
                      ${tema === "oscuro" ? "hover:bg-gray-700" : "hover:bg-violet-100"}`}
                  >
                    {mood}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}