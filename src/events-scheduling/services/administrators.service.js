import http from "../../shared/services/http-common.js";
export class AdministratorsService {
    resourceEndpoint = '/administrators';

    getAllAdministrators() {
        return http.get(this.resourceEndpoint);
    }
}