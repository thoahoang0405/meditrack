<template>
  <div class="register">
    <div>
      <img class="image-login" src="../../assets/img/0006.png" alt="" />
    </div>
    <h2 class="title">THEO DÕI VÀ CHĂM SÓC SỨC KHOẺ MEDITRACK</h2>
    <div style="height: 400px; width: 500px">
      <div class="form">
        <form @submit.prevent="submit">
          <div class="form-header">ĐĂNG KÍ</div>

          <div class="gr-item">
            <div class="label" for="UserName">Tên đăng nhập</div>

            <input
              name="UserName"
              class="mt-1 w-100"
              ref="UserName"
              :class="error.UserName != '' ? 'border-error' : ''"
              @blur="validate('UserName')"
              v-model="form.UserName"
            />
            <p class="error" v-if="error.UserName != ''">
              {{ error.UserName }}
            </p>
          </div>
          <div class="gr-item">
            <div class="label" for="FullName">Họ và tên</div>

            <input
              name="FullName"
              class="mt-1 w-100"
              ref="FullName"
              :class="error.FullName != '' ? 'border-error' : ''"
              @blur="validate('FullName')"
              v-model="form.FullName"
            />
            <p class="error" v-if="error.FullName != ''">
              {{ error.FullName }}
            </p>
          </div>
          <div class="gr-item">
            <div class="label" for="Password">Mật khẩu</div>
            <input
              name="Password"
              class="mt-1 w-100"
              ref="Password"
              :class="error.Password != '' ? 'border-error' : ''"
              @blur="validate('Password')"
              v-model="form.Password"
              type="password"
            />
            <p class="error" v-if="error.Password != ''">
              {{ error.Password }}
            </p>
          </div>
          <div class="gr-item">
            <div class="label" for="password">Xác nhận mật khẩu</div>
            <input
              name="RePassword"
              class="mt-1 w-100"
              ref="RePassword"
              :class="error.RePassword != '' ? 'border-error' : ''"
              @blur="validate('RePassword')"
              v-model="form.RePassword"
              type="password"
            />
            <p class="error" v-if="error.RePassword != ''">
              {{ error.RePassword }}
            </p>
          </div>
          <button
            class="btn button-blue submit"
            @click="register()"
            type="submit"
          >
            Đăng kí
          </button>
          <button
          class="clr-blue mb-2 mt-3"
          @click="login()"
          style="background-color: #fff; border: none; font-weight: bold"
          type="submit"
        >
          Đăng nhập
        </button>
        </form>
        <div v-if="showError" class="mt-2 mb-2" id="error">
          {{ mes }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "register-app",
  components: {},
  data() {
    return {
      form: {
        UserID: "00000000-0000-0000-0000-000000000000",
        UserName: "",
        FullName: "",
        Password: "",
        RePassword: "",
        Detail: [],
      },
      error: {
        UserName: "",
        FullName: "",
        Password: "",
        RePassword: "",
      },
      rules: {
        UserName: { Required: true },
        FullName: { Required: true },
        Password: { Required: true },
        RePassword: { Required: true },
      },
      showError: false,
      users: [],
      mes: "Tên đăng nhập đã tồn tại",
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    ...mapActions(["Register"]),
    async submit() {
      try {
        await this.Register(this.form);
        this.$router.push("/posts");
        this.showError = false;
      } catch (error) {
        this.showError = true;
      }
    },
    login(){
      this.$router.push("/login");
    },
    getUser() {
      this.users = [];
      axios
        .get(`https://localhost:44371/api/Users`)
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            const el = response.data[i].UserName;
            this.users.push(el);
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
      if (!this.form[propName]) {
        this.error[propName] = "Không được để trống";

        return false;
      } else {
        this.error[propName] = "";
        return true;
      }
    },
    register() {
      var me = this;
      me.form.Detail=[{
      UserDetailID: "00000000-0000-0000-0000-000000000000",
      UserID: "00000000-0000-0000-0000-000000000000",
      FullName: me.form.FullName,
      DateOfBirth: null,
      Gender: 0,
      Address: "",
      }]
      if (me.validateAll()) {
        if (!me.users.includes(me.form.UserName)) {
          if (me.form.Password == me.form.RePassword) {
            me.showError = false;
            var url = "https://localhost:44371/api/Users/multiple";
            axios({
              url: `${url}`,
              method: "post",
              data: me.form,
            })
              .then(function (res) {
                me.$toast.open({
                message: "Cất dữ liệu thành công.",
                type: "success",
                position: "top",
              });
                me.$router.push("/login");
              })
              .catch(function (res) {
                console.log(res);
              });
          } else {
            me.showError = true;
            me.mes = "Mật khẩu nhập lại không khớp";
          }
        } else {
          me.showError = true;
          me.mes = "Tên đăng nhập đã tồn tại";
        }
      }
    },
  },
};
</script>

<style scoped>
.label {
  margin-top: 16px;
  font-weight: bold;
}
.submit {
  margin-top: 25px;
}
.register {
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
.register h2 {
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
  margin-left: 30%;
}
@import url(../../css/main.css);
</style>
