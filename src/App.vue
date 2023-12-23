<template>
  <router-view></router-view>
  <home-page></home-page>
</template>

<script>
import HomePage from './components/page/HomePage.vue';

export default {
    name: "App",
    components: { HomePage }
};
</script>

<style scoped>
@import url(./css/main.css);
@import url(./css/page/assets-page.css);
</style>
