<template>
  <div id="form" @keyup.esc="onClickBtnCancel" tabindex="0"  @keydown.ctrl.s.stop.prevent="saveIncrement">
    <div class="form increment-form">
      <div class="form-header">
        <h2 id="hd-form">{{ formTitle }}</h2>
        <div class="icon icon-close" @click="onClickBtnCancel">
          <div class="toolipClose">{{ formInfo.btnClose }}</div>
        </div>
      </div>
      <div class="form-body">
        <div class="title">
          {{ formInfo.voucher }}
        </div>
        <div class="increment">
          <div class="row-input-end" style="margin-top: 8px">
            <div class="item-input-cl3" style="margin-right: 16px">
              <label for="item-input"
                >{{ formInfo.voucherCode }} <span>*</span></label
              >
              <br />

              <div class="form-input">
                <input
                  v-model="incrementsInsert.voucher_code"
                  ref="voucher_code"
                  :class="error.voucher_code != '' ? 'border-red' : ''"
                  @blur="validate('voucher_code')"
                  style="margin-top: 0px"
                  type="text"
                  tabindex="0"
                  @focus="$refs.voucher_code.select()"
                />
                <p class="error" v-if="error.voucher_code != ''">
                  {{ formInfo.voucherCode }} {{ error.voucher_code }}
                </p>
              </div>
            </div>
            <div class="item-input-cl3">
              <label for="item-input" style="margin-bottom: 8px"
                >{{ formInfo.startUsedDate }} <span>*</span></label
              >
              <br />
              <div class="form-input">
                <el-date-picker
                  @blur="validate('start_use_date')"
                  v-model="incrementsInsert.start_use_date"
                  type="date"
                  :placeholder="dateConfig.Format"
                  :format="dateConfig.Format"
                  value-format="YYYY-MM-DD"
                  :class="error.start_use_date != '' ? 'border-red' : ''"
                />
                <!-- :class="error.tracked_year != '' ? 'border-red' : ''" -->
                <p class="error" v-if="error.start_use_date != ''">
                  {{ formInfo.startUsedDate }} {{ error.start_use_date }}
                </p>
              </div>
            </div>
            <div class="item-input-cl3" style="margin-left: 16px">
              <label for="item-input" style="margin-bottom: 8px"
                >{{ formInfo.incrementDate }} <span>*</span></label
              >
              <br />
              <div class="form-input">
                <el-date-picker
                  @blur="validate('fixed_asset_increment_date')"
                  v-model="incrementsInsert.fixed_asset_increment_date"
                  type="date"
                  :placeholder="dateConfig.Format"
                  :format="dateConfig.Format"
                  value-format="YYYY-MM-DD"
                  :class="
                    error.fixed_asset_increment_date != '' ? 'border-red' : ''
                  "
                />

                <p class="error" v-if="error.fixed_asset_increment_date != ''">
                  {{ formInfo.incrementDate }}
                  {{ error.fixed_asset_increment_date }}
                </p>
              </div>
            </div>
          </div>
          <div class="input-row" style="margin-top: 15px">
            <label for="">{{ formInfo.note }}</label>
            <input
              type="text"
              v-model="incrementsInsert.description"
              class="note"
            />
          </div>
        </div>
        <div class="titleDetail">
          {{ formInfo.detail }}
        </div>
        <div class="body-item-bottom">
          <div class="item-header">
            <div class="input">
              <input
                type="text"
                class="search"
                :placeholder="formInfo.placeholderSearch"
                v-model="keyword"
                @keypress.enter="getDataFilter"
              />
              <div class="icon-search icon"></div>
            </div>
            <div class="button-choose">
              <button class="btn-choose" @click="showFormChoose">
                {{ formInfo.btnChoose }}
              </button>
            </div>
          </div>
          <TableBottom
            @ItemRemoved="listRemoved"
            :modeForm="formMode"
            @NewDataEdit="newListIncrement"
            :voucherId="idVoucherSelect"
            @showFormEditAsset="showFormEdit"
            @fixedAssetSelected="itemSelected"
            :modeTable="mode"
            :totalPrice="cost"
            :depreciationValue="depreciation"
            :residualValue="resi"
            :listChose="listFixedAssetChose"
            @cost="totalCost"
            :totalCostEdit="costEdit"
            :listSelected="itemSelect"
          ></TableBottom>
        </div>
      </div>
      <div class="form-footer">
        <button @click="saveIncrement" class="save btn-hover-blue">
          {{ formInfo.btnSave }}
          <div class="tooltipSave">Ctrl + S</div>
        </button>

        <button class="cancel btn-hover-outline" @click="onClickBtnCancel" @blur="setFocusFirst">
          {{ formInfo.btnCancel }}
        </button>
      </div>
    </div>
  </div>
  <ChooseAsset
    v-if="showFormChooseAsset"
    @getPagingAsset="loadData"
    :removedList="listID"
    @listFixedAsset="listChoose"
    @closeChooseAsset="closeFormChoose"
    :listSelected="id"
  ></ChooseAsset>
  <FormEdit
    v-if="isShowFormEdit"
    @hideFormEdit="showFormEdit"
    :fixedAssetSelected="itemEditSelected"
    @costEdit="totalCostFixedAsset"
   
  ></FormEdit>
  <Popup
    v-if="isShowPopup"
    :msg="msgError"
    :name="btnName"
    :btnLeft="btnLeftName"
    :close="closeStatus"
    @hidePopup="closePopup"
    @hidePopupAndForm="hidePopupForm"
    @saveAndHideForm="saveAndHide"
  ></Popup>
</template>
<script>
import { FormIncrement } from "../../js/common/form";
import TableBottom from "../base/BaseTableBottom.vue";
import FormEdit from "../base/BaseIncrementEdit.vue";
import ChooseAsset from "../base/BaseChooseAsset.vue";
import { DateConfig } from "../../js/common/config";
import { ElDatePicker } from "element-plus";
import {
  URL_GetNewCode_Increment,
  URL_FixedAssetIncrements,
  URL_FixedAssetDetail,
} from "../../js/common/urlAsset";
import axios from "axios";
import { ErrorMsg, Msg, btnPopup, NoticeMsg } from "../../js/common/resource";
import { CloseST, FormDetailMode,ErrorCode } from "../../js/common/enumeration";
import { useToast } from "vue-toastification";
import Popup from "./BasePopup.vue";
export default {
  props: ["modeDetail", "title", "itemSelect", "idVoucherSelect"],
  components: {
    TableBottom,
    ChooseAsset,
    FormEdit,
    ElDatePicker,
    Popup,
  },
  data() {
    return {
      closeStatus: 0,
      msgError: "",
      btnName: "",
      formInfo: FormIncrement,
      showFormChooseAsset: false,
      isShowFormEdit: false,
      listFixedAssetChose: [],
      listBeforeEdit:[],
      listSearch: [],
      listBeforeSearch: [],
      oldAsset: [],
      newAsset: [],
      mode: FormDetailMode.Add,
      itemEditSelected: "",
      listRemovedAsset: [],
      dateConfig: DateConfig,
      isValid: false,
      isShowPopup: false,
      formMode: FormDetailMode.Add,
      formTitle: "",
      oldData: [],
      cost: 0,
      depreciation: 0,
      resi: 0,
      costEdit: 0,
      id: "",
      keyword: "",
      voucher: {},
      listAssetOldEdit:[],
      listID:[],
      listAssetOld:[],
      listDeleted:[],
      incrementsInsert: {
        voucher_id: "00000000-0000-0000-0000-000000000000",
        voucher_code: "",
        voucher_date: new Date().toISOString().slice(0, 10),
        fixed_asset_increment_date: new Date().toISOString().slice(0, 10),
        start_use_date: new Date().toISOString().slice(0, 10),
        total_price: 0,
        description: "",
        created_by: "",
        created_date: new Date().toISOString().slice(0, 10),
        modified_by: "",
        modified_date: new Date().toISOString().slice(0, 10),
        listFixedAssetIdDelete:[],
        listFixedAssetID: [],
      },
      error: {
        voucher_code: "",
        fixed_asset_increment_date: "",
        start_use_date: "",
      },
      rules: {
        voucher_code: { Required: true, Length: 50 },
        fixed_asset_increment_date: { Required: true },
        start_use_date: { Required: true },
      },
    };
  },
  mounted() {
    this.setFocus();
  },
  created() {
    this.formMode = this.modeDetail;
    console.log(this.incrementsInsert);
    this.formTitle = this.title;
    this.mode = this.modeDetail;
    /**
     * nếu mà mở form edit thì gán đối tượng được chọn vào mode
     */
    if (this.formMode == FormDetailMode.Edit) {
      this.id=this.itemSelect.voucher_id
      console.log(this.id);
      this.incrementsInsert = this.itemSelect;
      this.oldData = { ...this.itemSelect };
      this.getByVoucher();
    }
    else { 
      this.getNewCode();
      this.id=""
    }
   
  },
  watch: {
    /**
     * 
     * theo dõi ds tài sản được chọn
     * HTTHOA(5/5/2023)
     */
    listFixedAssetChose: function (data) {
      console.log(data);
      this.oldAsset=data
      console.log(this.oldAsset);
      this.mode = 0;
      this.cost = 0;
      this.depreciation = 0;
      this.resi = 0;
      for (var item of data) {
        this.cost += item.cost;
        this.depreciation += item.depreciation_value;
        var impoverishment = item.cost - item.impoverishment;
        this.resi += impoverishment;
      }
    },
    /**
     * 
     * theo dõi ds tài sản xóa
     * HTTHOA(5/5/2023)
     */
    listRemovedAsset: function (data) {
      this.oldAsset=data
      this.listID=[]
      console.log(this.oldAsset);
      console.log(data);
      this.listRemovedAsset = data;
      this.listRemovedAsset.filter((a)=>{
      
        this.listID.push(a.fixed_asset_id)
      })
      console.log(this.listID);
    },
    /**
     * 
     * theo dõi biến đê search
     * HTTHOA(5/5/2023)
     */
    keyword: function (data) {
      if (data == "") {
        this.listFixedAssetChose = this.listBeforeSearch;
      }
    },
    costEdit: function(data){
      console.log(data);
      this.listFixedAssetChose = this.oldAsset;
      console.log(this.listFixedAssetChose);
      for (const item of this.listFixedAssetChose) {
        if (item.fixed_asset_id == this.itemEditSelected) {
          item.cost = data;
        }
      }
      this.getTotal(this.listFixedAssetChose);
    }
  },
  methods: {
   /**
     * 
     * focus vào ô đầu tiên
     * HTTHOA(5/5/2023)
     */
    setFocus() {
      this.$nextTick(function () {
        this.$refs["voucher_code"].focus();
      });
    },
    closePopup(){
      this.isShowPopup=false
      this.$refs["voucher_code"].focus();
    },
    /**
     * tìm kiếm tài sản ở form thêm
     * AUTHOR: HTTHOA(25/04/2023)
     */
    getDataFilter() {
      this.listBeforeSearch = this.listFixedAssetChose;
      this.listSearch = this.listFixedAssetChose.filter((asset) =>
        asset.fixed_asset_code.includes(this.keyword)
      );
      this.listFixedAssetChose = this.listSearch;
    },
    /**
     * 
     *tính giá
     AUTHOR: HTTHOA(25/04/2023)
     */
    totalCostFixedAsset(value) {
      console.log(value);
      this.costEdit = value;
      for (const item of this.listFixedAssetChose) {
        if (item.fixed_asset_id == this.itemEditSelected) {
          item.cost = value;
        }
      }
      this.getTotal(this.listFixedAssetChose);
    },
    /**
     * 
     * tính tổng 
     * HTTHOA(5/5/2023)
     */
    getTotal(data) {
      this.mode = 0;
      this.cost = 0;
      this.depreciation = 0;
      this.resi = 0;
      for (var item of data) {
        this.cost += item.cost;
        this.depreciation += item.depreciation_value;
        var impoverishment = item.cost - item.impoverishment;
        this.resi += impoverishment;
      }
      console.log(this.cost);
      this.incrementsInsert.total_price=this.cost
    },
    totalCost(value) {
      this.incrementsInsert.total_price = value;
    },
    /**
     * lấy danh sách các chứng từ theo id được chọn
     * HTTHOA(20/04/2023)
     */
    getByVoucher() {
      var me = this;
      axios
        .get(
          `${URL_FixedAssetDetail}/Detail?listId=${this.itemSelect.voucher_id}`
        )
        .then(function (res) {
          me.listAssetOld = res.data;
          me.listRemovedAsset=res.data
          me.listFixedAssetChose=res.data
          me.oldAsset = res.data;
          
          me.getTotal(me.oldAsset);
            
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    /**
     * đóng form thêm
     * HTTHOA(20/04/2023)
     */
    hidePopupForm() {
      this.isShowPopup = false;
      this.incrementsInsert={}
      this.closeFormAdd();
    },
    /**
     * xử lý ấn nút đóng
     * HTTHOA(20/04/2023)
     */
    onClickBtnCancel() {
      let checkDataNoChange =
        JSON.stringify(this.oldData) === JSON.stringify(this.incrementsInsert);
      if (checkDataNoChange && this.newAsset.length == 0) {
        this.$emit("hideFormAdd", false);
      } else {
        this.isShowPopup = true;
        if (this.formMode == FormDetailMode.Edit) {
          this.closeStatus = CloseST.EditClose;
          this.msgError = NoticeMsg.IncrementEdited;
          this.btnLeftName = btnPopup.Close;
          this.btnName = btnPopup.Save;
        } else {
          this.closeStatus = CloseST.AddClose;
          this.btnLeftName = btnPopup.No;
          this.msgError = NoticeMsg.IncrementAdd;
          this.btnName = btnPopup.Cancel;
        }
      }
    },
    /**
     * chọn lưu khi ấn nút đóng sửa
     * HTTHOA(20/04/2023)
     */
    saveAndHide(value) {
      this.isShowPopup = value;
      this.saveIncrement();
    },
    /**
     * sửa chứng từ
     * HTTHOA(20/04/2023)
     */
    editIncrement() {
      
      const toast = useToast();
      console.log(this.incrementsInsert);
      this.incrementsInsert.total_price=this.cost
      var me = this;
      axios({
        url: `${URL_FixedAssetIncrements}?incrementID=${this.incrementsInsert.voucher_id}`,
        method: "put",
        data: this.incrementsInsert,
      })
        .then(function (res) {
          console.log(res);
          toast.success(Msg.EditSucces, { timeout: 2000 });
          me.incrementsInsert.listFixedAssetID = [];
            me.incrementsInsert.listFixedAssetIdDelete=[]
          me.closeFormAdd();
        
        })
        .catch(function (res) {
          if (res.response.data.ErrorCode == ErrorCode.DuplicateCode) {
            me.isShowPopup = true;
            me.closeStatus = CloseST.DuplicateCode;
            me.msgError =
              ErrorMsg.MsgDuplicateIncrement +
              me.incrementsInsert.voucher_code +
              ErrorMsg.MsgDuplicateRight;
            me.btnName = btnPopup.Agree;
          
         
          } 
        });
    },
    /**
     * thêm chứng từ
     * HTTHOA(20/04/2023)
     */
    addIncrement() {
      this.incrementsInsert.listFixedAssetIdDelete=[]
      const toast = useToast();
      var me = this;
      axios({
        url: `${URL_FixedAssetIncrements}/IncrementDetail`,
        method: "post",
        data: this.incrementsInsert,
      })
        .then(function (res) {
          console.log(res);
          toast.success(Msg.AddSucces, { timeout: 2000 });
          me.closeFormAdd();
          // me.$emit("loadData")
        })
        .catch(function (res) {
          if (res.response.data.ErrorCode == ErrorCode.DuplicateCode) {
            me.isShowPopup = true;
            me.closeStatus = CloseST.DuplicateCode;
            me.msgError =
              ErrorMsg.MsgDuplicateIncrement +
              me.incrementsInsert.voucher_code +
              ErrorMsg.MsgDuplicateRight;
            me.btnName = btnPopup.Agree;
            me.focusToInputError();
          } else {
            me.isShowPopup = true;
            me.closeStatus = CloseST.DuplicateCode;
            me.btnName = btnPopup.Agree;
            me.msgError = res.response.data.Message;
          }
        });
    },
   
    /**
     * ấn nút lưu
     * HTTHOA(20/04/2023)
     */
    saveIncrement() {
     console.log(this.listDeleted);
      if(this.showFormChooseAsset|| this.isShowFormEdit) return;
      console.log(this.listFixedAssetChose);
      console.log(this.listAssetOld);
      this.incrementsInsert.listFixedAssetID = [];
      if (this.validateAll()) {
        if (this.formMode == FormDetailMode.Add) {
          this.listFixedAssetChose.filter((id) => {
            this.incrementsInsert.listFixedAssetID.push(id.fixed_asset_id);
          });
          if (this.incrementsInsert.listFixedAssetID.length > 0) {
            this.addIncrement();
          }else{
            this.isShowPopup = true;
            this.closeStatus = CloseST.ChooseFixedAsset;
            this.btnName = btnPopup.ClosePop;
            this.msgError = NoticeMsg.ChooseFixedAsset;
          }
        } else {
          
         // lấy danh sách tài sản được thêm vào
          if (this.listFixedAssetChose.length > 0) {
            //xem lại chỗ này
            for (const item of this.listFixedAssetChose) {
              if(!this.listAssetOld.some(obj=>obj.fixed_asset_id===item.fixed_asset_id)){
                this.incrementsInsert.listFixedAssetID.push(item.fixed_asset_id)
               }
            }
          } else {
            this.incrementsInsert.listFixedAssetID = [];
           
          }
          this.incrementsInsert.listFixedAssetIdDelete=[]
          // lấy danh sách tài sản bị xóa
          console.log(this.listFixedAssetChose);
         
          if(this.listDeleted.length>0){
            this.listDeleted.filter(item=> this.incrementsInsert.listFixedAssetIdDelete.push(item.fixed_asset_id))
          }else{
            this.incrementsInsert.listFixedAssetIdDelete=[]
          }
          console.log(this.incrementsInsert.listFixedAssetIdDelete);
          this.editIncrement();
        }
      } else{
        var error=this.$el.querySelectorAll('.border-red')
        error[0].focus()
      }
    },
    /**
     * lấy danh sách các tài sản xóa khỏi form chi tiết khi thêm
     * HTTHOA(20/04/2023)
     */
    listRemoved(value, valueDeleted) {
      console.log(valueDeleted);
      this.listFixedAssetChose = value;
      this.listRemovedAsset = value;

      this.listDeleted=valueDeleted.filter(item=>item.voucher_id==this.id)
      this.listID=[]
      this.listRemovedAsset.filter((a)=>{
      
        this.listID.push(a.fixed_asset_id)
      })
      this.oldAsset=value
      console.log(value);
      console.log(this.listAssetOld);
      // if(this.formMode==FormDetailMode.Edit){
      //      this.incrementsInsert.listFixedAssetID=valueDeleted
      // }
   
      this.getTotal(this.listFixedAssetChose);
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
      if (!this.incrementsInsert[propName]) {
        this.error[propName] = ErrorMsg.Required;

        return false;
      } else {
        this.error[propName] = "";
        return true;
      }
    },
    /**
     * validate độ dài
     * AUTHOR: HTTHOA(9/03/2023)
     */
    validateLength(value, propName) {
      // kiểm tra độ dài của mã tài sản
      if (propName == "voucher_code") {
        if (this.incrementsInsert.voucher_code.length > value) {
          this.error[propName] = ErrorMsg.LengthError;
          return false;
        } else {
          return true;
        }
      }
    },
    /**
     * lấy mã chứng từ mới
     * AUTHOR: HTTHOA(18/4/2023)
     */
    getNewCode() {
      var me = this;
      axios
        .get(`${URL_GetNewCode_Increment}`)
        .then(function (res) {
          me.incrementsInsert.voucher_code = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    /**
     * chọn tài sản đẻ chỉnh sửa
     * AUTHOR: HTTHOA(18/4/2023)
     */
    itemSelected(value) {
      this.itemEditSelected = value.fixed_asset_id;
      console.log(this.itemEditSelected);
    },
    /**
     * đóng form chọn tài sản
     * AUTHOR: HTTHOA(18/4/2023)
     */

    closeFormChoose(value) {
      this.showFormChooseAsset = value;
    },
    showFormChoose() {
      this.showFormChooseAsset = !this.showFormChooseAsset;
      // this.listRemovedAsset = this.listFixedAssetChose;
      // this.listRemovedAsset = this.oldAsset;
      // if(this.formMode=FormDetailMode.Edit){

      // }
    },
    /**
     * hiển thị form sửa tài sản
     * AUTHOR: HTTHOA(18/4/2023)
     */
    showFormEdit(value) {
      this.isShowFormEdit = value;
    },
    /**
     * đóng form add
     * AUTHOR: HTTHOA(18/4/2023)
     */
    closeFormAdd() {
      this.$emit("hideFormAdd", false);
      this.emitter.emit("loadDataIncrement");
    },
    /**
     * lấy danh sách tài sản đã chọn
     * AUTHOR: HTTHOA(18/4/2023)
     */
    listChoose(value) {
      console.log(value);
    
      if (this.formMode == FormDetailMode.Edit) {
        // this.listAssetOld=this.oldAsset
        this.newAsset = value;
   
       
       let listEdit = [...this.oldAsset,...this.newAsset];
       this.listFixedAssetChose=listEdit
        
      } else {
        if(this.oldAsset.length==0){
          this.listFixedAssetChose = value;
        }else{
          this.newAsset = value;
          this.newAsset.filter((a) => {
          if (!this.oldAsset.includes(a)) {
            this.oldAsset.push(a);
          }
        });
        this.listFixedAssetChose = this.oldAsset;
        }
      }
      // this.listRemovedAsset=this.listFixedAssetChose
      this.listID=[]
      this.listFixedAssetChose.filter((a)=>{
      
        this.listID.push(a.fixed_asset_id)
      })
      
      console.log(this.listFixedAssetChose);
      this.getTotal(this.listFixedAssetChose);
    },
  },
};
</script>
<style scoped>
.title[data-v-45ea0361]{
  margin-top: 0px;
}
.body-item-top #table,
.body-item-bottom #table {
  position: relative;
  height: calc(100% - 30px) !important;
}
.body-item-bottom .table {
  height: 77%;
  overflow-y: auto;
  width: 100%;
}
.body-item-bottom div#table {
  height: calc(100% - 30px);
}
.body-item-top #table[data-v-45ea0361],
.body-item-bottom #table[data-v-45ea0361] {
  height: calc(100% - 100px);
}
.total {
  display: flex;
  height: 30px;
}
.error {
  top: calc(81% + 3px);
}
.body-item-top #table,
.body-item-bottom #table {
  height: calc(100% - 70px);
}
.border-red {
  border-color: red;
}
label span {
  color: red;
}
.note {
  width: 100%;
}
.el-input__wrapper {
  width: 269px !important;
}
.input-row {
  margin-top: 10px;
}
.row-input-end input {
  width: 304px;
}

.form-body {
  background-color: #f4f7ff;
  padding: 10px;
}

.increment {
  width: 98%;
  background-color: #fff;
  padding: 8px;
}

.title {
  font-size: 15px;
  margin: 8px 0px;
  font-weight: 700;
}

.titleDetail {
  margin: 8px 0px;
  font-size: 15px;
  font-weight: 700;
}

.btn-choose:hover {
  background-color: #1aa4c8;
  color: #fff;
}

.btn-choose {
  min-width: 70px;
  border-radius: 3px;
  border: 1px solid #ccc;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
}

.item-header {
  margin-top: 10px;
}

.icon-filter,
.icon-search {
  top: 18px;
}

.increment-form {
  width: 900px;
  height: 639px;
}
.increment-form .body-item-bottom {
  height: calc(100% - 218px) !important;
}
.form-body {
  height: calc(100% - 104px);
}
</style>
