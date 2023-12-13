import { useState, useEffect } from "react";
import { ApplicationViews } from "./views/ApplicationViews";
import { NavBar } from "./components/nav/NavBar";
import { getCurrentUser } from "./managers/AuthManager";

export const App = () => {
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
  const [currentUsername, setCurrentUsername] = useState({});

  const setToken = (newToken) => {
    localStorage.setItem("auth_token", newToken);
    setTokenState(newToken);
  };

  useEffect(() => {
    getCurrentUser().then((res) => {
      setCurrentUsername(res.username);
    });
  }, [token]);

  return (
    <>
      <NavBar
        token={token}
        setToken={setToken}
        currentUsername={currentUsername}
      />
      <ApplicationViews
        token={token}
        setToken={setToken}
        currentUsername={currentUsername}
      />
    </>
  );
};
