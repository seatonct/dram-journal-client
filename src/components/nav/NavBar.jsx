import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../../managers/AuthManager";

export const NavBar = ({ token, setToken }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getCurrentUser().then((res) => {
      setCurrentUser(res);
    });
  }, []);

  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-4">
          {token && (
            <>
              <Link to="/" className="text-white">
                Home
              </Link>
              <Link to={`/${currentUser.username}`} className="text-white">
                My Journal
              </Link>
            </>
          )}
        </div>

        <div className="">
          <div className="navbar-item">
            <div className="space-x-4">
              {token ? (
                <button
                  className="text-white"
                  onClick={() => {
                    setToken("");
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/register" className="text-white">
                    Register
                  </Link>
                  <Link to="/login" className="text-white ">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
