<template>
  <div class="form-add">
    <div class="form-appointment">
      <div class="form-header">
        <div>
          {{ formTitle }}
        </div>
        <div class="icon icon-close" @click="closeForm"></div>
      </div>
      <div class="form-main">
        <div class="group-controll">
          <div class="gr-item w-50 mr-2">
            <div class="label">Tên cuộc hẹn</div>
            <input
              class="mt-1 w-100"
              ref="AppointmentName"
              :class="error.AppointmentName != '' ? 'border-error' : ''"
              @blur="validate('AppointmentName')"
              @focus="$refs.AppointmentName.select()"
              v-model="appointments.AppointmentName"
            />
            <p class="error" v-if="error.AppointmentName != ''">
              {{ error.AppointmentName }}
            </p>
          </div>
          <div class="gr-item w-50 ml-2">
            <div class="label">Ngày dự kiến</div>
            <input
              class="mt-1 w-100"
              type="date"
              ref="AppointmentDate"
              :class="error.AppointmentDate != '' ? 'border-error' : ''"
              @blur="validate('AppointmentDate')"
              @focus="$refs.AppointmentDate.select()"
              v-model="appointments.AppointmentDate"
            />
            <p class="error" v-if="error.AppointmentDate != ''">
              {{ error.AppointmentDate }}
            </p>
          </div>
        </div>

        <div class="group-controll mt-2">
          <div class="gr-item w-50">
            <div class="label">Cuộc hẹn cho</div>
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
          <div class="gr-item w-50 ml-2">
            <div class="label">Trạng thái cuộc hẹn</div>
            <div class="mb-1" style="display: flex">
              <input class="mr-1 mt-1" type="radio" value="3" />
              <p class="mr-2" for="1">Đã hoàn thành</p>
              <input class="mr-1 mt-1" type="radio" value="4" />
              <p for="2">Bỏ lỡ</p>
            </div>
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="gr-item w-50 mr-2">
            <div class="label">Tên bác sĩ</div>
            <input
              class="mt-1 w-100"
              type="text"
              ref="DoctorName"
              :class="error.DoctorName != '' ? 'border-error' : ''"
              @blur="validate('DoctorName')"
              @focus="$refs.DoctorName.select()"
              v-model="appointments.DoctorName"
            />
            <p class="error" v-if="error.DoctorName != ''">
              {{ error.DoctorName }}
            </p>
          </div>
          <div class="gr-item w-50 ml-2">
            <div class="label">Số điện thoại</div>
            <input
              class="mt-1 w-100"
              type="text"
              ref="DoctorPhoneNumber"
              :class="error.DoctorPhoneNumber != '' ? 'border-error' : ''"
              @blur="validate('DoctorPhoneNumber')"
              @focus="$refs.DoctorPhoneNumber.select()"
              v-model="appointments.DoctorPhoneNumber"
            />
            <p class="error" v-if="error.DoctorPhoneNumber != ''">
              {{ error.DoctorPhoneNumber }}
            </p>
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="w-100 gr-item">
            <div class="label">Địa điểm</div>
            <input
              class="mt-1 w-100"
              type="text"
              ref="Address"
              :class="error.Address != '' ? 'border-error' : ''"
              @blur="validate('Address')"
              @focus="$refs.Address.select()"
              v-model="appointments.Address"
            />
            <p class="error" v-if="error.Address != ''">
              {{ error.Address }}
            </p>
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="w-100">
            <div class="label">Ghi chú</div>
            <input class="mt-1 w-100" type="text" />
          </div>
        </div>
      </div>
      <div class="form-footer mt-2">
        <button class="btn button-blue">Lưu</button>
        <button class="btn button-blue-outline mr-2">Huỷ</button>
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
      appointments: {
        AppointmentName: "",
        AppointmentDate: "",
        DoctorName: "",
        DoctorPhoneNumber: "",
        Address: "",
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
      error: {
        AppointmentName: "",
        AppointmentDate: "",
        DoctorName: "",
        DoctorPhoneNumber: "",
        Address: "",
      },
      rules: {
        AppointmentName: { Required: true },
        AppointmentDate: { Required: true },
        DoctorName: { Required: true },
        DoctorPhoneNumber: { Required: true },
        Address: { Required: true },
      },
      formTitle: "Lên lịch cuộc hẹn",
    };
  },
  created() {
    this.appointment = this.data;
  },
  methods: {
    closeForm() {
      this.$emit("closeForm", false);
    },
    /**
     * hàm check validate tổng
     * AUTHOR: HTTHOA(9.12.2023)
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
     * AUTHOR: HTTHOA(9.12.2023)
     */
    validate(propName) {
      debugger;
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
     * AUTHOR: HTTHOA(9.12.2023)
     */
    validateRequired(value, propName) {
      // kiểm tra rỗng thì lưu lại lỗi và trả về false
      if (!this.appointments[propName]) {
        this.error[propName] = "Không được để trống";

        return false;
      } else {
        this.error[propName] = "";
        return true;
      }
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
  position: relative;
}
.label {
  font-weight: bold;
}
</style>
