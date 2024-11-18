import http from "../../shared/services/http-common.js";

export class ClassroomService {
    endpoint = '/classrooms'

    getAll() {
        return http.get(this.endpoint);
    }

    create(classroom) {
        return http.post(this.endpoint, classroom);
    }

    delete(id) {
        return http.delete(`${this.endpoint}/${id}`);
    }
}