<template>
  <div class="family">
    <div class="header-appoint">
      <div class="title">
        <h2 class="mr-2 mb-2">Người thân gia đình</h2>
      </div>
    </div>
    <div class="nav mt-2">
      <button class="btn button-blue" @click="showForm()">
        + Thêm thành viên
      </button>
    </div>

    <div class="main">
      <div class="list-app ">
        <div
          class="item-app mr-2 mr-1 mt-2"
          v-for="(item, index) in listFamily"
          :key="index"
        >
          <div class="title-item">{{ item.PatientName }}</div>
          <div class="main-item">
            <div class="avatar clr-warning">NA</div>
            <div>
              <div class="content mt-2">
                <div class="title">Mối quan hệ:</div>
                <span>{{ item.Relationship }}</span>
              </div>
              <div class="content mt-1">
                <div class="title">Số điện thoại:</div>
                <span>{{ item.PhoneNumber }}</span>
              </div>
            </div>
          </div>
          <div class="footer-item">
            <button class="btn delete-btn" @click="deleted(item.PatientID)">Xoá</button>
            <button class="btn update-btn" @click="edit(item)">Cập nhật</button>
          </div>
        </div>
      </div>
    </div>
    <Form v-if="isShowForm == true" :data="dataEdit" @closeForm="isShowForm=false" :formTitle="formTitle" :formMode="formMode"></Form>
    <Popup
      v-if="isShowPopup"
      :msg="msgError"
      :name="btnName"
      :close="1"
      @hidePopup="isShowPopup = false"
      @isDelete="deleteFamily()"
    ></Popup>
 </div>
</template>
<script>
import Form from "./FamilyMemberForm.vue";
import Popup from "../../base/BasePopup.vue";
import axios from "axios";
export default {
  name: "Family-page",
  components: {
    Form,
    Popup
  },

  data() {
    return {
      isShowPopup:false,
      msgError:"Bạn có chắc chắn xoá thành viên này không?",
      formMode:1,
      formTitle:'Thêm thành viên',
      btnName:'',
      isShowForm: false,
      dataEdit:{},
      listFamily: [
        {
          FullName: "Hoàng Văn A",
          Relationship: "Bố",
          PhoneNumber: "08743834834",
        },
        {
          FullName: "Hoàng Văn A",
          Relationship: "Bố",
          PhoneNumber: "08743834834",
        },
      ],
      familyID:''
    };
  },
  created() {
    this.getFamily()
  },
  mounted() {
    this.emitter.on("loadDataFamily", () => {
      this.getFamily();
    });
    
  },
  methods: {
    deleted(val) {
      this.isShowPopup = !this.isShowPopup;
      this.familyID=val
    },
    deleteFamily(){
      
      this.isShowPopup = !this.isShowPopup;
     var url="https://localhost:44371/api/FamilyMembers" 
     axios
        .delete(`${url}/${this.familyID}`)
        .then((response) => {
          this.getFamily();
          this.$toast.open({
          message: 'Xoá thành viên thành công.',
          type: 'success',
          position:'top'
      });
        })
        .catch((err) => {
          console.log(err);
        });
 
    },
    edit(item){
      this.dataEdit=item
      this.isShowForm = !this.isShowForm;
      this.formTitle="Sửa thông tin thành viên"
      this.formMode=2
    },
    getFamily() {
      var url = "https://localhost:44371/api/FamilyMembers";
      axios
        .get(`${url}`)
        .then((response) => {
          this.listFamily = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showForm() {
      this.isShowForm = !this.isShowForm;
      this.formTitle="Thêm thành viên"
      this.formMode=1
    },
    
  },
}
</script>
<style scoped>
.family .main-item {
  display: flex;
}
.family .avatar {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-right: 10px;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
}

.family .item-app {
  height: 100px !important;
}
@import url(./FamilyMember.scss);
</style>

