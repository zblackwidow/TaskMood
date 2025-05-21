import { useEffect, useState, useRef } from "react";
import "./spinner.css";
import Card from "./TaskCard";

interface Task {
  id: number;
  text: string;
  createdAt: string;
}
interface TaskBoardProps {}

function Taskboard({}: TaskBoardProps) {
  const [task, setTask] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState<string>("");
  const [viewMore, setViewMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5500);
  }, []);
  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newTasks = {
      id: task.length,
      text: newTask,
      createdAt: new Date().toLocaleString(),
    };
    setTask([...task, newTasks]);
    setNewTask("");
    inputRef.current?.focus();
  };

  const deleteTask = (id: string | number) => {
    setTask(task.filter((task) => task.id !== id));
  };
  const deleteAllTasks = () => {
    setTask([]);
  };

  const lastTask = task[task.length - 1];

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
          <input
            className="w-3/4 sm:w-1/4  focus:w-3/4 transition-all duration-300 h-auto border-2 border-violet-400 rounded-xl p-2  shadow-md resize-y"
            type="text"
            value={newTask}
            ref={inputRef}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Nueva tarea"
            onKeyDown={(e) => {
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
          {task.length === 0 ? (
            <p className="text-xl p-6">No hay tareas</p>
          ) : viewMore ? (
            <div className="h-full w-full flex flex-col items-center">
              {task.map((task) => (
                <Card key={task.id} lastTask={task} deleteTask={deleteTask} />
              ))}
              <button
                onClick={deleteAllTasks}
                className="bg-red-400 text-white p-3 rounded-xl shadow-md cursor-pointer mb-4"
              >
                Eliminar todas las tareas
              </button>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              {lastTask && <Card lastTask={lastTask} deleteTask={deleteTask} />}
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
