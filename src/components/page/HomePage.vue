<template>
    <div class="container" :class="isZoom ? 'zoom-in' : ''">
      
      <the-menu @zoomNavbar="isZoom = !isZoom" />
      <the-header />
      <router-view />
    </div>
  </template>
  
  <script>
  import TheHeader from "../TheHeader.vue";
  import TheMenu from "../TheMenu.vue";
  export default {
    components: {
      TheHeader,
      TheMenu,
    },
    data() {
      return {
        isZoom: false,
      };
    },
  };
  </script>
  
  <style scoped>
  .container{
    z-index: 0;
  }
</style>
  