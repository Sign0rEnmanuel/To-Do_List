import "../styles/NotFound.css";

import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="not-found-container">
            <div className="not-found-fondo">
                <div className="not-found-body">
                    <div className="not-found-content">
                        <h1>404</h1>
                        <p>Page not found</p>
                        <Link to="/">
                            <button>Go Back</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}