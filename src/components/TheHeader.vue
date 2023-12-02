<template>
  <div class="header">
    <P class="brand-text">MEDITRACK</P>
    <div class="right mr-2">
      <div class="notifi mr-2">
        <div class="noti"></div>
        <div class="icon mt-1 icon-noti"></div>
      </div>
      <div class="avatar">{{ User }}</div>
    </div>
  </div>
</template>
<style scoped>
@import url(../css/main.css);
@import url(../css/layout//header.css);
</style>
<script>
export default {
  name: 'Header-app',
  components: {
    
  },
  data() {
    return {
      form: {
        title: '',
        write_up: '',
      }
    };
  },

 
  methods: {
  
  }
};
</script>
