<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
 <div id="homeWrap">
   <!-- 标题栏 -->
   <div id="header"></div>
   <!--<div id="contentWrap"></div>-->
   <!--导航-->
     <div id="homeMenu">
       <Row>
         <Menu :theme="theme2" @on-select="changeMenu">
           <Submenu name="Home">
             <template slot="title">
               <Icon type="ios-paper" />
               客户管理
             </template>
             <MenuItem name="Upload">个人相册</MenuItem>
             <MenuItem name="SpecialPicture">图片特效</MenuItem>
             <MenuItem name="Customer">客户管理</MenuItem>
           </Submenu>
           <Submenu name="OrderManage">
             <template slot="title">
               <Icon type="ios-people" />
               订单管理
             </template>
             <MenuItem name="Order">订单</MenuItem>
             <MenuItem name="DealOrder">成交订单</MenuItem>
           </Submenu>
           <Submenu name="3">
             <template slot="title">
               <Icon type="ios-stats" />
               统计分析
             </template>
             <MenuGroup title="使用">
               <MenuItem name="3-1">新增和启动</MenuItem>
               <MenuItem name="3-2">活跃分析</MenuItem>
               <MenuItem name="3-3">时段分析</MenuItem>
             </MenuGroup>
             <MenuGroup title="留存">
               <MenuItem name="3-4">用户留存</MenuItem>
               <MenuItem name="3-5">流失用户</MenuItem>
             </MenuGroup>
           </Submenu>
         </Menu>
       </Row>
       <br>
       <!--  <p>Change theme</p>
         <RadioGroup v-model="theme2">
           <Radio label="light"></Radio>
           <Radio label="dark"></Radio>
         </RadioGroup>-->
     </div>
     <div id="contentWrap">
       <router-view></router-view>
     </div>
 </div>
</template>
<script>
  export default {
    data () {
      return {
        theme2: 'light'
      }
    },
    methods:{
      changeMenu(name){
        this.$router.push('/Home/'+name)
      }
    }
  }
</script>
<style>
  #homeWrap{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position:absolute;
  }
  #header{
    width: 100%;
    height: 40px;
    background: lightpink;
  }
  #homeMenu{
    width: 240px;
    height:calc(100% - 40px);
    float: left;
    background: lightpink;
  }
  #contentWrap{
    width:calc(100% - 240px);
    height:calc(100% - 40px);
    float: left;
    overflow: hidden;
  }
</style>
