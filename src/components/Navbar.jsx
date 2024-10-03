import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            IncomeIndex
          </Link>
          <div className="space-x-4">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link to="/compare" className="text-gray-600 hover:text-blue-600">
              Compare
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
    