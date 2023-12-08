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
          <input class="input" type="text" />
        </div>
        <div class="group-item date">
          <div class="label">
            <label for="date">Ngày sinh</label>
          </div>
          <input class="input" type="date" />
        </div>
      </div>
      <div class="group-controll">
        <div class="group-item age">
          <div class="label">
            <label for="age">Tuổi</label>
          </div>
          <input class="input" type="text" />
        </div>
        <div class="group-item gender">
          <div class="label">
            <label for="gender">Giới tính</label>
          </div>
          <div class="mt-1">
              <input class="mr-1 " type="radio" value="1" v-model="model.user" />
              <label class="mr-2" for="1">Nam</label>
              <input class="mr-1" type="radio" value="2" v-model="model.user" />
              <label for="2">Nữ</label>
          </div>
        </div>
      </div>
      <div class="group-controll">
        <div class="group-item phonenumber">
          <div class="label">
            <label for="phonenumber">Số điện thoại</label>
          </div>
          <input class="input" type="text" />
        </div>
        <div class="group-item username">
          <div class="label">
            <label for="username">Tên đăng nhập</label>
          </div>
          <input class="input" type="text" />
        </div>
      </div>
      <div class="group-controll">
        <div class="group-item address">
            <div class="label">
            <label for="address">Địa chỉ</label>
          </div>
          <input class="input" type="text" />
        </div>
      </div>
      <div class="group-controll-button">
        <button class="btn button-blue">Cập nhật</button>
        <button class="btn button-blue-outline" @click="changePass()">Đổi mật khẩu</button>

      </div>
    </div>
    <Form v-if="isShowForm==true" @closeForm="isShowForm=false"></Form>
  </div>
</template>

<script>
import Form from './ChangePassword.vue'
export default {
  components:{
    Form
  },
  name: "Account-page",
  props: {
    msg: String,
  },
  data() {
    return {
      isShowForm:false,
      model: {
        user: 1,
      },
    };
  },
  methods: {
    changePass(){
      this.isShowForm=!this.isShowForm
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(./AccountManagement.scss);
</style>
