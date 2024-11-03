import http from "../../shared/services/http-common.js";

class RegisterService {
    static registerAdministrator(command) {
        return http.post("/administrators", command);
    }
}

export default RegisterService;
