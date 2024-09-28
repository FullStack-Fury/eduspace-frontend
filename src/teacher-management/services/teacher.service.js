import http from "../../shared/services/http-common.js";

export class TeacherService {
    resourceEndpoint = 'teachers';  // Endpoint base para el recurso 'teachers'

    getAll() {
        console.log(http.defaults.baseURL);
        console.log(this.resourceEndpoint);
        return http.get(this.resourceEndpoint)
            .then(response => {
                console.log("Teachers Data:", response.data);  // Muestra los datos de los profesores en consola
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching teachers:', error.response ? error.response.data : error.message);
                throw error;
            });
    }

    create(teacherResource) {
        return http.post(this.resourceEndpoint, teacherResource)
            .then(response => response.data)
            .catch(error => {
                console.error('Error creating teacher:', error.response ? error.response.data : error.message);
                throw error;
            });
    }

    update(id, teacherResource) {
        if (!id) {
            throw new Error('Teacher ID is required for update');
        }
        const endpoint = `${this.resourceEndpoint}/${id}`;  // Incluye dinámicamente el ID del profesor
        return http.put(endpoint, teacherResource)
            .then(response => response.data)
            .catch(error => {
                console.error('Error updating teacher:', error.response ? error.response.data : error.message);
                throw error;
            });
    }
}

export default new TeacherService();
