import axios from 'axios';
import { User } from '../model/login.entity.js';

export class LoginService {
    static async login(email, password, role) {
        try {
            const endpoint = role === "Administrator" ? "/administrators" : "/teachers";
            const response = await axios.get(`http://localhost:3000${endpoint}`);

            const userData = response.data.find(user => user.email === email && user.password === password);

            if (userData) {
                const userRole = role === "Administrator" ? 1 : 2;

                // Retorna el usuario autenticado y el rol correspondiente
                return new User({ ...userData, role: userRole });
            } else {
                throw new Error("Incorrect email or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }
}
