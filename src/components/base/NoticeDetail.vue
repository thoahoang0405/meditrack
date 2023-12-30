<template>
  <div id="popup-n" @keyup.enter="keypressEnter" tabindex="0">
    <div class="popup-n">
      <div class="popup-n-header">
        {{ noticeOb.NoticeType }}{{ noticeOb.NoticeName }}
      </div>
      <div class="popup-n-body">
        <div
          class="content-popup-n"
       
        >
        <div class="notice"    v-for="(item, index) in listDetail"
          :key="index">

          <div class="item-notice" v-if="noticeOb.NoticeType == 'Đơn thuốc '">
            <p style="font-weight: bold">{{ item.MedicationName }} :</p>
            <p v-if="item.QuantityForMorning > 0">
              Sáng - {{ item.QuantityForMorning }} {{ item.Unit }},
            </p>
            <p v-if="item.QuantityForAfternoon > 0">
              Chiều - {{ item.QuantityForAfternoon }} {{ item.Unit }},
            </p>
            <p>{{ item.RouteOfAdministration }}</p>
          </div>
        </div>
          <div
            class="item-notice-app"
            v-if="noticeOb.NoticeType != 'Đơn thuốc '"
          >
            <p style="font-weight: bold">Địa điểm: {{ item.Address }}</p>
            <p style="font-weight: bold">Tên Bác sĩ: {{ item.DoctorName }}</p>
            <p style="font-weight: bold">
              Số điện thoại: {{ item.DoctorPhoneNumber }}
            </p>
          </div>
        </div>
      </div>
      <div class="popup-n-footer">
        <button class="btn button-blue" @click="onClickYes()">Đóng</button>
      </div>
    </div>
  </div>
</template>
<script>
import { CloseST } from "../../js/common/enumeration";
import axios from "axios";
export default {
  data() {
    return {
      noticeOb: {},
      closeStatus: 0,
      msg1: "",
      btnLeft1: "",
      name1: "",
      item1: "",
      listDetail: [
        {
          MedicationID: "00000000-0000-0000-0000-000000000000",
          MedicationName: "a",
          QuantityForMorning: 1,
          QuantityForAfternoon: 1,
          Unit: "Viên",
          Notes: "",
          RouteOfAdministration: "sau ăn",
          Warnings: "",
          ExpiryDate: null,
          SideEffects: "",
         
        },
      ],
    };
  },

  watch: {
    close: function (value) {
      this.closeStatus = value;
    },
  },
  created() {
    this.noticeOb = this.notice;
    if (this.noticeOb.NoticeType == "Đơn thuốc ") {
      this.getPresID(this.noticeOb.TypeID);
    } else {
      this.getAppointID(this.noticeOb.TypeID);
    }
  },
  props: ["notice"],
  methods: {
    keypressEnter() {
      if (this.closeStatus == CloseST.EditClose) {
        this.onclickNoSave();
      }
    },

    onClickYes() {
      this.$emit("closePopup", false);
    },
    getPresID(id) {
      this.listDetail = [];
      var url = "https://localhost:44371/api/Prescriptions/medications?id=";
      axios
        .get(`${url}${id}`)
        .then((response) => {
          this.listDetail = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAppointID(id) {
        debugger
      this.listDetail = [];
      axios
        .get(`https://localhost:44371/api/Appoinments/appointmentID?id=${id}`)
        .then((response) => {
          this.listDetail.push(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
.no-save {
  color: #1aa4c8;
  background-color: #fff;
  border: 1px solid #1aa4c8;
  margin-left: 12px;
}
#popup-n {
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 4;
  width: 100%;
  height: 100%;
  margin: auto;
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  flex-direction: column;
}
.popup-n {
  font-size: 13px;
  min-width: 350px;
  width:auto;
  height: auto;
  height: fit-content;
  background-color: #fff;
  margin: auto;
  /* padding: 24px; */
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  /* display: none; */
}
.popup-n-body {
  align-items: center;
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  /* margin-top: 30px; */
}
#content {
  margin-left: 20px;
  margin-top: 4px;
  text-align: start;
  width: calc(100% - 80px);
}
.content-popup-n {
  margin-bottom: 20px;

  justify-content: flex-start;
  margin-left: 10px;
}
.icon-popup-n {
  margin-top: -8px;
}
.popup-n-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 0px;
  background-color: #f0faff;
  padding: 8px 10px;
}

.popup-n .no {
  background-color: #fff;
  border: 1px solid #aca8a8;
}
.popup-n .cancel {
  background-color: #1aa4c8;
  color: #fff;
  border: none;
  margin-left: 12px;
}
.popup-n .icon-warning {
  background-repeat: no-repeat;
  width: 50px;
}

.popup-n-header {
  padding: 0px 0px;
  color: #07b6c4;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: start;
  margin: 16px 16px 0px 16px;
}

 .item-notice {
  display: flex;
}
</style>
