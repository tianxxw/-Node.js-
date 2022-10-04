<script>
 import {Plus} from '@element-plus/icons-vue'
 export default{
   data() {
    return {
     info:'',
     size:150,
     shape:'square',
     attractions:'',
     food:'',
     restaurant:'',
     hotel:'',
     notes:'',
     vistor:0,
     money:0,
     user:''
    }
   },
   components:{
     Plus
   },
   created() {

   },
   mounted() {
    this.getGoods()
    this.getOrders()
    this.getUsers()
    this.getManger()
    this.getNotes()
    this.info = JSON.parse(window.sessionStorage.getItem('info'))
   },
   methods:{
    async getGoods() {
     const arr = await this.$http({
      method:'get',
      url:'/attractions/ma_all',
      headers:{
        authorization:window.sessionStorage.getItem('token')
      }
     })
     console.log(arr);
     this.attractions = arr.data.data
    },
    async getOrders() {
     const data = await this.$http({
        method:'get',
        url:'/food/ma_all',
        headers:{
          authorization:window.sessionStorage.getItem('token')
        }
      })
      console.log(data);
      let arr = data.data.data
      this.food = arr
    },
    async getUsers() {
     const data = await this.$http({
         method:'get',
         url:'/restaurant/ma_all',
         headers:{
           authorization:window.sessionStorage.getItem('token')
         }
       })
       let arr = data.data.data
       this.restaurant = arr
    },
    async getManger() {
     const arr = await this.$http({
        method:'get',
         url:'/hotel/ma_all',
         headers:{
           authorization:window.sessionStorage.getItem('token')
         }
     })
     console.log(arr);
     this.hotel = arr.data.data
    },
    async getNotes() {
     const arr = await this.$http({
        method:'get',
         url:'/notes/ma_all',
         headers:{
           authorization:window.sessionStorage.getItem('token')
         }
     })
     console.log(arr);
     this.notes = arr.data.data
    },
   }
 }
 </script>
<template>
 <div>
  <div class="top">
   <div class="top_left">
    <el-avatar :size="size" :src="info.avatar" class="avatar_img" :shape="shape" @mouseenter="showAvatar" @mouseleave="closeAvatar" />
    <div>账号：{{info.username}}</div>
    <div>用户名：{{info.nickname}}</div>
    <div></div>
   </div>
    <div class="top_right">
      <div class="right_content">
      <div style="width: 100px; height: 150px;background-color: salmon;">
       <div class="title">景点数</div><el-image style="width: 60px; height: 90px" src="http://119.29.141.196:9000/order_num.png" fit="contain" /></div>
       <div class="text"><div>{{attractions.length}}</div></div>
      </div>
      <div class="right_content">
      <div style="width: 100px; height: 150px;background-color:rgba(0,122,204);">
       <div class="title">美食数</div>
       <el-image style="width: 60px; height: 90px" src="http://119.29.141.196:9000/user_num.png" fit="contain" />
      </div>
      <div class="text">{{food.length}}</div>
      </div>
      <div class="right_content">
      <div style="width: 100px; height: 150px;background-color:rgba(250,195,38);">
       <div class="title">餐厅数</div>
       <el-image style="width: 60px; height: 90px" src="http://119.29.141.196:9000/good_num.png" fit="contain" />
      </div>
      <div class="text">{{restaurant.length}}</div>
      </div>
      <div class="right_content">
      <div style="width: 100px; height: 150px;background-color:rgba(41,184,183)">
       <div class="title">酒店数</div>
       <el-image style="width: 60px; height: 90px" src="http://119.29.141.196:9000/visitor_num.png" fit="contain" />
      </div>
      <div class="text">{{hotel.length}}</div>
      </div>
      <div class="right_content">
        <div style="width: 100px; height: 150px;background-color:rgba(41,184,183)">
         <div class="title">游记攻略</div>
         <el-image style="width: 60px; height: 90px" src="http://119.29.141.196:9000/visitor_num.png" fit="contain" />
        </div>
        <div class="text">{{notes.length}}篇</div>
        </div>
      <div class="right_content">
    </div>
   </div>
  </div>
  <div class="bottom">
   <div id="bottom_left">

   </div>
   <div id="bottom_right">

   </div>
  </div>
 </div>
</template>
<style scoped lang="less">
 .top {
  display: flex;
  justify-content: center;
  height: 100%;
  .avatar_img {
   width: 200px;
   height: 200px;
   margin: 20px 20px 10px 20px;
 }
 .top_left div {
  margin: 10px 20px;
 }
 .top_right {
  flex: 1;
  display: grid;
  margin: 10px;
  grid-template-columns: 33% 33% 33% ;
  grid-gap: 10px;
  grid-template-rows: 150px 150px;
  .right_content{
   display: flex;
   background-color:rgba(212,248,255);
   .text {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    flex: 1;
    text-align: center;
   }
  }
 }
}
.title {
 height: 40px;
 line-height: 40px;
 text-align: center;
 color: white;
}
.el-image {
 margin-top: 0px;
 margin-left: 20px;
}
</style>