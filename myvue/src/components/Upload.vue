<template>
  <div id="Upload">
    <div class="demo-upload-list" v-for="item in uploadList">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.id,item.url,item.description)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :on-error="handleError"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      action="/api/uploadFile/uploadImg"
      style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="View Image" v-model="visible" @on-ok="submit">
      <img :src="viewImage" v-if="visible" style="width: 100%">
      <i-input type="textarea" v-model="areaValue" :rows="4" placeholder="请输入图片描述......"></i-input>
    </Modal>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        defaultList: [],
        imgName: '',
        visible: false,
        viewImage: '',
        uploadList: [],
        imgId:'',
        areaValue:''
      }
    },
    methods: {
      handleView(id,url,description) {
        this.imgId=id;
        this.viewImage = url;
        this.visible = true;
        this.areaValue=description
      },
      handleRemove(file) {

        this.$axios.post('/api/uploadFile/removeImg', {
          id: file.id,
          name: file.name
        }).then((res) => {
          console.log(res.data)
          if (res.data.code == "200") {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
          }
        })
      },

      handleSuccess(res, file) {
        if (res.code = "isExist") {
          console.log(11111111111111);
       /*   this.$Notice.warning({
            title: 'The file format is incorrect',
            desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
          });*/
        }
        else {
          console.log(res.data);
          file.id = res.data.id
          file.url = res.data.url;
          file.name = res.data.name;
          this.viewImage = res.data.url;
          aaa=res.data.id
        }
      },
      handleError(res, file) {

      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      handleBeforeUpload() {
//        const check = this.uploadList.length < 5;
//        if (!check) {
//          this.$Notice.warning({
//            title: 'Up to five pictures can be uploaded.'
//          });
//        }
//        return check;
      },
      getImages() {
        this.$axios.post('/api/uploadFile/getImages').then((res) => {
          console.log(res.data)
          // this.defaultList = res.data.data
          console.log(this.defaultList)
          setTimeout(() => {
            this.defaultList = res.data.data; //将获取到的值赋值到 defaultList 中
            this.$nextTick(() => { //赋值后马上更新
              this.uploadList = this.$refs.upload.fileList;
            });
          }, 0);
        })
      },
      submit() {
        console.log(2222222);
        this.$axios.post('/api/uploadFile/updateImg', {
          id: this.imgId,
          description: this.areaValue
        }).then((res) => {
          console.log(res.data)
          // this.defaultList = res.data.data
          console.log(this.defaultList)

        })
      },
    },
    mounted() {
      this.getImages();
    }
  }
</script>
<style>
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
