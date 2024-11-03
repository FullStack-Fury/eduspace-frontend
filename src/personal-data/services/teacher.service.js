import axios from 'axios';

export class TeacherService {
    static async fetchTeachers() {
        const response = await axios.get('http://localhost:3000/teachers');
        return response.data;
    }

    static async addTeacher(teacherData) {
        // Agregar el campo de contraseña, que será el DNI
        teacherData.password = teacherData.dni;
        return axios.post('http://localhost:3000/teachers', teacherData);
    }
}
