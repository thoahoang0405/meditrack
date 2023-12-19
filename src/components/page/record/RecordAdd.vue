<template>
  <div class="form-add">
    <div class="form-record" v-if="isShowStep1">
      <div class="form-header">
        <div>Thêm hồ sơ</div>
        <div class="icon icon-close" @click="closeFormST1"></div>
      </div>
      <div class="process">
        <div class="process-one">1</div>
        <div class="line-one"></div>
        <div class="process-two bg-disable">2</div>
        <div class="line-two"></div>
        <div class="process-three bg-disable">3</div>
      </div>
      <div class="step mt-2">Bước 1: Nhập thông tin chung</div>
      <div class="form-main">
        <div class="group-controll">
          <div class="gr-item w-50 mr-2 w-30">
            <div class="label">Tiêu đề hồ sơ</div>
            <input
              class="mt-1 w-100"
              type="text"
              ref="RecordTitle"
              :class="error.RecordTitle != '' ? 'border-error' : ''"
              @blur="validate('RecordTitle')"
              v-model="records.RecordTitle"
            />
            <p class="error" v-if="error.RecordTitle != ''">
              {{ error.RecordTitle }}
            </p>
          </div>
          <div class="gr-item w-50 ml-2 mr-2 w-30">
            <div class="label">Ngày tạo</div>
            <div class="mr-2 mt-1" style="min-width: 200px">
              <el-date-picker
                class="item-table"
                type="date"
                v-model="records.RecordDate"
                placeholder="DD/MM/YYYY"
                format="DD/MM/YYYY"
                value-format="YYYY-MM-DD"
              />
            </div>
          </div>
          <div class="gr-item w-50 ml-2 w-30">
            <div class="label">Họ tên</div>
            <input
              class="mt-1"
              :class="error.FullName != '' ? 'border-error' : ''"
              @blur="validate('FullName')"
              v-model="records.FullName"
            />
            <p class="error" v-if="error.FullName != ''">
              {{ error.FullName }}
            </p>
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="gr-item w-30 mr-2">
            <div class="label">Ngày sinh</div>

            <div class="mr-2 mt-1 w-100" style="min-width: 200px">
              <el-date-picker
                type="date"
                ref="DateOfBirth"
                :class="error.DateOfBirth != '' ? 'border-error' : ''"
                @blur="validate('DateOfBirth')"
                v-model="records.DateOfBirth"
                placeholder="DD/MM/YYYY"
                format="DD/MM/YYYY"
                value-format="YYYY-MM-DD"
              />
            </div>
            <p class="error" v-if="error.DateOfBirth != ''">
              {{ error.DateOfBirth }}
            </p>
          </div>
          <div class="gr-item w-30 mr-2 ml-2">
            <div class="label">Số điện thoại</div>
            <input
              class="mt-1"
              :class="error.PhoneNumber != '' ? 'border-error' : ''"
              @blur="validate('PhoneNumber')"
              v-model="records.PhoneNumber"
            />
            <p class="error" v-if="error.PhoneNumber != ''">
              {{ error.PhoneNumber }}
            </p>
          </div>
          <div class="w-30 ml-2">
            <div class="label">Giới tính</div>
            <div class="gr-radio" style="display: flex">
              <input
                class="mr-1 mt-1"
                type="radio"
                value="0"
                v-model="records.Gender"
              />
              <p class="mr-2" for="0">Nam</p>
              <input
                class="mr-1 mt-1"
                type="radio"
                value="1"
                v-model="records.Gender"
              />
              <p for="1">Nữ</p>
            </div>
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="w-100">
            <div class="label">Địa chỉ</div>
            <input class="mt-1 w-100" type="text" v-model="records.Address" />
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="gr-item w-50 mr-2" style="margin-top: 4px">
            <div class="label">Hồ sơ của</div>
            <div class="mt-1 w-100">
              <Combobox
                class="item-input check-input"
                :items="patients"
                :code="'PatientName'"
                :fieldCode="'PatientName'"
                :fieldName="'PatientName'"
                v-model="records.PatientName"
                @selectedItem="selectItemCbb"
              />
            </div>
          </div>
          <div class="gr-item w-50 mr-2">
            <div class="label">Tên bác sĩ</div>
            <input
              class="mt-1 w-100"
              type="text"
              ref="DoctorName"
              :class="error.DoctorName != '' ? 'border-error' : ''"
              @blur="validate('DoctorName')"
              @focus="$refs.DoctorName.select()"
              v-model="records.DoctorName"
            />
            <p class="error" v-if="error.DoctorName != ''">
              {{ error.DoctorName }}
            </p>
          </div>
          <div class="gr-item w-50 ml-2">
            <div class="label">Số điện thoại bác sĩ</div>
            <input
              class="mt-1 w-100"
              type="text"
              ref="DoctorPhoneNumber"
              :class="error.DoctorPhoneNumber != '' ? 'border-error' : ''"
              @blur="validate('DoctorPhoneNumber')"
              v-model="records.DoctorPhoneNumber"
            />
            <p class="error" v-if="error.DoctorPhoneNumber != ''">
              {{ error.DoctorPhoneNumber }}
            </p>
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="gr-item w-100">
            <div class="label">Địa điểm khám</div>
            <input
              class="mt-1 w-100"
              type="text"
              ref="MedicalExaminationAddress"
              :class="
                error.MedicalExaminationAddress != '' ? 'border-error' : ''
              "
              @blur="validate('MedicalExaminationAddress')"
              @focus="$refs.MedicalExaminationAddress.select()"
              v-model="records.MedicalExaminationAddress"
            />
            <p class="error" v-if="error.MedicalExaminationAddress != ''">
              {{ error.MedicalExaminationAddress }}
            </p>
          </div>
        </div>
      </div>
      <div class="form-footer mt-2">
        <button class="btn button-blue" @click="nextStep1()">Tiếp tục</button>
        <button class="btn button-blue-outline mr-2" @click="closeFormST1">
          Huỷ
        </button>
      </div>
    </div>
    <div class="form-treat" v-if="isShowStep3">
      <div class="form-header">
        <div>Thêm hồ sơ</div>
        <div class="icon icon-close" @click="closeFormST1"></div>
      </div>
      <div class="process">
        <div class="process-one">1</div>
        <div class="line-one bd-blue"></div>
        <div class="process-two">2</div>
        <div class="line-two bd-blue"></div>
        <div class="process-three">3</div>
      </div>
      <div class="step mt-2">Bước 3: Nhập thông tin điều trị</div>
      <div class="form-main">
        <div class="group-controll">
          <div class="mr-2 w-100">
            <div class="label">Mô tả điều trị</div>
            <input
              class="mt-1 w-100"
              type="text"
              v-model="records.Treatments[0].TreatmentDescription"
            />
          </div>
        </div>

        <div class="group-controll mt-2">
          <div class="w-100 mr-2">
            <div class="label">Lịch sử bệnh</div>
            <input
              class="mt-1 w-100"
              type="text"
              v-model="records.Treatments[0].MedicalHistory"
            />
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="gr-item mr-2 w-50">
            <div class="label">Ngày điều trị</div>
            <div class="mr-2 mt-1 w-100" style="min-width: 200px">
              <el-date-picker
                type="date"
                v-model="records.Treatments[0].TreatmentDate"
                placeholder="DD/MM/YYYY"
                format="DD/MM/YYYY"
                value-format="YYYY-MM-DD"
              />
            </div>
          </div>
          <div class="gr-item ml-2 mr-2 w-50">
            <div class="label">Tên đơn thuốc</div>
            <input
              class="mt-1 w-100"
              type="text"
              v-model="records.Treatments[0].PrescriptionName"
            />
          </div>
        </div>

        <div class="group-controll mt-2">
          <div class="w-100 mr-2">
            <div class="label">Chẩn đoán</div>
            <input
              class="mt-1 w-100"
              type="text"
              v-model="records.Treatments[0].Diagnosis"
            />
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class="w-100 mr-2">
            <div class="label">Ghi chú</div>
            <input
              class="mt-1 w-100"
              type="text"
              v-model="records.Treatments[0].Notes"
            />
          </div>
        </div>
      </div>
      <div class="form-footer mt-2">
        <button class="btn button-blue" @click="save()">Lưu</button>
        <button class="btn button-blue-outline mr-2" @click="closeStep3()">
          Quay lại
        </button>
      </div>
    </div>
    <div class="form-test" v-if="isShowStep2">
      <div class="form-header">
        <div>Thêm hồ sơ</div>
        <div class="icon icon-close" @click="closeFormST1()"></div>
      </div>
      <div class="process">
        <div class="process-one">1</div>
        <div class="line-one bd-blue"></div>
        <div class="process-two">2</div>
        <div class="line-two"></div>
        <div class="process-three bg-disable">3</div>
      </div>
      <div class="step mt-2">Bước 2: Nhập thông tin xét nghiệm</div>
      <div class="form-main mt-3">
        <div class="detail mt-2">
          <div class="table-detail">
            <div class="header-table mb-1">
              <div class="item-table mr-2" style="min-width: 158px">
                Tên xét nghiệm
              </div>
              <div class="item-table mr-2" style="min-width: 88px">Đơn vị</div>
              <div class="item-table mr-2" style="min-width: 120px">
                KQ bình thường
              </div>
              <div class="item-table mr-2" style="min-width: 120px">
                KQ xét nghiệm
              </div>
              <div class="item-table mr-2" style="min-width: 100px">
                Loại mẫu BP
              </div>
              <div class="item-table mr-2" style="min-width: 220px">
                Ngày xét nghiệm
              </div>
              <div class="item-table mr-2" style="min-width: 220px">
                Bác sĩ xét nghiệm
              </div>

              <div
                class="function-table-detail function-table"
                style="visibility: hidden; height: 30px"
              >
                Chức năng
              </div>
            </div>
            <div
              class="main-table mt-2 mb-2"
              v-for="(item, index) in records.MedicalTests"
              :key="index"
            >
              <input
                class="item-table"
                type="text"
                v-model="item.TestName"
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
                type="text"
                v-model="item.Normal"
                style="min-width: 100px"
              />
              <input
                class="item-table"
                type="text"
                v-model="item.TestResult"
                style="min-width: 100px"
              />
              <input
                class="item-table"
                type="text"
                v-model="item.TypeTest"
                style="min-width: 100px"
              />

              <div class="mr-2 w-100" style="min-width: 200px">
                <el-date-picker
                  type="date"
                  v-model="item.TestDate"
                  placeholder="DD/MM/YYYY"
                  format="DD/MM/YYYY"
                  value-format="YYYY-MM-DD"
                />
              </div>

              <input
                class="item-table"
                type="text"
                v-model="item.TestBy"
                style="min-width: 200px"
              />

              <div class="function-table-detail function-table">
                <div class="icon icon-plus" @click="addRow()"></div>
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
        <button class="btn button-blue" @click="nextStep2()">Tiếp tục</button>
        <button class="btn button-blue-outline mr-2" @click="closeStep2()">
          Quay lại
        </button>
      </div>
    </div>
  </div>
  <StepTwo
    v-if="isShowStepTwo"
    @closeFormsST2="isShowStepTwo = false"
  ></StepTwo>
</template>
<script>
import Combobox from "../../base/BaseCombobox.vue";
import StepTwo from "./MedicalTests.vue";
import axios from "axios";
import { ElDatePicker } from "element-plus";
export default {
  props: ["data", "formMode"],
  components: {
    Combobox,
    StepTwo,
    ElDatePicker,
  },
  data() {
    return {
      editMode: 1,
      isShowStep2: false,
      isShowStep1: true,
      isShowStep3: false,
      isShowStepTwo: false,
      appointment: {},
      records: {
        RecordID: "00000000-0000-0000-0000-000000000000",
        UserID: "443f7b5d-99c2-11ee-bfeb-1866da3df2b8",
        RecordTitle: "",
        RecordDate: "",
        MedicalExaminationAddress: "",
        DoctorName: "",
        FullName: "",
        DateOfBirth: "",
        Gender: 0,
        Address: "",
        PhoneNumber: "",
        DoctorPhoneNumber: "",
        MedicalTests: [
          {
            TestID: "00000000-0000-0000-0000-000000000000",
            RecordID: "00000000-0000-0000-0000-000000000000",
            TestName: "",
            Unit: "",
            Normal: "",
            TestDate: "",
            SamplingTime: null,
            SampleReceiptTime: null,
            TypeTest: "",
            TestBy: "",
            TestResult: "",
          },
        ],
        Treatments: [
          {
            TreatmentID: "00000000-0000-0000-0000-000000000000",
            RecordID: "00000000-0000-0000-0000-000000000000",
          },
        ],
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
        RecordTitle: "",
        RecordDate: "",
        MedicalExaminationAddress: "",
        DoctorName: "",
        FullName: "",
        DateOfBirth: "",
        PhoneNumber: "",
        DoctorPhoneNumber: "",
      },
      rules: {
        RecordTitle: { Required: true },
        RecordDate: { Required: true },
        MedicalExaminationAddress: { Required: true },
        DoctorName: { Required: true },
        FullName: { Required: true },
        DateOfBirth: { Required: true },
        PhoneNumber: { Required: true },
        DoctorPhoneNumber: { Required: true },
      },

      formTitle: "Thêm hồ sơ",
    };
  },
  created() {
    this.getComboboxPatient();
    this.editMode = this.formMode;
    if (this.editMode == 2) {
      this.records = this.data;
    }
  },
  methods: {
    getComboboxPatient() {
      var url = "https://localhost:44371/api/FamilyMembers";
      axios
        .get(`${url}`)
        .then((response) => {
          this.patients = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectItemCbb(value) {
      if (value) {
        this.records.PatientName = value.PatientName;
        this.records.PatientID = value.PatientID;
      } else {
        this.records.PatientName = "";
        this.records.PatientID = "";
      }
    },
    save() {
      console.log(this.records);
      var me = this;
      debugger;
      if (me.validateAll()) {
        if (me.editMode == 1) {
          var url = "https://localhost:44371/api/Records/records";
          axios({
            url: `${url}`,
            method: "post",
            data: me.records,
          })
            .then(function (res) {
              me.$emit("closeForm", false);
              me.emitter.emit("loadDataRecord");
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
          var url = "https://localhost:44371/api/Records/records";
          axios({
            url: `${url}`,
            method: "put",
            data: me.records,
          })
            .then(function (res) {
              me.$emit("closeForm", false);
              me.emitter.emit("loadDataRecord");
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
    },
    closeFormST1() {
      this.$emit("closeForm", false);
    },
    closeStep2() {
      this.isShowStep1 = !this.isShowStep1;
      this.isShowStep2 = !this.isShowStep2;
    },
    closeStep3() {
      this.isShowStep2 = !this.isShowStep2;
      this.isShowStep3 = !this.isShowStep3;
    },
    nextStep1() {
      this.isShowStep1 = !this.isShowStep1;
      this.isShowStep2 = !this.isShowStep2;
    },
    nextStep2() {
      this.isShowStep2 = !this.isShowStep2;
      this.isShowStep3 = !this.isShowStep3;
    },

    addRow() {
      this.records.MedicalTests.push({
        TestID: "00000000-0000-0000-0000-000000000000",
        RecordID: "00000000-0000-0000-0000-000000000000",
        TestName: "",
        Unit: "",
        Normal: "",
        TestDate: "",
        SamplingTime: null,
        SampleReceiptTime: null,
        TypeTest: "",
        TestBy: "",
        TestResult: "",
      });
    },
    removeDetail(item, index) {
      this.records.MedicalTests.splice(index, 1);
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
      if (!this.records[propName]) {
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
}
.form-add .form-record {
  margin: 0px;
  width: 750px;
  height: 540px;
  background-color: #fff;
  padding: 20px;
}

.gr-item {
  position: relative;
}
.label {
  font-weight: bold;
}
.process {
  display: flex;
  padding: 8px;
  justify-content: center;
}
.process-two,
.process-three,
.process-one {
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
.line-two,
.line-one {
  border-bottom: 1px solid #f5f5f5;
  margin-top: 28px;
  width: 130px;
  height: 0px;
}
.bg-disable {
  background-color: #d9d9d9;
  color: #fff;
  border: none;
}
.step {
  background-color: #fff;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
}
</style>
