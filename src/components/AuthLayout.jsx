import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, authentication = true }) => {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authData = useSelector((state) => state.auth.userData)


  useEffect(() => {
    if (!authentication && authStatus) {
      navigate("/");
    } else if (authentication && authStatus !== authentication) {
      navigate("/login");
    }
    setLoader(false);
  }, [authentication, authStatus, navigate]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
};

export default Protected;
