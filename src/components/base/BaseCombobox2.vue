<template>
  <div
    class="m-combobox m-combobox-2"
    @click="toggleCombobox"
    @keyup.enter="selectItem"
    @keyup.down.stop="keyDown"
    @keyup.up.stop="keyUp"
    v-outside="hideCbb"
  >
    <input
      class="input"
      v-model="keyword"
      :placeholder="this.placeholder"
      :class="border"
      @blur="onBlur"
      @keydown="keyTab"
      :ref="refName"
    />
    <div class="icon-filter icon"></div>
    <div class="up-down">
      <div class="down">
        <div class="btn icon-down-bold"></div>
      </div>
    </div>

    <div class="drop-down" ref="bodyDrop" v-show="isShowCbb">
      <div class="drop-down-body">
        <div
          v-for="(item, index) of dataItems"
          class="drop-down-item"
          :class="item[fieldName] == currentItem[fieldName] ? 'active' : ''"
          @click.exact.stop="onClickItem(item)"
          :key="item"
        >
          <div class="icon-tick">
            <div
              :id="index"
              v-show="item[fieldName] == currentItem[fieldName]"
              class="tick"
            ></div>
          </div>
          <div class="drop-down-name">{{ item[fieldName] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- :class="item[fieldCode] == currentItem[fieldCode] ? 'active' : ''" -->
<script>
export default {
  props: {
    label: {
      type: String,
    },
    items: {
      type: Array,
    },
    fieldName: {
      type: String,
    },
    fieldCode: {
      type: String,
    },
    code: {
      type: String,
    },
    border: {
      type: String,
    },
    refName: {
      type: String,
    },
    value: {
      type: String,
    },

    placeholder: {
      type: String,
    },
  },
  data() {
    return {
      currentItem: {}, // item hiện tại
      isShowCbb: false, // show drop-down
      // placeholder: "Nhập giá trị ", // playholder
      dataItems: [], //mảng nhận giá trị lấy từ csdl
      keyword: "",
      i: -1,
      hOfItem: 35,
      filter: 0,
    };
  },

  methods: {
    /**
     * đóng combobox
     *  AUTHOR:HTTHOA(25/03/2023)
     */
    hideCbb() {
      this.isShowCbb = false;
    },
    /**
     * sự biện blur
     *  AUTHOR:HTTHOA(25/03/2023)
     */
    onBlur() {
      setTimeout(() => {
        this.isShowCbb = false;
      }, 200);
      this.$emit("keyword", this.keyword);
      console.log(this.keyword);
      this.$emit("onBlur");
    },

    /**
     * hàm chọn item khi nhấn enter
     *  AUTHOR:HTTHOA(25/03/2023)
     *
     */
    keyTab() {
      var code = event.keyCode || event.which;
      if (code === 9) {
        this.onFocus();
      }
    },
    /**xử lý khi chọn 1 item
     * AUTHOR: HTTHOA(20/03/2023)
     */
    selectItem() {
      this.$emit("selectedItem", this.currentItem);
      console.log(this.currentItem);
      this.keyword = this.currentItem[this.fieldName];
      this.isShowCbb = false;
      this.i = 0;
      this.$refs.refName.select(); 
      this.dataItems = this.items;
    },
    /**
     * hàm click chọn item
     *  AUTHOR:HTTHOA(25/03/2023)
     *
     */
    onClickItem(item) {
      this.currentItem = item;
      this.selectItem();
    },
    /**
     * mở đóng combobox
     *  AUTHOR:HTTHOA(25/03/2023)
     */
    toggleCombobox() {
      this.isShowCbb = !this.isShowCbb;
      if (this.isShowCbb == true) {
        console.log(this.i);
        this.scrollItem((this.i - 1) * this.hOfItem);
      }
    },
    /**
     * cuộn thanh cuộn đến vị trí
     * AUTHOR:HTTHOA(25/03/2023)
     */
    scrollItem(position) {
      console.log(position);
      if (position >= 0) {
        this.$refs.bodyDrop.scrollTo(0, position); //cuộn đến tọa độ (0,position)
         
      }
    },
    /**
     * khi keydown mở combobox
     *  AUTHOR:HTTHOA(25/03/2023)
     */
    keyDown() {
      try {
        if (!this.isShowCbb) {
          this.isShowCbb = true;
        } else {
          this.i++;
          if (this.i > this.dataItems.length - 1) {
            this.i = this.dataItems.length - 1;
          }
          this.currentItem = this.dataItems[this.i];
          this.scrollItem((this.i -1) * this.hOfItem);
        }
       
      } catch (error) {
        console.log(error);
      }
      
    },
    /**
     * key down thì gán item hiện tại bằng item ở mảng ở vị trí i
     *  AUTHOR:HTTHOA(25/03/2023)
     */
    keyUp() {
      try {
        if (this.i > 0) {
          this.i--;
          this.currentItem = this.dataItems[this.i];
          this.scrollItem((this.i - 1) * this.hOfItem);
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * hàm xử lý sự kiện focus
     *
     */
    onFocus() {
      this.$refs.refName.select(); // khi focus thì select
    },
  },
  created() {
    // this.placeholder = this.label;
  },
  watch: {
    Filter: function (value) {
      this.filter = value;
      console.log(value);
    },
    items: function (value) {
      // nhận mảng item để hiển thị
      this.dataItems = value;
    },
    value: function (vl) {
      this.keyword = vl;
    },
    /**theo dõi keyword để truyền dữ liệu
     * AUTHOR: HTTHOA(20/03/2023)
     */
    keyword() {
      if (this.keyword != this.currentItem[this.fieldName]) {
        if (this.keyword == "") {
          this.currentItem = "";
          this.$emit("selectedItem", this.currentItem);
        }else{
          this.filteredList()
        }
       
        // this.isShowCbb = true;
      } else if (this.keyword) {
        // this.isShowCbb=!this.isShowCbb
        this.dataItems.forEach((item) => {
          let valueSearch = item[this.fieldName].trim().toLowerCase();
          if (valueSearch.includes(this.keyword.trim().toLowerCase())) {
            return item;
          }
        });
      } else {
        this.dataItems = this.items;
      }
    },
  },
 
  mounted() {
    // xét giá trị ban đầu cho combobox
    this.currentItem[this.fieldName] = this.code;
  },
}
</script>

<style scoped>
@import url(../../css/layout/combobox.css);
.border-red {
  border-color: #e03232 !important;
}
.drop-down {
  width: fit-content;
  min-width: 96%;
  position: absolute;
  top: calc(100% - 7px);
  left: 0;
  z-index: 10;
  padding: 4px;
  border-radius: 2.5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
  background-color: #f9fafc;
  border: 1px solid #e0e0e0;
  height: fit-content;
  max-height: 150px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 8px;
  box-sizing: border-box;
}


.m-combobox-2 .input {
  padding: 0 20px 0 32px;
  width: 230px;
  margin-top: 0px;
  height: 36px;
  box-sizing: border-box;
  border-radius: 2.5px;
}
.m-combobox .icon {
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.m-combobox .up-down {
  position: absolute;
  right: 19px;
  top: 50%;
  transform: translateY(-50%);
  justify-content: center;
}
</style>
