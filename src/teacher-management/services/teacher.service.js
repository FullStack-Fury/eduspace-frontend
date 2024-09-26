import http from "../../shared/services/http-common.js";


class TeacherService {

    create(data) {
        return http.post('teachers', data);
    }

}

export default new TeacherService();
