<template>
  <div class="form-add">
    <div class="form-prescription">
      <div class="form-header">
        <div>
          {{ formTitle }}
        </div>
        <div class="icon icon-close" @click="closeForm"></div>
      </div>
      <div class="form-main">
        <div class="master">
          <div class="group-controll">
            <div class="w-50 gr-item mr-2">
              <div class="label">Tên đơn thuốc</div>
              <input
                class="mt-1  w-100"
                type="text"
                ref="PrescriptionName"
                :class="error.PrescriptionName != '' ? 'border-error' : ''"
                @blur="validate('PrescriptionName')"
                @focus="$refs.PrescriptionName.select()"
                v-model="prescriptions.PrescriptionName"
              />
              <p class="error" v-if="error.PrescriptionName != ''">
                {{ error.PrescriptionName }}
              </p>
            </div>
            <div class="w-25 gr-item mr-2 ml-2">
              <div class="label">Ngày y lệnh</div>
              <input
                class="mt-1 w-100"
                type="date"
                ref="PrescriptionDate"
                :class="error.PrescriptionDate != '' ? 'border-error' : ''"
                @blur="validate('PrescriptionDate')"
                @focus="$refs.PrescriptionDate.select()"
                v-model="prescriptions.PrescriptionDate"
              />
              <p class="error" v-if="error.PrescriptionDate != ''">
                {{ error.PrescriptionDate }}
              </p>
            </div>
            <div class="w-25 gr-item ml-2">
              <div class="label">Đơn thuốc cho</div>
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
          </div>
          <div class="group-controll mt-2">
            <div class="w-25 gr-item ml-2">
              <div class="label">Trạng thái đơn thuốc</div>
              <div class="mb-1" style="display: flex">
                <input class="mr-1 mt-2" type="radio" value="3" />
                <p class="mr-2" for="1">Đã hoàn thành</p>
                <input class="mr-1 mt-2" type="radio" value="4" />
                <p for="2">Bỏ lỡ</p>
              </div>
            </div>
            <div class="w-25 gr-item mr-2">
              <div class="label">Bác sĩ chỉ định</div>
              <input
                class="mt-1 w-100"
                type="text"
                ref="CreatedByDoctor"
                :class="error.CreatedByDoctor != '' ? 'border-error' : ''"
                @blur="validate('CreatedByDoctor')"
                @focus="$refs.CreatedByDoctor.select()"
                v-model="prescriptions.CreatedByDoctor"
              />
              <p class="error" v-if="error.CreatedByDoctor != ''">
                {{ error.CreatedByDoctor }}
              </p>
            </div>
            <div class="w-25 gr-item mr-2 ml-2">
              <div class="label">Sử dụng từ ngày</div>
              <input
                class="mt-1 w-100"
                type="date"
                ref="FromDate"
                :class="error.FromDate != '' ? 'border-error' : ''"
                @blur="validate('FromDate')"
                @focus="$refs.FromDate.select()"
                v-model="prescriptions.FromDate"
              />
              <p class="error" v-if="error.FromDate != ''">
                {{ error.FromDate }}
              </p>
            </div>
            <div class="w-25 gr-item ml-2">
              <div class="label">Sử dụng đến ngày</div>
              <input
                class="mt-1 w-100"
                type="date"
                ref="ToDate"
                :class="error.ToDate != '' ? 'border-error' : ''"
                @blur="validate('ToDate')"
                @focus="$refs.ToDate.select()"
                v-model="prescriptions.ToDate"
              />
              <p class="error" v-if="error.ToDate != ''">
                {{ error.ToDate }}
              </p>
            </div>
          </div>
          <div class="group-controll mt-2">
            <div class="w-50 gr-item mr-2">
              <div class="label">Bệnh viện kê đơn</div>
              <input class="mt-1 w-100" type="text" />
            </div>
            <div class="w-50 gr-item ml-2">
              <div class="label">Gi chú</div>
              <input class="mt-1 w-100" type="text" />
            </div>
          </div>
          <div class="group-controll mt-2">
            <div class="w-100 gr-item">
              <div class="label">Chẩn đoán</div>
              <input class="mt-1 w-100" type="text" />
            </div>
          </div>
        </div>
        <div class="detail mt-2">
          <div class="header-detail">
            <div>Chi tiết</div>
            <div
              class="icon ml-2 mt-1"
              @click="isShowDetail = !isShowDetail"
              :class="isShowDetail == true ? 'icon-down-blue' : 'icon-up-blue'"
            ></div>
          </div>
          <div class="table-detail" v-if="isShowDetail">
            <div class="header-table mt-2 mb-1">
              <div class="item-table" style="min-width: 158px">Tên thuốc</div>
              <div class="item-table" style="min-width: 88px">Đơn vị</div>
              <div class="item-table" style="min-width: 88px">Buổi sáng</div>
              <div class="item-table" style="min-width: 88px">Buổi chiều</div>
              <div class="item-table" style="min-width: 208px">
                Cách sử dụng thuốc
              </div>
              <div class="item-table" style="min-width: 208px">Cảnh báo</div>
              <div class="item-table" style="min-width: 208px">
                Ngày hết hạn
              </div>
              <div class="item-table" style="min-width: 208px">
                Tác dụng phụ của thuốc
              </div>
              <div class="item-table" style="min-width: 508px">Ghi chú</div>
            </div>
            <div
              class="main-table mt-2 mb-2"
              v-for="(item, index) in listMedication"
              :key="index"
            >
              <input
                class="item-table"
                type="text"
                v-model="item.MedicationName"
                style="min-width: 150px"
              />
              <input
                class="item-table"
                type="text"
                v-model="item.Unit"
                style="min-width: 80px"
              />
              <input
                class="item-table"
                type="number"
                v-model="item.QuantityForMorning"
                style="min-width: 80px"
              />
              <input
                class="item-table"
                type="number"
                v-model="item.QuantityForAfternoon"
                style="min-width: 80px"
              />
              <input
                class="item-table"
                type="text"
                v-model="item.RouteOfAdministration"
                style="min-width: 200px"
              />
              <input
                class="item-table"
                type="text"
                v-model="item.Warnings"
                style="min-width: 200px"
              />
              <input
                class="item-table"
                type="date"
                v-model="item.ExpiryDate"
                style="min-width: 200px"
              />
              <input
                class="item-table"
                type="text"
                v-model="item.SideEffects"
                style="min-width: 200px"
              />
              <input
                class="item-table"
                type="text"
                v-model="item.Notes"
                style="min-width: 500px"
              />
              <div class="function-table-detail function-table">
                <div class="icon icon-plus" @click="addRowDetail()"></div>
                <div
                  v-if="index > 0"
                  class="icon icon-minus"
                  @click="removeDetail(item, index)"
                ></div>
              </div>
            </div>
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
      listMedication: [
        {
          MedicationID: "",
          MedicationName: "",
          QuantityForMorning: "",
          QuantityForAfternoon: "",
          Unit: "",
          Notes: "",
          RouteOfAdministration: "",
          Warnings: "",
          ExpiryDate: "",
          SideEffects: "",
        },
      ],
      prescriptions: {
        PrescriptionName: "",
        PrescriptionDate: "",
        CreatedByDoctor: "",
        FromDate: "",
        ToDate: "",
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
        PrescriptionName: "",
        PrescriptionDate: "",
        CreatedByDoctor: "",
        FromDate: "",
        ToDate: "",
      },
      rules: {
        PrescriptionName: { Required: true },
        PrescriptionDate: { Required: true },
        CreatedByDoctor: { Required: true },
        FromDate: { Required: true },
        ToDate: { Required: true },
      },

      formTitle: "Nhập đơn thuốc",
    };
  },
  created() {
    this.appointment = this.data;
  },
  methods: {
    closeForm() {
      this.$emit("closeForm", false);
    },
    addRowDetail() {
      this.listMedication.push({
        MedicationID: "",
        MedicationName: "",
        QuantityForMorning: "",
        QuantityForAfternoon: "",
        Unit: "",
        Notes: "",
        RouteOfAdministration: "",
        Warnings: "",
        ExpiryDate: "",
        SideEffects: "",
      });
    },
    removeDetail(item, index) {
      this.listMedication.splice(index, 1);
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
      if (!this.prescriptions[propName]) {
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
.form-add .form-prescription {
  margin: 0px;
  width: 1000px;
  height: auto;
  max-height: 768px;
  background-color: #fff;
  padding: 20px;
}

.form-prescription .gr-item {
  position: relative;
}
.label {
  font-weight: bold;
}
.detail .header-detail {
  color: #07b6c4;
  font-weight: bold;
  font-size: 14px;
  background-color: #fff;
  display: flex;
}
.table-detail {
  max-height: 400px;
  min-height: 150px;
  max-width: 100%;
  overflow: auto;
}
.main-table,
.header-table {
  display: flex;
}
.item-table {
  font-weight: bold;
  margin-right: 10px;
}
.function-table-detail {
  min-width: 80px;
  display: flex;
  justify-content: space-evenly;
  background-color: #ffff;
  align-items: center;
}
.table-detail::-webkit-scrollbar {
  width: 2px;
  height: 5px;
  border-top: 1px solid #e2e2e2;
}

.table-detail::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: #ccc;
}
</style>
