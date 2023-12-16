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
            <button class="btn delete-btn">Xoá</button>
            <button class="btn update-btn">Cập nhật</button>
          </div>
        </div>
      </div>
    </div>
    <Form v-if="isShowForm == true" @closeForm="isShowForm=false"></Form>
  </div>
</template>

<script>
import Form from "./FamilyMemberForm.vue";
import axios from "axios";
export default {
  name: "Family-page",
  components: {
    Form,
  },

  data() {
    return {
      isShowForm: false,
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
    };
  },
  created() {
    this.getFamily()
  },
  methods: {
    showForm() {
      this.isShowForm = !this.isShowForm;
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
  },
};
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
