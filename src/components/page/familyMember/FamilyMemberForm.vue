<template>
    <div class="form-add">
      <div class="form-family">
        <div class="form-header">
          <div>
            {{ formTitle }}
          </div>
          <div class="icon icon-close" @click="closeForm"></div>
        </div>
      
        <div class="form-main">
          <div class="group-controll">
            <div class=" mr-2 w-100">
              <div class="label">Họ và tên</div>
              <input class="mt-1 w-100" type="text" />
            </div>
           
          </div>
  
          <div class="group-controll mt-2">
            <div class="w-100 mr-2">
              <div class="label">Ngày sinh</div>
              <input class="mt-1 w-100" type="date" />
            </div>
            
          </div>
          <div class="group-controll mt-2">
            <div class="w-100 mr-2">
              <div class="label">Mối quan hệ</div>
              <input class="mt-1 w-100" type="text" />
            </div>
            
          </div>
          <div class="group-controll mt-2">
            <div class="w-100  mr-2">
              <div class="label">Số điện thoại</div>
              <input class="mt-1 w-100" type="text" />
            </div>
          </div>
          <div class="group-controll mt-2">
            <div class="w-100 mr-2">
              <div class="label">Thông tin liên hệ</div>
              <input class="mt-1 w-100" type="text" />
            </div>
          </div>
          
        </div>
        <div class="form-footer mt-2">
          <button class="btn button-blue" >Lưu</button>
          <button class="btn button-blue-outline mr-2" @click="closeForm">Huỷ bỏ</button>
        </div>
      </div>
    </div>
    
  </template>
  <script>
  import Combobox from "../../base/BaseCombobox.vue";
  export default {
    props: ["data"],
    components: {
      Combobox,
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
  
        formTitle: "Thêm người thân",
      };
    },
    created() {
      this.appointment = this.data;
    },
    methods: {
        closeForm() {
        this.$emit("closeForm", false);
      },
      
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
  .form-add .form-family {
    margin: 0px;
    width: 350px;
    height: auto;
    background-color: #fff;
    padding: 20px;
  }
  
  .form-family .gr-item {
    width: 50%;
  }
 .form-family  .label {
    font-weight: bold;
  }
  .form-family .process {
    display: flex;
    padding: 8px;
    justify-content: center;
  }
 .form-family .process-two,
 .form-family .process-three,
 .form-family .process-one {
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
 .form-family .line-two,
 .form-family .line-one {
    border-bottom: 1px solid #f5f5f5;
    margin-top: 28px;
    width: 130px;
    height: 0px;
  }
  .form-family .bg-disable {
    background-color: #d9d9d9;
    color: #fff;
    border: none;
  }
 .form-family .step {
    background-color: #fff;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
  }
  .form-family .bd-blue{
    border-bottom:2px solid #07b6c4;
  }
  </style>
  