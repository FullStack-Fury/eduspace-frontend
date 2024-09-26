import http from "../../shared/services/http-common.js";


class TeacherService {
    getAll() {
        return http.get('/teachers');
    }

    create(data) {
        return http.post('teachers', data);
    }

    get(id) {
        return http.get(`/teachers/${id}`);
    }

    update(id, data) {
        return http.put(`/teachers/${id}`, data);
    }

    delete(id) {
        return http.delete(`/teachers/${id}`);
    }

    deleteAll() {
        return http.delete(`/api/teachers`);
    }

    findByName(name) {
        return http.get(`/api/teachers?name=${name}`);
    }
}

export default new TeacherService();
