<template>
  <div id="table" :style="mode == 1 || mode == 0 ? { height: 91 + '%', marginTop: 16+'px' }: {height: 118 + '%'}">
    <div class="table">
      <table>
        <thead>
          
          <tr>
            <th class="stt">
              {{ inforTable.numeric }}
              <div class="tooltip-stt">Số thứ tự</div>
            </th>

            <th class="th-width-180">{{ inforTable.fixed_asset_code }}</th>
            <th class="th-width-180">{{ inforTable.fixed_asset_name }}</th>
            <th class="th-width-max">{{ inforTable.department_name }}</th>
            <th class="th-width-180 text-right">{{ inforTable.cost }}</th>
            <th class="th-width-180 text-right">
              {{ inforTable.depreciation_value }}
            </th>

            <th class="th-width-180 text-right">
              {{ inforTable.residualValue }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style="border: none" class="data" v-if="fixedAsset.length == 0">

            <td colspan="7" class="noData">
              <div class="no-data">
                <div class="icon-noData"></div>   
                <h3>Không có dữ liệu</h3>    
              </div>
            </td>
            </tr>
          <tr v-for="(item, index) in fixedAsset" :key="index">
            <td class="text-center">{{ index + 1 }}</td>

            <td>{{ item.fixed_asset_code }}</td>
            <td>{{ item.fixed_asset_name }}</td>
            <td class="th-width-max">{{ item.department_name }}</td>
            <td class="text-right" >{{ formatMoney(item.cost) }}</td>
            <td class="text-right" >
              {{ formatMoney(item.depreciation_value) }}
            </td>

            <!-- <td v-if="mode!=0" class="text-right" :class="mode==1 ? 'hide-hover' : ''">{{ formatMoney(item.residual_value) }}</td> -->
            <td 
              :class="mode == 1 || mode == 0 ? 'hide-hover' : ''"
              class="text-right"
            >
              {{ formatMoney(item.cost - item.impoverishment) }}
            </td>
            <div class="function-table" v-if="mode == 0 || mode == 1">
              <div class="icon icon-edit" @click="showForm(item)"></div>
              <div class="icon icon-delete" @click="deleteItem(item)"></div>
            </div>
          </tr>
        </tbody>
        <!-- <tfoot v-if="mode == 1 || mode == 0">
          <tr class="tb-footer" style="background: #efefef; height: 50px">
            <td
              colspan="4"
              style="min-width: 176px; max-width: 176px; box-sizing: border-box"
            ></td>

            <td
              colspan="1"
              class="text-right"
              style="min-width: 79px; max-width: 79px; box-sizing: border-box"
            >
              <div class="total-count">
                <strong> {{ formatMoney(totalCost) }} </strong>
              </div>
            </td>
            <td
              colspan="1"
              class="text-right"
              style="min-width: 105px; max-width: 105px; box-sizing: border-box"
            >
              <div class="total-price">
                <strong>{{ formatMoney(totalDep) }} </strong>
              </div>
            </td>
            <td
              colspan="1"
              class="text-right"
              style="min-width: 104px; max-width: 104px; box-sizing: border-box"
            >
              <div class="total-price">
                <strong> {{ formatMoney(totalResi) }}</strong>
              </div>
            </td>{{ formatMoney(totalResi) }}
          </tr>
        </tfoot> -->
      </table>
      <div id="load" v-show="isShowLoad && (mode != 1 && mode != 0)" >
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
    </div>
    <table class="tb-footer" style="background-color: #efefef;" v-if="mode == 1 || mode == 0">
      <thead style="display: none;">
        <tr>
            <th class="stt">
              {{ inforTable.numeric }}
              <div class="tooltip-stt">Số thứ tự</div>
            </th>

            <th class="th-width-180">{{ inforTable.fixed_asset_code }}</th>
            <th class="th-width-180">{{ inforTable.fixed_asset_name }}</th>
            <th class="th-width-max">{{ inforTable.department_name }}</th>
            <th class="th-width-180 text-right">{{ inforTable.cost }}</th>
            <th class="th-width-180 text-right">
              {{ inforTable.depreciation_value }}
            </th>

            <th class="th-width-180 text-right">
              {{ inforTable.residualValue }}
            </th>
          </tr>
        </thead>
        <tbody>

          <tr style="cursor: auto;">
                 <td style="min-width: 460px; max-width: 470px; box-sizing: border-box" colspan="4"> <strong>Tổng:</strong>  </td>
                 <td class=" text-right" style="min-width:130px; max-width: 130px; box-sizing: border-box" colspan="1"> 
                  <strong>{{ formatMoney(totalCost) }}</strong> </td>
                 <td class=" text-right" style="min-width: 147px; max-width: 147px; box-sizing: border-box" colspan="1">
                  <strong>{{ formatMoney(totalDep) }}</strong>  
                  </td>
                 <td class="text-right"   style="min-width: 134px; max-width: 134px; box-sizing: border-box" colspan="1">
                  <strong> {{ formatMoney(totalResi) }}</strong>
                 
                  </td>
                </tr>
           
        </tbody>
    </table>
    
  </div>
  
  <FormEdit
    style="margin-top: -100px"
    v-if="isShowFormEdit"
    @hideFormEdit="showFormEdit"
    :fixedAssetSelected="itemEditSelected"
    @costEdit="totalCostFixedAsset"
  ></FormEdit>
 
  <!-- 
   
    @hideFormEdit="showFormEdit"
    :fixedAssetSelected="itemEditSelected"
    @costEdit="totalCostFixedAsset" -->
</template>
<script>
import { TableDetail } from "../../js/common/table";
import { URL_FixedAssetDetail } from "@/js/common/urlAsset";
import MSFunction from "../../js/common/function";
import { FormDetailMode } from "../../js/common/enumeration";
// import { formatMoney } from "../../js/common/function";
import axios from "axios";
// import FormEdit from "./BaseIncrementEdit.vue"
export default {
  // components:{FormEdit},
  props: [
    "listSelected",
    "listChose",
    "modeTable",
    "voucherId",
    "modeForm",
    "residualValue",
    "depreciationValue",
    "totalPrice",
    "totalCostEdit",
    "keySearch"
  ],
  data() {
    return {
      fixedAsset: [],
      inforTable: TableDetail,
      SelectedId: "",
      mode: FormDetailMode.Edit,
      newDataEdit: [],
      formMode: FormDetailMode.Add,
      itemChoose: [],
      isShowLoad:false,
      listA: [],
      totalCost: 0,
      totalDep: 0,
      totalResi: 0,
      impro: 0,
      oldData: [],
      isShowFormEdit: false,
      itemEditSelected: "",
      itemDeleted:[],
    };
  },
  mounted() {
    this.emitter.on("loadFixedAsset", () => {});
  },
  watch: {
    keySearch:function(data){
      console.log(data);
      this.fixedAsset=[]
      // this.getByVoucher();
    },
    /**
     *
     * theo dõi giá tài sản
     * AUTHOR: HTTHOA(25/04/2023)
     */
    totalCostEdit: function (data) {
      for (const item of this.fixedAsset) {
        if (item.fixed_asset_id == this.itemEditSelected) {
          item.cost = data;
        }
      }
    },
    /**
     * 
     *tổng nguyên giá
     AUTHOR: HTTHOA(25/04/2023)
     */
    totalPrice: function (data) {
      this.totalCost = data;
      this.$emit("cost", this.totalCost);
    },
    residualValue: function (data) {
      this.totalResi = data;
    },
    depreciationValue: function (data) {
      this.totalDep = data;
    },
    modeForm: function (data) {
      this.formMode = data;
    },
   
    modeTable: function (data) {
      this.mode = data;
    },
    voucherId: function (data) {
      if (data != "") {
        this.listSelectedId = data;
        this.getByVoucher();
      } else {
        this.fixedAsset = [];
      }
    },
    listChose: function (data) {
      this.fixedAsset = data;
    },
    listSelected: function (data) {
      this.listSelectedId = data;
      if (data != "") {
        this.getByVoucher();
      } else {
        this.fixedAsset = [];
      }
    },
  },
  created() {
    this.mode = this.modeTable;
    this.formMode = this.modeForm;
  },

  methods: {
    deleteItem(item) {
      this.fixedAsset.splice(this.fixedAsset.indexOf(item), 1);
      this.itemDeleted.push(item)
      console.log(this.fixedAsset);
      this.$emit("ItemRemoved", this.fixedAsset,this.itemDeleted);

    },
    /**
     * format tiền
     * AUTHOR: HTTHOA(18/4/2023)
     */
    formatMoney(data) {
      return MSFunction.formatMoney(data);
    },
    /**
     * hiển thị form chỉnh sửa
     * AUTHOR: HTTHOA(18/4/2023)
     */
    showFormEdit(value) {
      this.isShowFormEdit = value;
    },
    showForm(item) {
      this.oldData = this.fixedAsset;
      this.$emit("showFormEditAsset", true);
      // this.isShowFormEdit=true
      this.$emit("fixedAssetSelected", item);
      this.itemEditSelected = item.fixed_asset_id;
    },
    /**
     * lấy danh sách chi tiết chứng từ
     * AUTHOR: HTTHOA(18/4/2023)
     */
    getByVoucher() {
      this.isShowLoad=true
      var me = this;
      axios
        .get(`${URL_FixedAssetDetail}/Detail?listId=${this.listSelectedId}`)
        .then(function (res) {
          me.fixedAsset = res.data;
          me.newDataEdit = me.fixedAsset;
          me.isShowLoad=false
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
#load{
  width: 100% !important;
  height: 100% !important;
  top: 0px;
  left:0px;
  position:absolute !important;
}
.function-table {
  position: absolute;
  right: 8px;
  justify-content: space-between;
  top: 35%;
  width: 55px;
}
tr {
  position: relative;
}
tr:hover .hide-hover {
  display: none;
}
.th-width-180 {
  min-width: 100px;
  max-width: 160px;
  width: 150px;
}
.th-width-min {
  width: 80px;
}
.th-width-max {
  min-width: calc(100% - 900px);
  width: calc(100% - 700px);
  min-width: calc(100% - 600px);
}
.text-blue {
  color: #1aa4c8;
}
</style>
