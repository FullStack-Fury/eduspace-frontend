import axios from 'axios';
import http from "../../shared/services/http-common.js";

export class TeacherService {
    static async fetchTeachers() {
        const response = await http.get('/teachersprofiles');
        return response.data;
    }

    static async addTeacher(teacherData) {
        // Agregar el campo de contraseña, que será el DNI
        teacherData.password = teacherData.dni;
        return http.post('/teachersprofiles', teacherData);
    }
}
