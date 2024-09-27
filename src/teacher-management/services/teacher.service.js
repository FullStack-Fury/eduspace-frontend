import http from "../../shared/services/http-common.js";

class TeacherService {
    constructor() {
        this.currentId = 1;
    }

    create(data) {
        data.id = this.currentId++; // 
        return http.post('teachers', data);
    }
}

export default new TeacherService();
