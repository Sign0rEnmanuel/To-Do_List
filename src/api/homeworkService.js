import axios from "axios";

const API_URL = "https://690b99056ad3beba00f59ad8.mockapi.io/users";

export async function createHomework(userId, homeworkData) {
    try {
        const userResponse = await axios.get(`${API_URL}/${userId}`);
        const user = userResponse.data;
        const newHomework = {
            id: Date.now().toString(),
            name: homeworkData.name,
            description: homeworkData.description,
            createdAt: new Date().toISOString()
        }
        const updatedHomeworks = [...user.homeworks, newHomework];
        const updateResponse = await axios.put(`${API_URL}/${userId}`, {
            ...user,
            homeworks: updatedHomeworks
        });
        return updateResponse.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateHomework(userId, homeworkId, homeworkData) {
    try {
        const userResponse = await axios.get(`${API_URL}/${userId}`);
        const user = userResponse.data;
        const updatedHomeworks = user.homeworks.map(hw => 
            hw.id === homeworkId ? {
                ...hw,
                name: homeworkData.name,
                description: homeworkData.description,
                updatedAt: new Date().toISOString()
            } : hw
        );
        const updateResponse = await axios.put(`${API_URL}/${userId}`, {
            ...user,
            homeworks: updatedHomeworks
        });
        return updateResponse.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteHomework(userId, homeworkId) {
    try {
        const userResponse = await axios.get(`${API_URL}/${userId}`);
        const user = userResponse.data;
        const updatedHomeworks = user.homeworks.filter(hw => hw.id !== homeworkId);
        const updateResponse = await axios.put(`${API_URL}/${userId}`, {
            ...user,
            homeworks: updatedHomeworks
        });
        return updateResponse.data;
    } catch (error) {
        console.log(error);
    }
}