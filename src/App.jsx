import { Routes, Route } from "react-router-dom";
import Principal from "./pages/Principal";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Homeworks from "./pages/Homeworks";
import NotFound from "./pages/NotFound";
import "./App.css";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Principal />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/homeworks" element={<Homeworks />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}