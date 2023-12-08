<template>
    <div class="form-add">
      <div class="form-treat">
        <div class="form-header">
          <div>
            {{ formTitle }}
          </div>
          <div class="icon icon-close" @click="closeFormST3"></div>
        </div>
        <div class="process">
          <div class="process-one">1</div>
          <div class="line-one bd-blue"></div>
          <div class="process-two">2</div>
          <div class="line-two bd-blue"></div>
          <div class="process-three ">3</div>
        </div>
        <div class="step mt-2">Bước 3: Nhập thông tin điều trị</div>
        <div class="form-main">
          <div class="group-controll">
            <div class=" mr-2 w-100">
              <div class="label">Mô tả điều trị</div>
              <input class="mt-1 w-100" type="text" />
            </div>
           
          </div>
  
          <div class="group-controll mt-2">
            <div class="w-100 mr-2">
              <div class="label">Lịch sử bệnh</div>
              <input class="mt-1 w-100" type="text" />
            </div>
            
          </div>
          <div class="group-controll mt-2">
            <div class="gr-item mr-2">
              <div class="label">Ngày điều trị</div>
              <input class="mt-1 w-100" type="date" />
            </div>
            <div class="gr-item ml-2 mr-2">
              <div class="label">Tên đơn thuốc</div>
              <input class="mt-1 w-100" type="text" />
            </div>
          </div>
         
          <div class="group-controll mt-2">
            <div class="w-100 mr-2">
              <div class="label">Chẩn đoán</div>
              <input class="mt-1 w-100" type="text" />
            </div>
          </div>
          <div class="group-controll mt-2">
            <div class="w-100 mr-2">
              <div class="label">Ghi chú</div>
              <input class="mt-1 w-100" type="text" />
            </div>
          </div>
        </div>
        <div class="form-footer mt-2">
          <button class="btn button-blue" @click="nextStep()">Lưu</button>
          <button class="btn button-blue-outline mr-2" @click="closeFormST3">Quay lại</button>
        </div>
      </div>
      <StepTwo v-if="isShowStepTwo==true"></StepTwo>
    </div>
    
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
        appointment: {},
        isShowStepTwo:false,
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
        closeFormST3() {
        this.$emit("closeFormST3", false);
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
    z-index: 12;
  }
  .form-add .form-treat {
    margin: 0px;
    width: 750px;
    height: 512px;
    background-color: #fff;
    padding: 20px;
  }
  
  .form-treat .gr-item {
    width: 50%;
  }
 .form-treat  .label {
    font-weight: bold;
  }
  .form-treat .process {
    display: flex;
    padding: 8px;
    justify-content: center;
  }
 .form-treat .process-two,
 .form-treat .process-three,
 .form-treat .process-one {
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
 .form-treat .line-two,
 .form-treat .line-one {
    border-bottom: 1px solid #f5f5f5;
    margin-top: 28px;
    width: 130px;
    height: 0px;
  }
  .form-treat .bg-disable {
    background-color: #d9d9d9;
    color: #fff;
    border: none;
  }
 .form-treat .step {
    background-color: #fff;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
  }
  .form-treat .bd-blue{
    border-bottom:2px solid #07b6c4;
  }
  </style>
  