import { createContext } from "react";
import { useState } from "react";

const UsuarioContext = createContext();

function UsuarioProvider({ children }) {
    const [usuario, setUsuario] = useState({
        nombre: "",
        password: "",
        isLoggedIn: false,
        homeworks: [],
    });

    return (
        <UsuarioContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </UsuarioContext.Provider>
    );
}

export { UsuarioContext, UsuarioProvider };