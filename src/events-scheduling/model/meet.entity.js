export class Meet {
    constructor({
                    id = 0,
                    name = '',
                    day = '',
                    hour = '',
                    location = '',
                    teachers = [],
                    invite = []
                }) {
        this.id = id;
        this.name = name;
        this.day = day;
        this.hour = hour;
        this.location = location;
        this.teachers = teachers.length ? teachers : invite;
    }
}

