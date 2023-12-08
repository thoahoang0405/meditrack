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
            />
            <div
              :class="isShowPassword1 ? 'icon-show' : 'icon-hide'"
              class="hide-pass icon icon-show"
              @click="isShowPassword1 = !isShowPassword1"
            ></div>
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="w-100" style="position: relative">
            <div class="label mt-2">Mật khẩu mới</div>
            <input
              class="mt-1 w-100"
              :type="isShowPassword2 ? 'text' : 'password'"
            />
            <div
              :class="isShowPassword2 ? 'icon-show' : 'icon-hide'"
              class="hide-pass icon icon-show"
              @click="isShowPassword2 = !isShowPassword2"
            ></div>
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="w-100" style="position: relative">
            <div class="label mt-2">Xác thực mật khẩu</div>
            <input
              class="mt-1 w-100"
              :type="isShowPassword3 ? 'text' : 'password'"
            />
            <div
              :class="isShowPassword3 ? 'icon-show' : 'icon-hide'"
              class="hide-pass icon icon-show"
              @click="isShowPassword3 = !isShowPassword3"
            ></div>
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
      isShowDetail: true,
      isShowPassword1: false,
      isShowPassword2: false,
      isShowPassword3: false,
      formTitle: "Đổi mật khẩu",
    };
  },
  created() {
    this.appointment = this.data;
  },
  methods: {
    closeForm() {
      this.$emit("closeForm", false);
    },
  },
};
</script>
<style scope>
.form-add .form-account {
  margin: 0px;
  width: 270px;

  height: 300px;
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
  top: 58%;
  right: 0;
}
</style>
