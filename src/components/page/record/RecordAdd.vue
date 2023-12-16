<template>
  <div class="form-add">
    <div class="form-record" v-if="isShowStep1">
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
            <input class="mt-1 w-100" type="text" v-model="records.RecordTitle" />
          </div>
          <div class="gr-item ml-2 mr-2 w-30">
            <div class="label">Ngày tạo</div>
            <input class="mt-1 w-100" type="date" v-model="records.RecordDate " />
          </div>
          <div class="gr-item ml-2 w-30">
            <div class="label">Họ tên</div>
            <input class="mt-1 w-100" type="text" v-model="records.FullName" />
          </div>
        </div>

        <div class="group-controll mt-2">
          <div class="gr-item mr-2">
            <div class="label">Ngày sinh</div>
            <input class="mt-1 w-100" type="text" v-model="records.DateOfBirth " />
          </div>
          <div class="gr-item mr-2 ml-2">
            <div class="label">Số điện thoại</div>
            <input class="mt-1 w-100" type="text" v-model="records.PhoneNumber " />
          </div>
          <div class="w-25 ml-2">
            <div class="label">Giới tính</div>
            <div class="mb-1" style="display: flex">
              <input class="mr-1 mt-2" type="radio" value="0" v-model="records.Gender " />
              <p class="mr-2" for="1">Nam</p>
              <input class="mr-1 mt-2" type="radio" value="1" v-model="records.Gender " />
              <p for="2">Nữ</p>
            </div>
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="w-100">
            <div class="label">Địa chỉ</div>
            <input class="mt-1 w-100" type="text" v-model="records.Address " />
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
              v-model="records.PatientID" />
            </div>
          </div>
          <div class="gr-item mr-2">
            <div class="label">Tên bác sĩ</div>
            <input class="mt-1 w-100" type="text" v-model="records.DoctorName" />
          </div>
          <div class="gr-item ml-2">
            <div class="label">Số điện thoại bác sĩ</div>
            <input class="mt-1 w-100" type="text" v-model="records.DoctorPhoneNumber" />
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="w-100">
            <div class="label">Địa điểm khám</div>
            <input class="mt-1 w-100" type="text" v-model="records.MedicalExaminationAddress" />
          </div>
        </div>
      </div>
      <div class="form-footer mt-2">
        <button class="btn button-blue" @click="nextStep1()">Tiếp tục</button>
        <button class="btn button-blue-outline mr-2 " @click="closeFormST1">Huỷ</button>
      </div>
    </div>
    <div class="form-treat" v-if="isShowStep3">
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
              <input class="mt-1 w-100" type="text" v-model="records.Treatments.TreatmentDescription" />
            </div>
           
          </div>
  
          <div class="group-controll mt-2">
            <div class="w-100 mr-2">
              <div class="label">Lịch sử bệnh</div>
              <input class="mt-1 w-100" type="text" v-model="records.Treatments.MedicalHistory" />
            </div>
            
          </div>
          <div class="group-controll mt-2">
            <div class="gr-item mr-2">
              <div class="label">Ngày điều trị</div>
              <input class="mt-1 w-100" type="date" v-model="records.Treatments.TreatmentDate" />
            </div>
            <div class="gr-item ml-2 mr-2">
              <div class="label">Tên đơn thuốc</div>
              <input class="mt-1 w-100" type="text" v-model="records.Treatments.PrescriptionName" />
            </div>
          </div>
         
          <div class="group-controll mt-2">
            <div class="w-100 mr-2">
              <div class="label">Chẩn đoán</div>
              <input class="mt-1 w-100" type="text" v-model="records.Treatments.Diagnosis" />
            </div>
          </div>
          <div class="group-controll mt-2">
            <div class="w-100 mr-2">
              <div class="label">Ghi chú</div>
              <input class="mt-1 w-100" type="text" v-model="records.Treatments.Notes" />
            </div>
          </div>
        </div>
        <div class="form-footer mt-2">
          <button class="btn button-blue" @click="save()">Lưu</button>
          <button class="btn button-blue-outline mr-2" @click="closeStep3()">Quay lại</button>
        </div>
      </div>
      <div class="form-test" v-if="isShowStep2">
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
                <div class="main-table mt-2 mb-2" v-for="item,index in recods.MedicalTests" :key="index">
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
          <button class="btn button-blue" @click="nextStep2()">Tiếp tục</button>
          <button class="btn button-blue-outline mr-2" @click="closeStep2()">Quay lại</button>
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
      isShowStep2:false,
      isShowStep1:true,
      isShowStep3:false,
      isShowStepTwo:false,
      appointment: {},
      recods:{
        MedicalTests:[
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
        Treatments:[
          {

          }
        ]
      },
      
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
    closeStep2() {
      this.isShowStep1=!this.isShowStep1
      this.isShowStep2=!this.isShowStep2
    },
    closeStep3(){
      this.isShowStep2=!this.isShowStep2
      this.isShowStep3=!this.isShowStep3
    },
    nextStep1(){
      this.isShowStep1=!this.isShowStep1
      this.isShowStep2=!this.isShowStep2
    },
    nextStep2(){
      this.isShowStep2=!this.isShowStep2
      this.isShowStep3=!this.isShowStep3
    },
    
      addRow(){
          this.MedicalTests.push({
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
          this.MedicalTests.splice(index,1)
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
