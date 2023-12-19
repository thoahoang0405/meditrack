<template>
  <div class="record">
    <div class="header-appoint">
      <div class="title">
        <h2 class="mr-2 mb-2">Quản lý hồ sơ sức khỏe</h2>
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
          placeholder="Nhập tên cuộc hẹn để tìm kiếm"
          class="input-seach"
        />
        <div class="icon-s">
          <span class="icon icon-search-black"></span>
        </div>
      </div>
      <div class="btn-right" style="display: flex">
        <div class="btn-upload mr-2" style="display: flex; cursor: pointer">
          <div class="icon icon-upload mr-1"></div>
          <div class="mr-2 mt-1" style="color: #22c3e6; font-weight: bold">
            Thêm file hồ sơ
          </div>
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

                <th>Tiêu đề hồ sơ</th>
                <th class="text-center">Ngày tạo</th>
                <th>Họ và tên</th>
                <th>Bác sĩ khám</th>
                <th>Địa chỉ khám</th>
                <th><div class="text-center">Ngày sinh</div></th>

                <th>Địa chỉ</th>
                <th class="text-center">Số điện thoại</th>
                <th v-if="user != 1">{{ tableInfo.patientName }}</th>
                <th>Chức năng</th>
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
                <td style="min-width: 100px; box-sizing: border-box">
                  {{ asset.RecordTitle }}
                </td>
                <td
                  style="min-width: 130px; box-sizing: border-box"
                  class="text-center"
                >
                  {{ formatDate(asset.RecordDate) }}
                </td>
                <td style="max-width: 140px !important; box-sizing: border-box">
                  {{ asset.FullName }}
                </td>
                <td style="min-width: 90px; box-sizing: border-box">
                  {{ asset.DoctorName }}
                </td>

                <td
                  style="
                    min-width: 140px;
                    max-width: auto;
                    box-sizing: border-box;
                  "
                >
                  {{ asset.MedicalExaminationAddress }}
                </td>
                <td
                  style="
                    min-width: 150px;
                    max-width: auto;
                    box-sizing: border-box;
                  "
                  class="text-center"
                >
                  {{ formatDate(asset.DateOfBirth) }}
                </td>
                <td style="min-width: 120px; box-sizing: border-box">
                  {{ asset.Address }}
                </td>
                <td style="min-width: 104px; box-sizing: border-box">
                  {{ asset.PhoneNumber }}
                </td>

                <td
                  v-if="user != 1"
                  style="min-width: 104px; box-sizing: border-box"
                >
                  {{ asset.PatientName }}
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
                    <div class="icon icon-delete" @click="deleteRecords(asset.RecordID)"></div>
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
    </div>
    <Form
      v-if="isShowAdd == true"
      @closeForm="isShowAdd = false"
      :formMode="formMode"
      :data="recordEdit"
    ></Form>
    <FormEdit
    v-if="isShowEdit == true"
      @closeForm="isShowEdit = false"
      
      :data="recordEdit"
    ></FormEdit>
    <Popup
      v-if="isShowPopup"
      :msg="msgError"
      :name="btnName"
      :close="1"
      @hidePopup="isShowPopup = false"
      @isDelete="deleteRecord()"
    ></Popup>
  </div>
</template>

<script>
import Form from "./RecordAdd.vue";
import Paginate from "vuejs-paginate-next";
import MSFunction from "../../../js/common/function";
import { TableRecord } from "../../../js/common/table";
import FormEdit from './RecordEdit.vue'
import axios from "axios";
import Popup from "../../base/BasePopup.vue";

export default {
  components: {
    Paginate,
    Form,
    FormEdit,
    Popup
  },
  name: "Record-page",
  props: {
    msg: String,
  },
  data() {
    return {
      recordIdDelete:'',
      msgError:'Bạn có chắc chắn xoá Hồ sơ này không?',
      isShowPopup:false,
      btnName:'Đồng ý',
      isShowEdit:false,
      formMode: 1,
      isShowAdd: false,
      message: "",
      tableInfo: TableRecord,
      name: "",
      totalPage: 0,
      totalRecord: 0,
      pageNumber: 1,
      isActive: "20",
      pageDefault: 20,
      records: [],
      listRecord: [],
      txtSearch: "",
      medicaltest: [],
      treatment: [],
      recordEdit:{},
      isShowPage:false,
        user: 1,
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
        this.getRecords();
      }
    },
    user: function () {
      if (this.user == 1) {
        this.getRecords()
      }else{
        this.getRecords()
      }
    },
   
  },
  mounted() {
    this.emitter.on("loadDataRecord", () => {
      this.getRecords();
    });
  },
  created() {
    this.getRecords();
    
  },
  methods: {
   
    deleteRecords(val) {
      this.isShowPopup = !this.isShowPopup;
      this.recordIdDelete=val
    },
    deleteRecord(){
      this.isShowPopup = !this.isShowPopup;

      var me= this
     var url="https://localhost:44371/api/Records/records?RecordID=" 
     axios
    .delete(`${url}${this.recordIdDelete}`)
        .then((response) => {
          me.getRecords();
          me.$toast.open({
          message: 'Huỷ bỏ cuộc hẹn thành công.',
          type: 'success',
          position:'top'
      });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getTreatment(id) {
      var url = "https://localhost:44371/api/Records/treatment?id=";
      await axios
        .get(`${url}${id}`)
        .then((response) => {
          this.treatment = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getMedicaltest(id) {
      var url = "https://localhost:44371/api/Records/medicaltest?id=";
      await axios
        .get(`${url}${id}`)
        .then((response) => {
          this.medicaltest = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formatDate(date) {
      return MSFunction.formatDate(date);
    },
    showAdd() {
      this.isShowAdd = !this.isShowAdd;
      this.formMode = 1;
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
     *
     * Hàm lấy ra số bản ghi trên 1 trang hiện lên input
     * AUTHOR: HTTHOA(05/08/2022)
     */
    getPageDefault(e) {
      this.isActive = e.target.getAttribute("pageSize");
      this.pageDefault = e.target.getAttribute("pageSize");
      this.showPage(false);
      this.pageNumber = 1;
      this.getRecords();
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
      this.getRecords();
    },
    /**
     * lấy số bản ghi trên 1 trang số trang và tìm kiếm trên api
     * AUTHOR: HTTHOA(11/03/2023)
     */

    getRecords() {
      debugger;
      var me = this;
      me.isShowLoad = true;
      var url = "https://localhost:44371/api/Records/Filter";
      axios({
        url: `${url}?keyword=${this.txtSearch}&pageSize=${this.pageDefault}&pageNumber=${this.pageNumber}`,
        method: "post",
        data: [],
      })
        .then(function (res) {
          
          
          if (me.user == 1) {
            me.records = res.data.Data.filter(
              (item) => item.PatientName == null || item.PatientID==null
            );
           
          } else {
            me.records = res.data.Data.filter(
              (item) => item.PatientName!=null && item.PatientID!=null
            );
          }
          me.totalPage = res.data.TotalPages;
          me.totalRecord = me.records.length;
        })
        .catch(function () {
          console.log(1);
        });
    },
    loadData() {
      this.pageNumber = 1;
      this.getRecords();
    },
    /**
     * hàm click vào số trang
     * AUTHOR: HTTHOA(15/08/2022)
     */
    clickCallback(pageNum) {
      this.pageNumber = pageNum;
      this.getRecords();
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
     * hiển thị form chỉnh sửa
     * AUTHOR: HTTHOA(28/02/2023)
     */
    async showFormEdit(item) {
      var me = this;
      me.formMode = 2;
      await me.getMedicaltest(item.RecordID);
      await me.getTreatment(item.RecordID);
      me.recordEdit = {
        ...item,
        MedicalTests: this.medicaltest,
        Treatments: this.treatment,
      };
      me.isShowEdit = !me.isShowEdit;
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
