export class Teacher {
    constructor({
                    id = null,
                    name = '',
                    lastName = '',
                    email = '',
                    cellphone = '',
                    address = '',
                    dni = '',
                    rol = { label: '', value: 0 },
                    username = '',
                    password = ''
                } = {}) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.cellphone = cellphone;
        this.address = address;
        this.dni = dni;
        this.rol = rol;
        this.username = username;
        this.password = password;
    }
}