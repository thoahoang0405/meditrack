<template>
  <div
    id="form"
    @keydown.ctrl.s.prevent="onClickSave"
    @keyup.esc="onClickBtnCancel"
    tabindex="0"
  >
    <div class="form">
      <div class="form-header">
        <h2 id="hd-form">{{ formName }}</h2>
        <div class="icon icon-close" @click="onClickBtnCancel">
          <div class="toolipClose">{{ formInfo.btnClose }}</div>
        </div>
      </div>
      <div class="form-body">
        <div class="row-input">
          <div class="row-input-left">
            <div class="lb">
              <label for="item-input">{{ formInfo.fixed_asset_code }} </label>
              <span>*</span>
            </div>

            <br />
            <input
              v-model="fixedAsset.fixed_asset_code"
              type="text"
              id="txtAssetCode"
              placeholder="Nhập mã tài sản"
              class="item-input check-input"
              ref="fixed_asset_code"
              @focus="focusInput('fixed_asset_code')"
              :class="error.fixed_asset_code != '' ? 'border-red' : ''"
              @blur="validate('fixed_asset_code')"
            />
            <p class="error" v-if="error.fixed_asset_code != ''">
              <span>{{ formInfo.fixed_asset_code }} </span
              >{{ error.fixed_asset_code }}
            </p>
          </div>
          <div class="row-input-right">
            <div class="lb">
              <label for="item-input">{{ formInfo.fixed_asset_name }} </label>
              <span>*</span>
            </div>
            <br />
            <input
              v-model="fixedAsset.fixed_asset_name"
              id="assetName"
              ref="fixed_asset_name"
              placeholder="Nhập tên tài sản"
              type="text"
              class="item-input check-input"
              @focus="focusInput('fixed_asset_name')"
              :class="error.fixed_asset_name != '' ? 'border-red' : ''"
              @blur="validate('fixed_asset_name')"
            />
            <p class="error" v-if="error.fixed_asset_name != ''">
              <span>{{ formInfo.fixed_asset_name }} </span
              >{{ error.fixed_asset_name }}
            </p>
          </div>
        </div>
        <div class="row-input">
          <div class="row-input-left">
            <div class="lb"  style="margin-bottom: -11px;">
              <label for="item-input">{{ formInfo.department_code }}</label
              ><span>*</span>
            </div>

            <Combobox
              class="item-input check-input"
              @onFocusCbb="focusInput('department_name')"
              ref="department_code"
              style="margin-top: 14px"
              :items="departments"
              :code="'department_code'"
              :fieldCode="'department_code'"
              :fieldName="'department_name'"
              :value="fixedAsset.department_code"
              @selectedItem="selectItemCbb"
              refName="'department_code'"
              :border="error.department_code != '' ? 'border-red' : ''"
              @onBlur="validate('department_code')"
            />

            <p class="error" v-if="error.department_code != ''">
              <span>{{ formInfo.department_code }} </span
              >{{ error.department_code }}
            </p>
          </div>
          <div style="margin-left: 16px" class="row-input-right">
            <label for="item-input">{{ formInfo.department_name }}</label>
            <br />
            <input
              disabled
              type="text"
              class="item-input"
              v-model="fixedAsset.department_name"
            />
          </div>
        </div>
        <div class="row-input">
          <div class="row-input-left">
            <div class="lb" style="margin-bottom: -11px;">
              <label for="item-input">{{
                formInfo.fixed_asset_category_code
              }}</label>
              <span>*</span>
            </div>

            <br />
            <Combobox
              class="combobox item-input check-input"
              :items="fixedAssetCategory"
              @focus="focusInput('fixed_asset_code')"
              :code="'fixed_asset_category_code'"
              :fieldCode="'fixed_asset_category_code'"
              :fieldName="'fixed_asset_category_name'"
              @selectedItem="selectItemCategory"
              ref="fixed_asset_category_code"
              :value="fixedAsset.fixed_asset_category_code"
              refName="'fixed_asset_category_code'"
              :border="
                error.fixed_asset_category_code != '' ? 'border-red' : ''
              "
              @onBlur="validate('fixed_asset_category_code')"
            />
            <p class="error" v-if="error.fixed_asset_category_code != ''">
              <span>{{ formInfo.fixed_asset_category_code }} </span
              >{{ error.fixed_asset_category_code }}
            </p>

            <!-- <div class="icon icon-down-bold"></div> -->
          </div>
          <div style="margin-left: 16px" class="row-input-right">
            <label for="item-input">{{
              formInfo.fixed_asset_category_name
            }}</label>
            <br />
            <input
              v-model="fixedAsset.fixed_asset_category_name"
              disabled
              type="text"
              class="item-input"
            />
          </div>
        </div>
        <div class="row-input-cl3 input-number">
          <div class="item-input-cl3">
            <div class="lb">
              <label for="item-input">{{ formInfo.quantity }} </label
              ><span>*</span>
            </div>
            <br />
            <el-input-number
              @focus="focusInput('quantity')"
              ref="quantity"
              v-model="fixedAsset.quantity"
              v-number="number"
              :min="1"
              :max="100000"
              controls-position="right"
              size="large"
              @change="handleChange"
              :class="error.quantity != '' ? 'border-red' : ''"
              @blur="validate('quantity')"
            />

            <p class="error" v-if="error.quantity != ''">
              <span>{{ formInfo.quantity }} </span>{{ error.quantity }}
            </p>
          </div>
          <div class="item-input-cl3">
            <div class="lb">
              <label for="item-input">{{ formInfo.cost }}</label> <span>*</span>
            </div>
            <br />
            <input
              ref="cost"
              @focus="focusInput('cost')"
              v-model="fixedAsset.cost"
              v-number="number"
              type="text"
              @change="formatCost"
              id="price"
              @keypress="inputEnterNumber($event)"
              class="check-input item-input text-right"
              :class="error.cost != '' ? 'border-red' : ''"
              @blur="validate('cost')"
            />
            <p class="error" v-if="error.cost != ''">
              <span>{{ formInfo.cost }} </span>{{ error.cost }}
            </p>
          </div>

          <div class="item-input-cl3">
            <div class="lb">
              <label for="item-input">{{ formInfo.life_time }}</label
              ><span>*</span>
            </div>
            <br />
            <input
              ref="life_time"
              @focus="focusInput('life_time')"
              v-model="fixedAsset.life_time"
              id="yearNumber"
              @keypress="inputEnterNumber($event)"
              type="text"
              class="check-input item-input text-right"
              :class="error.life_time != '' ? 'border-red' : ''"
              @blur="validate('life_time')"
            />
            <p class="error" v-if="error.life_time != ''">
              <span>{{ formInfo.life_time }} </span>{{ error.life_time }}
            </p>
            <div class="text-error"></div>
          </div>
        </div>
        <div class="row-input-cl3 input-number">
          <div class="item-input-cl3">
            <div class="lb">
              <label for="item-input">{{ formInfo.depreciation_rate }}</label>
              <span>*</span>
            </div>
            <br />
            <input
              type="text"
              class="text-right"
              ref="depreciation_rate"
              v-model="fixedAsset.depreciation_rate"
          
              disabled
            />

            <p class="error" v-if="error.depreciation_rate != ''">
              <span>{{ formInfo.depreciation_rate }} </span
              >{{ error.depreciation_rate }}
            </p>
          </div>
          <div class="item-input-cl3">
            <div class="lb">
              <label for="item-input">{{ formInfo.depreciation_value }}</label>
              <span>*</span>
            </div>
            <br />
            <input
              disabled
              tabindex="-1"
              v-model="fixedAsset.depreciation_value"
              v-number="number"
              id="amorYear"
              type="text"
              class="check-input item-input text-right"
              ref="depreciation_value"
              :class="error.depreciation_value != '' ? 'border-red' : ''"
              @blur="validate('depreciation_value')"
            />
            <p class="error" v-if="error.depreciation_value != ''">
              <span>{{ formInfo.depreciation_value }} </span
              >{{ error.depreciation_value }}
            </p>
          </div>

          <div class="item-input-cl3">
            <label for="item-input">{{ formInfo.production_year }}</label>
            <br />
            <input
              v-model="fixedAsset.production_year"
              readonly
              type="text"
              class="item-input text-right"
              tabindex="-1"
            />
          </div>
        </div>
        <div class="row-input-end">
          <div class="item-input-cl3" style="margin-right: 16px">
            <label for="item-input" style="margin-bottom: 8px">{{
              formInfo.purchase_date
            }}</label>
            <br />

            <div class="form-input">
              <el-date-picker
                v-model="fixedAsset.purchase_date"
                type="date"
                :placeholder="dateConfig.Format"
                :format="dateConfig.Format"
                value-format="YYYY-MM-DD"
              />
            </div>
          </div>
          <div class="item-input-cl3">
            <label for="item-input" style="margin-bottom: 8px">{{
              formInfo.tracked_year
            }}</label>
            <br />
            <div class="form-input">
              <el-date-picker
                ref="tracked_year"
                @focus="focusInput('tracked_year')"
                @blur="validate('tracked_year')"
                v-model="fixedAsset.tracked_year"
                type="date"
                :placeholder="dateConfig.Format"
                :format="dateConfig.Format"
                value-format="YYYY-MM-DD"
                :class="error.tracked_year != '' ? 'border-red' : ''"
              />
              <p class="error" v-if="error.tracked_year != ''">
                {{ error.tracked_year }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="form-footer">
        <button class="save btn-hover-blue" @click="onClickSave">
          {{ formInfo.btnSave }}
          <div class="tooltipSave">Ctrl + S</div>
        </button>
       
        <button class="cancel btn-hover-outline" @click="onClickBtnCancel">
          {{ formInfo.btnCancel }}
        </button>
      </div>
    </div>
    <Popup
      v-if="isShowPopup"
      @hidePopup="hidePopupm"
      @saveAndHideForm="saveAndHide"
      :btnLeft="btnLeftName"
      @hidePopupAndForm="hidePopupForm"
      :msg="msgError"
      :name="btnName"
      :close="closeStatus"
 
    ></Popup>
  </div>
</template>
<script>
import Combobox from "./BaseCombobox.vue";
import axios from "axios";
import { ElDatePicker } from "element-plus";
import { ElInputNumber } from "element-plus";
import vi from "element-plus/lib/locale/lang/vi";
import { DateConfig } from "../../js/common/config";
import { Form } from "../../js/common/form";
import Popup from "../base/BasePopup.vue";
import { ErrorMsg, btnPopup, Msg, NoticeMsg } from "../../js/common/resource";
import { FormDetailMode, CloseST,ErrorCode } from "../../js/common/enumeration";
import { useToast } from "vue-toastification";
import MSFunction from "../../js/common/function";
import { directive as VNumber } from "@coders-tm/vue-number-format";
import {
  URL_FixedAssets,
  URL_Category,
  URL_Department,
  URL_FixedAssetsPut,
  URL_GetNewCode,
} from "@/js/common/urlAsset";

export default {
  data() {
    return {
      fixedAssetCategory: [],
      fixed_asset_category_code: "",
      fixed_asset_category_id: "",
      fixed_asset_category_name: "",
      departments: [],
      department_code: "",
      department_id: "",
      department_name: "",
      ElDatePickerLocale: vi,
      purchase_date: "",
      tracked_year: "",
      dateConfig: DateConfig,
      formInfo: Form,
      itemSelectCbb: {},
      isShowPopup: false,
      life_time: 10,
      quantity: "",
      closeStatus: 0,
      keyWord: "",
      cost: 0,
      btnName: "",
      btnLeftName: "",
      formMode: 0,
      isShowNotice: false,
      msgError: "",
      oldDatta: {},
      date: "",
      number: {
        decimal: ",",
        separator: ".",
        prefix: "",
        suffix: "",
        precision: 2,
        nullValue: "",
        masked: false,
        reverseFill: false
      },
      currentTabindex: 1,
      fixedAsset: {
        production_year: 2023,
      },

      listErrorRequired: [],
      error: {
        fixed_asset_code: "",
        fixed_asset_name: "",
        department_code: "",
        fixed_asset_category_code: "",
        quantity: "",
        cost: "",
        life_time: "",
        depreciation_rate: "",
        depreciation_value: "",
        tracked_year: "",
      }, //  các thông báo lỗi
      rules: {
        fixed_asset_code: { Required: true, Length: 20 },
        fixed_asset_name: { Required: true, Length: 255  },
        fixed_asset_category_code: { Required: true },
        tracked_year: { UseDay: true },
        department_code: { Required: true },
        cost: { Required: true, Price: true },
        life_time: { Required: true, Major: 100 },
        quantity: { Required: true },
      },
    };
  },
  directives: {
    number: VNumber,
  },
  components: {
    Combobox,
    ElDatePicker,
    Popup,
    ElInputNumber,
  },

  watch: {
    /**
     * chuyển tiền về số
     * AUTHOR: HTTHOA(24/03/2023)
     */
    depreciation_value: function () {

      this.fixedAsset.depreciation_value =
        parseInt(
          this.convertMoneyToNum(this.fixedAsset.cost) *
            this.fixedAsset.depreciation_rate
        ) / 100;
    },
    
   
  },
  props: [
    "fixedAssetDetail",
    "fixedAssetIdSelected",
    "item",
    "formName",
    "newCodeForm",
    "FormMode",
  ],
  mounted() {
    this.setFocus();
  },

  methods: {
    toDouble(data){
        return MSFunction.formatdouble(data)
    },
    /**
     * theo dõi sự thay đổi tiền trên form để format
     * AUTHOR: HTTHOA(24/03/2023)
     */
    formatCost() {
      console.log(this.formatMoney(this.fixedAsset.cost));
      this.fixedAsset.cost = this.formatMoney(this.fixedAsset.cost);

      this.depreciation_value =
        parseInt(
          this.convertMoneyToNum(this.fixedAsset.cost) *
            this.fixedAsset.depreciation_rate
        ) / 100;
    },
    /**
     * đóng form và popup
     * AUTHOR: HTTHOA(10/03/2023)
     */
    saveAndHide(value) {
      this.showPopup(value);
      this.closeForm();
      this.onClickSave();
    },
    /**
     * click nút save
     * AUTHOR: HTTHOA(10/03/2023)
     */
    onClickSave() {     
        if(this.validateAll()){
          this.fixedAsset.cost = this.convertMoneyToNum(this.fixedAsset.cost);
        this.fixedAsset.depreciation_value = this.convertMoneyToNum(
          this.fixedAsset.depreciation_value
        );

        if (this.formMode == FormDetailMode.Edit) {
          this.editData();
        } else {
          this.addData();
        }
        }else{
          this.isShowPopup = true;
            this.closeStatus = CloseST.DuplicateCode;
           this.btnName = btnPopup.Agree;
           this.msgError =ErrorMsg.ValidateBE

        }
      
    },
    /**
     * focus vào mã tài sản
     * AUTHOR: HTTHOA(9/03/2023)
     */
    setFocus() {
      this.$nextTick(function () {
        this.$refs["fixed_asset_code"].focus();
      });
    },

    /**
     * hiển thị thông báo
     * AUTHOR: HTTHOA (16/03/2023)
     */
    showNotice() {
      this.isShowNotice = !this.isShowNotice;
    },
    /**
     * thêm dữ liệu
     * AUTHOR: HTTHOA(9/03/2023)
     */
    addData() {
      var me = this;
      const toast = useToast();
      axios
        .post(`${URL_FixedAssets}`, me.fixedAsset)
        .then(function (res) {
          console.log("ok", res.data);
          toast.success(Msg.AddSucces, { timeout: 2000});
          if (me.formMode == 0) {
            me.fixedAsset = {};
            me.getMaxCode();
            me.closeForm();
          } else {
            // me.getMaxCode()
            me.closeForm();
          }
          me.$emit("loadData");
        })

        .catch(function (res) {
          console.log(res.response.data.ErrorCode);
          if (res.response.data.ErrorCode == ErrorCode.DuplicateCode) {
            me.isShowPopup = true;
            me.closeStatus = CloseST.DuplicateCode;
            me.msgError =
              ErrorMsg.MsgDuplicateLeft +
              me.fixedAsset.fixed_asset_code +
              ErrorMsg.MsgDuplicateRight;
              me.btnName = btnPopup.Agree;
            me.focusToInputError();
          } else {
            me.isShowPopup = true;
            me.closeStatus = CloseST.DuplicateCode;
            me.btnName = btnPopup.Agree;
            me.msgError =res.response.data.Message
          }
        });
    },
    /**
     * sửa dữ liệu
     * AUTHOR: HTTHOA(9/03/2023)
     */
    editData() {
      var me = this;
      const toast = useToast();
      axios
        .put(
          `${URL_FixedAssetsPut}${me.fixedAsset.fixed_asset_id}`,
          me.fixedAsset
        )
        .then(function () {
          me.closeForm();
          me.fixedAsset = {};
          toast.success(Msg.EditSucces, { timeout: 2000 });
          me.$emit("loadData");
        })
        .catch(function (res) {
          if (res.response.data.ErrorCode == ErrorCode.DuplicateCode) {
            me.isShowPopup = true;
            me.closeStatus = CloseST.DuplicateCode;
            me.msgError =
              ErrorMsg.MsgDuplicateLeft +
              me.fixedAsset.fixed_asset_code +
              ErrorMsg.MsgDuplicateRight;
            me.btnName = btnPopup.Agree;
            me.focusToInputError();
          } else {
            me.isShowPopup = true;
            me.closeStatus = CloseST.DuplicateCode;
            me.btnName = btnPopup.Agree;
            me.msgError = res.response.data.Message
          }
        });
    },
    /*
    lấy mã code mới 
    AUTHOR: HTTHOA(24/03/2023)
    */
    getMaxCode() {
      try {
        axios.get(`${URL_GetNewCode}`).then((res) => {
          this.fixedAsset.fixed_asset_code = res.data;
        });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * chuyển format tiền về số
     * AUTHOR: HTTHOA(28/02/2023)
     */

    convertMoneyToNum(data) {
      return MSFunction.convertMoneyToNum(data);
    },
    /**
     * Hàm format tiền
     * AUTHOR: HTTHOA(20/03/2023)
     */
    formatMoney(money) {
      return MSFunction.formatMoney(money);
    },
    /**
     * hàm check validate tổng
     * AUTHOR: HTTHOA(9/03/2023)
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

    /**
     *
     * validate duyệt từng hàm validate chi tiết
     * AUTHOR: HTTHOA(9/03/2023)
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
     * AUTHOR: HTTHOA(9/03/2023)
     */
    validateRequired(value, propName) {
      // kiểm tra rỗng thì lưu lại lỗi và trả về false
      if (!this.fixedAsset[propName]) {
        this.error[propName] = ErrorMsg.Required;

        return false;
      } else {
        this.error[propName] = "";
        return true;
      }
    },
    /**
     *
     * validate tỉ lệ với năm
     * AUTHOR: HTTHOA(9/03/2023)
     */
    validateMajor(value, propName) {
      // số năm sử dụng thay đổi thì kiểm tra lại tỷ lệ hao mòn
      if (propName == "life_time") {
        this.fixedAsset.depreciation_rate = parseFloat(
          (value / this.fixedAsset.life_time).toFixed(2)
        );
        return true;
      }
    },
    /**
     * validate độ dài
     * AUTHOR: HTTHOA(9/03/2023)
     */
    validateLength(value, propName) {
      // kiểm tra độ dài của mã tài sản
      if (this.fixedAsset[propName]){
      if (this.fixedAsset[propName].length > value) {
          this.error[propName] = ErrorMsg.LengthError;
          return false;
        } else {
          return true;
        }
      }
    },
    /**
     * validate ngày sử dụng k nhỏ hơn ngày mua
     * AUTHOR: HTTHOA(2/4/2023)
     
     */
    validateUseDay(value, propName) {
      var tracked = new Date(this.fixedAsset.tracked_year);
      var purchase = new Date(this.fixedAsset.purchase_date);
      if (propName == "tracked_year") {
        if (tracked.getFullYear() < purchase.getFullYear()) {
          this.error[propName] = ErrorMsg.UsedYear;
          return false;
        } else if (tracked.getFullYear() == purchase.getFullYear()) {
          if (tracked.getMonth() + 1 < purchase.getMonth() + 1) {
            this.error[propName] = ErrorMsg.UsedYear;
            return false;
          } else if (tracked.getMonth() + 1 == purchase.getMonth() + 1) {
            if (tracked.getDate() < purchase.getDate()) {
              this.error[propName] = ErrorMsg.UsedYear;

              return false;
            } else {
              this.error[propName] = "";
              return true;
            }
          } else {
            this.error[propName] = "";
            return true;
          }
        } else {
          this.error[propName] = "";
          return true;
        }
      }
    },
    /**
     *
     * validate nguyên giá với giá trị hao mòn năm
     * AUTHOR: HTTHOA(9/03/2023)
     */
    validatePrice(value, propName) {
      var cost = this.convertMoneyToNum(this.fixedAsset.cost);
      var rate = parseInt(this.fixedAsset.depreciation_rate);
      if (propName == "cost") {
        this.fixedAsset.depreciation_value = parseInt((cost * rate) / 100);
        this.fixedAsset.depreciation_value = this.formatMoney(
          this.fixedAsset.depreciation_value
        );
        return true;
      }
    },
    /**
     *
     * focus thì bỏ thông báo lỗi trên input
     * AUTHOR: HTTHOA(9/03/2023)
     */
    focusInput(propName) {
      this.error[propName] = "";
    },
    /**
     * NHẤN nút hủy ở form
     * AUTHOR: HTTHOA(9/03/2023)
     */
    onClickBtnCancel() {
    // kiểm tra đối tượng sửa xem có thay đổi không
      let checkDataNoChange =
        JSON.stringify(this.oldData) === JSON.stringify(this.fixedAsset);
      if (checkDataNoChange) {
        this.$emit("close", false);
      } else {
        this.showPopup();
        if (this.formMode == FormDetailMode.Edit) {
          this.closeStatus = CloseST.EditClose;
          this.msgError = NoticeMsg.PropertyEdited;
          this.btnLeftName = btnPopup.Close;
          this.btnName = btnPopup.Save;
        } else {
          this.closeStatus = CloseST.AddClose;
          this.btnLeftName = btnPopup.No;
          this.msgError = NoticeMsg.ProopertyAdd;
          this.btnName = btnPopup.Cancel;
        }
      }
    },
    /**
     * định dạng ngày
     * AUTHOR: HTTHOA(9/03/2023)
     */
    formatDate(date) {
      return MSFunction.formatDate(date);
    },

    /**
     * lấy thông tin phòng ban từ combobox
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectItemCbb(value) {
      this.department_name = value.department_name;
      this.fixedAsset.department_code = value.department_code;
      this.fixedAsset.department_name = value.department_name;
      this.fixedAsset.department_id = value.department_id;

      console.log(this.fixedAsset.department_code);
    },
    /**
     * lấy thông tin tải sản từ combobox
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectItemCategory(value) {
      this.fixedAsset.fixed_asset_category_name =
        value.fixed_asset_category_name;
      this.fixedAsset.fixed_asset_category_code =
        value.fixed_asset_category_code;
      this.fixedAsset.fixed_asset_category_id = value.fixed_asset_category_id;
      this.fixedAsset.life_time = value.life_time;
      this.fixedAsset.depreciation_rate = value.depreciation_rate;
    },
    /**
     * đóng form chi tiết
     * AUTHOR: HTTHOA(28/02/2023)
     */
    closeForm() {
      this.$emit("close", false);
      this.$emit("loadData");
      //  this.fixedAsset={}
    },
    /**
     * lấy thông tin phòng ban
     * AUTHOR: HTTHOA(28/02/2023)
     */
    getDepartments() {
      axios
        .get(`${URL_Department}`)
        .then((response) => {
          this.departments = response.data;
          console.log(this.departments);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * lấy thông tin loại tài sản
     * AUTHOR: HTTHOA(28/02/2023)
     */
    getCategory() {
      axios
        .get(`${URL_Category}`)
        .then((response) => {
          this.fixedAssetCategory = response.data;
          console.log(this.departments);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * lấy thông tin phòng ban
     * AUTHOR: HTTHOA(28/02/2023)
     */
    setDepartment(department) {
      if (this.disabled) return;
      for (const item of department) {
        this.department_name = item.department_name;
        this.department_code = item.department_code;
        this.department_id = item.department_id;
        console.log(this.department_code);
      }
    },
    /**
     * lấy thông tin loại tài sản
     * AUTHOR: HTTHOA(28/02/2023)
     */
    setCategory(fixedAssetCategory) {
      if (this.disabled) return;
      for (const item of fixedAssetCategory) {
        this.fixed_asset_category_code = item.fixed_asset_category_code;
        this.fixed_asset_category_name = item.fixed_asset_category_name;
        this.fixed_asset_category_id = item.fixed_asset_category_id;
      }
    },
    /**
     * hiển thị popup
     * AUTHOR: HTTHOA(28/02/2023)
     */
    showPopup() {
      this.isShowPopup = !this.isShowPopup;
    },
    /**
     * đóng popup
     * AUTHOR: HTTHOA(28/02/2023)
     */
    hidePopupm(value) {
      this.isShowPopup = value;
      let error=this.$el.querySelectorAll('.border-red')
        error[0].focus()
    },
    /**
     * đóng popup, form
     * AUTHOR: HTTHOA(28/02/2023)
     */
    hidePopupForm(value) {
      console.log(value);
      this.showPopup(value);
      this.closeForm();
    },
    /**
     * những ô input number k được nhập chữ vào
     *  AUTHOR: HTTHOA(20/03/2023)
     */
    inputEnterNumber(evt) {
      return MSFunction.inputEnterNumber(evt);
    },
    /**
     * focus vào ô input bị lỗi
     *  AUTHOR: HTTHOA(20/03/2023)
     */
    focusToInputError() {
      try {
        let i = 1;
        for (const key in this.error) {
          // kiểm tra xem trường nào có lỗi thì focus vào trường đó và break ngay
          if (this.error[key] !== "") {
            this.currentTabindex = i;
            this.setFocusError(this.currentTabindex);
            break;
          }
          i++;
        }
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * 
     *set focus vào input bị lỗi
      AUTHOR: HTTHOA(20/03/2023)
     */
    setFocusError(tabindex) {
      if (this.$el.querySelector(`input[tabindex='${tabindex}']`)) {
        this.$el.querySelector(`input[tabindex='${tabindex}']`).focus();
      }
    },
  },

  created() {
   
    this.formMode = this.FormMode;
    /**
     * khi ấn nút thêm mở form
     * AUTHOR: HTTHOA(20/03/2023)
     */
    if (this.formMode == FormDetailMode.Add) {
      this.fixedAsset = {};
      this.fixedAsset.purchase_date = new Date().toISOString().slice(0, 10);
      this.fixedAsset.tracked_year = new Date().toISOString().slice(0, 10);
      this.fixedAsset.production_year = new Date().getFullYear();
      this.fixedAsset.depreciation_value = 0;
      this.fixedAsset.depreciation_rate = 0;
      this.fixedAsset.quantity = 0;
      this.getMaxCode();
    }
    /**
     * khi ấn nút sửa mở form
     * AUTHOR: HTTHOA(20/03/2023)
     */
    if (this.formMode == FormDetailMode.Edit) {
      this.fixedAsset = this.fixedAssetDetail;
      console.log(this.fixedAsset.depreciation_rate);
      this.fixedAsset.cost = this.formatMoney(this.fixedAssetDetail.cost);
      this.fixedAsset.depreciation_value = this.formatMoney(
        this.fixedAssetDetail.depreciation_value
      );
      this.oldData = { ...this.fixedAssetDetail };
    }
    /**
     * khi ấn nút nhân bản mở form
     * AUTHOR: HTTHOA(20/03/2023)
     */
    if (this.formMode == FormDetailMode.Replication) {
      this.getMaxCode();
      this.fixedAsset = this.fixedAssetDetail;
      this.fixedAsset.cost = this.formatMoney(this.fixedAssetDetail.cost);
      this.fixedAsset.depreciation_value = this.formatMoney(
        this.fixedAssetDetail.depreciation_value
      );
    }

    this.getDepartments();
    this.getCategory();
  },
};
</script>
<style scoped>

.m-combobox .input, .m-combobox-2 .input input{
 margin-right: 0px !important;
}
.border-red {
  border-color: red;
}
.input{
  margin-right: 4px !important;
}
.row-input-left{
  width: 268px;
  margin-right: 0px !important;
 
}
.row-input-left .icon-down-bold{
  bottom: -2px !important
}
.el-input
  .el-input--prefix
  .el-input--suffix
  .el-date-editor
  .el-date-editor--date
  .el-tooltip__trigger
  .el-tooltip__trigger {
  border: 0px solid transparent !important;
}

.el-input-number .el-input-number__decrease .el-icon svg {
  background: url("../../assets/icon/qlts-icon.svg") no-repeat -72px -338px !important;
  width: 10px !important;
  height: 8px !important;
}

.el-input-number .el-input-number__increase .el-icon svg {
  background: url("../../assets/icon/qlts-icon.svg") no-repeat -28px -338px !important;
  width: 10px !important;
  height: 8px !important;
}

.el-input-number .el-icon {
  font-size: 18px !important;
  width: 10px !important;
  height: 8px !important;
}

.el-input-number.is-controls-right
  .el-input-number__decrease
  [class*="el-icon"],
.el-input-number.is-controls-right
  .el-input-number__increase
  [class*="el-icon"] {
  transform: none !important;
}

.el-input-number--large {
  width: 260px !important;
  line-height: 38px;
  box-sizing: border-box;
}

.el-input-number path {
  display: none;
}

.el-input-number__decrease,
.el-input-number__increase {
  background: #ffff !important;
  border: none !important;
}

.el-input-number--large .el-input-number__decrease,
.el-input-number--large .el-input-number__increase {
  width: 24px !important;
}

.el-input-number.is-controls-right[class*="large"] [class*="decrease"] {
  --el-input-number-controls-height: 10px !important;
  height: 8px !important;
  margin-bottom: 8px;
}

.el-input-number.is-controls-right[class*="large"] [class*="increase"] {
  --el-input-number-controls-height: 10px !important;
  margin-top: 18px;
  height: 8px !important;
}

.el-input-number .el-input__inner {
  margin-right: -190px;
  padding: 0px 0px 0px 0px;
}

.input-number .el-input__wrapper {
  margin-top: 8px;
  padding: 1px 20px 0 14px !important;
}

.el-input-number.el-input-number--large.is-controls-right {
  border: none !important;
}

#form {
  width: 100%;
}
</style>
