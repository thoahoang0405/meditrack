<template>
  <div class="header">
    <P class="brand-text">MEDITRACK</P>
    <div class="right mr-2">
      <div class="notifi mr-2" @click="showListNotice">
        <div class="noti"></div>
        <div class="icon mt-1 icon-noti"></div>
      </div>
      <div class="avatar" @click="showLogout">{{ User }}</div>
    </div>
  </div>
  <Notice v-if="isShowList == true"></Notice>
  <Logout v-if="isShowLogout == true"></Logout>
</template>
<style scoped>
@import url(../css/main.css);
@import url(../css/layout//header.css);
</style>
<script>
import Notice from "./base/Notice.vue";
import Logout from "./base/Logout.vue";
export default {
  name: "Header-app",
  components: {
    Notice,
    Logout,
  },
  data() {
    return {
      isShowList: false,
      isShowLogout: false,
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
  methods: {
    showListNotice() {
      this.isShowList = !this.isShowList;
    },
    showLogout() {
      this.isShowLogout = !this.isShowLogout;
    },
  },
};
</script>
