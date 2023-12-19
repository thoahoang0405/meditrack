<template>
  <div id="popup" @keyup.enter="keypressEnter" tabindex="0"
>
    <div class="popup" >
      <div class="popup-header">Cảnh báo</div>
      <div class="popup-body">
        <div class="icon-popup">
          <div class="icon icon-warning"></div>
        </div>

        <div  class="content-popup">
         
          <span v-html="msg1"></span>
        </div>
      
      </div>
      <div class="popup-footer" v-if="closeStatus==1">
        <button class="btn button-blue-outline mr-2" @click="onClickBtnNo()">Không</button>
        <button class="btn button-blue " @click="onClickYes()">Có</button>
      </div>
      <div class="popup-footer" v-if="closeStatus==2">
        <button class="btn button-blue-outline mr-2" @click="onClickCancel()">Huỷ</button>
        <button class="btn button-blue " @click="onclickSave()">Lưu</button>
      </div>
      <div class="popup-footer" v-if="closeStatus==3">
        <button class="btn button-blue " @click="onClickCancel()">Đồng ý</button>
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
    
    keypressEnter() {
    
      if (this.closeStatus == CloseST.EditClose) {
        this.onclickNoSave();
      }
    },
    // tắt popup
    onClickBtnNo() {
      this.$emit("hidePopup", false);
    },
    onclickSave() {
      this.$emit("hidePopupSave", false);
    },
    //tắt popup, form
    onClickCancel() {
        this.$emit("hidePopup", false);
     
    },
    onClickYes(){
      this.$emit("isDelete", false);
    }
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
top:0;
left:0;
  flex-direction: column;
}
.popup {
  font-size: 13px;
 
  min-height: 150px;
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
  height: calc(100% - 94px);
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
  background-color: #F0FAFF;
  padding: 8px 10px;
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
.popup-header {
    padding: 0px 0px;
    color: #07b6c4;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    justify-content: start;
    margin:16px 0px 0px 16px;
  }
</style>
