<template>
  <div class="appointment">
    <div class="header-appoint">
      <div class="title">
        <h2 class="mr-2 mb-2">Theo dõi cuộc hẹn y tế</h2>
        <div class="radio-user mb-1">
          <input class="mr-1" type="radio" value="1" v-model="model.user" />
          <label class="mr-2" for="1">Tôi</label>
          <input class="mr-1" type="radio" value="2" v-model="model.user" />
          <label for="2">Gia đình</label>
        </div>
      </div>
    </div>
    <div class="nav mt-2">
      <div class="search-fn">
        <input
          type="text"
          placeholder="Nhập tên cuộc hẹn để tìm kiếm"
          class="input-seach"
        />
        <div class="icon-s">
          <span class="icon icon-search-black"></span>
        </div>
      </div>
      <button class="btn button-blue" @click="showForm()">+ Lên lịch cuộc hẹn</button>
    </div>

    <div class="main">
      <div style="height:calc(100% - 80px) ; ">
      <div class="list-app mt-2">

          <div class="item-app mr-2 mr-1 mt-2" v-for="(item,index) in listAppointment" :key="index">
            <div class="title-item">Cuộc hẹn: {{ item.AppointmentName }}</div>
            <div class="main-item">
              <div class="content mt-2">
                <div class="title">Ngày dự kiến:</div>
                <span>{{ item.AppointmentDate }}</span>
              </div>
              <div class="content mt-1">
                <div class="title">Địa điểm:</div>
                <span>{{ item.Address }}</span>
              </div>
              <div class="content mt-1">
                <div class="title">Tên bác sĩ:</div>
                <span>{{ item.DoctorName }}</span>
              </div>
              <div class="content mt-1">
                <div class="title">Số điện thoại:</div>
                <span>{{ item.DoctorPhoneNumber }}</span>
              </div>
              <div class="content mt-1" v-if="model.user!=1">
                <div class="title">Cuộc hẹn của:</div>
                <span>{{ item.PatientName }}</span>
              </div>

              <div class="status" :class="genderClass(item.AppointmentStatus)" >{{ formatEnum(item.AppointmentStatus) }}</div>
            </div>
            <div class="footer-item">
              <button class="btn delete-btn" @click="deleteAppointment">Huỷ bỏ</button>
              <button class="btn update-btn" @clcik="showFormEdit(item)" >Cập nhật</button>
            </div>
          </div>
        </div>
        </div>
      <div class="notice mt-2 mr-2">
        <div class="notice-content">
          <div class="icon notice-blue mr-1"></div>
          Bạn có 2 cuộc hẹn hôm nay
        </div>
      </div>
    </div>
    <Form v-if="isShowForm" @closeForm="isShowForm=false" :data="appointment"></Form>
    <Popup
      v-if="isShowPopup"
      :msg="msgError"
      :name="btnName"
      :close="1"
      @hidePopup="isShowPopup=false"
      @isDelete="deleteAppointment()"
    ></Popup>
  </div>
</template>

<script>
import Form from './AppointmentAdd.vue'
import Popup from "../../base/BasePopup.vue";
import axios from 'axios'
export default {
  name: "Appointment-page",
  props: {
    msg: String,
  },
  components:{
    Form,Popup
  },
  data() {
    return {
      btnName:"Có",
      msgError:"Bạn có chắc chắn muốn xoá <strong>cuộc hẹn</strong> này không?",
      isShowPopup:false,
      appointment:{},
      isShowForm:false,
      model: {
        user: 1,
      },
      listAppointment: [
        {
          AppointmentID:"111111",
          AppointmentName: "Khám sức khoẻ định kỳ",
          AppointmentDate:"12/12/2023",
          AppointmentStatus:1,
          PatientName:'Nguyễn Văn A',
          DoctorPhoneNumber:"939377373",
          DoctorName:"Kiều Văn Khương",
          Address :"Hà nội",
          Description:"Từ 9h đến 10h"
        },
        {
          AppointmentID:"111786671",
          AppointmentName: "Khám sức khoẻ định kỳ",
          AppointmentDate:"12/12/2023",
          AppointmentStatus:2,
          PatientName:'Nguyễn Văn A',
          DoctorPhoneNumber:"939377373",
          DoctorName:"Kiều Văn Khương",
          Address :"Hà nội",
          Description:"Từ 9h đến 10h"
        },
        {
          AppointmentID:"133111",
          AppointmentName: "Khám sức khoẻ định kỳ",
          AppointmentDate:"12/12/2023",
          AppointmentStatus:3,
          PatientName:'Nguyễn Văn A',
          DoctorPhoneNumber:"939377373",
          DoctorName:"Kiều Văn Khương",
          Address :"Hà nội",
          Description:"Từ 9h đến 10h"
        },
        {
          AppointmentID:"111133",
          AppointmentName: "Khám sức khoẻ định kỳ",
          AppointmentDate:"12/12/2023",
          AppointmentStatus:4,
          PatientName:'Nguyễn Văn A',
          DoctorPhoneNumber:"939377373",
          DoctorName:"Kiều Văn Khương",
          Address :"Hà nội",
          Description:"Từ 9h đến 10h"
        },
        {
          AppointmentID:"1114411",
          AppointmentName: "Khám sức khoẻ định kỳ",
          AppointmentDate:"12/12/2023",
          AppointmentStatus:1,
          PatientName:'Nguyễn Văn A',
          DoctorPhoneNumber:"939377373",
          DoctorName:"Kiều Văn Khương",
          Address :"Hà nội",
          Description:"Từ 9h đến 10h"
        },
       
      ],
    };
  },
  created() {
    this.getAppointment()
  },
 
  methods: {
    deleteAppointment(){
      this.isShowPopup= !this.isShowPopup
    },
    showForm(){
      this.isShowForm = !this.isShowForm
    },
    showFormEdit(item){
      this.isShowForm = !this.isShowForm
      this.appointment=item
    },
    formatEnum(e){
      var text=''
      switch (e) {
        case 1:
        text= 'Mới tạo'
        // el[0].classList.add('clr-green')
          break;
          case 2:
          text= 'Sắp tới'
          // el[0].classList.add('clr-warning')
          break;
          case 3:
          text= 'Đã hoàn thành'
          // el[0].classList.add('clr-blue')
          break;
          case 4:
          // el[0].classList.add('clr-red')
          text= 'Bỏ lỡ'
          break;
         
        default:
          break;
      }
      return text;
    },
    genderClass(e){
      var text=''
      switch (e) {
        case 1:
        text= 'clr-green'
          break;
          case 2:
          text= 'clr-warning'
          break;
          case 3:
          text= 'clr-blue'
          break;
          case 4:
          text= 'clr-red'
          break;
         
        default:
          break;
      }
      return text;
    },
    getAppointment() {
      var me = this;
      axios
        .get("https://localhost:44371/api/Appoinments")
        .then(function (res) {
          if (res.data.length > 0) {
            me.listAppointment=res.data
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(./Appointment.scss);
</style>
