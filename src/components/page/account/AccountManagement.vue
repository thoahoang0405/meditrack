<template>
  <div class="account">
    <div class="header-account">
      <div class="title">
        <h2 class="mr-2 mb-2">Quản lý tài khoản</h2>
      </div>
    </div>

    <div class="main">
      <div class="group-controll">
        <div class="group-item fullname">
          <div class="label">
            <label for="fullname">Họ và tên</label>
          </div>
          <input class="input" v-model="model.FullName" type="text" />
        </div>
      </div>
      <div class="group-controll">
        <div class="group-item gender">
          <div class="label">
            <label for="gender">Giới tính</label>
          </div>
          <div class="mt-1">
            <input class="mr-1" type="radio" value="1" v-model="model.Gender" />
            <label class="mr-2" for="1">Nam</label>
            <input class="mr-1" type="radio" value="2" v-model="model.Gender" />
            <label for="2">Nữ</label>
          </div>
        </div>
      </div>
      <div class="group-controll">
        <div class="group-item phonenumber">
          <div class="label">
            <label for="phonenumber">Số điện thoại</label>
          </div>
          <input class="input" v-model="model.PhoneNumber" type="text" />
        </div>
        <div class="group-item date">
          <div class="label">
            <label for="date">Ngày sinh</label>
          </div>
          <div class="input">
            <el-date-picker
              class="item-table"
              type="date"
              v-model="model.DateOfBirth"
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
              value-format="YYYY-MM-DD"
            />
          </div>
        </div>
      </div>
      <div class="group-controll">
        <div class="group-item address">
          <div class="label">
            <label for="address">Địa chỉ</label>
          </div>
          <input class="input" v-model="model.Address" type="text" />
        </div>
      </div>
      <div class="group-controll-button">
        <button class="btn button-blue" @click="save()">Cập nhật</button>
        <button class="btn button-blue-outline" @click="changePass()">
          Đổi mật khẩu
        </button>
      </div>
    </div>
    <Form v-if="isShowForm == true" @closeForm="isShowForm = false"></Form>
  </div>
</template>

<script>
import Form from "./ChangePassword.vue";
import axios from "axios";
import { ElDatePicker } from "element-plus";
export default {
  components: {
    Form,
    ElDatePicker,
  },
  name: "Account-page",
  props: {
    msg: String,
  },
  data() {
    return {
      isShowForm: false,
      model: {
        UserDetailID: "00000000-0000-0000-0000-000000000000",
        UserID: "00000000-0000-0000-0000-000000000000",
        FullName: "",
        DateOfBirth: null,
        Gender: 0,
        Address: "",
        PhoneNumber: "",
      },
    };
  },
  created() {
    this.getUserDetail();
  },
  methods: {
    changePass() {
      this.isShowForm = !this.isShowForm;
    },
    getUserDetail() {
      
      var me = this;
      axios({
        url: ` https://localhost:44371/api/Users/userDetail?id=${localStorage.getItem(
          "data"
        )}`,
        method: "Get",
      })
        .then(function (res) {
          me.model = res.data;
        })
        .catch(function (res) {
          console.log(res);
        });
    },
    save() {
      var me = this;
      var url = " https://localhost:44371/api/Users/userDetail";
      axios({
        url: `${url}`,
        method: "put",
        data: me.model,
      })
        .then(async function (res) {
          me.$toast.open({
            message: "Cất dữ liệu thành công.",
            type: "success",
            position: "top",
          });
        })
        .catch(function (res) {
          console.log(res);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(./AccountManagement.scss);
</style>
