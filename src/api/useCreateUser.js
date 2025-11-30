import axios from "axios";

export default async function createUser(nombre, password) {
    try {
        const response = await axios.post("https://690b99056ad3beba00f59ad8.mockapi.io/users", {
            nombre: nombre,
            password: password,
            isLoggedIn: true,
            homeworks: [],
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}