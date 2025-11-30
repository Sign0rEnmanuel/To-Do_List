import Silk from "../animations/Silk/Silk";
import "../styles/Register.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import createUser from "../api/useCreateUser";
import UseUsuario from "../context/useContext";

export default function Register() {
    const navigate = useNavigate();
    const { setUsuario } = UseUsuario();
    const [formData, setFormData] = useState({
        nombre: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.password) {
            setError("All fields are required");
            return;
        }
        if (formData.password.length < 4) {
            setError("Password must be at least 4 characters");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const user = await createUser(formData.nombre, formData.password);
            setUsuario(user);
            navigate("/homeworks");
        } catch (error) {
            setError(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="register-container">
            <div className="register-fondo">
                <Silk
                    speed={5}
                    scale={1}
                    color="#7B7481"
                    noiseIntensity={1.5}
                    rotation={0}
                />
            </div>
            <div className="register-body">
                <div className="register-content">
                    <h1>Register</h1>
                    <p>Create an account to access your account</p>
                </div>
                <div className="register-form">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Name"
                            value={formData.nombre}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        {error && (
                            <div style={{
                                color: '#ff5252',
                                background: 'rgba(255, 82, 82, 0.1)',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                border: '1px solid rgba(255, 82, 82, 0.3)'
                            }}>
                                {error}
                            </div>
                        )}
                        <button type="submit" disabled={loading}>
                            {loading ? "Loading..." : "Register"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            disabled={loading}
                            >
                                Go Back
                            </button>
                    </form>
                </div>
            </div>
        </div>
    )
}