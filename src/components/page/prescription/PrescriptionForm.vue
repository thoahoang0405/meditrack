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
                class="mt-1 w-100"
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
              <div class="mt-1 w-100">
                <el-date-picker
                  type="date"
                  ref="PrescriptionDate"
                  :class="error.PrescriptionDate != '' ? 'border-error' : ''"
                  @blur="validate('PrescriptionDate')"
                  placeholder="DD/MM/YYYY"
                  format="DD/MM/YYYY"
                  value-format="YYYY-MM-DD"
                  v-model="prescriptions.PrescriptionDate"
                />
              </div>
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
                  :value="prescriptions.PatientName"
                @selectedItem="selectItemCbb"
                />
              </div>
            </div>
          </div>
          <div class="group-controll mt-2">
            <div class="w-30 gr-item ml-2" v-if="formMode == 2">
              <div class="label">Trạng thái đơn thuốc</div>
              <div class="mb-1" style="display: flex">
                <input class="mr-1 " type="radio" value="2" style="margin-top: 10px;" v-model="prescriptions.PrescriptionStatus" />
                <p class="mr-2 " for="1">Đang sử dụng</p>
                <input class="mr-1 " type="radio" value="3" style="margin-top: 10px" v-model="prescriptions.PrescriptionStatus" />
                <p class="mr-2 " for="1">Đã hoàn thành</p>
                <input class="mr-1 " type="radio" value="4" style="margin-top: 10px" v-model="prescriptions.PrescriptionStatus" />
                <p for="2 ">Bỏ lỡ</p>
              </div>
            </div>
            <div class="gr-item mr-2" :class="formMode == 2 ? 'w-25' : 'w-50'">
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
              
              <div class="mt-1 w-100">
                <el-date-picker
                  type="date"
                  ref="FromDate"
                  :class="error.FromDate != '' ? 'border-error' : ''"
                  @blur="validate('FromDate')"
                  v-model="prescriptions.FromDate"
                  placeholder="DD/MM/YYYY"
                  format="DD/MM/YYYY"
                  value-format="YYYY-MM-DD"
                />
              </div>
              <p class="error" v-if="error.FromDate != ''">
                {{ error.FromDate }}
              </p>
            </div>
            <div class="w-25 gr-item ml-2 mr-2">
              <div class="label">Sử dụng đến ngày</div>

              <div class="mt-1 w-100">
                <el-date-picker
                  type="date"
                  ref="ToDate"
                  :class="error.ToDate != '' ? 'border-error' : ''"
                  @blur="validate('ToDate')"
                  v-model="prescriptions.ToDate"
                  placeholder="DD/MM/YYYY"
                  format="DD/MM/YYYY"
                  value-format="YYYY-MM-DD"
                />
              </div>
              <p class="error" v-if="error.ToDate != ''">
                {{ error.ToDate }}
              </p>
            </div>
          </div>
          <div class="group-controll mt-2">
            <div class="w-50 gr-item mr-2">
              <div class="label">Bệnh viện kê đơn</div>
              <input
                class="mt-1 w-100"
                v-model="prescriptions.CreatedByAddress"
                type="text"
              />
            </div>
            <div class="w-50 gr-item ml-2 mr-2">
              <div class="label">Ghi chú</div>
              <input
                class="mt-1 w-100"
                type="text"
                v-model="prescriptions.Notes"
              />
            </div>
          </div>
          <div class="group-controll mt-2">
            <div class="w-100 gr-item mr-2">
              <div class="label">Chẩn đoán</div>
              <input
                class="mt-1 w-100"
                type="text"
                v-model="prescriptions.Diagnose"
              />
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
              <div class="item-table" style="min-width: 168px">Tên thuốc</div>
              <div class="item-table" style="min-width: 90px">Đơn vị</div>
              <div class="item-table" style="min-width: 90px">Buổi sáng</div>
              <div class="item-table" style="min-width: 90px">Buổi chiều</div>
              <div class="item-table" style="min-width: 210px">
                Cách sử dụng thuốc
              </div>
              <div class="item-table" style="min-width: 210px">Cảnh báo</div>
              <div class="item-table" style="min-width: 210px">
                Ngày hết hạn
              </div>
              <div class="item-table" style="min-width: 210px">
                Tác dụng phụ của thuốc
              </div>
              <div class="item-table" style="min-width: 510px">Ghi chú</div>
            </div>
            <div
              class="main-table mt-2 mb-2"
              v-for="(item, index) in prescriptions.Medications"
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
              <div class="mr-2"  style="min-width: 200px">
                <el-date-picker
                class="item-table "
                  type="date"
                  v-model="item.ExpiryDate"
                  placeholder="DD/MM/YYYY"
                  format="DD/MM/YYYY"
                  value-format="YYYY-MM-DD"
                />
              </div>
            
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
      <div class="form-footer mt-2">
        <button class="btn button-blue" @click="save()">Lưu</button>
        <button class="btn button-blue-outline mr-2" @click="closeForm">
          Huỷ
        </button>
      </div>
    </div>
    <Popup
      v-if="isShowPopup"
      :msg="msgError"
      :name="btnName"
      :close="3"
      @hidePopup="isShowPopup = false"
    ></Popup>
  </div>
</template>
<script>
import Combobox from "../../base/BaseCombobox.vue";
import Popup from "../../base/BasePopup.vue";
import axios from "axios";
import { ElDatePicker } from "element-plus";
export default {
  props: ["data", "formMode"],
  components: {
    Combobox,
    Popup,
    ElDatePicker,
  },
  data() {
    return {
      id : localStorage.getItem("data"),
      isShowPopup: false,
      editMode: 1,
      isShowDetail: true,
      prescriptions: {
        UserID: localStorage.getItem("data"),
        PrescriptionsID: "00000000-0000-0000-0000-000000000000",
        PrescriptionStatus:1,
        Medications: [
          {
            MedicationID: "00000000-0000-0000-0000-000000000000",
            MedicationName: "",
            QuantityForMorning: 0,
            QuantityForAfternoon: 0,
            Unit: "",
            Notes: "",
            RouteOfAdministration: "",
            Warnings: "",
            ExpiryDate: null,
            SideEffects: "",
          },
        ],
        Notice:[
          
        ]
      },
      msgError: "",
      PatientName: "",
      PatientID: "",
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
    this.getComboboxPatient();
    this.editMode = this.formMode;
    if (this.editMode == 2) {
      this.formTitle="Cập nhật đơn thuốc"
      this.prescriptions = this.data;
    } else {
      this.prescriptions = {
        UserID: localStorage.getItem("data"),
        PrescriptionsID: "00000000-0000-0000-0000-000000000000",
        Medications: [
          {
            MedicationID: "00000000-0000-0000-0000-000000000000",
            MedicationName: "",
            QuantityForMorning: 0,
            QuantityForAfternoon: 0,
            Unit: "",
            Notes: "",
            RouteOfAdministration: "",
            Warnings: "",
            ExpiryDate: null,
            SideEffects: "",
          },
        ],
      };
    }
  },
  methods: {
    save() {
      var me = this;
    
      if (
        !this.prescriptions.Medications ||
        this.prescriptions.Medications.length <= 0 ||
        (this.prescriptions.Medications.length > 0 &&
          this.prescriptions.Medications[0].MedicationName == "")
      ) {
        this.msgError = "Cần nhật ít nhất 1 loại thuốc sử dụng theo đơn thuốc.";
        this.isShowPopup = true;
      } else {
        me.prescriptions.Notice=[{
            NoticeID: "00000000-0000-0000-0000-000000000000",
            UserID: localStorage.getItem("data"),
            NoticeName: this.prescriptions.PrescriptionName,
            NoticeDate: this.prescriptions.FromDate,
            ToDate:  this.prescriptions.ToDate,
            NoticeStatus: 1,
            NoticeType: "Đơn thuốc ",
            NoticeOfUser:
              this.prescriptions.PatientName &&
              (this.prescriptions.PatientName != null ||
                this.prescriptions.PatientName != "")
                ? this.prescriptions.PatientName
                : "Bạn",
            TypeID: "00000000-0000-0000-0000-000000000000",
          
      }]
        if (this.validateAll()) {
          if(me.editMode==1){
           
            me.prescriptions.PrescriptionStatus=1
            var url = "https://localhost:44371/api/Prescriptions/user";
          axios({
            url: `${url}`,
            method: "post",
            data: me.prescriptions,
          })
            .then(function (res) {
              me.$emit("closeForm", false);
              me.emitter.emit("loadDataPrescription");
              me.$toast.open({
                message: "Cất dữ liệu thành công.",
                type: "success",
                position: "top",
              });
            })
            .catch(function (res) {
              console.log(res);
            });
          }else{
           
            var url = "https://localhost:44371/api/Prescriptions/user";
          axios({
            url: `${url}`,
            method: "put",
            data: me.prescriptions,
          })
            .then(function (res) {
              me.$emit("closeForm", false);
              me.emitter.emit("loadDataPrescription");
              me.$toast.open({
                message: "Cất dữ liệu thành công.",
                type: "success",
                position: "top",
              });
            })
            .catch(function (res) {
              console.log(res);
            });
          }
         
        }
      }
    },
    selectItemCbb(value) {
      if (value) {
        this.prescriptions.PatientName = value.PatientName;
        this.prescriptions.PatientID = value.PatientID;
      } else {
        this.prescriptions.PatientName = "";
        this.prescriptions.PatientID = "";
      }
    },
    closeForm() {
      this.$emit("closeForm", false);
    },

    getComboboxPatient() {
      var url = "https://localhost:44371/api/FamilyMembers";
      axios
        .get(`${url}/id?id=${this.id}`)
        .then((response) => {
          this.patients = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addRowDetail() {
      this.prescriptions.Medications.push({
        MedicationID: "00000000-0000-0000-0000-000000000000",
        MedicationName: "",
        QuantityForMorning: 0,
        QuantityForAfternoon: 0,
        Unit: "",
        Notes: "",
        RouteOfAdministration: "",
        Warnings: "",
        ExpiryDate: null,
        SideEffects: "",
      });
    },
    removeDetail(item, index) {
      this.prescriptions.Medications.splice(index, 1);
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
  width: 1360px;
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
  min-height: 180px;
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
