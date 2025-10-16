import { Link } from "react-router-dom";

export default function Home() {
    return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
      <div className="p-12 bg-white rounded shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Printo Foundation</h1>
        <p className="mb-8 text-gray-700">Secure access to your profile & demographic data.<br/>Welcome!</p>
        <div className="flex gap-4 justify-center">
          <Link to="/register" className="btn bg-green-600 text-white px-6 py-2 rounded">
            Register
          </Link>
          <Link to="/login" className="btn bg-blue-600 text-white px-6 py-2 rounded">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}