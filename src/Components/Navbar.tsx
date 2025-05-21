import { useState } from "react";

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

export default function Navbar() {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <nav className="flex items-center justify-center" >
      <div className="w-11/12 bg-none p-6 flex justify-center mt-4 items-center bg-white rounded-4xl shadow-md">
        <div className="flex items-center gap-4">
          <p className="font-bold">Bienvenido (nombre)</p>
          
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              {selectedMood || "¿Cómo te sentís hoy?"}
              <span className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                {moods.map((mood) => (
                  <div
                    key={mood}
                    onClick={() => {
                      setSelectedMood(mood);
                      setIsDropdownOpen(false);
                    }}
                    className="px-4 py-2 text-gray-800 hover:bg-violet-100 cursor-pointer flex items-center gap-2"
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