<script>
import {TeacherWage} from "../model/teacherWage.entity.js";
import {WageService} from "../services/wage.service.js";

export default {
  name: "payroll-management",
  data() {
    return {
      title: 'Wages',
      teachers: [],
      wages : [],
      teacherWage: new TeacherWage({}),

      wageService: null
    }
  },
  methods: {
    calculateNetPayment(teacher) {
      const salary = teacher.techerSalary.amount;
      const bonuses = teacher.performanceBonus.amount +
          teacher.seniorityBonus.amount +
          teacher.goalAchievedBonus.amount;
      const discounts = teacher.performanceBonus.amount +
          teacher.unjustifiedAbsenceDiscount.amount;
      const deductions = teacher.afpDeduction.amount +
          teacher.taxWithholdingDeduction.amount;

      return salary + bonuses - discounts - deductions;
    }
  },
  created() {
    this.wageService = new WageService();
    this.wageService.getAll().then(response => {
      this.teachers = response.data.map(teacherWage => new TeacherWage(teacherWage));
      console.log(this.wages);
    }).catch(error => console.error(error));
  }

}
</script>

<template>
  <div class="card">
    <h1 class="text-4xl font-bold mb-4">Wages</h1>

    <div class="mb-4">
      <h2 class="text-2xl font-semibold mb-2">Payment period</h2>
      <div class="flex align-items-center justify-content-center">
        <span class="text-xl">{{ teachers.getId().paymentPeriod.initialDate }}</span>
        <i class="pi pi-arrow-right mx-2"></i>
        <span class="text-xl">{{ teachers.getId().paymentPeriod.lastDate }}</span>
      </div>
    </div>
    <div class="grid">
      <!-- Salaries Section -->
      <div class="col-12 md:col-6 lg:col-3 p-3">
        <div class="surface-card p-4 border-round-xl shadow-2">
          <h3 class="text-xl font-semibold mb-3">
            <i class="pi pi-money-bill mr-2"></i>
            Salaries
          </h3>
          <ul class="list-none p-0 m-0">
            <li class="mb-3">
              <div class="flex justify-content-between">
                <span>Amount:</span>
                <span class="text-green-500">{{  teachers.getId().techerSalary.amount }}</span>
              </div>
              <div class="text-sm text-500">{{  teachers.getId().techerSalary.initialDate }}</div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bonuses Section -->
      <div class="col-12 md:col-6 lg:col-3 p-3">
        <div class="surface-card p-4 border-round-xl shadow-2">
          <h3 class="text-xl font-semibold mb-3">
            <i class="pi pi-star mr-2"></i>
            Bonuses
          </h3>
          <ul class="list-none p-0 m-0">
            <li class="mb-3">
              <div class="flex justify-content-between">
                <span>Performance bonus:</span>
                <span class="text-green-500">{{ teachers.getId().performanceBonus.amount}}</span>
              </div>
              <div class="text-sm text-500">{{ teachers.getId().performanceBonus.date }}4</div>
            </li>
            <li class="mb-3">
              <div class="flex justify-content-between">
                <span>Seniority bonus:</span>
                <span class="text-green-500">{{ teachers.getId().seniorityBonus.amount }}</span>
              </div>
              <div class="text-sm text-500">{{  teachers.getId().seniorityBonus.date }}</div>
            </li>
            <li class="mb-3">
              <div class="flex justify-content-between">
                <span>Academic goals bonus:</span>
                <span class="text-green-500">{{ teachers.getId().goalAchievedBonus.amount }}</span>
              </div>
              <div class="text-sm text-500">{{  teachers.getId().goalAchievedBonus.date }}</div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Discounts Section -->
      <div class="col-12 md:col-6 lg:col-3 p-3">
        <div class="surface-card p-4 border-round-xl shadow-2">
          <h3 class="text-xl font-semibold mb-3">
            <i class="pi pi-percentage mr-2"></i>
            Discounts
          </h3>
          <ul class="list-none p-0 m-0">
            <li class="mb-3">
              <div class="flex justify-content-between">
                <span>Late discount:</span>
                <span class="text-red-500">{{ teachers.getId().performanceBonus.amount}}</span>
              </div>
              <div class="text-sm text-500">{{ teachers.getId().performanceBonus.date }}</div>
            </li>
            <li class="mb-3">
              <div class="flex justify-content-between">
                <span>Unjustified absences:</span>
                <span class="text-red-500">{{ teachers.getId().unjustifiedAbsenceDiscount.amount }}</span>
              </div>
              <div class="text-sm text-500">{{ teachers.getId().unjustifiedAbsenceDiscount.date }} </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Deductions Section -->
      <div class="col-12 md:col-6 lg:col-3 p-3">
        <div class="surface-card p-4 border-round-xl shadow-2">
          <h3 class="text-xl font-semibold mb-3">
            <i class="pi pi-wallet mr-2"></i>
            Deductions
          </h3>
          <ul class="list-none p-0 m-0">
            <li class="mb-3">
              <div class="flex justify-content-between">
                <span>AFP Withholding:</span>
                <span class="text-red-500">{{ teachers.getId().afpDeduction.amount}}</span>
              </div>
              <div class="text-sm text-500">{{  teachers.getId().afpDeduction.date }}</div>
            </li>
            <li class="mb-3">
              <div class="flex justify-content-between">
                <span>Tax Withholding:</span>
                <span class="text-red-500">{{  teachers.getId().taxWithholdingDeduction.amount }}</span>
              </div>
              <div class="text-sm text-500">{{  teachers.getId().taxWithholdingDeduction.date }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mt-4 text-right">
      <p class="text-xl font-bold">Total Neto a recibir: {{  }}</p>
      <p class="text-lg">Fecha de pago: {{ calculateNetPayment(teachers[teachers.getId()]) }}</p>
    </div>
  </div>

</template>

<style scoped>

</style>