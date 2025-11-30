import Silk from "../animations/Silk/Silk";
import "../styles/Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import loginUser from "../api/useLoginUser";
import UseUsuario from "../context/useContext";

export default function Login() {
    const navigate = useNavigate();
    const { setUsuario } = UseUsuario();
    const [formData, setFormData] = useState({
        nombre: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.password) {
            setError("All fields are required");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const user = await loginUser(formData.nombre, formData.password);
            setUsuario(user);
            navigate("/homeworks");
        } catch (err) {
            setError("Invalid name or password");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="login-container">
            <div className="login-fondo">
                <Silk 
                    speed={5}
                    scale={1}
                    color="#7B7481"
                    noiseIntensity={1.5}
                    rotation={0}
                />
            </div>
            <div className="login-body">
                <div className="login-content">
                    <h1>Login</h1>
                    <p>Enter your credentials to access your account</p>
                </div>
                <div className="login-form">
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
                            {loading ? "Logging in..." : "Login"}
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
    );
}