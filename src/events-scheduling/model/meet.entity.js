export class Meet {
    constructor({
                    id = 0,
                    title = '',
                    description = '',
                    day = '',
                    start = '',
                    end = '',
                    classroom = '',
                    teachers = [],
                    administrators = []
                }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.day = day;
        this.start = start;
        this.end = end;
        this.classroom = classroom;
        this.teachers = teachers;
        this.administrators = administrators;
    }
}
