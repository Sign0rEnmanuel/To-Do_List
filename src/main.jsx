import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter} from "react-router-dom";
import { UsuarioProvider } from "./context/createContext";
import App from "./App";

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <UsuarioProvider>
                <App />
            </UsuarioProvider>
        </BrowserRouter>
    </React.StrictMode>
)