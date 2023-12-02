<template>
  <div id="table">
    <div class="table">
      <table>
        <thead>
          <tr>
            <th class="text-center width-fit">
              <input
                type="checkbox"
                :checked="
                  listIncrementSelected?.length == incrementList?.length &&
                  incrementList?.length != 0
                "
                v-on:click="selectedAllItem"
              />
            </th>

            <th class="stt">
              {{ inforTable.numeric }}
              <div class="tooltip-stt">Số thứ tự</div>
            </th>

            <th class="th-width-150">
              {{ inforTable.documentNumber }}
            </th>
            <th class="th-width-150 text-center">
              {{ inforTable.documentDate }}
            </th>
            <th class="th-width-150 text-center">
              {{ inforTable.increaseDate }}
            </th>
            <th class="th-width-150 text-right">{{ inforTable.totalCost }}</th>
            <th class="th-width-max">{{ inforTable.content }}</th>

            <th class="th-width-min"></th>
          </tr>
        </thead>
        <tbody>
          <tr style="border: none" class="data" v-if="totalRecord == 0">
            <td colspan="8" class="noData">
              <div class="no-data">
                <div class="icon-noData"></div>
                <h3>Không có dữ liệu</h3>
              </div>
            </td>
          </tr>
          <tr
            v-for="(increment, index) of incrementList"
            :key="increment.voucher_id"
            @mousedown.prevent.ctrl="mouseDown(increment)"
            @mouseup.prevent.ctrl="mouseUp(increment)"
            @dblclick="showFormEdit(increment)"
            :class="
              listIncrementSelected.includes(increment) ||
              selectIdItem == increment.voucher_id
                ? 'active'
                : ''
            "
            v-on:click="selectItemID(increment)"
          >
            <td class="text-center">
              <input
                type="checkbox"
                :checked="listIncrementSelected.includes(increment)"
                v-on:click="selectItemToList(increment)"
              />
            </td>
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-blue">{{ increment.voucher_code }}</td>
            <td class="text-center">
              {{ formatDate(increment.voucher_date) }}
            </td>
            <td class="text-center">
              {{ formatDate(increment.fixed_asset_increment_date) }}
            </td>
            <td class="text-right">{{ formatMoney(increment.total_price) }}</td>
            <td class="th-width-max">{{ increment.description }}</td>

            <td class="th-width-min">
              <div class="function-table">
                <div class="icon icon-edit" v-on:click="showFormEdit(increment)">
                  <div class="tooltip">Sửa</div>
                </div>
                <div
                  class="icon icon-delete"
                  v-on:click="deleteIncrement(increment)"
                >
                  <div class="tooltip">Xóa</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div class="main-table">
               </div> -->
    <table class="tb-footer" style="height: 30px">
      <thead>
        <tr
          style="
            background: #f5f5f5;
            border-bottom: 1px solid #e2e2e2;
            box-sizing: border-box;
          "
        >
          <td colspan="1" style="width: 242px; box-sizing: border-box">
            <div>
              <div class="total-record">
                Tổng số: <strong>{{ totalRecord }}</strong> bản ghi
              </div>
            </div>
          </td>

          <td colspan="1" style="width: 150px; box-sizing: border-box">
            <div class="page">
              <div
                style="position: relative; cursor: pointer"
                v-on:click="btnDropUp"
              >
                <div class="content-page">
                  {{ pageDefault }}
                  <div class="up-down" v-on:click="btnDropUp">
                    <div
                      class="down"
                      :class="isShowPage == true ? 'show' : ''"
                      v-on:click="btnDropUp"
                    >
                      <div class="icon-down-bold icon"></div>
                    </div>
                    <!-- </div> -->
                  </div>
                </div>
                <div class="dropup-page">
                  <div class="item-up" v-show="isShowPage">
                    <div
                      class="item-dropup"
                      :class="{ act: isActive == '10' }"
                      pageSize="10"
                      v-on:click="getPageDefault"
                    >
                      10
                    </div>
                    <div
                      class="item-dropup"
                      :class="{ act: isActive == '20' }"
                      :value="pageDefault"
                      pageSize="20"
                      v-on:click="getPageDefault"
                    >
                      20
                    </div>
                    <div
                      class="item-dropup"
                      :class="{ act: isActive == '30' }"
                      pageSize="30"
                      v-on:click="getPageDefault"
                    >
                      30
                    </div>
                    <div
                      class="item-dropup"
                      :class="{ act: isActive == '50' }"
                      pageSize="50"
                      v-on:click="getPageDefault"
                    >
                      50
                    </div>
                    <div
                      class="item-dropup"
                      :class="{ act: isActive == '100' }"
                      pageSize="100"
                      v-on:click="getPageDefault"
                    >
                      100
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>

          <td colspan="1" style="width: 150px; box-sizing: border-box">
            <div>
              <Paginate
                v-model="pageNumber"
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
                :page-class="'page-item'"
              >
              </Paginate>
            </div>
          </td>

          <td
            colspan="1"
            class="text-right"
            style="width: 150px; box-sizing: border-box"
          >
            <div class="total-price">
              <strong>{{ formatMoney(totalCost) }}</strong>
            </div>
          </td>

          <td colspan="2" style="box-sizing: border-box"></td>
        </tr>
      </thead>
    </table>
  </div>
  <!-- <div id="load" v-show="isShowLoad">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div> -->
</template>
<script>
import { TableIncrease } from "../../js/common/table";
import MSFunction from "../../js/common/function";
import Paginate from "vuejs-paginate-next";
import { FormDetailMode } from "../../js/common/enumeration";
export default {
  components: { Paginate },
  props: ["loadData", "txtSearch"],
  data() {
    return {
      employee: [],
      inforTable: TableIncrease,
      totalPage: 0,
      totalRecord: 0,
      pageNumber: 1,
      isActive: "20",
      pageDefault: 10,
      isShowPage: false,
      totalCost: 0,
      isShowLoad: false,
      incrementList: [],
      listIncrementSelected: [],
      currentIncrement: {},
      selectIdItem: "",
      keyword: "",
      formModeEdit: FormDetailMode.Edit,
      titleFormEdit: TableIncrease.titleEdit,
      modeTable: FormDetailMode.Replication,
      listOnMouseDown: {},
      listOnMouseUp: {},
      lastClickTime: null,
    };
  },
  watch: {
    listIncrementSelected: function (data) {
      this.$emit("listIncrement", data);
    },
    selectIdItem: function (data) {
      this.$emit("idSelected", data);
    },
    loadData: function () {
      this.getPagingAsset();
    },
    txtSearch: function (data) {
      this.keyword = data;
      this.getPagingAsset();
      if (this.totalRecord == 0) {
        this.$emit("search", "");
      }
    },
  },
  created() {
    this.getPagingAsset();
  },
  mounted() {
    this.emitter.on("loadDataIncrement", () => {
      this.listIncrementSelected = [];
      this.getPagingAsset();
    });
  },
  methods: {
    /**
     *
     * click ctrl
     * AUTHOR: HTTHOA(2/4/2023)
     */
    mouseDown(increment) {
      try {
        // lưu tài sản khi mousedown
        this.listOnMouseDown = increment;
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
        this.incrementList.includes(item1) &&
        this.incrementList.includes(item2)
      ) {
        // lấy vị trí của 2 item trong mảng fixedAsset
        //start là vị trí đầu khi down ctrl
        let startIndex = this.incrementList.indexOf(item2);
        //end là vị trí khi up ctrl
        let endIndex = this.incrementList.indexOf(item1);
        // kiểm tra vị trí bắt đầu và kết thúc nếu bắt đầu lớn hơn kết thúc thì đổi lại
        if (startIndex > endIndex) {
          let tmp = startIndex;
          startIndex = endIndex;
          endIndex = tmp;
        }

        // thêm các item chưa có trong mảng xóa từ vị trí bắt đầu đến kết thúc
        for (let i = startIndex; i <= endIndex; i++) {
          //nếu trong danh sách chưa gồm tài sản đó thì push vào danh sách
          if (!this.listIncrementSelected.includes(this.incrementList[i])) {
            this.listIncrementSelected.push(this.incrementList[i]);
          }
        }
      }
      this.$emit("listIncrement", this.listIncrementSelected);
    },
    /**
     * up ctrl thả chuột để lấy vị trí cuối cùng chọn
     * AUTHOR: HTTHOA(2/4/2023)
     */
    mouseUp(increment) {
      try {
        // lưu tài sản khi mouseup
        this.listOnMouseUp = increment;
        this.selectMultipleItem(this.listOnMouseDown, this.listOnMouseUp);
        this.listOnMouseDown = {};
        this.listOnMouseUp = {};
      } catch (err) {
        console.log(err);
      }
    },
    showFormEdit(increment) {
      this.lastClickTime = null;
      this.$emit(
        "modeEdit",
        FormDetailMode.Edit,
        this.titleFormEdit,
        increment
      );
    },
    /**
     *
     * xóa 1 chứng
     * AUTHOR: HTTHOA(9/5/2023)
     */
    deleteIncrement(increment) {
      this.$emit("deleteOne", increment);
    },
    /**
     *
     * @param {lấy id chứng từ} increment
     * AUTHOR: HTTHOA(18/4/2023)
     */
    selectItemID(increment) {
      this.isShowLoad = true;
      if (
        this.lastClickTime &&
        new Date().getTime() - this.lastClickTime < 250
      ) {
        // Click occurred within 250 milliseconds of last click - treat as double click
        this.lastClickTime = null;
        return;
      }
      // Single click - handle as normal
      this.lastClickTime = new Date().getTime();
      this.selectIdItem = increment.voucher_id;
      this.$emit("idSelected", this.selectIdItem);
      this.isShowLoad = false;
    },
    /**
     * thêm phần tử xóa và bỏ khi đã được chọn
     * AUTHOR: HTTHOA (20/03/2023)
     */
    selectItemToList(increment) {
      try {
        this.currentIncrement = increment;

        // this.indexFocus = this.fixedincrements.indexOf(increment);
        if (!this.listIncrementSelected.includes(increment)) {
          //thực hiện chọn
          this.listIncrementSelected.push(increment);
        } else {
          //thực hiện bỏ chọn
          this.listIncrementSelected = this.listIncrementSelected.filter(
            (a) => {
              return a !== increment;
            }
          );

          this.currentIncrement =
            this.listIncrementSelected[this.listIncrementSelected.length - 1];
        }
      } catch (err) {
        console.log(err);
      }
      this.$emit("listIncrement", this.listIncrementSelected);
    },
    /**
     * hàm chọn 1 item thêm vào mảng xóa
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectItem(increment) {
      this.listIncrementSelected = [];
      this.listIncrementSelected.push(increment);
      this.currentIncrement = increment;
    },
    /**
     * hàm chọn tất cả item
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectedAllItem() {
      if (this.listIncrementSelected.length < this.incrementList.length) {
        this.listIncrementSelected = this.incrementList;
      } else {
        this.listIncrementSelected = [];
      }
    },
    /**
     * gọi api xóa 1 bản ghi
     * AUTHOR: HTTHOA(20/03/2023)
     */
    formatMoney(data) {
      return MSFunction.formatMoney(data);
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
     * format ngày
     *  AUTHOR: HTTHOA(18/4/2023)
     */
    formatDate(data) {
      return MSFunction.formatDate(data);
    },
    /**
     * lấy danh sách chứng từ
     * AUTHOR: HTTHOA(18/4/2023)
     */
    getPagingAsset() {
      var me= this
      me.isShowLoad = false;
      me.totalPage = 2;
      me.totalRecord = 20;
      me.totalCost = 16556655656;
      me.incrementList = [
        {
          voucher_id: "23243434545",
          voucher_code: "CT04334",
          voucher_date: "2023-12-20",
          fixed_asset_increment_date: "2023-12-20",
          total_price: 783723247,
          description: "374ghfghdf",
        },
        {
          voucher_id: "23243434545",
          voucher_code: "CT04334",
          voucher_date: "2023-12-20",
          fixed_asset_increment_date: "2023-12-20",
          total_price: 783723247,
          description: "374ghfghdf",
        },
        {
          voucher_id: "23243434545",
          voucher_code: "CT04334",
          voucher_date: "2023-12-20",
          fixed_asset_increment_date: "2023-12-20",
          total_price: 783723247,
          description: "374ghfghdf",
        },
        {
          voucher_id: "23243434545",
          voucher_code: "CT04334",
          voucher_date: "2023-12-20",
          fixed_asset_increment_date: "2023-12-20",
          total_price: 783723247,
          description: "374ghfghdf",
        },
      ];
    },
    /**
     * lấy số trang hiện tại
     * AUTHOR: HTTHOA(18/4/2023)
     */
    clickCallback(pageNum) {
      this.pageNumber = pageNum;
      this.getPagingAsset();
    },
    /**
     * lấy số bản ghi trên 1 trang
     * AUTHOR: HTTHOA(18/4/2023)
     */
    showPage(is) {
      this.isShowPage = is;
    },
    getPageDefault(e) {
      this.isActive = e.target.getAttribute("pageSize");
      this.pageDefault = e.target.getAttribute("pageSize");
      this.showPage(false);
      this.pageNumber = 1;
      this.getPagingAsset();
    },
  },
};
</script>
<style scoped>
.noData {
  width: 100%;
  /* padding-left: 50%; */
  /* display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center; */
  /* position: absolute;
    row-gap: 20px;
    column-gap: 15px;
    top: 42px;
    left: 250px;
    bottom: 42px;
    cursor: unset !important; */
}
.pagination {
  width: 130px !important;
}
.table {
  height: calc(100% - 85px);
}
.main-table {
  height: calc(100% - 85px);
}
.th-width-150 {
  min-width: 130px;
  max-width: 130px;
  width: 130px;
}
.th-width-min {
  width: 80px;
}
.th-width-max {
  width: calc(100% - 800px);
}
.text-blue {
  color: #1aa4c8;
}
</style>
