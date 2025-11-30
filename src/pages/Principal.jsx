import Silk from "../animations/Silk/Silk";
import RotatingText from "../animations/RotatingText/RotatingText";
import "../styles/Principal.css";

import { Link } from "react-router-dom";

import UseUsuario from "../context/useContext";

export default function Principal() {
    const { usuario } = UseUsuario();
    return (
        <div className="principal-container">
            <div className="principal-fondo">
                <Silk 
                    speed={5}
                    scale={1}
                    color="#7B7481"
                    noiseIntensity={1.5}
                    rotation={0}
                />
            </div>
            <div className="principal-body">
                <header className="header">
                    <div className="header-tittle">
                        <h1>To-Do List</h1>
                        <p>A simple to-do list app</p>
                    </div>
                    <nav className="header-nav">
                        <Link to="/login">
                            <button className="header-nav-button">Login</button>
                        </Link>
                        <Link to="/register">
                            <button className="header-nav-button">Register</button>
                        </Link>
                        {usuario.isLoggedIn && (
                            <Link to="/homeworks">
                                <button className="header-nav-button">Homeworks</button>
                            </Link>
                        )}
                    </nav>
                </header>
                <main className="main">
                    <div className="main-tittle">
                        <h2>You can</h2>
                        <RotatingText
                            texts={["Add homework", "Modify homework", "Delete homework"]}
                            rotationInterval={2000}
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "-100%", opacity: 0 }}
                            animatePresenceMode="wait"
                            animatePresenceInitial={false}
                            staggerDuration={0}
                            staggerForm="random"
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            splitBy="characters"
                            loop={true}
                            auto={true}
                            mainClassName="main-tittle-text"
                            elementLevelClassName="main-tittle-element"
                        />
                    </div>
                    <div className="main-content">
                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-icon">✓</div>
                                <h3>Easy to Use</h3>
                                <p>Intuitive interface to manage your tasks efficiently</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">⚡</div>
                                <h3>Fast & Responsive</h3>
                                <p>Quick loading times and smooth interactions</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">🔒</div>
                                <h3>Secure</h3>
                                <p>Your data is safe and protected with us</p>
                            </div>
                        </div>
                        <div className="cta-section">
                            <h2>Ready to get organized?</h2>
                            <p>Join thousands of users managing their tasks effectively</p>
                            <Link to="/register">
                                <button className="cta-button">Get Started Free</button>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}