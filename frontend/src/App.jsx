import { useState } from "react";

import { TextField } from "@mui/material";

import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Protected from "./Protected";
import Auth from "./Auth";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        ></Route>
        <Route path="/auth" element={<Auth />}></Route>
      </Routes>
    </>
  );
}

export default App;
