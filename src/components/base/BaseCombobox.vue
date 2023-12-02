<template>
  <div
    class="m-combobox"
    @click="toggleCombobox"
    @keydown.enter.stop="selectItem"
    @keyup.down="keyDown"
    @keyup.up="keyUp"
    v-outside="hideCbb"
  >
    <input
      class="input"
      v-model="keyword"
      :placeholder="this.placeholder"
      :tabindex="tab"
      :class="border"
      @blur="onBlur"
      @keydown="keyTab"
      @focus="onFocusCbb"
      :ref="refName"
    />

    <div class="up-down">
      <div class="down">
        <div class="btn icon-down-bold"></div>
      </div>
    </div>

    <div class="drop-down" ref="bodyDrop" v-show="isShowCbb">
      <div class="drop-down-body" >
        <div
          v-for="(item, index) of dataItems"
          class="drop-down-item"
          :class="item[fieldCode] == currentItem[fieldCode] ? 'active' : ''"
          @click.exact.stop="onClickItem(item)"
          :key="item"
        >
          <div class="icon-tick">
            <div
              :id="index"
              v-show="item[fieldCode] == currentItem[fieldCode]"
              class="tick"
            ></div>
          </div>

          <div class="drop-down-name">{{ item[fieldCode] }}</div>
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
    tab: {
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
    Filter: {
      type: Int16Array,
    },
  },
  data() {
    return {
      currentItem: {}, // item hiện tại
      isShowCbb: false, // show drop-down
      placeholder: "Nhập giá trị ", // playholder
      dataItems: [],
      keyword: "",
      i: -1,
      hOfItem: 35,
      hOfBody: 135,
      filter: 0,
    };
  },

  methods: {
    /**
     * hàm xử lý sự kiện click ra ngoài đóng cbb
     * AUTHOR:HTTHOA(25/03/2023)
     *
     */
    hideCbb() {
      this.isShowCbb = false;
    },
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
    /**
     * khi chọn 1 item trong combobox
     *  AUTHOR:HTTHOA(25/03/2023)
     */
    selectItem() {
      this.$emit("selectedItem", this.currentItem);
      console.log(this.currentItem);
      this.keyword = this.currentItem[this.fieldCode];
      this.placeholder = this.currentItem[this.fieldCode];
      this.isShowCbb = false;
      this.i = 0;
      this.$el.querySelector(".input").focus();
      // this.$refs.refName.focus();
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
        this.scrollItem((this.i - 1) * this.hOfItem);
      }
    },
    /**
     *
     * cuộn combobox. nếu vị trí lớn hơn 0 thì cuộn đến tọa độ (0,position)
     *  AUTHOR:HTTHOA(25/03/2023)
     */
    scrollItem(position) {
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
          this.scrollItem((this.i - 1) * this.hOfItem);
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
     *  AUTHOR:HTTHOA(25/03/2023)
     *
     */
    onFocus() {
      // khi focus thì select
      // this.$refs.refName.select();
      this.$emit("keyword", this.keyword);
    },
  },
  created() {
    
    // this.placeholder = this.label;
    this.$emit("onFocusCbb");
    this.keyword = this.value;
    for (const item of this.items) {
      if (item[this.fieldName] == this.initValue) {
        this.currentItem = item;
      }
    }
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
    /**
     * theo dõi biến key word
     *  AUTHOR:HTTHOA(25/03/2023)
     */
    keyword() {
      if (this.keyword != this.currentItem[this.fieldCode]) {
      if (this.keyword == "") {
        this.currentItem = "";
        this.$emit("selectedItem", this.currentItem);
      }
      } else if (this.keyword) {
        // this.isShowCbb=!this.isShowCbb
        this.dataItems.forEach((item) => {
          let valueSearch = item[this.fieldCode].trim().toLowerCase();
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
    
    var i= this.$refs.refName
    console.log(i);
    this.emitter.on("focus", () => {
      this.$el.querySelector(".input").focus()
        // this.$el.querySelector(".input").focus();
    });
    // xét giá trị ban đầu cho combobox
    this.currentItem[this.fieldCode] = this.code;

    // this.item.filter((item,index)=>{
    //   if(item[this.fieldCode]===this.currentItem[this.fieldCode]){
    //     this.i=index
    //   }
    // })
  },
};
</script>

<style scoped>
@import url(../../css/layout/combobox.css);
.icon-tick {
 margin-top: 12px;
}
.drop-down-name {
  padding-left: 6px;
}

/* .tick {
  padding-top: 4px;
  margin-top: 4px;
  margin-left: 5px;
} */
.drop-down-item {
  display: flex;
}
.border-red {
  border-color: #e03232 !important;
}
.m-combobox-2 .drop-down .drop-down-body {
  max-height: 110px;

  height: fit-content;
  overflow-y: scroll;
  overflow-x: hidden;
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
  /* top: 50%; */
  transform: translateY(-50%);
  justify-content: center;
}
</style>
