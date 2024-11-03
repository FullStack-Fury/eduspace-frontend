export class RegisterAdmin {
    constructor({ firstName, lastName, email, dni, address, phone, username, password }) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dni = dni;
        this.address = address;
        this.phone = phone;
        this.username = username;
        this.password = password;
    }
}
