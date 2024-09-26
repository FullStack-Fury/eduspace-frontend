// teacher.entity.js
export class Teacher {
    constructor({ id = null, name = '', lastName = '', email = '', days = [], cellphone = '', field = '', workingHours = 0, age = 0, dni = '', role = '' } = {}) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.days = days;
        this.cellphone = cellphone;
        this.field = field;
        this.workingHours = workingHours;
        this.age = age;
        this.dni = dni;
        this.role = role;
    }
}
