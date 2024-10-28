import http from "../../shared/services/http-common.js";

export class TeacherService {
    getAll() {
        return http.get("/teachers").then(response => response.data);
    }
}
