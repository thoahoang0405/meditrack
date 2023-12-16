<template>
    <div class="form-add">
      <div class="form-test">
        <div class="form-header">
          <div>
            {{ formTitle }}
          </div>
          <div class="icon icon-close" @click="closeFormsST2"></div>
        </div>
        <div class="process">
          <div class="process-one">1</div>
          <div class="line-one bd-blue"></div>
          <div class="process-two ">2</div>
          <div class="line-two"></div>
          <div class="process-three bg-disable">3</div>
        </div>
        <div class="step mt-2">Bước 2: Nhập thông tin xét nghiệm</div>
        <div class="form-main mt-3">
            <div class="detail mt-2">
          
              
                
            <div class="table-detail" >

                <div class="header-table  mb-1">
                    <div class="item-table" style="min-width: 158px;">Tên xét nghiệm</div>
                    <div class="item-table" style="min-width: 88px;">Đơn vị</div>
                    <div class="item-table" style="min-width: 108px;">KQ bình thường</div>
                    <div class="item-table" style="min-width: 108px;">KQ xét nghiệm</div>
                    <div class="item-table" style="min-width: 88px;">Loại mẫu BP</div>
                    <div class="item-table" style="min-width: 208px;">Ngày xét nghiệm </div>
                    <div class="item-table" style="min-width: 208px;">Bác sĩ xét nghiệm</div>
                    <div class="item-table" style="min-width: 208px;">Thời gian lấy mẫu</div>
                    <div class="item-table" style="min-width: 208px;">Thời gian nhận mẫu</div>
                    <div class="function-table-detail function-table" style="visibility: hidden; height: 30px;">
                      Chức năng     
                    </div>
    
                </div>
                <div class="main-table mt-2 mb-2" v-for="item,index in listMedication" :key="index">
                    <input class="item-table" type="text"  v-model="item.TestName" style="min-width: 150px;"/>
                    <input class="item-table" type="text" v-model="item.Unit" style="min-width: 80px;">
                    <input class="item-table" type="text" v-model="item.Normal" style="min-width: 100px;">
                    <input class="item-table" type="text" v-model="item.TestDate" style="min-width: 100px;">
                    <input class="item-table" type="text" v-model="item.TypeTest" style="min-width: 80px;">
                    <input class="item-table" type="date" v-model="item.TestDate" style="min-width: 200px;">
                    <input class="item-table" type="text" v-model="item.TestBy" style="min-width: 200px;">
                    <input class="item-table" type="text" v-model="item.SamplingTime" style="min-width: 200px;">
                    <input class="item-table" type="text" v-model="item.SampleReceiptTime" style="min-width: 200px;">
                    <div class="function-table-detail function-table">
                        <div class="icon icon-plus" @click="addRow()"></div>
                        <div v-if="index >0" class="icon icon-minus" @click="removeDetail(item,index)"></div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div class="form-footer mt-2">
          <button class="btn button-blue" @click="nextStep()">Tiếp tục</button>
          <button class="btn button-blue-outline mr-2" @click="closeFormsST2">Quay lại</button>
        </div>
      </div>
      <StepThree v-if="isShowStepThree==true" @closeFormST3="isShowStepThree = false"></StepThree>
    </div>
  </template>
  <script>
  import Combobox from "../../base/BaseCombobox.vue";
  import StepThree from './Treatments.vue'
  export default {
    props: ["data"],
    components: {
      Combobox,
      StepThree
    },
    data() {
      return {
        isShowStepThree: false,
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
        listMedication:[
            {
                TestID:"",
                TestName:"",
                Unit:"",
                Normal:"",
                TestDate:"",
                SamplingTime:"",
                SampleReceiptTime:"",
                TypeTest:"",
                TestBy:"",
                TestResult:"",
            }
        ],
  
        formTitle: "Thêm hồ sơ",
      };
    },
    created() {
      this.appointment = this.data;
    },
    methods: {
        closeFormsST2() {
        this.$emit("closeFormsST2", false);
      },
      addRow(){
          this.listMedication.push({
              TestID:"",
                  TestName:"",
                  Unit:"",
                  Normal:"",
                  TestDate:"",
                  SamplingTime:"",
                  SampleReceiptTime:"",
                  TypeTest:"",
                  TestBy:"",
                  TestResult:"",
          })
      },
      removeDetail(item,index){
          this.listMedication.splice(index,1)
      },
      nextStep(){
      this.isShowStepThree=!this.isShowStepThree
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
  .form-add .form-test {
    margin: 0px;
    width: 750px;
    height: 540px;
    background-color: #fff;
    padding: 20px;
  }
  
  .form-test .gr-item {
    position: relative;
  }
 .form-test  .label {
    font-weight: bold;
  }
  .form-test .process {
    display: flex;
    padding: 8px;
    justify-content: center;
  }
 .form-test .process-two,
 .form-test .process-three,
 .form-test .process-one {
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
 .form-test .line-two,
 .form-test .line-one {
    border-bottom: 1px solid #f5f5f5;
    margin-top: 28px;
    width: 130px;
    height: 0px;
  }
  .form-test .bg-disable {
    background-color: #d9d9d9;
    color: #fff;
    border: none;
  }
 .form-test .step {
    background-color: #fff;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
  }
  .form-test .bd-blue{
    border-bottom:2px solid #07b6c4;
  }
  
.form-test .table-detail{
    height: 315px;
    max-width: 100%;
    overflow: auto;
}
.function-table-detail{
    font-weight: bold;
}
.form-test .header-table{
    position: sticky;
    top: 0px;
    background-color: #fff;
    width: auto;
    padding: 8px ;
}
  </style>
  