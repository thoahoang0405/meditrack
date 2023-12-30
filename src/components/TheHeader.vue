<template>
  <div class="header">
    <P class="brand-text">MEDITRACK</P>
    <div class="right mr-2">
      <div class="notifi mr-2" @click="showListNotice">
        <div class="noti" ></div>
        <div class="icon mt-1 icon-noti"></div>
      </div>
      <div class="avatar" @click="showLogout">{{ name }}</div>
    </div>
  </div>
  <Notice v-if="isShowList == true" ></Notice>
  <Logout v-if="isShowLogout == true"></Logout>
</template>
<style scoped>
@import url(../css/main.css);
@import url(../css/layout//header.css);
</style>
<script>
import Notice from "./base/Notice.vue";
import Logout from "./base/Logout.vue";
import axios from "axios";

export default {
  name: "Header-app",
  components: {
    Notice,
    Logout,
  },
  data() {
    return {
      name: localStorage.getItem("name"),
      isShowList: false,
      isShowLogout: false,
      count:0,
      form: {
        title: "",
        write_up: "",
      },
    };
  },

  watch: {
    isShowList: function (value) {
      if (value) {
        this.isShowLogout = !value;
      }
    },
    isShowLogout: function (value) {
      if (value) {
        this.isShowList = !value;
      }
    },
  },
  created(){
    this.getpresDay()
  },
  methods: {
    
    showListNotice() {
      this.isShowList = !this.isShowList;
    },
    showLogout() {
      this.isShowLogout = !this.isShowLogout;
    },
    getpresDay(){
            axios
        .get(`https://localhost:44371/api/Notifications/appointmentDay?id=${localStorage.getItem("data")}`)
        .then((response) => {
          this.count=response.data.filter(item=>item.NoticeStatus==1).length
        })
        .catch((err) => {
          console.log(err);
        });
        }
  },
};
</script>
