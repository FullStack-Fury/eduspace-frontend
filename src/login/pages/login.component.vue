<script>
import LoginForm from '../components/login-form.component.vue';
import { LoginService } from '../services/login.services.js';
import { mapActions, mapGetters } from 'vuex';
import { SignInRequest } from "../../iam/model/sign-in.request.js";
import { SignInResponse } from "../../iam/model/sign-in.response.js";

export default {
  name: "login",
  components: { LoginForm },
  data() {
    return {
      loginService: new LoginService(),
      signInRequest: new SignInRequest({}),
      signInResponseObject: new SignInResponse({})
    };
  },
  computed: {
    ...mapGetters('user', ['userId', 'userRole', 'userToken'])
  },
  methods: {
    ...mapActions('user', ['setUser']),

    async handleLogin({ email, password }) {
      try {
        console.log("Login initiated");

        const user = { username: email, password: password };

        // Crear la solicitud de inicio de sesión
        this.signInRequest = new SignInRequest(user);
        console.log('Request:', this.signInRequest);

        // Realizar la solicitud de inicio de sesión
        const signInResponse = await this.loginService.signIn(this.signInRequest);
        console.log('Response:', signInResponse);

        // Procesar la respuesta
        this.signInResponseObject = new SignInResponse({ ...signInResponse.data });
        console.log('Processed Response Object:', this.signInResponseObject);

        // Guardar los datos del usuario en Vuex (token, id y rol)
        await this.setUser({
          id: this.signInResponseObject.id,
          role: this.signInResponseObject.role,
          token: this.signInResponseObject.token
        });

        console.log("User stored in Vuex:", {
          id: this.userId,
          role: this.userRole,
          token: this.userToken
        });

        // Redireccionar según el rol del usuario
        if (this.userRole === 'RoleAdmin') {
          console.log("Redirecting to Admin Dashboard");
          this.$router.push('/dashboard-admin/home-admin');
        } else if (this.userRole === 'RoleTeacher') {
          console.log("Redirecting to Teacher Dashboard");
          this.$router.push('/dashboard-teacher/home-teacher');
        } else {
          console.warn("Unrecognized role:", this.userRole);
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Error during login. Please check your credentials.");
      }
    },
    goToRegister() {
      this.$router.push({ name: 'register' });
    }
  }
};
</script>

<template>
  <div class="login-container">
    <!-- Left Side (Login Form) -->
    <div class="left-side">
      <LoginForm @onLogin="handleLogin" />
    </div>
    <!-- Right Side -->
    <div class="right-side">
      <h2>Good day!</h2>
      <p>Enter your personal details and start your journey with us</p>
      <pv-button label="SIGN UP" class="sign-up-button" @click="goToRegister" />
    </div>
  </div>
</template>



<style scoped>
.login-container {
  display: flex;
  width: 60%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  border: none;
}

.left-side, .right-side {
  width: 50%;
  height: 50%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.left-side {
  background-color: white;
  border-radius: 15px 0 0 15px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
}

.right-side {
  background: linear-gradient(to bottom, #34a7c1, #fad961);
  color: white;
  border-radius: 0 15px 15px 0;
  text-align: center;
}

h2 {
  font-size: 2em;
  margin-bottom: 0.5em;
  color: #000;
}

.right-side h2 {
  color: white;
}

p {
  color: white;
  margin-bottom: 1.5em;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 300px;
}

.forgot-password {
  text-align: left;
  color: #9e9e9e;
  font-size: 0.9em;
  margin-bottom: 20px;
  cursor: pointer;
  text-decoration: none;
}

 .sign-up-button {
  margin-top: 20px;
  background: linear-gradient(to right, #34a7c1, #4ad4d4);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1em;
  width: 150px;
  text-align: center;
}



.login-container .sign-up-button:hover {
  background: linear-gradient(to right, #2fa1b4, #41b8b8);
  color: white;
  border: none;
}

</style>