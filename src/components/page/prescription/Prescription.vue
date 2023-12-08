<template>
  <div class="prescription">
    <div class="header-appoint">
      <div class="title">
        <h2 class="mr-2 mb-2">Quản lý đơn thuốc</h2>
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
      <button class="btn button-blue" @click="show()">+ Nhập đơn thuốc</button>
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

                <th>{{ tableInfo.prescriptionName }}</th>
                <th class="text-center">{{ tableInfo.PrescriptionDate }}</th>
                <th>{{ tableInfo.CreatedByDoctor }}</th>
                <th>{{ tableInfo.PrescriptionStatus }}</th>
                <th>{{ tableInfo.CreatedByAddress }}</th>
                <th>{{ tableInfo.Diagnose }}</th>

                <th>
                  <div class="text-center">
                    {{ tableInfo.FromDate }}
                  </div>
                </th>
                <th class="text-center">{{ tableInfo.ToDate }}</th>
                <th v-if="model.user != 1">{{ tableInfo.PatientName }}</th>
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
                v-for="(asset, index) of prescriptions"
                :key="asset.prescription_id"
                :class="listPrescription.includes(asset) ? 'active' : ''"
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
                    max-width: 100px;
                    box-sizing: border-box;
                  "
                >
                  {{ asset.PrescriptionName }}
                </td>
                <td
                  style="
                    min-width: 130px;
                    max-width: 130px;
                    box-sizing: border-box;
                  "
                  class="text-center"
                >
                  {{ asset.PrescriptionDate }}
                </td>
                <td
                  style="
                    max-width: 140px !important;
                    min-width: 140px !important;
                    box-sizing: border-box;
                  "
                >
                  {{ asset.CreatedByDoctor }}
                </td>
                <td
                  style="
                    min-width: 90px;
                    max-width: 90px;
                    box-sizing: border-box;
                  "
                  :class="genderClass(asset.PrescriptionStatus)"
                >
                  {{ formatEnum(asset.PrescriptionStatus)  }}
                </td>

                <td
                  style="
                    min-width: 150px;
                    max-width: auto;
                    box-sizing: border-box;
                  "
                >
                  {{ asset.CreatedByAddress }}
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
                    max-width: 120px;
                    box-sizing: border-box;
                  "
                  class="text-center"
                >
                  {{ asset.FromDate }}
                </td>
                <td
                  style="
                    min-width: 104px;
                    max-width: 104px;
                    box-sizing: border-box;
                  "
                  class="text-center"
                >
                  {{ asset.ToDate }}
                </td>

                <td
                  v-if="model.user != 1"
                  style="
                    min-width: 104px;
                    max-width: 104px;
                    box-sizing: border-box;
                  "
                >
                  {{ asset.PatientName }}
                </td>
                <td
                  style="
                    min-width: 90px;
                    max-width: 90px;
                    box-sizing: border-box;
                  "
                >
                  <div class="function-table">
                    <div class="func-edit" @click="showFormEdit(asset)">
                      Xem/Sửa
                    </div>
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
                  style="min-width: 90px; box-sizing: border-box"
                ></td>
                <td
                  colspan="1"
                  style="min-width: 90px; box-sizing: border-box"
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
                  style="min-width: 90px; box-sizing: border-box"
                ></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="notice">
        <div class="notice-content">
          <div class="text">
            <div class="title-notice">Tổng số đơn thuốc đang sử dụng</div>
            <div class="count">1</div>
          </div>
          <img
            src="../../../assets/img/prescription-icon-16.jpg"
            height="86"
            alt=""
          />
        </div>
      </div>
    </div>
    <Form v-if="isShowForm == true" @closeForm="isShowForm = false"></Form>
  </div>
</template>

<script>
import Paginate from "vuejs-paginate-next";
import MSFunction from "../../../js/common/function";
import { Table } from "../../../js/common/table";
import Form from "./PrescriptionForm.vue";

import { FormDetailMode, CloseST } from "../../../js/common/enumeration";
import {
  ErrorMsg,
  btnPopup,
  TitlePopup,
  NoticeMsg,
} from "../../../js/common/resource";
export default {
  name: "Prescription-page",
  components: {
    Paginate,
    Form,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      isShowForm: false,
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
      tableInfo: Table,
      name: "",
      selectedItems: [], // các item được chọn
      formMode: 0,
      totalPage: 0,
      totalRecord: 0,
      pageNumber: 1,
      isActive: "20",
      pageDefault: 20,
      prescriptions: [],
      oldData: [],
      newCode: "",
      listPrescription: [],
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

    prescriptions: function () {
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
    show() {
      this.isShowForm = !this.isShowForm;
    },

    showFormEdit(item) {
      this.isShowForm = !this.isShowForm;
    },
    formatEnum(e) {
      var text = "";
      switch (e) {
        case 1:
          text = "Chưa sử dụng";
          break;
        case 2:
          text = "Đang sử dụng";
          break;
        case 3:
          text = "Đã hoàn thành";
          break;
        case 4:
          text = "Bỏ lỡ";
          break;

        default:
          break;
      }
      return text;
    },
    genderClass(e) {
      var text = "";
      switch (e) {
        case 1:
          text = "clr-green";
          break;
        case 2:
          text = "clr-warning";
          break;
        case 3:
          text = "clr-blue";
          break;
        case 4:
          text = "clr-red";
          break;

        default:
          break;
      }
      return text;
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
        this.prescriptions.includes(item1) &&
        this.prescriptions.includes(item2)
      ) {
        // lấy vị trí của 2 item trong mảng prescription
        //start là vị trí đầu khi down ctrl
        let startIndex = this.prescriptions.indexOf(item2);
        //end là vị trí khi up ctrl
        let endIndex = this.prescriptions.indexOf(item1);
        // kiểm tra vị trí bắt đầu và kết thúc nếu bắt đầu lớn hơn kết thúc thì đổi lại
        if (startIndex > endIndex) {
          let tmp = startIndex;
          startIndex = endIndex;
          endIndex = tmp;
        }

        // thêm các item chưa có trong mảng xóa từ vị trí bắt đầu đến kết thúc
        for (let i = startIndex; i <= endIndex; i++) {
          //nếu trong danh sách chưa gồm tài sản đó thì push vào danh sách
          if (!this.listPrescription.includes(this.prescriptions[i])) {
            this.listPrescription.push(this.prescriptions[i]);
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
        this.listPrescription = [];
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
      this.listPrescription = [];
      this.oldData = [];
    },
    /**
     * nhấn nút xóa
     * AUTHOR: HTTHOA(88/03/2023)
     */
    onClickDelete() {
      if (this.listPrescription.length < 1) {
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
      var me = this;

      me.isShowLoad = false;
      me.totalPage = 3;
      me.totalRecord = 60;
      me.totalImprover = 45545454;
      me.totalCost = 54454554;
      me.totalQuantity = 44;
      me.prescriptions = [
        {
          PrescriptionName: "Thuốc trị cảm cúm",
          PrescriptionDate: "10/10/2023",
          PatientName: 0,
          PrescriptionStatus: 3,
          CreatedByDoctor: "Kiều Văn Khương",
          Diagnose: "K58- Đau đầu",
          CreatedByAddress: "Bệnh viện quân y 103",
          FromDate: "11/10/2023",
          ToDate: "11/11/2023",
          Notes: "Thuốc không dành cho phụ nữ mang thai",
        },
        {
          PrescriptionName: "Thuốc trị cảm cúm",
          PrescriptionDate: "10/10/2023",
          PatientName: 0,
          PrescriptionStatus: 1,
          CreatedByDoctor: "Kiều Văn Khương",
          Diagnose: "K58- Đau đầu",
          CreatedByAddress: "Bệnh viện quân y 103",
          FromDate: "11/10/2023",
          ToDate: "11/11/2023",
          Notes: "Thuốc không dành cho phụ nữ mang thai",
        },
        {
          PrescriptionName: "Thuốc trị cảm cúm",
          PrescriptionDate: "10/10/2023",
          PatientName: 0,
          PrescriptionStatus: 2,
          CreatedByDoctor: "Kiều Văn Khương",
          Diagnose: "K58- Đau đầu",
          CreatedByAddress: "Bệnh viện quân y 103",
          FromDate: "11/10/2023",
          ToDate: "11/11/2023",
          Notes: "Thuốc không dành cho phụ nữ mang thai",
        },
        {
          PrescriptionName: "Thuốc trị cảm cúm",
          PrescriptionDate: "10/10/2023",
          PatientName: 0,
          PrescriptionStatus: 4,
          CreatedByDoctor: "Kiều Văn Khương",
          Diagnose: "K58- Đau đầu",
          CreatedByAddress: "Bệnh viện quân y 103",
          FromDate: "11/10/2023",
          ToDate: "11/11/2023",
          Notes: "Thuốc không dành cho phụ nữ mang thai",
        },
        {
          PrescriptionName: "Thuốc trị cảm cúm",
          PrescriptionDate: "10/10/2023",
          PatientName: 0,
          PrescriptionStatus: 3,
          CreatedByDoctor: "Kiều Văn Khương",
          Diagnose: "K58- Đau đầu",
          CreatedByAddress: "Bệnh viện quân y 103",
          FromDate: "11/10/2023",
          ToDate: "11/11/2023",
          Notes: "Thuốc không dành cho phụ nữ mang thai",
        },
        {
          PrescriptionName: "Thuốc trị cảm cúm",
          PrescriptionDate: "10/10/2023",
          PatientName: 0,
          PrescriptionStatus: 2,
          CreatedByDoctor: "Kiều Văn Khương",
          Diagnose: "K58- Đau đầu",
          CreatedByAddress: "Bệnh viện quân y 103",
          FromDate: "11/10/2023",
          ToDate: "11/11/2023",
          Notes: "Thuốc không dành cho phụ nữ mang thai",
        },
        {
          PrescriptionName: "Thuốc trị cảm cúm",
          PrescriptionDate: "10/10/2023",
          PatientName: 0,
          PrescriptionStatus: 4,
          CreatedByDoctor: "Kiều Văn Khương",
          Diagnose: "K58- Đau đầu",
          CreatedByAddress: "Bệnh viện quân y 103",
          FromDate: "11/10/2023",
          ToDate: "11/11/2023",
          Notes: "Thuốc không dành cho phụ nữ mang thai",
        },
        {
          PrescriptionName: "Thuốc trị cảm cúm",
          PrescriptionDate: "10/10/2023",
          PatientName: 0,
          PrescriptionStatus: 1,
          CreatedByDoctor: "Kiều Văn Khương",
          Diagnose: "K58- Đau đầu",
          CreatedByAddress: "Bệnh viện quân y 103",
          FromDate: "11/10/2023",
          ToDate: "11/11/2023",
          Notes: "Thuốc không dành cho phụ nữ mang thai",
        },
      ];
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

        // this.indexFocus = this.prescriptions.indexOf(asset);
        if (!this.listPrescription.includes(asset)) {
          //thực hiện chọn
          this.listPrescription.push(asset);
        } else {
          //thực hiện bỏ chọn
          this.listPrescription = this.listPrescription.filter((a) => {
            return a !== asset;
          });

          this.currentprescription =
            this.listPrescription[this.listPrescription.length - 1];
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
      this.listPrescription = [];
      this.listPrescription.push(asset);
      this.currentprescription = asset;
    },
    /**
     * hàm chọn tất cả item
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectedAllItem() {
      try {
        if (this.listPrescription.length < this.prescriptions.length) {
          this.listPrescription = this.prescriptions;
        } else {
          this.listPrescription = [];
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
      let listPrescriptionID = [];
      var me = this;
      me.listPrescription.filter((asset) => {
        listPrescriptionID.push(asset.prescription_id);
      });
    },
    /**
     * kiểm tra xóa 1 hay xóa nhiều khi ấn xóa hiện popup confirm
     * AUTHOR: HTTHOA(20/03/2023)
     */
    onClickDeleteMultiple() {
      try {
        // kiểm tra danh sách được chọn có bao nhiêu bản ghi và hiển thị thông báo

        if (this.listPrescription.length == 0) {
          this.showPopup(true);
          this.msgDelete = ErrorMsg.NotChooseProperty;
          this.closeStatus = CloseST.DeleteCloseNotChoose;
          this.btnName = btnPopup.ClosePop;
        } else if (this.listPrescription.length == 1) {
          this.showPopup(true);
          if (this.listPrescription[0].active == 0) {
            this.msgDelete = NoticeMsg.ConfirmDelet;
            this.closeStatus = CloseST.DeleteOne;
            this.btnName = btnPopup.Delete;
            this.btnNameLeft = btnPopup.No;
            this.itemDelete = this.listPrescription[0].prescription_code;
          } else {
            console.log(this.listPrescription[0]);
            // this.getByVoucher(this.listPrescription[0].voucher_id)
            this.msgDelete =
              "Tài sản có mã  <b>&lt&lt " +
              this.listPrescription[0].prescription_code +
              " &gt&gt</b> đã phát sinh chứng từ ghi tăng";
            this.closeStatus = CloseST.DeleteCloseNotChoose;
            this.btnName = btnPopup.ClosePop;
          }
        } else {
          console.log(this.listPrescription);
          this.showPopup(true);
          let isDelete = true;
          for (const item of this.listPrescription) {
            if (item.active == 1) {
              isDelete = false;
            }
          }
          if (isDelete == false) {
            if (this.listPrescription.length < 10) {
              this.msgDelete =
                "<b> 0" +
                this.listPrescription.length +
                " </b> tài sản được chọn không thể xóa. Vui lòng kiểm tra lại trước khi thực hiện xóa";
            } else {
              this.msgDelete =
                "<b> " +
                this.listPrescription.length +
                " </b>  tài sản được chọn không thể xóa. Vui lòng kiểm tra lại trước khi thực hiện xóa";
            }
            this.closeStatus = CloseST.DeleteCloseNotChoose;
            this.btnName = btnPopup.ClosePop;
          } else {
            this.itemDelete = this.listPrescription.length + " tài sản";
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
      console.log(this.listPrescription.length);
      this.deleteMultiple();
      // if (this.listPrescription.length == 1) {
      //   var id = this.listPrescription[0].prescription_id;
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
.notice {
  display: flex;
  justify-content: end;
}
.notice-content {
  width: 255px;
  height: 128px;
  background: #8ed1fc;
  border-radius: 15px;
  display: flex;
  align-items: center;
}
.notice-content .text {
  font-weight: bold;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}
.notice-content .title-notice {
  font-size: 16px;
}
.notice-content .count {
  font-size: 64px;
  text-align: center;
}
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
@import url(./Prescription.scss);
</style>
