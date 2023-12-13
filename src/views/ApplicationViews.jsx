import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Home } from "../components/home/Home";
import { Journal } from "../components/Journal/Journal";
import { New } from "../components/new/New";
import { Edit } from "../components/edit/Edit";

export const ApplicationViews = ({ token, setToken, currentUsername }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          <Route path="/" element={<Home token={token} />} />
          <Route path=":username" element={<Journal token={token} />} />
          <Route
            path="new"
            element={<New token={token} currentUsername={currentUsername} />}
          />
          <Route path="/edit/:postId" element={<Edit />} />
        </Route>
      </Routes>
    </>
  );
};
