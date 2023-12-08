<template>
  <div class="form-add">
    <div class="form-record">
      <div class="form-header">
        <div>
          {{ formTitle }}
        </div>
        <div class="icon icon-close" @click="closeFormST1"></div>
      </div>
      <div class="process">
        <div class="process-one">1</div>
        <div class="line-one"></div>
        <div class="process-two bg-disable">2</div>
        <div class="line-two"></div>
        <div class="process-three bg-disable">3</div>
      </div>
      <div class="step mt-2">Bước 1: Nhập thông tin chung</div>
      <div class="form-main">
        <div class="group-controll">
          <div class="gr-item mr-2 w-30">
            <div class="label">Tiêu đề hồ sơ</div>
            <input class="mt-1 w-100" type="text" />
          </div>
          <div class="gr-item ml-2 mr-2 w-30">
            <div class="label">Ngày tạo</div>
            <input class="mt-1 w-100" type="date" />
          </div>
          <div class="gr-item ml-2 w-30">
            <div class="label">Họ tên</div>
            <input class="mt-1 w-100" type="text" />
          </div>
        </div>

        <div class="group-controll mt-2">
          <div class="gr-item mr-2">
            <div class="label">Ngày sinh</div>
            <input class="mt-1 w-100" type="text" />
          </div>
          <div class="gr-item mr-2 ml-2">
            <div class="label">Số điện thoại</div>
            <input class="mt-1 w-100" type="text" />
          </div>
          <div class="w-25 ml-2">
            <div class="label">Giới tính</div>
            <div class="mb-1" style="display: flex">
              <input class="mr-1 mt-2" type="radio" value="0" />
              <p class="mr-2" for="1">Nam</p>
              <input class="mr-1 mt-2" type="radio" value="1" />
              <p for="2">Nữ</p>
            </div>
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="w-100">
            <div class="label">Địa chỉ</div>
            <input class="mt-1 w-100" type="text" />
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="gr-item mr-2 " style="margin-top: 4px;">
            <div class="label">Hồ sơ của</div>
            <div class="mt-1 w-100">
              <Combobox
                class="item-input check-input"
                :items="patients"
                :code="'PatientName'"
                :fieldCode="'PatientName'"
                :fieldName="'PatientName'"
              />
            </div>
          </div>
          <div class="gr-item mr-2">
            <div class="label">Tên bác sĩ</div>
            <input class="mt-1 w-100" type="text" />
          </div>
          <div class="gr-item ml-2">
            <div class="label">Số điện thoại bác sĩ</div>
            <input class="mt-1 w-100" type="text" />
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="w-100">
            <div class="label">Địa điểm khám</div>
            <input class="mt-1 w-100" type="text" />
          </div>
        </div>
      </div>
      <div class="form-footer mt-2">
        <button class="btn button-blue" @click="nextStep()">Tiếp tục</button>
        <button class="btn button-blue-outline mr-2 " @click="closeFormST1">Huỷ</button>
      </div>
    </div>
  </div>
  <StepTwo v-if="isShowStepTwo" @closeFormsST2="isShowStepTwo = false"></StepTwo>
</template>
<script>
import Combobox from "../../base/BaseCombobox.vue";
import StepTwo from "./MedicalTests.vue"
export default {
  props: ["data"],
  components: {
    Combobox,
    StepTwo
  },
  data() {
    return {
      isShowStepTwo:false,
      appointment: {},
      patients: [
        {
          PatientId: "7343483484",
          PatientName: "Nguyễn Văn A",
        },
        {
          PatientId: "7343483444",
          PatientName: "Nguyễn Văn B",
        },
      ],

      formTitle: "Thêm hồ sơ",
    };
  },
  created() {
    this.appointment = this.data;
  },
  methods: {
    closeFormST1() {
      this.$emit("closeFormST1", false);
    },
    nextStep(){
      this.isShowStepTwo=!this.isShowStepTwo
    }
  },
};
</script>
<style scope>
.form-add {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 0;
  align-items: center;
}
.form-add .form-record {
  margin: 0px;
  width: 750px;
    height: 512px;
  background-color: #fff;
  padding: 20px;
}

.gr-item {
  width: 50%;
}
.label {
  font-weight: bold;
}
.process {
  display: flex;
  padding: 8px;
  justify-content: center;
}
.process-two,
.process-three,
.process-one {
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: #fff;
  font-size: 32px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #07b6c4;
  color: #07b6c4;
}
.line-two,
.line-one {
  border-bottom: 1px solid #f5f5f5;
  margin-top: 28px;
  width: 130px;
  height: 0px;
}
.bg-disable {
  background-color: #d9d9d9;
  color: #fff;
  border: none;
}
.step {
  background-color: #fff;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
}
</style>
