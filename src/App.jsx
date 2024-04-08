import { useEffect, useState } from "react";
import "./App.css";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ ...userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className=" flex min-h-screen bg-gray-700">
      <div className=" w-full block">
        <Header />
        <Toaster position="top-right" />
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  ) : <Loader />;
}

export default App;
