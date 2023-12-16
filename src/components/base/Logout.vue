<template>
    <div class="logout-nav">
        <div class="logout-item mt-2">
            <div class="item-n" >
                <button class="name " @click="showUserDetail">Hoàng Thị Thoả</button>
                <button class="btn-logout item" @click="logout"><div class="icon icon-logout mr-2"></div>  <p class="">Đăng xuất</p></button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    methods:{
        logout(){
            this.$router.push("/login");
        },
        showUserDetail(){
            this.$router.push("/home/account")
        }
    }
}
</script>
<style scope>
.logout-nav{
    width: 150px;
   height: 80px;
    overflow-y: auto;
    position: absolute;
    z-index: 100;
    right: 8px;
    top:42px;
    border: 1px solid #07B6C4;
    background-color: #fff;

}
.logout-nav .title{
    color:#07B6C4;
    font-size: 16px;
    font-weight: bold;
    margin-left: 8px;
}
.bg-blue{
    background-color: #F0FAFF;
}
.btn-logout{
    width: 100%;
    background-color: #fff;
    border: none;
    height: 35px;    
    font-weight: bold;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

}
.logout-nav .name{
    width: 100%;
    background-color: #fff;
    border: none;
    height: 35px;   
    font-size: 15px;
    font-weight: bold;
    border-bottom: 1px solid #F0FAFF ;

}
.logout-nav .item-n{
    display: flex;
    justify-content: center ;
    flex-direction: column;
    padding: 0;
}
.item:hover{
    background-color: #F0FAFF;
}
</style>