import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTema } from "../DarkMode/TemaContext";

// Componente de inicio
function Welcome() {
  // Hook para manejar el tema
  const { tema } = useTema();
  // Hook para manejar el nombre del usuario
  const [nombre, setNombre] = useState<string>("");
  // Hook para manejar la navegación
  const navigate = useNavigate();

  // Maneja el cambio en el input del nombre y almacena el valor en el estado en el localStorage
  const manejarCambio = (e: ChangeEvent<HTMLInputElement>): void => {
    setNombre(e.target.value);
  };

  // Maneja el inicio, verifica que el nombre tenga al menos 2 caracteres, lo guarda en el localStorage y redirige a la pagina de taskboard
  const manejarInicio = (): void => {
    if (nombre.trim().length < 2) return;
    localStorage.setItem("nombreUsuario", nombre.trim());
    navigate("/Task-board");
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen transition-colors ${
        tema === "oscuro" ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      <div className="flex flex-col items-center justify-center w-6/12 p-6 rounded-4xl shadow-xl bg-gray-700">
        <h1 className="text-5xl mb-6 mt-10 italic font-sans">
          Bienvenido a TaskMood
        </h1>
        <p className="text-lg mb-8">
          Enfócate en una tarea a la vez según tu mood
        </p>
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md mb-6">
          {/* Input que recibe el nombre del usuario */}
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Escribe tu nombre"
            className="w-56 h-8 text-white p-1"
            value={nombre}
            onChange={manejarCambio}
          />
        </div>
        {/* Boton que redirige al dashboard */}
        <button
          onClick={manejarInicio}
          className="px-8 py-2 bg-indigo-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Iniciar
        </button>
      </div>
    </div>
  );
}

export default Welcome;
