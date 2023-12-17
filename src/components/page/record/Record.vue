<template>
  <div class="record">
    <div class="header-appoint">
      <div class="title">
        <h2 class="mr-2 mb-2">Quản lý hồ sơ sức khỏe</h2>
        <div class="radio-user mb-1">
          <input class="mr-1" type="radio" value="1" v-model="model.user" />
          <label class="mr-2" for="1">Tôi</label>
          <input class="mr-1" type="radio" value="2" v-model="model.user" />
          <label for="2">Gia đình</label>
        </div>
      </div>
    </div>
    <div class="nav mt-2">
      <div class="search-fn">
        <input
          type="text"
          placeholder="Nhập tên cuộc hẹn để tìm kiếm"
          class="input-seach"
        />
        <div class="icon-s">
          <span class="icon icon-search-black"></span>
        </div>
      </div>
      <div class="btn-right" style="display: flex;">
        <div class="btn-upload mr-2" style="display: flex; cursor: pointer;">
          <div class="icon icon-upload mr-1"></div>
          <div class="mr-2 mt-1" style="color: #22c3e6; font-weight: bold;"> Thêm file hồ sơ</div>
        </div>
        <button class="btn button-blue" @click="showAdd()">+ Thêm hồ sơ</button>
      </div>
    </div>

    <div class="main">
      <div id="table ">
        <div class="table">
          <table keyup.up="onKeyUpTable">
            <thead>
              <tr>
                <th class="stt">
                  {{ tableInfo.numeric }}
                  <div class="tooltip-stt">{{ tableInfo.numericTooltip }}</div>
                </th>

                <th>{{ tableInfo.RecordName }}</th>
                <th class="text-center">{{ tableInfo.FullName }}</th>
                <th>{{ tableInfo.MedicalExaminationAddress }}</th>
                <th>{{ tableInfo.DoctorName }}</th>
                <th>{{ tableInfo.Diagnose }}</th>
                <th>{{ tableInfo.PrescriptionName }}</th>

                <th>
                  <div class="text-center">
                    {{ tableInfo.TreatmentDate }}
                  </div>
                </th>
                <th class="text-center">{{ tableInfo.Notes }}</th>
                <th v-if="model.user != 1">{{ tableInfo.patientName }}</th>
                <th>{{ tableInfo.function }}</th>
              </tr>
            </thead>

            <tbody>
              <tr style="border: none" class="data" v-if="totalRecord == 0">
                <td colspan="11" class="noData">
                  <div class="no-data">
                    <div class="icon-noData"></div>
                    <h3>Không có dữ liệu</h3>
                  </div>
                </td>
              </tr>

              <tr
                ref="rowCheck"
                v-for="(asset, index) of records"
                :key="asset.RecordID"
                :class="listRecord.includes(asset) ? 'active' : ''"
                @dblclick="showFormEdit(asset)"
                @contextmenu="onClickContextMenu(asset, $event)"
                @mousedown.prevent.ctrl="mouseDown(asset)"
                @mouseup.prevent.ctrl="mouseUp(asset)"
                style="max-height: 38px; box-sizing: border-box"
              >
                <td
                  style="
                    min-width: 45px;
                    max-width: 45px;
                    box-sizing: border-box;
                  "
                  class="text-center"
                >
                  {{ index + 1 }}
                </td>
                <td
                  style="
                    min-width: 100px;
                    box-sizing: border-box;
                  "
                >
                  {{ asset.RecordName }}
                </td>
                <td
                  style="
                    min-width: 130px;
                    box-sizing: border-box;
                  "
                  class="text-center"
                >
                  {{ asset.MedicalExaminationAddress }}
                </td>
                <td
                  style="
                    max-width: 140px !important;
                    box-sizing: border-box;
                  "
                >
                  {{ asset.DoctorName }}
                </td>
                <td
                  style="
                    min-width: 90px;
                    box-sizing: border-box;
                  "
                >
                  {{ asset.FullName }}
                </td>

                <td
                  style="
                    min-width: 140px;
                    max-width: auto;
                    box-sizing: border-box;
                  "
                >
                  {{ asset.PrescriptionName }}
                </td>
                <td
                  style="
                    min-width: 150px;
                    max-width: auto;
                    box-sizing: border-box;
                  "
                >
                  {{ asset.Diagnose }}
                </td>
                <td
                  style="
                    min-width: 120px;
                    box-sizing: border-box;
                  "
                  class="text-center"
                >
                  {{  formatDate(asset.TreatmentDate) }}
                </td>
                <td
                  style="
                    min-width: 104px;
                    box-sizing: border-box;
                  "
                  class="text-center"
                >
                  {{ asset.Notes }}
                </td>

                <td
                  v-if="model.user != 1"
                  style="
                    min-width: 104px;
                    box-sizing: border-box;
                  "
                >
                  {{ asset.patientName }}
                </td>
                <td
                  style="
                    min-width: 90px;
                    
                    box-sizing: border-box;
                  "
                >
                  <div class="function-table">
                    <div class="func-edit mr-1" @click="showFormEdit(asset)">
                      Xem/Sửa
                    </div>
                    <div class="icon icon-delete"></div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot v-if="totalRecord != 0">
              <tr class="tb-footer" style="background: #ffff">
                <td
                  colspan="3"
                  style="
                    min-width: 176px;
                    max-width: 176px;
                    box-sizing: border-box;
                  "
                >
                  <div>
                    <div class="total-record">
                      Tổng số:
                      <strong>{{ formatMoney(totalRecord) }}</strong> bản ghi
                    </div>
                  </div>
                </td>
              
                <td
                  colspan="2"
                  style="
                    max-width: 280px !important;
                    min-width: 280px !important;
                    box-sizing: border-box;
                  "
                >
                  <div>
                    <div class="paginate">
                      <Paginate
                        :page-count="totalPage"
                        :page-range="3"
                        :margin-pages="1"
                        :click-handler="clickCallback"
                        :prev-text="'<'"
                        :next-text="'>'"
                        :container-class="'pagination'"
                      >
                      </Paginate>
                    </div>

                    <!-- v-model="pageNumber"
                        :page-count="totalPage"
                        :page-range="3"
                        :margin-pages="1"
                        :click-handler="clickCallback"
                        :prev-link-class="'page-link'"
                        :prev-text="'<'"
                        :prev-class="'page-item'"
                        :next-link-class="'page-link'"
                        :next-text="'>'"
                        :next-class="'page-item'"
                        :container-class="'pagination'"
                        :page-class="'page-item'" -->
                  </div>
                </td>

                <td
                  colspan="1"
                  style="
                    min-width: 90px;
                    max-width: 90px;
                    box-sizing: border-box;
                  "
                ></td>
                <td
                  colspan="1"
                  style="
                    min-width: 90px;
                    box-sizing: border-box;
                  "
                ></td>
                <td
                  colspan="1"
                  style="
                    min-width: 90px;
                    box-sizing: border-box;
                  "
                ></td>
                <td
                  colspan="1"
                  style="
                    min-width: 130px;
                    max-width: 130px;
                    box-sizing: border-box;
                  "
                >
                  <div class="page">
                    <div
                      style="position: relative; cursor: pointer"
                      @click="btnDropUp"
                      v-outside="outsidePage"
                    >
                      <div class="content-page">
                        {{ pageDefault }} bản ghi trên trang
                        <div class="up-down" @click="btnDropUp">
                          <div
                            class="down"
                            :class="isShowPage == true ? 'show' : ''"
                            @click="btnDropUp"
                          >
                            <div class="icon-down-bold icon"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="dropup-page">
                      <div class="item-up" v-show="isShowPage">
                        <div
                          class="item-dropup"
                          :class="{ act: isActive == '10' }"
                          pageSize="10"
                          @click="getPageDefault"
                        >
                          10 bản ghi trên trang
                        </div>
                        <div
                          class="item-dropup"
                          :class="{ act: isActive == '20' }"
                          :value="pageDefault"
                          pageSize="20"
                          @click="getPageDefault"
                        >
                          20 bản ghi trên trang
                        </div>
                        <div
                          class="item-dropup"
                          :class="{ act: isActive == '30' }"
                          pageSize="30"
                          @click="getPageDefault"
                        >
                          30 bản ghi trên trang
                        </div>
                        <div
                          class="item-dropup"
                          :class="{ act: isActive == '50' }"
                          pageSize="50"
                          @click="getPageDefault"
                        >
                          50 bản ghi trên trang
                        </div>
                        <div
                          class="item-dropup"
                          :class="{ act: isActive == '100' }"
                          pageSize="100"
                          @click="getPageDefault"
                        >
                          100 bản ghi trên trang
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  colspan="1"
                  style="
                    min-width: 90px;
                    box-sizing: border-box;
                  "
                ></td>

              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    
    </div>
    <Form v-if="isShowAdd==true" @closeFormST1="isShowAdd=false"></Form>
  </div>
</template>

<script>
import Form from "./RecordAdd.vue"
import Paginate from "vuejs-paginate-next";
import MSFunction from "../../../js/common/function";
import { TableRecord } from "../../../js/common/table";
import { FormDetailMode, CloseST } from "../../../js/common/enumeration";
import axios from "axios";
import {
  ErrorMsg,
  btnPopup,
  TitlePopup,
  NoticeMsg,
} from "../../../js/common/resource";
export default {
  components: {
    Paginate,
    Form
  },
  name: "Record-page",
  props: {
    msg: String,
  },
  data() {
    return {
      isShowAdd:false,
      message: "",
      isShowContextMenu: false,
      posTop: 10,
      posLeft: 10,
      itemDelete: "",
      isDeleted: 0,
      keywordDep: "",
      keywordCate: "",
      numeric: 0,
      employee: [],
      msgError: "",
      msgDelete: "",
      isShow: false,
      btnName: "",
      btnNameLeft: "",
      isShowLoad: false,
      closeStatus: 0,
      isShowPopup: false,
      isShowPage: false,
      assetSelected: [],
      prescription_id: "",
      tableInfo: TableRecord,
      name: "",
      selectedItems: [], // các item được chọn
      formMode: 0,
      totalPage: 0,
      totalRecord: 0,
      pageNumber: 1,
      isActive: "20",
      pageDefault: 20,
      records: [],
      oldData: [],
      newCode: "",
      listRecord: [],
      prescription: {},
      prescriptionCategory: [],
      prescription_category_code: "",
      prescription_category_id: "",
      prescription_category_name: "",
      departments: [],
      department_code: "",
      department_name: "",
      department_id: "",
      currentprescription: {},
      txtSearch: "",
      placeholderName: "",
      totalQuantity: 0,
      totalCost: 0,
      totalImprover: 0,
      listOnMouseDown: {},
      listOnMouseUp: {},
      oldKeyDepartment: "",
      active: null,
      array: [],
      voucher_code: "",
      model: {
        user: 1,
      },
    };
  },
  watch: {
    /**
     * thep dõi biến search
     * AUTHOR: HTTHOA(20/03/2023)
     */
    txtSearch: function () {
      if (this.txtSearch == "") {
        this.pageNumber = 1;
        this.getPagingAsset();
      }
    },

    records: function () {
      if (this.prescription.department_id == "") {
        this.getPagingAsset();
      }
      if (this.prescription.prescription_category_id == "") {
        this.getPagingAsset();
      }
    },
  },
  created() {
    this.getPagingAsset();
  },
  methods: {
    formatDate(date) {
      return MSFunction.formatDate(date);
    },
    showAdd(){
      this.isShowAdd=!this.isShowAdd
    },
    images(e) {
      e.map((res) => console.log(res));
    },
    clear() {
      this.component.clear = true;
    },

    /**
     *
     * format tiền
     *  AUTHOR: HTTHOA(2/4/2023)
     */
    formatMoney(money) {
      return MSFunction.formatMoney(money);
    },
    formatActive(active) {
      return MSFunction.formatActive(active);
    },
    /**
     *
     * click ctrl
     * AUTHOR: HTTHOA(2/4/2023)
     */
    mouseDown(asset) {
      try {
        // lưu tài sản khi mousedown
        this.listOnMouseDown = asset;
      } catch (err) {
        console.log(err);
      }
    },
    /**
     *
     * chọn trong khoảng đã kéo
     * AUTHOR: HTTHOA(2/4/2023)
     */
    selectMultipleItem(item1, item2) {
      //đoạn này là lấy những tài sản khi kéo giữ chuột
      if (
        this.records.includes(item1) &&
        this.records.includes(item2)
      ) {
        // lấy vị trí của 2 item trong mảng prescription
        //start là vị trí đầu khi down ctrl
        let startIndex = this.records.indexOf(item2);
        //end là vị trí khi up ctrl
        let endIndex = this.records.indexOf(item1);
        // kiểm tra vị trí bắt đầu và kết thúc nếu bắt đầu lớn hơn kết thúc thì đổi lại
        if (startIndex > endIndex) {
          let tmp = startIndex;
          startIndex = endIndex;
          endIndex = tmp;
        }

        // thêm các item chưa có trong mảng xóa từ vị trí bắt đầu đến kết thúc
        for (let i = startIndex; i <= endIndex; i++) {
          //nếu trong danh sách chưa gồm tài sản đó thì push vào danh sách
          if (!this.listRecord.includes(this.records[i])) {
            this.listRecord.push(this.records[i]);
          }
        }
      }
    },
    /**
     * up ctrl thả chuột để lấy vị trí cuối cùng chọn
     * AUTHOR: HTTHOA(2/4/2023)
     */
    mouseUp(asset) {
      try {
        // lưu tài sản khi mouseup
        this.listOnMouseUp = asset;
        this.selectMultipleItem(this.listOnMouseDown, this.listOnMouseUp);
        this.listOnMouseDown = {};
        this.listOnMouseUp = {};
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * click lấy vị trí context menu
     * AUTHOR: HTTHOA(2/04/2023)
     */

    onClickContextMenu(asset, e) {
      e.preventDefault();
      this.selectItem(asset);
      //  lấy vị trí chuột
      this.posTop = e.clientY;
      this.posLeft = e.clientX;
      this.isShowContextMenu = true;
    },
    /**
     * đóng context menu
     * AUTHOR: HTTHOA(2/4/2023)
     */
    closeContextMenu() {
      setTimeout(() => {
        this.isShowContextMenu = false;
        this.listRecord = [];
      }, 1000);
    },
    /**
     * click vào nhân bản trong  chức năng context menu
     * AUTHOR: HTTHOA(2/4/2023)
     */
    onClickReplicationContextMenu() {
      this.isShowContextMenu = false;
      this.showReplication(this.currentprescription);
    },
    /**
     * click vào xóa trong  chức năng context menu
     * AUTHOR: HTTHOA(2/4/2023)
     */
    onClickDeleteContextMenu() {
      this.isShowContextMenu = false;
      this.onClickDeleteMultiple();
    },
    /**
     * click vào sửa trong  chức năng context menu
     * AUTHOR: HTTHOA(2/4/2023)
     */
    onClickEditContextMenu() {
      this.isShowContextMenu = false;
      this.showFormEdit(this.currentprescription);
    },
    /**
     * click vào thêm trong  chức năng context menu
     * AUTHOR: HTTHOA(2/4/2023)
     */
    onClickAddContextMenu() {
      this.isShowContextMenu = false;
      this.btnAddOnclick();
    },

    /**focus vào ô search đầu tiên
     * AUTHOR: HTTHOA(27/03/2023)
     */
    setFocus() {
      this.$nextTick(function () {
        this.$refs["search"].focus();
      });
    },

    /**
     * lấy thông tin phòng ban từ combobox
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectItemCbb(value) {
      if (value.department_id) {
        this.department_id = value.department_id;
      } else {
        this.department_id = "";
      }
      this.pageNumber = 1;
      this.getPagingAsset();
    },
    /**
     * lấy thông tin phòng ban từ combobox
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectItemCategory(value) {
      if (value.prescription_category_id) {
        this.prescription_category_id = value.prescription_category_id;
      } else {
        this.prescription_category_id = "";
      }
      this.pageNumber = 1;
      this.getPagingAsset();
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
    hidePopup(value) {
      this.isShowPopup = value;
      this.assetSelected = {};
      this.listRecord = [];
      this.oldData = [];
    },
    /**
     * nhấn nút xóa
     * AUTHOR: HTTHOA(88/03/2023)
     */
    onClickDelete() {
      if (this.listRecord.length < 1) {
        this.showPopup(true);
        this.msgError = ErrorMsg.NotChooseProperty;
        this.closeStatus = CloseST.DeleteCloseNotChoose;
        this.btnName = btnPopup.Agree;
      } else {
        this.showPopup(false);
      }
    },

    /**
     *
     * Hàm lấy ra số bản ghi trên 1 trang hiện lên input
     * AUTHOR: HTTHOA(05/08/2022)
     */
    getPageDefault(e) {
      this.isActive = e.target.getAttribute("pageSize");
      this.pageDefault = e.target.getAttribute("pageSize");
      this.showPage(false);
      this.pageNumber = 1;
      this.getPagingAsset();
    },

    /**
     * hàm hiện dropup
     * AUTHOR: HTTHOA(06/08/2022)
     */
    btnDropUp() {
      if (!this.isShowPage) {
        this.showPage(true);
      } else {
        this.showPage(false);
      }
    },
    /**
     * click outside đóng page
     * AUTHOR: HTTHOA(06/08/2022)
     */
    outsidePage() {
      this.showPage(false);
    },
    /**
     * sự kiện search
     * AUTHOR: HTTHOA(11/03/2023)
     */
    onClickSearch() {
      this.pageNumber = 1;
      this.getPagingAsset();
    },
    /**
     * lấy số bản ghi trên 1 trang số trang và tìm kiếm trên api
     * AUTHOR: HTTHOA(11/03/2023)
     */
  

    getPagingAsset() {
      debugger
      var me = this;
      me.isShowLoad = true;
      var url="https://localhost:44371/api/Records/Filter"
      axios({
        url: `${url}?keyword=${this.txtSearch}&pageSize=${this.pageDefault}&pageNumber=${this.pageNumber}`,
        method: "post",
        data: [],
      })
        
        .then(function (res) {
          me.totalPage = res.data.TotalPages;
          me.totalRecord = res.data.TotalRecords;
          me.records = res.data.Data;
         
        })
        .catch(function () {
          console.log(1);
        });
    },
    loadData() {
      this.pageNumber = 1;
      this.getPagingAsset();
    },
    /**
     * hàm click vào số trang
     * AUTHOR: HTTHOA(15/08/2022)
     */
    clickCallback(pageNum) {
      this.pageNumber = pageNum;
      this.getPagingAsset();
    },

    /**
     *
     * hiển thị paging
     *  AUTHOR: HTTHOA(05/08/2022)
     */
    showPage(is) {
      this.isShowPage = is;
    },

    /**
     * hiển thị form thêm
     * AUTHOR: HTTHOA(28/02/2023)
     */
    btnAddOnclick() {
      this.formMode = FormDetailMode.Add;
      this.name = TitlePopup.Add;
      this.showForm();
    },
    /**
     * hiển thị form
     * AUTHOR: HTTHOA(28/02/2023)
     */
    showForm() {
      this.isShow = true;
    },
    /**
     * đóng form
     * AUTHOR: HTTHOA(28/02/2023)
     */
    closeForm() {
      this.isShow = false;
      this.loadData();
    },

    /**
     * hiển thị form chỉnh sửa
     * AUTHOR: HTTHOA(28/02/2023)
     */
    showFormEdit(asset) {
      this.formMode = FormDetailMode.Edit;
      this.name = TitlePopup.Edit;
      this.isShow = true;
      this.assetSelected = asset;
      this.prescription_id = asset.prescription_id;
    },
    /**
     * hiển thị form nhân bản
     * AUTHOR: HTTHOA(28/02/2023)
     */
    showReplication(asset) {
      this.formMode = FormDetailMode.Replication;
      this.name = TitlePopup.Replication;
      this.isShow = true;
      this.assetSelected = asset;
      this.prescription_id = asset.prescription_id;
    },
    /**
     * đóng form
     * AUTHOR: HTTHOA (20/03/2023)
     */
    hideForm(value) {
      this.isShow = value;
      this.loadData();
    },
    /**
     * thêm phần tử xóa và bỏ khi đã được chọn
     * AUTHOR: HTTHOA (20/03/2023)
     */
    selectItemToList(asset) {
      try {
        this.currentprescription = asset;

        // this.indexFocus = this.records.indexOf(asset);
        if (!this.listRecord.includes(asset)) {
          //thực hiện chọn
          this.listRecord.push(asset);
        } else {
          //thực hiện bỏ chọn
          this.listRecord = this.listRecord.filter((a) => {
            return a !== asset;
          });

          this.currentprescription =
            this.listRecord[this.listRecord.length - 1];
        }
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * hàm chọn 1 item thêm vào mảng xóa
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectItem(asset) {
      this.listRecord = [];
      this.listRecord.push(asset);
      this.currentprescription = asset;
    },
    /**
     * hàm chọn tất cả item
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectedAllItem() {
      try {
        if (this.listRecord.length < this.records.length) {
          this.listRecord = this.records;
        } else {
          this.listRecord = [];
        }
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * gọi api xóa 1 bản ghi
     * AUTHOR: HTTHOA(20/03/2023)
     */
    deleteOne(id) {
      console.log(id);
    },
    /**
     * gọi api xóa nhiều bản ghi
     * AUTHOR: HTTHOA(20/03/2023)
     */
    deleteMultiple() {
      let listRecordID = [];
      var me = this;
      me.listRecord.filter((asset) => {
        listRecordID.push(asset.prescription_id);
      });
    },
    /**
     * kiểm tra xóa 1 hay xóa nhiều khi ấn xóa hiện popup confirm
     * AUTHOR: HTTHOA(20/03/2023)
     */
    onClickDeleteMultiple() {
      try {
        // kiểm tra danh sách được chọn có bao nhiêu bản ghi và hiển thị thông báo

        if (this.listRecord.length == 0) {
          this.showPopup(true);
          this.msgDelete = ErrorMsg.NotChooseProperty;
          this.closeStatus = CloseST.DeleteCloseNotChoose;
          this.btnName = btnPopup.ClosePop;
        } else if (this.listRecord.length == 1) {
          this.showPopup(true);
          if (this.listRecord[0].active == 0) {
            this.msgDelete = NoticeMsg.ConfirmDelet;
            this.closeStatus = CloseST.DeleteOne;
            this.btnName = btnPopup.Delete;
            this.btnNameLeft = btnPopup.No;
            this.itemDelete = this.listRecord[0].prescription_code;
          } else {
            console.log(this.listRecord[0]);
            // this.getByVoucher(this.listRecord[0].voucher_id)
            this.msgDelete =
              "Tài sản có mã  <b>&lt&lt " +
              this.listRecord[0].prescription_code +
              " &gt&gt</b> đã phát sinh chứng từ ghi tăng";
            this.closeStatus = CloseST.DeleteCloseNotChoose;
            this.btnName = btnPopup.ClosePop;
          }
        } else {
          console.log(this.listRecord);
          this.showPopup(true);
          let isDelete = true;
          for (const item of this.listRecord) {
            if (item.active == 1) {
              isDelete = false;
            }
          }
          if (isDelete == false) {
            if (this.listRecord.length < 10) {
              this.msgDelete =
                "<b> 0" +
                this.listRecord.length +
                " </b> tài sản được chọn không thể xóa. Vui lòng kiểm tra lại trước khi thực hiện xóa";
            } else {
              this.msgDelete =
                "<b> " +
                this.listRecord.length +
                " </b>  tài sản được chọn không thể xóa. Vui lòng kiểm tra lại trước khi thực hiện xóa";
            }
            this.closeStatus = CloseST.DeleteCloseNotChoose;
            this.btnName = btnPopup.ClosePop;
          } else {
            this.itemDelete = this.listRecord.length + " tài sản";
            this.msgDelete = NoticeMsg.ConfirmDelet;
            this.closeStatus = CloseST.DeleteMulti;
            this.btnNameLeft = btnPopup.No;
            this.btnName = btnPopup.Delete;
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * hàm ktra xem thực hiện xóa 1 hay xóa nhiều
     * AUTHOR: HTTHOA(20/03/2023)
     */
    deleted(value) {
      console.log(value);
      this.isShowPopup = value;
      console.log(this.listRecord.length);
      this.deleteMultiple();
      // if (this.listRecord.length == 1) {
      //   var id = this.listRecord[0].prescription_id;
      //   console.log(id);
      //   this.deleteOne(id);
      // } else {
      //   this.deleteMultiple();
      // }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li .page-item .active {
  background-color: black !important;
}

div#table\ {
  margin-top: 16px !important;
}
.table table tbody .data:hover {
  background-color: #fff !important;
}
tr .data:hover {
  background-color: #fff;
}
.data {
  width: 100%;
  height: 100px;
}
.noData {
  height: auto;
  margin: auto 48%;
  align-items: center;
}

.act {
  background-color: green;
  color: #fff;
}

.BorderActive {
  border: 1px solid #0075c0 !important;
}

.opacity-icon {
  opacity: 0.5;
}

.act {
  background-color: rgba(26, 164, 200, 0.2);
  color: #111;
}

.active {
  background-color: rgba(4, 137, 170, 0.2);
}

.item-dropup {
  padding: 10px;
}

.item-up {
  position: absolute;
  background-color: #fff;
  margin-left: -1px;
  margin-top: -208px;
  width: 180px;
  z-index: 10;
  border: 1px solid #bbb;
}

.item-up {
  position: absolute;
  background-color: #fff;
  margin-left: -2px;
  margin-top: -208px;

  z-index: 10;
  border: 1px solid #bbb;
}
.item-dropup {
  display: flex;
  justify-content: center;
}

.item-dropup:hover {
  background-color: rgba(26, 164, 200, 0.2);
  color: #111;
}

.paging-left strong {
  color: #000;
}
.paging-left {
  color: #111;
  margin-left: 0px;
}
.paging-right {
  display: flex;
  margin-right: 24px;
}

.paging-right select {
  min-width: 170px;
  height: 35px;
}

.before-text {
  color: rgb(104, 102, 102);
  margin: 8px;
  margin-top: 10px;
}

.more-icon {
  width: 24px;
  height: 24px;
  color: #727272;
  margin-top: 6px;
  margin-right: 4px;
}

.button-unclick {
  border: none;
  background-color: #fff;
}

.button-clicked {
  padding: 2px;
  background-color: #fff;
  border: 1px solid #bbb;
}

.page {
  position: relative;
  color: #111;
  align-items: center;
  text-align: center;
  margin-top: 5px;
}

.paging button {
  margin: 8px 4px 2px 0px;
  width: 20px;
  height: 20px;
}
.after-text {
  color: #111;
  margin: 8px;
  margin-top: 10px;
}

.content-page {
  width: 180px;
  border: 1px solid #bbb;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
}

.page .icon.icon-down-bold {
  margin-right: 8px;
}
.down {
  height: 100%;
  min-width: 32px;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 64px;
  margin-top: 32px;
}
.page .up-down {
  height: 100%;
  min-width: 32px;
  display: flex;
  transform: translateY(-50%);
  transform: translateX(-50%);
  justify-content: center;
  align-items: center;
}
@import url(./Record.scss);
</style>
