<template>
  <div class="form-add">
    <div class="form">
      <div class="form-header">
        <div>Thêm File Hồ sơ</div>
        <div class="icon icon-close" @click="closeFormST1"></div>
      </div>

      <div class="form-main">
        <label class="filelabel">
          <FontAwesomeIcon icon="fa-solid fa-paperclip" />
          <span class="title"> Thêm file</span>
          <input
            @change="onFileChange($event)"
            class="FileUpload1"
            id="FileInput"           
            name="booking_attachment"
            type="file"
            accept="image/*"
          />
        </label>
        <img :src=url width="800" height="350">
      </div>
      <div class="form-footer mt-2">
        <button class="btn button-blue" @click="save()">Lưu</button>
        <button class="btn button-blue-outline mr-2" @click="closeFormST1()">
          Huỷ
        </button>
      </div>
    </div>
  </div>
</template>
  <script>
  import { storage } from '@/js/firebase/firebase';
  import {ref,uploadBytes , getDownloadURL} from 'firebase/storage'
export default {
  data() {
      return {
        fileData:null,
        url:"https://firebasestorage.googleapis.com/v0/b/meditrackcr.appspot.com/o/placeholder.png?alt=media&token=07460e40-90da-4952-835f-b09f275b2af8",
        
      }
    },
  methods: {
    closeFormST1() {
      this.$emit("closeFormFile", false);
    },
    
    // lưu lên và hiển thị khi đổi chọn ảnh
    onFileChange(e) {
     var files = e.target.files || e.dataTransfer.files;
       if (!files.length)
       {
        this.fileData = null;
         return;
       }       
       this.fileData = files[0];
       const storageRef = ref(storage,this.fileData.name)
       // Hàm update file lên theo tên file
      uploadBytes(storageRef,this.fileData).then(
        (res)=>{
          console.log(res);
          //Hàm get file vể và hiển thị theo tên file
          getDownloadURL(ref(storage,this.fileData.name)).then(
            // get url gán vào src ảnh là được
            (urldownLoad)=>(this.url =urldownLoad )
          )
        }
      )

},
    // khi lưu thì gọn đến hà uploadBytes ở trên và chỉ cần lưu tên của file vào database thôi nhé (this.fileData.name)
    // lúc lấy đển hiển thị ra thi dùng hàn getDownloadURL theo tên của file lưu ở database cho từ đối tương.
    save(){
      //todo lưu xuống database
    }
  },
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
.form-add .form {
  margin: 0px;
  width: 800px;
  height: 500px;
  background-color: #fff;
  padding: 20px;
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
    border: 2px dashed grey;
    border-radius: 5px;
    display: block;
    padding: 5px;
    transition: border 300ms ease;
    cursor: pointer;
    text-align: center;
    margin: 0;
}
.filelabel i {
    display: block;
    font-size: 30px;
    padding-bottom: 5px;
}
.filelabel i,
.filelabel .title {
  color: grey;
  transition: 200ms color;
}
.filelabel:hover {
  border: 2px solid #1665c4;
}
.filelabel:hover i,
.filelabel:hover .title {
  color: #1665c4;
}
#FileInput{
    display:none;
}
</style>
  