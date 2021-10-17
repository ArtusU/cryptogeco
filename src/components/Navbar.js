import { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../services/authentication";

export function Navbar() {
  const [user, setUser] = useState(() => {
    return authService.getUser();
  });

  function handleLogout() {
    authService.logout();
    setUser(null);
  }

  function handleLogin() {
    const user = authService.login();
    setUser(user);
  }

  return (
    <nav className="py-4 flex items-center justify-between">
      <ul>
        <li>
          <Link
            to="/"
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-600 hover:bg-yellow-700"
          >
            Home
          </Link>
        </li>
      </ul>
      {user ? (
        <button
          className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={handleLogin}
        >
          Login
        </button>
      )}
    </nav>
  );
}
