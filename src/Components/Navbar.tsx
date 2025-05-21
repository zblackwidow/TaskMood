import { useState, useEffect } from "react";
import { useTema } from "../DarkMode/TemaContext";

//Array de estados de ánimo
const moods = [
  "😊 Feliz",
  "😢 Triste",
  "😠 Enojado",
  "😴 Cansado",
  "😎 Relajado",
  "🤯 Estresado",
  "🤔 Pensativo",
  "😍 Enamorado",
];

// Función para determinar el tema según el estado de ánimo
// Si el estado de ánimo es triste, enojado o estresado, se establece el tema oscuro
// En caso contrario, se establece el tema claro
const moodToTheme = (mood: string): "oscuro" | "claro" => {
  if (["😢 Triste", "😠 Enojado", "🤯 Estresado"].includes(mood))
    return "oscuro";
  return "claro";
};

// Componente Navbar
export default function Navbar() {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { tema, setTema } = useTema();
  const [nombre, setNombre] = useState<string>("");

  // Almacena el nombre del usuario en el localStorage
  useEffect(() => {
    const nombreGuardado = localStorage.getItem("nombreUsuario");
    setNombre(nombreGuardado ? nombreGuardado : "");
  }, []);

  // Almacena el estado de ánimo seleccionado en el localStorage
  const handleMoodChange = (mood: string) => {
    setSelectedMood(mood);
    setTema(moodToTheme(mood));
  };

  return (
    <nav className="flex items-center justify-center">
      <div
        className={`w-11/12 p-6 flex justify-center mt-4 items-center rounded-4xl shadow-md transition-colors
        ${
          tema === "oscuro" ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
      >
        <div className="flex items-center gap-4">
          {/* Recibe el nombre y lo muestra en el componente navbar */}
          <p className="font-bold">
            ¿Cómo estás hoy {nombre ? nombre : "nombre"}?
          </p>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${
                  tema === "oscuro"
                    ? "bg-white text-black"
                    : "bg-gray-700 text-white"
                }`}
            >
              {/* Dropdown de menú de estados de ánimo */}
              {selectedMood || "¿Cómo te sentís hoy?"}
              <span
                className={`transform transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {isDropdownOpen && (
              <div
                className={`absolute z-10 mt-2 w-48 rounded-md shadow-lg
                ${
                  tema === "oscuro"
                    ? "bg-white text-black"
                    : "bg-gray-800 text-white"
                }`}
              >
                {moods.map((mood) => (
                  <div
                    key={mood}
                    onClick={() => {
                      handleMoodChange(mood);
                      setIsDropdownOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer flex items-center gap-2 hover:text-white hover:bg-violet-500 transition-colors"
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
