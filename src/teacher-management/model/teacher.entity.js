export class Teacher {
    constructor({ id = null, name = '', lastName = '', email = '', cellphone = '', address = '', dni = '' } = {}) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.cellphone = cellphone;
        this.address = address;
        this.dni = dni;
    }
}
