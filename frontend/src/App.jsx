import { useState } from "react";

import { TextField } from "@mui/material";

import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />}></Route>
      </Routes>
    </>
  );
}

export default App;
