<template>
    <div class="notice-nav">
        <div class="title">Thông báo</div>
        <div class="notice-item mt-2">
            <div class="item-n" :class="item.NoticeStatus==1 ? 'bg-blue':''" @click="clickSeen(item)" v-for="item,index in listNotice" :key="index">
                <strong>{{ item.NoticeOfUser }} </strong>
                <span class="item"> có {{ item.NoticeType }}</span>
                <strong>{{ item.NoticeName }} </strong>
                <span class="item"> vào hôm nay</span>
            </div>
        </div>
    </div>
    <NoticeDetail v-if="isShow" :notice="showNotice" @closePopup="isShow=false"></NoticeDetail>
</template>
<script>
import axios from "axios";
import NoticeDetail from './NoticeDetail.vue'
export default {
    data() {
        return {
            isShow: false,
            isSeen:false,
            countNotice:0,
            listNotice:[
                {
                    patientName:'Bạn',
                    type:'cuộc hẹn ',
                    Name:'Khám sức khoẻ định kỳ',
                    NoticeStatus:0
                },
                {
                    patientName:'Bạn',
                    type:'cuộc hẹn ',
                    Name:'Khám sức khoẻ định kỳ',
                    NoticeStatus:0,
                },
                {
                    patientName:'Bạn',
                    type:'cuộc hẹn ',
                    Name:'Khám sức khoẻ định kỳ',
                    NoticeStatus:0
                },
                {
                    patientName:'Bạn',
                    type:'cuộc hẹn ',
                    Name:'Khám sức khoẻ định kỳ',
                    NoticeStatus:0
                },
                {
                    patientName:'Bạn',
                    type:'cuộc hẹn ',
                    Name:'Khám sức khoẻ định kỳ',
                    NoticeStatus:0
                },
            ],
            showNotice:{}
        }
    },
    components:{
        NoticeDetail
    },
    created(){
        this.getpresDay()
    },
    methods:{
        clickSeen(item){
            this.showNotice=item
            this.isShow=true
            debugger
            item.NoticeStatus=2
             axios({
        url: `https://localhost:44371/api/Notifications/${item.NoticeID}`,
        method: "put",
        data: item,
      })
        .then(function (res) {
          return res;
        })
        .catch(function (res) {
          return res;
        });
        },
        getpresDay(){
            axios
        .get(`https://localhost:44371/api/Notifications/appointmentDay?id=${localStorage.getItem("data")}`)
        .then((response) => {
          this.listNotice = response.data;
          this.countNotice=response.data.filter(item=>item.NoticeStatus==1).length
          this.$emit("count",this.countNotice)
        })
        .catch((err) => {
          console.log(err);
        });
        }
    }
}
</script>
<style scope>
.notice-nav{
    width: 200px;
    min-height: 50px;
    max-height : 400px;
    overflow-y: auto;
    position: absolute;
    z-index: 100;
    right: 8px;
    top:42px;
    border: 1px solid #07B6C4;
    background-color: #fff;
    padding-top: 16px;

}
.notice-nav .title{
    color:#07B6C4;
    font-size: 16px;
    font-weight: bold;
    margin-left: 8px;
}
.bg-blue{
    background-color: #F0FAFF;
}
.item-n:hover {
    background-color: #F0FAFF;

}
.item-n{
    padding: 8px;

}
</style>