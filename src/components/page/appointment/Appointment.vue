<template>
  <div class="appointment">
    <div class="header-appoint">
      <div class="title">
        <h2 class="mr-2 mb-2">Theo dõi cuộc hẹn y tế</h2>
        <div class="radio-user mb-1">
          <input class="mr-1" type="radio" value="1" v-model="model.user" />
          <label class="mr-2" for="1">Tôi</label>
          <input class="mr-1" type="radio" value="2" v-model="model.user" />
          <label for="2">Gia đình</label>
        </div>
      </div>
    </div>
    <div class="nav mt-2">
      <div class="search-fn">
        <input
          type="text"
          placeholder="Nhập tên cuộc hẹn để tìm kiếm"
          class="input-seach"
        />
        <div class="icon-s">
          <span class="icon icon-search-black"></span>
        </div>
      </div>
      <button class="btn button-blue">+ Lên lịch cuộc hẹn</button>
    </div>

    <div class="main">
      <div class="list-app mt-2">
        <div v-for="(item,index) in listAppointment" :key="index">
          <div class="item-app mr-2 mr-1 mt-2">
            <div class="title-item">Cuộc hẹn: {{ item.title }}</div>
            <div class="main-item">
              <div class="content mt-2">
                <div class="title">Ngày:</div>
                <span>{{ item.date }}</span>
              </div>
              <div class="content mt-1">
                <div class="title">Địa chỉ:</div>
                <span>{{ item.address }}</span>
              </div>
              <div class="content mt-1">
                <div class="title">Thời gian:</div>
                <span>{{ item.time }}</span>
              </div>

              <div class="status">Sắp tới</div>
            </div>
            <div class="footer-item">
              <button class="btn delete-btn">Huỷ bỏ</button>
              <button class="btn update-btn">Cập nhật</button>
            </div>
          </div>
        </div>
      </div>
      <div class="notice mt-2 mr-2">
        <div class="notice-content">
          <div class="icon notice-blue mr-1"></div>
          Bạn có 2 cuộc hẹn hôm nay
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Appointment-page",
  props: {
    msg: String,
  },
  data() {
    return {
      model: {
        user: 1,
      },
      listAppointment: [
        {
          title: "Khám sức khoẻ định kỳ",
          date: "12/12/2023",
          address: "Hà nội",
          time: "Từ 9h đến 10h",
        },
        {
          title: "Khám sức khoẻ định kỳ",
          date: "12/12/2023",
          address: "Hà nội",
          time: "Từ 9h đến 10h",
        },
        {
          title: "Khám sức khoẻ định kỳ",
          date: "12/12/2023",
          address: "Hà nội",
          time: "Từ 9h đến 10h",
        },
        {
          title: "Khám sức khoẻ định kỳ",
          date: "12/12/2023",
          address: "Hà nội",
          time: "Từ 9h đến 10h",
        },
        {
          title: "Khám sức khoẻ định kỳ",
          date: "12/12/2023",
          address: "Hà nội",
          time: "Từ 9h đến 10h",
        },
        {
          title: "Khám sức khoẻ định kỳ",
          date: "12/12/2023",
          address: "Hà nội",
          time: "Từ 9h đến 10h",
        },
        {
          title: "Khám sức khoẻ định kỳ",
          date: "12/12/2023",
          address: "Hà nội",
          time: "Từ 9h đến 10h",
        },
        {
          title: "Khám sức khoẻ định kỳ",
          date: "12/12/2023",
          address: "Hà nội",
          time: "Từ 9h đến 10h",
        },
        {
          title: "Khám sức khoẻ định kỳ",
          date: "12/12/2023",
          address: "Hà nội",
          time: "Từ 9h đến 10h",
        },
        {
          title: "Khám sức khoẻ định kỳ",
          date: "12/12/2023",
          address: "Hà nội",
          time: "Từ 9h đến 10h",
        },
        {
          title: "Khám sức khoẻ định kỳ",
          date: "12/12/2023",
          address: "Hà nội",
          time: "Từ 9h đến 10h",
        },
        {
          title: "Khám sức khoẻ định kỳ",
          date: "12/12/2023",
          address: "Hà nội",
          time: "Từ 9h đến 10h",
        },
        {
          title: "Khám sức khoẻ định kỳ",
          date: "12/12/2023",
          address: "Hà nội",
          time: "Từ 9h đến 10h",
        },

      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(./Appointment.scss);
</style>
