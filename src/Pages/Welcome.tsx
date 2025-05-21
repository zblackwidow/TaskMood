import { Link } from "react-router-dom";



function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
      <p className="text-lg mb-8">This is a simple welcome page.</p>


      <Link to="/Task-board" className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-blue-600">
        Empecemos
      </Link>
    </div>
  );
}

export default Welcome;