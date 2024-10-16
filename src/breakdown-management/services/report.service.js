import http from "../../shared/services/http-common.js";

let currentId = 2;

export class ReportService {
    resourceEndpoint = '/reports';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(reportResource) {

        reportResource.id = ++currentId;


        return http.post(this.resourceEndpoint, reportResource).then(response => response.data);
    }

    update(id, reportResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, reportResource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByResource(resourceId) {
        return http.get(`${this.resourceEndpoint}?resourceId=${resourceId}`);
    }
}
