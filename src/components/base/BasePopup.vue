<template>
  <div id="popup" @keyup.enter="keypressEnter" tabindex="0"
>
    <div class="popup" :style="closeStatus == 9? {width: 390 + 'px',minHeight: 170 + 'px' }: {}">
      <div class="popup-body">
        <div class="icon-popup">
          <div class="icon icon-warning"></div>
        </div>

        <div  class="content-popup">
          <span>
            <strong v-if="closeStatus == 3 || closeStatus == 4">{{
              item1
            }}</strong>
          </span>
          <span v-html="msg1"></span>
        </div>
      
      </div>
      <div class="popup-footer">
        <button
          ref="nobutton"
          v-show="
            closeStatus == 1 ||
            closeStatus == 3 ||
            closeStatus == 4 ||
            closeStatus == 6
          "
          class="no btn-hover-outline"
          @click="onClickBtnNo"
        >
          {{ btnLeft1 }}
        </button>
        <button
          ref="noSave"
          v-if="closeStatus == 6"
          class="no-save"
          @click="onclickNoSave"
        >
          Không Lưu
        </button>
        <button
          class="cancel btn-hover-blue"
          @click="onClickCancel"
          ref="btn"
        >
          {{ name1 }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { CloseST } from "../../js/common/enumeration";
export default {
  data() {
    return {
      closeStatus: 0,
      msg1:'',
      btnLeft1:'',
      name1:'',
      item1:'',

    };
  },
  mounted() {
    this.setFocus();
  },
  watch: {
    close: function (value) {
      this.closeStatus = value;
    },
  },
  created(){
this.msg1=this.msg
this.name1=this.name
this.closeStatus=this.close
this.item1=this.item
this.btnLeft1=this.btnLeft
  },
  props: ["msg", "name", "close", "item", "btnLeft"],
  methods: {
    setFocus() {
      this.$nextTick(function () {
        this.$refs["btn"].focus();
      });
    },
    keypressEnter() {
    
      if (this.closeStatus == CloseST.EditClose) {
        this.onclickNoSave();
      }
    },
    // tắt popup
    onClickBtnNo() {
      this.$emit("hidePopup", false);
    },
    onclickNoSave() {
      this.$emit("hidePopupAndForm", false);
    },
    //tắt popup, form
    onClickCancel() {
      console.log(this.closeStatus);

      if (this.closeStatus == CloseST.DeleteCloseNotChoose || this.closeStatus == CloseST.ValiDate||this.closeStatus==CloseST.DuplicateCode|| this.closeStatus==9) {
        this.$emit("hidePopup", false);
      } else if (this.closeStatus == CloseST.DeleteMulti || this.closeStatus == CloseST.DeleteOne) {
        this.$emit("isDelete", false);
      } else if (this.closeStatus == CloseST.EditClose) {
        this.$emit("saveAndHideForm", false);
      }
      // else if(this.closeStatus == 4){

      //    this.$emit("isDelete",false)
      //   }
      else {
        this.$emit("hidePopupAndForm", false);
      }
    },
  }
};
</script>
<style>
.no-save {
  color: #1aa4c8;
  background-color: #fff;
  border: 1px solid #1aa4c8;
  margin-left: 12px;
}
#popup {
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 4;
  width: 100%;
  height: 100%;
  margin: auto;
  position: fixed;
  display: flex;

  flex-direction: column;
}
.popup {
  font-size: 13px;
  width: 450px;
  min-height: 180px;
  height: fit-content;
  background-color: #fff;
  margin: auto;
  /* padding: 24px; */
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  /* display: none; */
}
.popup-body {
  align-items: center;
  display: flex;
  margin: 24px;
  height: calc(100% - 101px);
  /* margin-top: 30px; */
}
#content {
  margin-left: 20px;
  margin-top: 4px;
  text-align: start;
  width: calc(100% - 80px);
}
.content-popup {
 margin-bottom: 20px;

  justify-content: flex-start;
  margin-left: 10px;
}
.icon-popup {
    margin-top: -8px;
}
.popup-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 0px;
  background-color: #dddddd5e;
  padding: 8px 10px;
}
.popup-footer button {
  min-width: 110px;
  height: 36px;
  outline: none;
  border-radius: 3px;
}
.popup .no {
  background-color: #fff;
  border: 1px solid #aca8a8;
}
.popup .cancel {
  background-color: #1aa4c8;
  color: #fff;
  border: none;
  margin-left: 12px;
}
.popup .icon-warning {
  background-repeat: no-repeat;
  width: 50px;
}
.btn-hover-blue:focus,
.btn-hover-blue:hover {
  background-color: #0062cc;
}

.btn-hover-outline:focus,
.btn-hover-outline:hover {
  background-color: #1aa4c8;
  color: #fff;
  border: none;
}
.no-save:focus,
.no-save:hover{
  background-color: #abe9f8;
}
</style>
