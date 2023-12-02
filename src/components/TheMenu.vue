
<template>
    <div class="menu">
      <div class="menu-top mt-2">
       
        <ul class="navbar">
          <div v-for="item in items" :key="item" class="nav-item">
            <router-link
              class="nav-item-parent"
              @click="
                item.openChild = !item.openChild;
                activeTo = item.to;
              "
              :to="item.to"
              :class="activeTo === item.to ? 'active' : ''"
             :title="!isZoomOut ?item.name:''"
            >
              <div class="icon">
                <div :class="item.icon"></div>
              </div>
              
              <!-- <div class="toolTip" v-if="!isZoomOut"> {{ item.name }}</div> -->
              <div class="nav-item-text" v-if="isZoomOut">{{ item.name }}</div>
              <div class="icon-down" v-if="item.menuItem && isZoomOut"></div>
            </router-link>
            <div class="nav-item-childs" >
               <router-link
                class="nav-item-child"
                v-for="(child, index) in item.menuItem"
                :key="index"
                v-show="item.openChild && isZoomOut"
                :to="child.toItem"
                >
                <div class="text">{{ child.nameItem }}</div>
              </router-link>
            </div>
          </div>
        </ul>
      </div>
      
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        isZoomOut: true,
        activeTo: "",
        items: [
          {
            icon: "icon-appointment",
            name: "Theo dõi cuộc hẹn y tế",    
            dropdown: false,
            to: "/home/appointment",
          },
          {
            icon: "icon-pres",
            name: "Quản lý đơn thuốc",
            openChild: false,
            dropdown: true,
            to: "/home/prescription",
           
          
          },
          {
            icon: "icon-heath",
            name: "Quản lý hồ sơ sức khoẻ",
            dropdown: true,
            to: "/home/health",
          },
          {
            icon: "icon-family",
            name: "Chăm sóc gia đình",
            dropdown: true,
            to: "/home/family",
          },
          {
            icon: "icon-users",
            name: "Quản lý tài khoản",
            dropdown: true,
            to: "/home/users",
          },
         
        ],
      };
    },
    methods: {
      /*
      mở rộng thanh menu
      AUTHOR: HTTHOA(23/02/2023)
      */
      zoomNavbar() {
        this.isZoomOut = !this.isZoomOut;
        this.$emit("zoomNavbar");
      },
    },
  };
  </script>
  <style scoped>
  
  .brand-text{
    font-size: 24px;
    font-weight: 700;
  }
  .menu{
    position: relative;
    
    
  }
  
  </style>
  