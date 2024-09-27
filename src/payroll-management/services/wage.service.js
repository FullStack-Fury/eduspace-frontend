import http from "../../shared/services/http-common.js";

export class WageService {
    resourceEndpoint = 'teachers/id/wage';

    getAll() {
        console.log(http.defaults.baseURL);
        console.log(this.resourceEndpoint);
        return http.get(this.resourceEndpoint);
    }

    create(categoryResource) {
        return http.post(this.resourceEndpoint, categoryResource);
    }

    update(id, categoryResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, categoryResource);
    }
}