<template>
  <div class="form-add">
    <div class="form-account">
      <div class="form-header">
        <div>
          {{ formTitle }}
        </div>
        <div class="icon icon-close" @click="closeForm"></div>
      </div>
      <div class="form-main">
        <div class="group-controll mt-2">
          <div class="w-100" style="position: relative">
            <div class="label">Mật khẩu cũ</div>

            <input
              class="mt-1 w-100"
              :type="isShowPassword1 ? 'text' : 'password'"
              v-model="userChange.oldPass"
              ref="oldPass"
              :class="error.oldPass != '' ? 'border-error' : ''"
              @blur="validate('oldPass')"
            />
            <div
              :class="isShowPassword1 ? 'icon-show' : 'icon-hide'"
              class="hide-pass icon icon-show"
              @click="isShowPassword1 = !isShowPassword1"
            ></div>
            <p class="error" v-if="error.oldPass != ''">
              {{ error.oldPass }}
            </p>
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="w-100" style="position: relative">
            <div class="label mt-2">Mật khẩu mới</div>
            <input
              class="mt-1 w-100"
              :type="isShowPassword2 ? 'text' : 'password'"
              v-model="userChange.newPass"
              :class="error.newPass != '' ? 'border-error' : ''"
              @blur="validate('newPass')"
            />
            <div
              :class="isShowPassword2 ? 'icon-show' : 'icon-hide'"
              class="hide-pass icon icon-show"
              @click="isShowPassword2 = !isShowPassword2"
            ></div>
            <p class="error" v-if="error.newPass != ''">
              {{ error.newPass }}
            </p>
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="w-100" style="position: relative">
            <div class="label mt-2">Xác thực mật khẩu</div>
            <input
              class="mt-1 w-100"
              :type="isShowPassword3 ? 'text' : 'password'"
              v-model="userChange.reNewPass"
              :class="error.reNewPass != '' ? 'border-error' : ''"
              @blur="validate('reNewPass')"
            />
            <div
              :class="isShowPassword3 ? 'icon-show' : 'icon-hide'"
              class="hide-pass icon icon-show"
              @click="isShowPassword3 = !isShowPassword3"
            ></div>
            <p class="error" v-if="error.reNewPass != ''">
              {{ error.reNewPass }}
            </p>
          </div>
        </div>
        <div
          class="group-controll mt-2 error-bottom"
          v-if="oldPass == true"
          style="color: red"
        >
          Mật khẩu cũ không đúng
        </div>
        <div
          class="group-controll mt-2 error-bottom"
          v-if="rePass == true"
          style="color: red"
        >
          Mật khẩu nhập lại chưa đúng
        </div>
      </div>
      <div class="form-footer mt-2">
        <button class="btn button-blue" @click="save()">Lưu</button>
        <button class="btn button-blue-outline mr-2">Huỷ</button>
      </div>
    </div>
  </div>
</template>
<script>
import Combobox from "../../base/BaseCombobox.vue";
import axios from "axios";

export default {
  props: ["data"],
  components: {
    Combobox,
  },
  data() {
    return {
      oldPass: false,
      rePass: false,
      isShowDetail: true,
      isShowPassword1: false,
      isShowPassword2: false,
      isShowPassword3: false,
      formTitle: "Đổi mật khẩu",
      userChange: {
        oldPass: "",
        newPass: "",
        reNewPass: "",
      },
      error: {
        oldPass: "",
        newPass: "",
        reNewPass: "",
      },
      rules: {
        oldPass: { Required: true },
        newPass: { Required: true },
        reNewPass: { Required: true },
      },
      user: {},
    };
  },
  created() {
    this.appointment = this.data;
   this.getUserInfo()
  },
  methods: {
    closeForm() {
      this.$emit("closeForm", false);
    },
    save() {
      debugger
      var me = this;
      if(this.validateAll()){

        if (me.userChange.oldPass == me.user.Password) {
          this.oldPass = false;
          if (me.userChange.newPass == me.userChange.reNewPass) {         
            me.user.Password= me.userChange.newPass
            me.user.ModifiedBy= me.user.UserName
            var url = "https://localhost:44371/api/Users/";
            axios({
              url: `${url}${me.user.UserID}`,
              method: "put",
              data: me.user,
            })
              .then(async function (res) {
                me.$emit("closeForm", false);
                me.$toast.open({
                  message: "Cất dữ liệu thành công.",
                  type: "success",
                  position: "top",
                });
              })
              .catch(function (res) {
                console.log(res);
              });
          } else {
            this.oldPass = false;
            this.rePass = true;
          }
        } else {
          this.rePass = false;
          this.oldPass = true;
        }
      }
    },
    getUserInfo(){
      var me= this
      axios({
      url: "https://localhost:44371/api/Users/user",
      method: "Get",
    })
      .then(function (res) {
        me.user = res.data;
      })
      .catch(function (res) {
        console.log(res);
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
      if (!this.userChange[propName]) {
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
.form-add .form-account {
  margin: 0px;
  width: 305px;

  height: 350px;
  background-color: #fff;
  padding: 20px;
}

.form-account .gr-item {
  width: 30%;
}
.label {
  font-weight: bold;
}
.f-header {
  display: flex;
  justify-content: center;
  font-size: 16px;
}
.hide-pass {
  position: absolute;
  bottom: 8px;
  right: 0;
}
.group-controll .error-bottom{
  
  justify-content: center;
}
</style>
