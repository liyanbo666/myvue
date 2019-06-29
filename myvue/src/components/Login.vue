<template>
  <div id="loginRootDiv">
    <div id="login" style="margin-left: 60%;margin-top: 20%">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <div>
          <FormItem prop="username">
            <Input type="text" value="liyanbo" v-model="formInline.username" clearable placeholder="请输入用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </div>
        <div>
          <FormItem prop="password">
            <Input type="password" value="123456" v-model="formInline.password" clearable placeholder="请输入密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </div>
        <div>
          <FormItem prop="vCode">
            <Input type="text" value="" v-model="formInline.vCode" clearable placeholder="请输入验证码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </div>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleRegister('formInline')">注册</Button>
        </FormItem>
          <img :src="imgUrl" @click="getImgCode()" width="60" height="30" alt="点击刷新">
      </Form>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Vue from "vue/dist/vue.esm";
  import tools from "../utils/tools";
  export default {
    data() {
      return {
        imgUrl:'',
        formInline: {
          username: 'liyanbo',
          password: '123456',
          vCode: ''
        },
        ruleInline: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码少于六位', trigger: 'blur'}
          ],
          vCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {type: 'string', trigger: 'blur'}
          ]
        }
      }
    },
    mounted(){
//      this.handleAnimate()
    },
    created() {
      this.getImgCode();
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$axios.post('/api/system/doLogin', this.formInline,{'content-type': 'application/x-www-form-urlencoded'}).then(res => {
              console.log(res.data);
              if("200"==res.data.code){
                this.$router.push({name: "Upload"});
//                this.$router.push({path: "/Upload"});

              }
            })
          } else {
            this.$Message.error('表单校验失败!');
          }
        })
      },
      getImgCode() {
        console.log("开始获取验证码");
        this.$axios.get('/api/system/getImgCode').then((res)=>{
          this.imgUrl = 'data:image/png;base64,' + res.data
          ;
        })
      },

    }
  }

</script>

<style lang="css">
  #loginRootDiv{
    width: 100%;
    height: 100%;
    background: #000;
  }
  #login{
    /*width:100%;*/
    /*height: 100%;*/
    position: absolute;
    z-index: 99999;
    /*background: #153e7c;*/
  }


  button {
    color: rgba(127,255,255,0.75);
    background: transparent;
    outline: 1px solid rgba(127,255,255,0.75);
    border: 0px;
    padding: 5px 10px;
    cursor: pointer;
  }
  button:hover {
    background-color: rgba(0,255,255,0.5);
  }
  button:active {
    color: #000000;
    background-color: rgba(0,255,255,0.75);
  }
</style>

