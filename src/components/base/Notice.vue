<template>
    <div class="notice-nav">
        <div class="title">Thông báo</div>
        <div class="notice-item mt-2">
            <div class="item-n" :class="item.NoticeStatus==0 ? 'bg-blue':''" @click="clickSeen(item)" v-for="item,index in listNotice" :key="index">
                <strong>{{ item.patientName }} </strong>
                <span class="item"> có {{ item.type }}</span>
                <strong>{{ item.Name }} </strong>
                <span class="item"> vào hôm nay</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isSeen:false,
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
            ]
        }
    },
    methods:{
        clickSeen(item){
            item.NoticeStatus=1
        }
    }
}
</script>
<style scope>
.notice-nav{
    width: 200px;
    min-height: 200px;
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
.item-n{
    padding: 8px;

}
</style>