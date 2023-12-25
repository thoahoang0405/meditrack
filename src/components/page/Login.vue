<template>
  <div class="login">
    <div>
      <img class="image-login" src="../../assets/img/0006.png" alt="" />
    </div>
    <h2 class="title">THEO DÕI VÀ CHĂM SÓC SỨC KHOẺ MEDITRACK</h2>
    <div style="height: 400px; width: 500px">
      <div class="form">
        <form @submit.prevent="submit">
          <div class="form-header">ĐĂNG NHẬP</div>

          <div>
            <div class="label" for="username">Tên đăng nhập</div>
            <input
              type="text"
              class="mt-1"
              name="username"
              v-model="form.UserName"
            />
          </div>
          <div>
            <div class="label" for="password">Mật khẩu</div>
            <input
              type="password"
              class="mt-1"
              name="password"
              v-model="form.Password"
            />
          </div>
          <button class="btn button-blue submit" type="submit">
            Đăng nhập
          </button>
        </form>
        <div v-if="showError" class="mt-2" id="error">
          Tên đăng nhập hoặc mật khẩu không đúng
        </div>
        <button
          class="clr-blue mt-3"
          @click="register()"
          style="background-color: #fff; border: none; font-weight: bold"
          type="submit"
        >
          Đăng kí
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "login-app",
  components: {},
  data() {
    return {
      form: {
        UserID: "00000000-0000-0000-0000-000000000000",
        PhoneNumber: "",
        UserName: "",
        Password: "",
      },
      showError: false,
    };
  },
  methods: {
    ...mapActions(["LogIn"]),
    register() {
      this.$router.push("/register");
    },
    async submit() {
      const response = await axios({
        url: "https://localhost:44371/api/Users/sign-in",
        method: "Post",
        data: this.form
      }).then(res=>{
        if(res){
        this.$router.push("/home/appointment");
      }
      })
      .catch(() => {
        this.showError = true;
      });
      
    },
  },
};
</script>

<style scoped>
.label {
  margin-top: 25px;
  font-weight: bold;
}
.submit {
  margin-top: 25px;
}
.login {
  background-color: #f0faff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.image-login {
  width: 380px;
  height: 450px;
  margin-right: -20px;
}
form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.form {
  width: 350px;
  height: 400px;
  border-radius: 20px;
  background-color: #fff;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.login h2 {
  color: #07b6c4;
  position: absolute;
  top: 25%;
  left: 35%;
  max-width: 400px;
  flex-wrap: wrap;
  text-align: center;
}
.form-header {
  text-align: center;
  font-size: 20px;
  color: #07b6c4;
  font-weight: bold;
}
* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

input {
  width: 300px;
  padding: 6px;
}
#error {
  color: red;
  margin-left: 50px;
}
@import url(../../css/main.css);
</style>
