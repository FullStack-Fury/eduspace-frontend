export class Payroll {
    constructor({
                    id = 0,
                    teacherId = 0,
                    salaryAmount = 0,
                    pensionContribution = 0,
                    salaryBonus = 0,
                }) {
        this.id = id;
        this.teacherId = teacherId;
        this.salaryAmount = salaryAmount;
        this.pensionContribution = pensionContribution;
        this.salaryBonus = salaryBonus;
        this.salaryNet = this.calculateNetSalary();
    }

    calculateNetSalary() {
        return this.salaryAmount + this.salaryBonus - this.pensionContribution;
    }
}
