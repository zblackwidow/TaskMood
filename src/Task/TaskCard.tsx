import { useTema } from "../DarkMode/TemaContext";

// Definimos el tipo de tarea
type Task = {
  id: number;
  text: string;
  createdAt: string;
  completed: boolean;
};

// Definimos el tipo de las props del componente Card
interface CardProps {
  lastTask: Task;
  deleteTask: (id: number) => void;
  toggleComplete: (id: number) => void;
}

function Card({ lastTask, deleteTask, toggleComplete }: CardProps) {
  const { tema } = useTema();

  return (
    <div
      key={lastTask.id}
      className={`w-11/12 shadow-md rounded-lg p-4 m-4 flex flex-col ${
        tema === "oscuro" ? "bg-white text-black" : "bg-gray-800 text-white"
      }`}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={lastTask.completed}
          onChange={() => toggleComplete(lastTask.id)}
        />
        <span className={lastTask.completed ? "line-through" : ""}>
          {lastTask.text}
        </span>
      </div>
      <div className="flex justify-between items-center border-t-2 border-gray-100 mt-4 pt-2">
        <span className={tema === "oscuro" ? "text-gray-400" : "text-gray-300"}>
          {lastTask.createdAt}
        </span>
        <button
          onClick={() => deleteTask(lastTask.id)}
          className="w-[100px] text-white bg-violet-400 p-2 rounded-xl hover:bg-violet-600 cursor-pointer shadow-md self-end"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default Card;
