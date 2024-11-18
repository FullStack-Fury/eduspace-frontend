import http from "../../shared/services/http-common.js";

export class AuthenticationService {
    signIn(signInRequest) {
        console.log("Enviando solicitud de inicio de sesión:", signInRequest);
        return http.post("/authentication/sign-in", signInRequest)
            .then(response => {
                console.log("Respuesta del servidor (signIn):", response.data);
                return response;
            })
            .catch(error => {
                console.error("Error durante signIn:", error);
                throw error;
            });
    }

    signUp(signUpRequest) {
        console.log("Enviando solicitud de registro:", signUpRequest);
        return http.post("/authentication/sign-up", signUpRequest)
            .then(response => {
                console.log("Respuesta del servidor (signUp):", response.data);
                return response;
            })
            .catch(error => {
                console.error("Error durante signUp:", error);
                throw error;
            });
    }
}

export default new AuthenticationService();
