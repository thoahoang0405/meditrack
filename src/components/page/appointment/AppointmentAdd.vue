<template>
  <div class="form-add">
    <div class="form-appointment">
      <div class="form-header">
        <div >
            {{ formTitle }}
        </div>
        <div class="icon icon-close" @click="closeForm" ></div>
      </div>
      <div class="form-main">
        <div class="group-controll">
          <div class="gr-item mr-2">
            <div class="label">Tên cuộc hẹn</div>
            <input class="mt-1 w-100" type="text" v-model="appointments.AppointmentName" />
          </div>
          <div class="gr-item ml-2">
            <div class="label">Ngày dự kiến</div>
            <input class="mt-1 w-100" type="date" v-model="appointments.AppointmentDate" />
          </div>
        </div>
      
        <div class="group-controll mt-2">
            <div  class="gr-item ">

                <div class="label">Cuộc hẹn cho</div>
                <div  class="mt-1 w-100">
                    <Combobox
                      class="item-input check-input"
                      :items="patients"                 
                      :fieldCode="'PatientName'"
                      :fieldName="'PatientName'"
                      :value="appointments.PatientName"
                      @selectedItem="selectItemCbb"
                       />
                </div>
            </div>
            <div class="gr-item ml-2">
            <div class="label">Trạng thái cuộc hẹn</div>
            <div class=" mb-1" style="display: flex;">
          <input class="mr-1 mt-2" type="radio" value="3" v-model="appointments.AppointmentStatus" />
          <p class="mr-2" for="1">Đã hoàn thành</p>
          <input class="mr-1 mt-2" type="radio" value="4"  v-model="appointments.AppointmentStatus" />
          <p for="2">Bỏ lỡ</p>
        </div>
          </div>
        
        </div>
        <div class="group-controll mt-2">
          <div class="gr-item mr-2">
            <div class="label">Tên bác sĩ </div>
            <input class="mt-1 w-100" type="text" v-model="appointments.DoctorName" />
          </div>
          <div class="gr-item ml-2">
            <div class="label">Số điện thoại</div>
            <input class="mt-1 w-100" type="text" v-model="appointments.DoctorPhoneNumber" />
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class=" w-100">
            <div class="label">Địa điểm</div>
            <input class="mt-1 w-100" type="text" v-model="appointments.Address " />
          </div>
         
        </div>
        <div class="group-controll mt-2">
          <div class=" w-100">
            <div class="label">Ghi chú</div>
            <input class="mt-1 w-100" type="text" v-model="appointments.Description" />
          </div>
         
        </div>
      </div>
      <div class="form-footer mt-2">
        <button class="btn button-blue" @click="save()"> Lưu</button>
        <button class="btn button-blue-outline mr-2"> Huỷ</button>

      </div>
    </div>
  </div>
</template>
<script>
import Combobox from "../../base/BaseCombobox.vue";
import axios from "axios";
export default {
    props:['data'],
    components: {
    Combobox,
  },
  data() {
    return {
        appointments:{
          AppointmentID:'0000',
          AppointmentName:'',
          AppointmentDate:null,
          PatientName:'',
          AppointmentStatus:0,
          DoctorName:'',
          DoctorPhoneNumber:'',
          Address:'',
          Description:'',
          PatientName:'',
          PatientID:null,

        },
        PatientName:'',
        PatientID:'',
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

      formTitle: "Lên lịch cuộc hẹn",
    };
  },
  created() {
    this.appointment= this.data
    this.getComboboxPatient()
},
mounted() {
  this.getComboboxPatient()
},
  methods:{
    closeForm(){

        this.$emit("closeForm", false);
    },
    getComboboxPatient(){
    debugger
      var url="https://localhost:44371/api/FamilyMembers"
      axios
        .get(`${url}`)
        .then((response) => {
          this.patients = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectItemCbb(value) {
      debugger
      if (value) {        
        this.appointments.PatientName=value.PatientName
        this.appointments.PatientID=value.PatientID
      } else {
        this.appointments.PatientName=''
        this.appointments.PatientID=''
      }
    
    },
    save(){
      
      console.log(this.appointments)
    }
  }
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
.form-add .form-appointment {
  margin: 0px;
  width: 500px;
  height: auto;
  max-height: 800px;
  background-color: #fff;
  padding: 20px;
}

.gr-item {
  width: 50%;
}
 .label {
  font-weight: bold;
}

</style>
