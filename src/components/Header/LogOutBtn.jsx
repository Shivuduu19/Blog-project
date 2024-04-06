import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LogOutBtn = () => {
  const disPatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        disPatch(logout());
        toast.success("log out successfull")
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-xl"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogOutBtn;
