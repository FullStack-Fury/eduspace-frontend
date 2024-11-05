// login.services.js
import axios from 'axios';

export class LoginService {
    static async login(email, password, role) {
        try {
            const endpoint = role === "Administrator" ? "/administrators" : "/teachers";
            const response = await axios.get(`http://localhost:3000${endpoint}`);

            const userData = response.data.find(user => user.email === email && user.password === password);

            if (userData) {
                // Crear el campo `name` combinando `firstName` y `lastName`
                const name = `${userData.firstName} ${userData.lastName}`;

                return {
                    id: userData.id,
                    name, // Nombre completo del usuario
                    role: role === "Administrator" ? 1 : 2, // 1 para admin, 2 para teacher
                };
            } else {
                throw new Error("Incorrect email or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }
}
