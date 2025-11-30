import { useState } from "react";
import { Link } from "react-router-dom";
import Silk from "../animations/Silk/Silk";
import HomeworkModal from "../components/HomeworkModal";
import "../styles/Homeworks.css";

import UseUsuario from "../context/useContext";
import { createHomework, updateHomework, deleteHomework } from "../api/homeworkService";

export default function Homeworks() {
    const { usuario, setUsuario } = UseUsuario();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingHomework, setEditingHomework] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleCreate = () => {
        setEditingHomework(null);
        setIsModalOpen(true);
    };
    const handleEdit = (homework) => {
        setEditingHomework(homework);
        setIsModalOpen(true);
    };
    const handleSave = async (homeworkData) => {
        setLoading(true);
        try {
            let updatedUser;
            if (editingHomework) {
                updatedUser = await updateHomework(usuario.id, editingHomework.id, homeworkData);
            } else {
                updatedUser = await createHomework(usuario.id, homeworkData);
            }
            setUsuario(updatedUser);
            setIsModalOpen(false);
            setEditingHomework(null);
        } catch (error) {
            console.error("Error saving homework:", error);
            alert("Failed to save homework. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (homeworkId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this homework?");
        if (!confirmDelete) return;
        setLoading(true);
        try {
            const updatedUser = await deleteHomework(usuario.id, homeworkId);
            setUsuario(updatedUser);
        } catch (error) {
            console.error("Error deleting homework:", error);
            alert("Failed to delete homework. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    if (!usuario || !usuario.id) {
        return (
            <div className="homeworks-container">
                <div className="homeworks-fondo">
                    <Silk 
                        speed={5}
                        scale={1}
                        color="#7B7481"
                        noiseIntensity={1.5}
                        rotation={0}
                    />
                </div>
                <div className="homeworks-body">
                    <div className="homeworks-tittle">
                        <h1>Loading...</h1>
                        <p>Please wait</p>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="homeworks-container">
            <div className="homeworks-fondo">
                <Silk 
                    speed={5}
                    scale={1}
                    color="#7B7481"
                    noiseIntensity={1.5}
                    rotation={0}
                />
            </div>
            <div className="homeworks-body">
                <div className="homeworks-tittle">
                    <h1>Welcome {usuario.nombre}</h1>
                    <p>Here you can manage your homeworks</p>
                </div>
                <div className="homeworks-content">
                    <h2>Create a new homework</h2>
                    <button onClick={handleCreate} disabled={loading}>
                        Create
                    </button>
                    <Link to="/">
                        <button disabled={loading}>Go Back</button>
                    </Link>
                </div>
                <div className="homeworks-hmw">
                    <h2>
                        Homeworks
                        {usuario.homeworks.length > 0 && (
                            <span style={{
                                fontSize: '1rem',
                                background: 'rgba(124, 255, 103, 0.2)',
                                padding: '0.5rem 1rem',
                                borderRadius: '50px',
                                fontWeight: '600'
                            }}>
                                {usuario.homeworks.length}
                            </span>
                        )}
                    </h2>
                    <div className="homeworks-hmw-list">
                        {usuario.homeworks.length === 0 ? (
                            <div className="homeworks-empty">
                                <h3>📝 No homeworks yet</h3>
                                <p>Create your first homework to get started!</p>
                            </div>
                        ) : (
                            <ul>
                                {usuario.homeworks.map((hmw) => (
                                    <li key={hmw.id}>
                                        <h3>{hmw.name}</h3>
                                        <p>
                                            {hmw.description.length > 150
                                                ? hmw.description.substring(0, 150) + '...'
                                                : hmw.description}
                                        </p>
                                        <button 
                                            onClick={() => handleEdit(hmw)}
                                            disabled={loading}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(hmw.id)}
                                            disabled={loading}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <HomeworkModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingHomework(null);
                }}
                onSave={handleSave}
                homework={editingHomework}
            />
        </div>
    );
}