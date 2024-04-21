import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ token, setToken, currentUsername }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center ">
        <div className="space-x-4 flex justify-between">
          {/* If a user is logged in, render the full nav bar including Logout button. */}
          {token && (
            <>
              <Link to="/" className="text-white">
                Home
              </Link>
              <Link to={`/${currentUsername}`} className="text-white">
                My Journal
              </Link>
              <Link to="/new" className="text-white">
                New
              </Link>
              <Link to="/bookmarks" className="text-white">
                Bookmarks
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
                // If a user is not logged in, render only links to Register or Login
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
