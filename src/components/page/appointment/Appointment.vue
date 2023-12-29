<template>
  <div class="appointment">
    <div class="header-appoint">
      <div class="title">
        <h2 class="mr-2 mb-2">Theo dõi cuộc hẹn y tế</h2>
        <div class="radio-user mb-1">
          <input class="mr-1" type="radio" value="1" v-model="user" />
          <label class="mr-2" for="1">Tôi</label>
          <input class="mr-1" type="radio" value="2" v-model="user"  />
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
          v-model="keyword"
          @keypress.enter="getAppointment()"
        />
        <div class="icon-s">
          <span class="icon icon-search-black"></span>
        </div>
      </div>
      <button class="btn button-blue" @click="showForm()">
        + Lên lịch cuộc hẹn
      </button>
    </div>

    <div class="main" >
      <div  class="noData" v-if="patients.length==0">
                  <div class="no-data">
                    <div class="icon-noData"></div>
                    <h3>Không có dữ liệu</h3>
                  </div>
                </div>
      <div style="height: calc(100% - 80px)">
        <div
          class="group-patient mt-2"
          v-for="(patient, index) in patients"
          :key="index"
        >
          <div class="title-gr" v-if="user != 1">
            <div class="icon icon-userFamily mr-2 mt-1"></div>
            <div class="name-patient mt-1">{{ patient.PatientName }}</div>
          </div>
          <div class="list-app">
            <div
              class="item-app mr-2 mr-1 mt-2"
              v-for="(item, index) in patient.listAppointments"
              :key="index"
            >
              <div class="title-item">Cuộc hẹn: {{ item.AppointmentName }}</div>
              <div class="main-item">
                <div class="content mt-2">
                  <div class="title">Ngày dự kiến:</div>
                  <span>{{ formatDate(item.AppointmentDate) }}</span>
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
                <div class="content mt-1" v-if="user != 1">
                  <div class="title">Cuộc hẹn của:</div>
                  <span>{{ item.PatientName }}</span>
                </div>

                <div
                  class="status"
                  :class="genderClass(item.AppointmentStatus)"
                >
                  {{ formatEnum(item.AppointmentStatus) }}
                </div>
              </div>
              <div class="footer-item">
                <button class="btn delete-btn" @click="deleteAppointment(item.AppointmentID)">
                  Huỷ bỏ
                </button>
                <button class="btn update-btn" @click="showFormEdit(item)">
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="notice mt-2 mr-2" v-if="patients.length!=0">
        <div class="notice-content">
          <div class="icon notice-blue mr-1"></div>
          Bạn có 2 cuộc hẹn hôm nay
        </div>
      </div> -->
    </div>
    <Form
      v-if="isShowForm"
      @closeForm="isShowForm = false"
      :data="appointment"
      :formMode="formMode"
    ></Form>
    <Popup
      v-if="isShowPopup"
      :msg="msgError"
      :name="btnName"
      :close="1"
      @hidePopup="isShowPopup = false"
      @isDelete="deletedAppointment()"
    ></Popup>
  </div>
</template>

<script>
import Form from "./AppointmentAdd.vue";
import Popup from "../../base/BasePopup.vue";
import axios from "axios";
import MSFunction from "../../../js/common/function";
export default {
  name: "Appointment-page",
  props: {
    msg: String,
  },
  components: {
    Form,
    Popup,
  },
  mounted() {
    this.emitter.on("loadData", () => {
      this.getAppointment();
    });
    
  },
  data() {
    return {
      id : localStorage.getItem("data"),
      keyword:'',
      formMode:1,
      btnName: "Có",
      msgError:
        "Bạn có chắc chắn muốn xoá <strong>cuộc hẹn</strong> này không?",
      isShowPopup: false,
      appointment: {},
      isShowForm: false,
      
        user: 1,
        appointmentDeleted:null,
      listPatient: [],
      patients: [
      
      ],
      listAppointment: [
        {
          AppointmentID: "111111",
          AppointmentName: "Khám sức khoẻ định kỳ",
          AppointmentDate: "12/12/2023",
          AppointmentStatus: 1,
          PatientName: "Nguyễn Văn A",
          PatientId: "7343483484",
          DoctorPhoneNumber: "939377373",
          DoctorName: "Kiều Văn Khương",
          Address: "Hà nội",
          Description: "Từ 9h đến 10h",
        },
        {
          AppointmentID: "111786671",
          AppointmentName: "Khám sức khoẻ định kỳ",
          AppointmentDate: "12/12/2023",
          AppointmentStatus: 2,
          PatientId: "7343483484",
          PatientName: "Nguyễn Văn A",
          DoctorPhoneNumber: "939377373",
          DoctorName: "Kiều Văn Khương",
          Address: "Hà nội",
          Description: "Từ 9h đến 10h",
        },
        {
          AppointmentID: "133111",
          AppointmentName: "Khám sức khoẻ định kỳ",
          AppointmentDate: "12/12/2023",
          AppointmentStatus: 3,
          PatientId: "7343483484",
          PatientName: "Nguyễn Văn A",
          DoctorPhoneNumber: "939377373",
          DoctorName: "Kiều Văn Khương",
          Address: "Hà nội",
          Description: "Từ 9h đến 10h",
        },
        {
          AppointmentID: "111133",
          AppointmentName: "Khám sức khoẻ định kỳ",
          AppointmentDate: "12/12/2023",
          AppointmentStatus: 4,
          PatientId: "7343483444",
          PatientName: "Nguyễn Văn B",
          DoctorPhoneNumber: "939377373",
          DoctorName: "Kiều Văn Khương",
          Address: "Hà nội",
          Description: "Từ 9h đến 10h",
        },
        {
          AppointmentID: "1114411",
          AppointmentName: "Khám sức khoẻ định kỳ",
          AppointmentDate: "12/12/2023",
          AppointmentStatus: 1,
          PatientId: "7343483444",
          PatientName: "Nguyễn Văn B",
          DoctorPhoneNumber: "939377373",
          DoctorName: "Kiều Văn Khương",
          Address: "Hà nội",
          Description: "Từ 9h đến 10h",
        },
      ],
      error: {
        AppointmentName: "",
      },
      rules: {
        AppointmentName: "",
      },
    };
  },
  created() {
    debugger
    this.getAppointment();
    this.getComboboxPatient();
    
  },
 
  watch: {
   
    user: function () {
      if (this.user == 1) {
        this.getAppointment()
      }else{
        this.getAppointment()
      }
    },
    keyword:function(){
      if(this.keyword==''){
        this.getAppointment()
      }
    }
    
  },
  methods: {
    formatDate(date) {
      return MSFunction.formatDate(date);
    },
    deletedAppointment(){
      
      this.isShowPopup = !this.isShowPopup;
     var url="https://localhost:44371/api/Appoinments" 
     axios
        .delete(`${url}/${this.appointmentDeleted}`)
        .then((response) => {
          this.getAppointment();
          this.$toast.open({
          message: 'Huỷ bỏ cuộc hẹn thành công.',
          type: 'success',
          position:'top'
      });
        })
        .catch((err) => {
          console.log(err);
        });
 
    },
    deleteAppointment(val) {
      this.isShowPopup = !this.isShowPopup;
      this.appointmentDeleted=val
    },
    showForm() {
      this.isShowForm = !this.isShowForm;
      this.formMode=1
    },
    showFormEdit(item) {
      debugger
      this.isShowForm = !this.isShowForm;
      this.appointment = item;
      this.formMode=2
    },
    formatEnum(e) {
      var text = "";
      switch (e) {
        case 1:
          text = "Mới tạo";
        
          break;
        case 2:
          text = "Sắp tới";
          break;
        case 3:
          text = "Đã hoàn thành";
          break;
        case 4:
          text = "Bỏ lỡ";
          break;

        default:
          break;
      }
      return text;
    },
    genderClass(e) {
      var text = "";
      switch (e) {
        case 1:
          text = "clr-green";
          break;
        case 2:
          text = "clr-warning";
          break;
        case 3:
          text = "clr-blue";
          break;
        case 4:
          text = "clr-red";
          break;

        default:
          break;
      }
      return text;
    },
    getComboboxPatient() {
      var url = "https://localhost:44371/api/FamilyMembers";
      axios
        .get(`${url}/id?id=${this.id}`)
        .then((response) => {
          this.listPatient = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAppointment() {
      var me = this;
      var url =`https://localhost:44371/api/Appoinments/appointments?keyword=${this.keyword}&id=${this.id}`;
      axios
        .get(`${url}`)
        .then(function (res) {
          if (res.data.length > 0) {
            me.listAppointment = res.data;
            me.patients=[]
            if (me.user != 1) {
              var appointment = me.listAppointment.filter(
                (item) => item.PatientID != null
              );
              for (let i = 0; i < me.listPatient.length; i++) {
                const el = me.listPatient[i];
                me.listPatient[i].listAppointments = appointment.filter(
                  (item) => item.PatientID == el.PatientID
                );
                if (
                  me.listPatient[i].listAppointments &&
                  me.listPatient[i].listAppointments.length > 0
                ) {
                  me.patients.push(me.listPatient[i]);
                }
              }
            } else {
              var appointment = me.listAppointment.filter(
                (item) => item.PatientID == null || item.PatientName == ""
              );
              me.patients.push({ PatientID: null, PatientName: "",listAppointments:[] });
              if (appointment && appointment.length > 0) {
                for (let i = 0; i < appointment.length; i++) {
                  const el = appointment[i];
                  me.patients[0].listAppointments.push(el) ;
                }
              }
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    /**
     * hàm check validate tổng
     * AUTHOR: HTTHOA(9/03/2023)
     */
    validateAll() {
      let isValidAll = true; // biến check lỗi tổng
      for (const propName in this.rules) {
        let isValid = true; // biến check lỗi khi duyệt qua 1 trường dữ liệu

        for (const key in this.rules[propName]) {
          if (isValid) {
            let functionName = `validate${key}`;

            // kiểm tra nếu còn đúng thì validate tiếp
            if (isValid == true) {
              isValid = this[functionName](this.rules[propName][key], propName);
            }
          }
        }
        if (isValidAll) {
          isValidAll = isValid;
        }
      }
      if (!isValidAll) {
        this.focusToInputError();
      }

      return isValidAll;
    },
    focusToInputError() {
      try {
        for (const key in this.error) {
          // kiểm tra xem trường nào có lỗi thì focus vào trường đó và break ngay
          if (this.error[key] !== "") {
            this.$refs[key].focus();
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    /**
     *
     * validate duyệt từng hàm validate chi tiết
     * AUTHOR: HTTHOA(9/03/2023)
     */
    validate(propName) {
      // sau 0.2s thì validate để cập nhật dữ liệu trước khi validate
      setTimeout(() => {
        let isValid = true; //  biến lưu giá trị validate sau mỗi vòng for
        for (const key in this.rules[propName]) {
          let functionName = `validate${key}`;
          if (isValid == true) {
            isValid = this[functionName](this.rules[propName][key], propName);
          }
        }
      }, 200);
    },

    /**
     *
     * validate bắt buộc nhập
     * AUTHOR: HTTHOA(9/03/2023)
     */
    validateRequired(value, propName) {
      // kiểm tra rỗng thì lưu lại lỗi và trả về false
      if (!this.appointments[propName]) {
        this.error[propName] = "không được để trống";

        return false;
      } else {
        this.error[propName] = "";
        return true;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(./Appointment.scss);
</style>
