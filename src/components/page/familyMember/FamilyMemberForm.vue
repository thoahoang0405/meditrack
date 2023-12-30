<template>
  <div class="form-add">
    <div class="form-family">
      <div class="form-header">
        <div>
          {{ formTitle }}
        </div>
        <div class="icon icon-close" @click="closeForm"></div>
      </div>

      <div class="form-main">
        <div class="group-controll">
          <div class="gr-item mr-2 w-100">
            <div class="label">Họ và tên</div>
            <input
              class="mt-1 w-100"
              v-model="family.PatientName"
              type="text"
              ref="PatientName"
              :class="error.PatientName != '' ? 'border-error' : ''"
              @blur="validate('PatientName')"
            />

            <p class="error" v-if="error.PatientName != ''">
              {{ error.PatientName }}
            </p>
          </div>
        </div>

        <div class="group-controll mt-2">
          <div class="w-100 mr-2 gr-item">
            <div class="label">Ngày sinh</div>
            <div class="mt-1 w-100">
              <el-date-picker
                class="item-table"
                type="date"
                v-model="family.DateOfBirth"
                placeholder="DD/MM/YYYY"
                format="DD/MM/YYYY"
                value-format="YYYY-MM-DD"
                ref="DateOfBirth"
                :class="error.DateOfBirth != '' ? 'border-error' : ''"
                @blur="validate('DateOfBirth')"
              />
            </div>
            <p class="error" v-if="error.DateOfBirth != ''">
              {{ error.DateOfBirth }}
            </p>
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="w-100 mr-2">
            <div class="label">Mối quan hệ</div>
            <div class="mt-1 w-100">
              <Combobox
                class="item-input check-input w-100"
                :items="listFamilyCbb"
                :fieldCode="'FamilyName'"
                :fieldName="'FamilyName'"
                v-model="family.Relationship"
                @selectedItem="selectItemCbb"
                type="text"
                ref="Relationship"
                :class="error.Relationship != '' ? 'border-error' : ''"
                @blur="validate('Relationship')"
              />
            </div>
            <p class="error" v-if="error.Relationship != ''">
              {{ error.Relationship }}
            </p>
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="w-100 mr-2">
            <div class="label">Số điện thoại</div>
            <input
              class="mt-1 w-100"
              v-model="family.PhoneNumber"
              type="text"
            />
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="w-100 mr-2">
            <div class="label">Thông tin liên hệ</div>
            <input class="mt-1 w-100" type="text" v-model="family.Contact" />
          </div>
        </div>
      </div>
      <div class="form-footer mt-2">
        <button class="btn button-blue" @click="save">Lưu</button>
        <button class="btn button-blue-outline mr-2" @click="closeForm">
          Huỷ bỏ
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Combobox from "../../base/BaseCombobox.vue";
import { ElDatePicker } from "element-plus";
import axios from "axios";
export default {
  props: ["data", "formTitle", "formMode"],
  components: {
    Combobox,
    ElDatePicker,
  },
  data() {
    return {
      id: localStorage.getItem("data"),
      appointment: {},
      isShowStepTwo: false,
      family: {
        PatientID: "00000000-0000-0000-0000-000000000000",
        UserID: localStorage.getItem("data"),
        PatientName: "",
        DateOfBirth: null,
        Relationship: "",
        PhoneNumber: "",
        Contact: "",
      },
      listFamilyCbb: [
        { FamilyID: 1, FamilyName: "Bố" },
        { FamilyID: 2, FamilyName: "Mẹ" },
        { FamilyID: 3, FamilyName: "Ông" },
        { FamilyID: 4, FamilyName: "Bà" },
        { FamilyID: 5, FamilyName: "Anh" },
        { FamilyID: 6, FamilyName: "Chị" },
        { FamilyID: 7, FamilyName: "Em" },
        { FamilyID: 8, FamilyName: "Con" },
        { FamilyID: 9, FamilyName: "Cháu" },
        { FamilyID: 10, FamilyName: "Bạn" },
      ],
      error: {
        PatientName: "",
        DateOfBirth: "",
        Relationship: "",
      },
      rules: {
        PatientName: { Required: true },
        DateOfBirth: { Required: true },
        Relationship: { Required: true },
      },
      editMode: 1,
    };
  },
  created() {
    this.editMode = this.formMode;
    if (this.editMode == 2) {
      this.family = this.data;
    }
  },
  methods: {
    selectItemCbb(value) {
      if (value) {
        this.family.Relationship = value.FamilyName;
      } else {
        this.family.Relationship = "";
      }
    },
    save() {
      var me = this;
      var url = "https://localhost:44371/api/FamilyMembers";
      //validate
      // if (this.validateAll()) {
      if (me.editMode == 1) {
        axios({
          url: `${url}`,
          method: "post",
          data: me.family,
        })
          .then(function (res) {
            me.$emit("closeForm", false);
            me.emitter.emit("loadDataFamily");
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
        axios({
          url: `${url}/${me.family.PatientID}`,
          method: "put",
          data: me.family,
        })
          .then(function (res) {
            me.$emit("closeForm", false);
            me.emitter.emit("loadDataFamily");
            me.$toast.open({
              message: "Cất dữ liệu thành công.",
              type: "success",
              position: "top",
            });
          })
          .catch(function (res) {
            console.log(res);
          });
        // }
      }
    },

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
      // if (!isValidAll) {
      //   this.focusToInputError();
      // }

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
      if (!this.family[propName]) {
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
  z-index: 12;
}
.form-add .form-family {
  margin: 0px;
  width: 350px;
  height: auto;
  background-color: #fff;
  padding: 20px;
}


.form-family .label {
  font-weight: bold;
}
.form-family .process {
  display: flex;
  padding: 8px;
  justify-content: center;
}
.form-family .process-two,
.form-family .process-three,
.form-family .process-one {
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: #fff;
  font-size: 32px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #07b6c4;
  color: #07b6c4;
}
.form-family .line-two,
.form-family .line-one {
  border-bottom: 1px solid #f5f5f5;
  margin-top: 28px;
  width: 130px;
  height: 0px;
}
.form-family .bg-disable {
  background-color: #d9d9d9;
  color: #fff;
  border: none;
}
.form-family .step {
  background-color: #fff;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
}
.form-family .bd-blue {
  border-bottom: 2px solid #07b6c4;
}
</style>
