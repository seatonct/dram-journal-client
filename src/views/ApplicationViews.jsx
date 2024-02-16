import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Home } from "../components/home/Home";
import { Journal } from "../components/Journal/Journal";
import { New } from "../components/new/New";
import { Edit } from "../components/edit/Edit";
import { Bookmarks } from "../components/bookmarks/Bookmarks";

export const ApplicationViews = ({ token, setToken, currentUsername }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          <Route
            path="/"
            element={<Home currentUsername={currentUsername} />}
          />
          <Route path=":username" element={<Journal />} />
          <Route
            path="new"
            element={<New currentUsername={currentUsername} />}
          />
          <Route
            path="/edit/:postId"
            element={<Edit currentUsername={currentUsername} />}
          />
          <Route
            path="/bookmarks"
            element={<Bookmarks currentUsername={currentUsername} />}
          />
        </Route>
      </Routes>
    </>
  );
};
