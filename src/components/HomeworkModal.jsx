import { useState, useEffect } from "react";
import "../styles/HomeworkModal.css";

export default function HomeworkModal({ isOpen, onClose, onSave, homework }) {
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!isOpen) return;
        if (homework) {
            setFormData({
                name: homework.name,
                description: homework.description
            });
        } else {
            setFormData({
                name: "",
                description: ""
            });
        }
        setError(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setError("Name is required");
            return;
        }
        if (!formData.description.trim()) {
            setError("Description is required");
            return;
        }
        onSave(formData);
        setError(null);
        setFormData({ name: "", description: "" });
    };
    const handleClose = () => {
        setFormData({ name: "", description: "" });
        setError(null);
        onClose();
    };
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{homework ? "Edit Homework" : "Create New Homework"}</h2>
                    <button className="modal-close" onClick={handleClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter homework name"
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter homework description"
                            rows="4"
                        />
                    </div>
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={handleClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-save">
                            {homework ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}