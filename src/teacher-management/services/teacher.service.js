import http from "../../shared/services/http-common.js";

class TeacherService {
    async create(data) {
        try {
            const response = await http.post('teachers', data);
            return response.data;
        } catch (error) {
            this.handleError(error, 'Error creating teacher');
        }
    }

    async update(data) {
        if (!data.id) {
            throw new Error('Teacher ID is required for update');
        }
        try {
            const response = await http.put(`teachers/${data.id}`, data);
            return response.data;
        } catch (error) {
            this.handleError(error, 'Error updating teacher');
        }
    }

    handleError(error, message) {
        console.error(message, error);
        throw error;
    }
}

export default new TeacherService();