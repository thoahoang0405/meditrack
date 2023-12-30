<template>
  <div class="form-upload-f">
    <div class="form-upload">
      <div class="form-header mt-1" style="display: flex; justify-content: space-between;">
        <div class="fileName">{{  fileData.name}}</div>
        <div class="icon icon-close-white " @click="closeFormST1"></div>
      </div>
          <div class="fileName" style="font-weight: bold;">{{ name }}</div>
          <img :src="fileData.url" />
    </div>
  </div>
</template>
<script>
import { storage } from "@/js/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default {
  props:["url"],
  data() {
    return {
      fileData: {},
      urlImage: "https://firebasestorage.googleapis.com/v0/b/meditrackcr.appspot.com/o/placeholder.png?alt=media&token=07460e40-90da-4952-835f-b09f275b2af8",
      name: null,
    };
  },
  created() {
    this.fileData= this.url
  },
  methods: {
    closeFormST1() {
      this.$emit("closeFormFile", false);
    },

    // lưu lên và hiển thị khi đổi chọn ảnh
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        this.fileData = null;
        return;
      }
      this.fileData = files[0];
      const storageRef = ref(storage, this.fileData.name);
      // Hàm update file lên theo tên file
      uploadBytes(storageRef, this.fileData).then((res) => {
        console.log(res);
        //Hàm get file vể và hiển thị theo tên file
        getDownloadURL(ref(storage, this.fileData.name)).then(
          // get url gán vào src ảnh là được
          (urldownLoad) => (this.url = urldownLoad)
        );
      });
      this.name = this.fileData.name;
    },
    // khi lưu thì gọn đến hà uploadBytes ở trên và chỉ cần lưu tên của file vào database thôi nhé (this.fileData.name)
    // lúc lấy đển hiển thị ra thi dùng hàn getDownloadURL theo tên của file lưu ở database cho từ đối tương.
    save() {
      //todo lưu xuống database
      console.log(this.fileData);
    },
  },
};
</script>
<style scope>
.form-upload-f {
  background-color: transparent  !important;;
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 0;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 20;
  margin: 0;
  flex-direction: column;
}
.form-upload-f .form-upload {
  margin: 0;
  max-width:100%;
  max-height:100vh;
  padding: 20px;
  background-color: #000;
}
.form-upload img{
  max-width: 100%;
  max-height: 900px;
}
.form .form-main {
  height: 400px;
}
.gr-item {
  position: relative;
}
.label {
  font-weight: bold;
}
.filelabel {
  width: 120px;
  border-radius: 5px;
  display: block;
  padding: 5px;
  transition: border 300ms ease;
  cursor: pointer;
  text-align: center;
  margin: 0;
  display: flex;
  color: grey;
  margin-top:10px
}


#FileInput {
  display: none;
}
</style>
