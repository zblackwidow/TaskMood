// import Card from "./TaskCard";
import { useEffect, useState } from "react";

interface Task {
  id: number;
  text: string;
}
interface TaskBoardProps {}

function Taskboard({}: TaskBoardProps) {
  const [task, setTask] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState<string>("");
  const [viewMore, setViewMore] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newTasks = {
      id: task.length,
      text: newTask,
    };
    setTask([...task, newTasks]);
    setNewTask("");
  };

  const deleteTask = (id: number) => {
    setTask(task.filter((task) => task.id !== id));
  };
  const deleteAllTasks = () => {
    setTask([]);
  };

  const lastTask = task[task.length - 1];

  return (
    <div className="flex flex-col items-center py-4 h-dvh">
      <h2>Mis Tareas</h2>
      <div className="flex flex-col h-dvh border-2 w-full items-center">
        <div className="w-11/12 flex justify-center">
          <input
            className="border-2 rounded-xl p-2"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Nueva tarea"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />
          <button onClick={addTask} className="rounded-xl bg-gray-200 p-2 ml-4">
            Agregar
          </button>
        </div>
        <div className="w-11/12 xl:w-2/4">
          {task.length === 0 ? (
            <p>No hay tareas</p>
          ) : viewMore ? (
            <div>
              {task.map((task) => (
                <div
                  key={task.id}
                  className="w-11/12 xl:w-full bg-white shadow-md rounded-lg p-4 m-4 flex flex-col"
                >
                  {task.text}
                  <button onClick={() => deleteTask(task.id)}>Eliminar</button>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {lastTask && (
                <div
                  key={lastTask.id}
                  className="w-11/12 bg-white shadow-md rounded-lg p-4 m-4 flex flex-col "
                >
                  {lastTask.text}
                  <button onClick={() => deleteTask(lastTask.id)} className="w-1/4 bg-red-200 p-2 rounded-xl">
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-between w-full">
          {task.length > 1 && (
            <button onClick={() => setViewMore(!viewMore)} className="bg-green-200 p-3 rounded-xl">
              {viewMore ? "Ver menos" : "Ver más"}
            </button>
          )}
          <button onClick={deleteAllTasks} className="bg-red-200 p-3 rounded-xl">Eliminar todas las tareas</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Taskboard;
