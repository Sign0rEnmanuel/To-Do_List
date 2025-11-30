import { useContext } from "react";
import { UsuarioContext } from "./createContext";

export default function UseUsuario() {
    return useContext(UsuarioContext);
}