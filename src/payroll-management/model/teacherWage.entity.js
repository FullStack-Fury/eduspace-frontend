import {TeacherSalary} from "./teacherSalary.valueObject.js";
import {AfpDeduction} from "./afpDeduction.valueObject.js";
import {GoalAchievedBonus} from "./goalAchievedBonus.valueObject.js";
import {PaymentPeriod} from "./paymentPeriod.valueObject.js";
import {PerformanceBonus} from "./performanceBonus.valueObject.js";
import {SeniorityBonus} from "./seniorityBonus.valueObject.js";
import {TaxWithholdingDeduction} from "./taxWithholdingDeduction.valueObject.js";
import {LatePenaltyDiscountValueObject} from "./latePenaltyDiscount.valueObject.js";
import {UnjustifiedAbsenceDiscount} from "./unjustifiedAbsenceDiscount.valueObject.js";

export class TeacherWage {
    constructor({id= null, teacherSalary = null,
                    afpDeduction = null, goalAchievedBonus = null,
                    paymentPeriod = null, performanceBonus = null,
                    seniorityBonus = null, taxWithholdingDeduction = null,
                    latePenaltyDiscount = null,
                    unjustifiedAbscenceDiscount = null
                    }) {
        this.id = id;
        this.techerSalary = teacherSalary ? new TeacherSalary(teacherSalary) : null;
        this.afpDeduction = afpDeduction ? new AfpDeduction(afpDeduction) : null;
        this.goalAchievedBonus = goalAchievedBonus ? new GoalAchievedBonus(goalAchievedBonus) : null;
        this.paymentPeriod = paymentPeriod ? new PaymentPeriod(paymentPeriod) : null;
        this.performanceBonus = performanceBonus ? new PerformanceBonus(performanceBonus) : null;
        this.seniorityBonus = seniorityBonus ? new SeniorityBonus(seniorityBonus) : null;
        this.taxWithholdingDeduction = taxWithholdingDeduction ? new TaxWithholdingDeduction(taxWithholdingDeduction) : null;
        this.latePenaltyDiscount = latePenaltyDiscount ? new LatePenaltyDiscountValueObject(latePenaltyDiscount) : null;
        this.unjustifiedAbsenceDiscount = unjustifiedAbscenceDiscount ? new UnjustifiedAbsenceDiscount(unjustifiedAbscenceDiscount) : null;
    }

    getId() {
        return this.id;
    }
}