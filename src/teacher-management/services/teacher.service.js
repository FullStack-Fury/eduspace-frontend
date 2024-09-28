import http from "../../shared/services/http-common.js";

export class TeacherService {
    resourceEndpoint = 'teachers';

    getAll() {
        console.log(http.defaults.baseURL);
        console.log(this.resourceEndpoint);
        return http.get(this.resourceEndpoint)
            .then(response => response.data)
            .catch(error => this.handleError(error, 'Error fetching teachers'));
    }

    create(teacherResource) {
        return http.post(this.resourceEndpoint, teacherResource)
            .then(response => response.data)
            .catch(error => this.handleError(error, 'Error creating teacher'));
    }

    update(id, teacherResource) {
        if (!id) {
            throw new Error('Teacher ID is required for update');
        }
        return http.put(`${this.resourceEndpoint}/${id}`, teacherResource)
            .then(response => response.data)
            .catch(error => this.handleError(error, 'Error updating teacher'));
    }

    handleError(error, message) {
        console.error(message, error);
        throw error;
    }
}

export default new TeacherService();