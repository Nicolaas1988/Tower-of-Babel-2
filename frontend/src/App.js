import Nav from "react-bootstrap/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import Room from "./pages/Room";
import Header from "./components/header/Header";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/room" element={<Room />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
