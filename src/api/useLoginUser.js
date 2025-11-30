import axios from "axios";

export default async function loginUser(nombre, password) {
    try {
        const response = await axios.get("https://690b99056ad3beba00f59ad8.mockapi.io/users")
        const users = response.data;
        const user = users.find(u => u.nombre === nombre && u.password === password);
        if (!user) {
            throw new Error("Invalid username or password");
        }
        const updateResponse = await axios.put(`https://690b99056ad3beba00f59ad8.mockapi.io/users/${user.id}`, {
            ...user,
            isLoggedIn: true,
        });
        return updateResponse.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}