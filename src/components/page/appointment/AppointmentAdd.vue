<template>
  <div class="form-add">
    <div class="form-appointment">
      <div class="form-header">
        <div >
            {{ formTitle }}
        </div>
        <div class="icon icon-close" @click="closeForm" ></div>
      </div>
      <div class="form-main">
        <div class="group-controll">
          <div class="gr-item mr-2">
            <div class="label">Tên cuộc hẹn</div>
            <input class="mt-1 w-100" type="text" />
          </div>
          <div class="gr-item ml-2">
            <div class="label">Ngày dự kiến</div>
            <input class="mt-1 w-100" type="date" />
          </div>
        </div>
      
        <div class="group-controll mt-2">
            <div  class="gr-item ">

                <div class="label">Cuộc hẹn cho</div>
                <div  class="mt-1 w-100">
                    <Combobox
                      class="item-input check-input"
                      :items="patients"
                      :code="'PatientName'"
                      :fieldCode="'PatientName'"
                      :fieldName="'PatientName'"
                    />
                </div>
            </div>
            <div class="gr-item ml-2">
            <div class="label">Trạng thái cuộc hẹn</div>
            <div class=" mb-1" style="display: flex;">
          <input class="mr-1 mt-2" type="radio" value="3" />
          <p class="mr-2" for="1">Đã hoàn thành</p>
          <input class="mr-1 mt-2" type="radio" value="4"  />
          <p for="2">Bỏ lỡ</p>
        </div>
          </div>
        
        </div>
        <div class="group-controll mt-2">
          <div class="gr-item mr-2">
            <div class="label">Tên bác sĩ </div>
            <input class="mt-1 w-100" type="text" />
          </div>
          <div class="gr-item ml-2">
            <div class="label">Số điện thoại</div>
            <input class="mt-1 w-100" type="text" />
          </div>
        </div>
        <div class="group-controll mt-2">
          <div class=" w-100">
            <div class="label">Địa điểm</div>
            <input class="mt-1 w-100" type="text" />
          </div>
         
        </div>
        <div class="group-controll mt-2">
          <div class=" w-100">
            <div class="label">Ghi chú</div>
            <input class="mt-1 w-100" type="text" />
          </div>
         
        </div>
      </div>
      <div class="form-footer mt-2">
        <button class="btn button-blue"> Lưu</button>
        <button class="btn button-blue-outline mr-2"> Huỷ</button>

      </div>
    </div>
  </div>
</template>
<script>
import Combobox from "../../base/BaseCombobox.vue";

export default {
    props:['data'],
    components: {
    Combobox,
  },
  data() {
    return {
        appointment:{},
      patients: [
        {
          PatientId: "7343483484",
          PatientName: "Nguyễn Văn A",
        },
        {
          PatientId: "7343483444",
          PatientName: "Nguyễn Văn B",
        },
      ],

      formTitle: "Lên lịch cuộc hẹn",
    };
  },
  created() {
    this.appointment= this.data
},
  methods:{
    closeForm(){

        this.$emit("closeForm", false);
    }
  }
};
</script>
<style scope>
.form-add {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 0;
  align-items: center;
}
.form-add .form-appointment {
  margin: 0px;
  width: 500px;
  height: auto;
  max-height: 800px;
  background-color: #fff;
  padding: 20px;
}

.gr-item {
  width: 50%;
}
 .label {
  font-weight: bold;
}

</style>
