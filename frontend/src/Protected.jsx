const api = import.meta.env.VITE_API_URL;

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
export default function Protected({ children }) {
  const token = localStorage.getItem("token") || "";

  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(null);

  async function check() {
    try {
      const response = await axios.get(api + "/auth/me/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setIsAuth(true);

      console.log(response.data.message);
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("TOKEN:", token);

      if (error.response) {
        setIsAuth(false);
      } else {
        alert("Network error");
      }
    }
  }

  useEffect(() => {
    check();
  }, []);

  if (isAuth === null) {
    return <h1>loading...</h1>;
  }

  if (!isAuth) {
    return <Navigate to="/auth" replace></Navigate>;
  }

  return children;
}
