import {
  useEffect,
  useState,
  useRef,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import "./spinner.css";
import Card from "./TaskCard";
import { useTema } from "../DarkMode/TemaContext";

// Definimos el tipo de tarea
// Cada tarea tiene un id, un texto, una fecha de creación y un checkbox de realizado
type Task = {
  id: number;
  text: string;
  createdAt: string;
  completed: boolean;
};

// Definimos el tipo de acción que puede recibir el reducer
type TaskAction =
  | { type: "ADD"; payload: Task }
  | { type: "DELETE"; payload: number }
  | { type: "DELETE_ALL" }
  | { type: "SET"; payload: Task[] }
  | { type: "TOGGLE_COMPLETE"; payload: number };

// Definimos el reducer que maneja las acciones
function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((task) => task.id !== action.payload);
    case "DELETE_ALL":
      return [];
    case "SET":
      return action.payload;
    case "TOGGLE_COMPLETE":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    default:
      return state;
  }
}

function Taskboard() {
  // Usamos el hook useReducer para manejar el estado de las tareas
  const [task, dispatch] = useReducer(taskReducer, [], () => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState<string>("");
  const [viewMore, setViewMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const { tema } = useTema();

  // Manejamos el evento de carga de la página, después de 5 segundos se oculta la carga y muestra el contenido

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5500);
  }, []);

  // Manejamos el evento de enfoque del input
  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  // Guardamos las tareas en el localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  // Manejamos el evento de agregar una tarea, sí la tarea esta vacia no se agrega
  const addTask = useCallback(() => {
    if (newTask.trim() === "") return;
    const newTaskObj = {
      id: task.length,
      text: newTask,
      createdAt: new Date().toLocaleString(),
      completed: false,
    };
    dispatch({ type: "ADD", payload: newTaskObj });
    setNewTask("");
    inputRef.current?.focus();
  }, [newTask, task.length, dispatch]);

  // Manejamos el evento de eliminar una tarea
  const deleteTask = useCallback(
    (id: number) => {
      dispatch({ type: "DELETE", payload: id });
    },
    [dispatch]
  );

  // Manejamos el evento de marcar una tarea como completada
  const toggleComplete = useCallback(
    (id: number) => {
      dispatch({ type: "TOGGLE_COMPLETE", payload: id });
    },
    [dispatch]
  );

  // Manejamos el evento de eliminar todas las tareas
  const deleteAllTasks = useCallback(() => {
    dispatch({ type: "DELETE_ALL" });
  }, [dispatch]);

  // Usamos useMemo para evitar que se recalculen las tareas cada vez que se renderiza el componente
  const lastTask = useMemo(() => {
    return task[task.length - 1];
  }, [task]);

  // Si la carga es verdadera, mostramos la carga y un texto de carga
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="spinner"> </div>
        <h3 className="text-2xl">Cargando tareas...</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-4">
      <h1 className="text-5xl mb-6 mt-10 text-shadow-lg italic font-sans">
        <a className="underline decoration-pink-500"> Mis tareas</a>
      </h1>
      <div className="flex flex-col h-auto w-10/12 p-4 items-center">
        <div className="w-11/12 flex justify-center focus:justify-start ">
          {/* Input de tarea, con un evento que guarda en setNewTask, y evento keydown para una mejor experiencia */}
          <input
            className={`w-3/4 sm:w-1/4 focus:w-3/4 transition-all duration-300 h-auto border-2 rounded-xl p-2 shadow-md resize-y
        ${
          tema === "oscuro"
            ? "bg-white text-black border-violet-400 placeholder-gray-500"
            : "bg-gray-800 text-white border-violet-400 placeholder-gray-400"
        }`}
            type="text"
            value={newTask}
            ref={inputRef}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewTask(e.target.value)
            }
            placeholder="Nueva tarea"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />
          <button
            onClick={addTask}
            className="rounded-xl bg-violet-500 hover:bg-violet-600 text-white py-2 px-4 ml-4 shadow-md cursor-pointer"
          >
            Agregar
          </button>
        </div>
        <div className="w-full xl:w-3/4 transition-all duration-300 min-h-[70vh] flex flex-col items-center">
          {/* Sí el array de tareas es igual a 0, muestra un mensaje de no hay tareas */}
          {task.length === 0 ? (
            <p className="text-xl p-6">No hay tareas</p>
          ) : viewMore ? (
            // Muestra todas las tareas
            <div className="h-full w-full flex flex-col items-center">
              {task.map((task) => (
                <Card
                  key={task.id}
                  lastTask={task}
                  deleteTask={deleteTask}
                  toggleComplete={toggleComplete}
                />
              ))}
              <button
                onClick={deleteAllTasks}
                className="bg-red-400 text-white p-3 rounded-xl shadow-md cursor-pointer mb-4"
              >
                Eliminar todas las tareas
              </button>
            </div>
          ) : (
            // Muestra la última tarea agregada
            <div className="w-full flex flex-col items-center">
              {lastTask && (
                <Card
                  lastTask={lastTask}
                  deleteTask={deleteTask}
                  toggleComplete={toggleComplete}
                />
              )}
            </div>
          )}
          {task.length > 1 && (
            <button
              onClick={() => setViewMore(!viewMore)}
              className="bg-violet-400 p-3 rounded-xl text-white hover:bg-violet-600 shadow-md cursor-pointer "
            >
              {viewMore ? "Ver menos" : "Ver todas"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Taskboard;
