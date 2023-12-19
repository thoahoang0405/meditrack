<template>
  <div class="prescription">
    <div class="header-appoint">
      <div class="title">
        <h2 class="mr-2 mb-2">Quản lý đơn thuốc</h2>
        <div class="radio-user mb-1">
          <input class="mr-1" type="radio" value="1" v-model="user" />
          <label class="mr-2" for="1">Tôi</label>
          <input class="mr-1" type="radio" value="2" v-model="user" />
          <label for="2">Gia đình</label>
        </div>
      </div>
    </div>
    <div class="nav mt-2">
      <div class="search-fn">
        <input
          type="text"
          placeholder="Nhập tên đơn thuốc để tìm kiếm"
          class="input-seach"
          v-model="txtSearch"
          @keypress.enter="onClickSearch()"
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
                <th v-if="user != 1">{{ tableInfo.PatientName }}</th>
                <th class="text-center">{{ tableInfo.function }}</th>
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
                :key="asset.PrescriptionID"
                :class="asset.PrescriptionStatus == 2 ? 'active-blue' : ''"
                @dblclick="showFormEdit(asset)"
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
                  {{ formatDate(asset.PrescriptionDate) }}
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
                  {{ formatEnum(asset.PrescriptionStatus) }}
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
                  {{ formatDate(asset.FromDate) }}
                </td>
                <td
                  style="
                    min-width: 104px;
                    max-width: 104px;
                    box-sizing: border-box;
                  "
                  class="text-center"
                >
                  {{ formatDate(asset.ToDate) }}
                </td>

                <td
                  v-if="user != 1"
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
            <div class="count">{{ prescriptionUsing }}</div>
          </div>
          <img
            src="../../../assets/img/prescription-icon-16.jpg"
            height="86"
            alt=""
          />
        </div>
      </div>
    </div>
    <Form
      v-if="isShowForm == true"
      @closeForm="isShowForm = false"
      :data="prescriptionEdit"
      :formMode="formMode"
    ></Form>
  </div>
</template>

<script>
import Paginate from "vuejs-paginate-next";
import MSFunction from "../../../js/common/function";
import { Table } from "../../../js/common/table";
import Form from "./PrescriptionForm.vue";
import axios from "axios";
import { FormDetailMode } from "../../../js/common/enumeration";
import { TitlePopup } from "../../../js/common/resource";
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
      formMode: 1,
      prescriptionEdit: {},
      isShowForm: false,
      message: "",
      isShowContextMenu: false,

      isShow: false,

      isShowPopup: false,
      isShowPage: false,
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
      listPrescription: [],
      prescription: {},
      currentprescription: {},
      txtSearch: "",
      listMedications: [],
      user: 1,
      prescriptionUsing:0
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
        this.getPrescriptions();
      }
    },
    user: function () {
      if (this.user == 1) {
        this.getPrescriptions()
      }else{
        this.getPrescriptions()
      }
    },
    prescriptions: function () {
      if (this.prescription.department_id == "") {
        this.getPrescriptions();
      }
      if (this.prescription.prescription_category_id == "") {
        this.getPrescriptions();
      }
    },
  },
  created() {
    this.getPrescriptions();
  },
  mounted() {
    this.emitter.on("loadDataPrescription", () => {
      this.getPrescriptions();
    });
  },
  methods: {
    formatDate(date) {
      return MSFunction.formatDate(date);
    },
    show() {
      this.formMode = 1;
      this.isShowForm = !this.isShowForm;
    },
    async getMedications(id) {
      var url = "https://localhost:44371/api/Prescriptions/medications?id=";
      await axios
        .get(`${url}${id}`)
        .then((response) => {
          this.listMedications = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async showFormEdit(item) {
      var me = this;
      me.formMode = 2;
      await me.getMedications(item.PrescriptionID);
      me.prescriptionEdit = { ...item, Medications: this.listMedications };
      me.isShowForm = !me.isShowForm;
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

    /**focus vào ô search đầu tiên
     * AUTHOR: HTTHOA(27/03/2023)
     */
    setFocus() {
      this.$nextTick(function () {
        this.$refs["search"].focus();
      });
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
     *
     * Hàm lấy ra số bản ghi trên 1 trang hiện lên input
     * AUTHOR: HTTHOA(05/08/2022)
     */
    getPageDefault(e) {
      this.isActive = e.target.getAttribute("pageSize");
      this.pageDefault = e.target.getAttribute("pageSize");
      this.showPage(false);
      this.pageNumber = 1;
      this.getPrescriptions();
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
      this.getPrescriptions();
    },

    getPrescriptions() {
      var me = this;
      me.isShowLoad = true;
      var url = "https://localhost:44371/api/Prescriptions/Filter";
      axios({
        url: `${url}?keyword=${this.txtSearch}&pageSize=${this.pageDefault}&pageNumber=${this.pageNumber}`,
        method: "post",
        data: [],
      })
        .then(function (res) {

          if (me.user == 1) {
            me.prescriptions = res.data.Data.filter(
              (item) => item.PatientName == null || item.PatientID==null
            );
            me.prescriptionUsing= me.prescriptions.filter(item=>item.PrescriptionStatus==2).length
          } else {
            me.prescriptions = res.data.Data.filter(
              (item) => item.PatientName!=null && item.PatientID!=null
            );
            me.prescriptionUsing= me.prescriptions.filter(item=>item.PrescriptionStatus==2).length
          }
          me.totalPage = res.data.TotalPages;
          me.totalRecord = me.prescriptions.length;
        })
        .catch(function () {
          console.log(1);
        });
    },
    loadData() {
      this.pageNumber = 1;
      this.getPrescriptions();
    },
    /**
     * hàm click vào số trang
     * AUTHOR: HTTHOA(15/08/2022)
     */
    clickCallback(pageNum) {
      this.pageNumber = pageNum;
      this.getPrescriptions();
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
     * đóng form
     * AUTHOR: HTTHOA (20/03/2023)
     */
    hideForm(value) {
      this.isShow = value;
      this.loadData();
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
.active-blue {
  background-color: #f0faff;
}
@import url(./Prescription.scss);
</style>
