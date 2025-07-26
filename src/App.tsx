import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Evaluation from "./screens/Evaluation";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/evaluation" element={<Evaluation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
