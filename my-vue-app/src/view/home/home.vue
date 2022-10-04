<script>
 export default{
   data() {
    return {
      images:[
       'http://119.29.141.196:9000/1.jpeg',
       'http://119.29.141.196:9000/2.jpeg',
       'http://119.29.141.196:9000/3.jpeg',
       'http://119.29.141.196:9000/4.jpeg',
       'http://119.29.141.196:9000/5.jpeg',
      ],
      page:5,
      attractions:'',
      hotel:'',
      restaurant:'',
      food:'',
      notes:'',
      preview:false
    }
   },
   created() {

   },
   mounted() {
    this.getAttractions()
    this.getHotel()
    this.getRestaurant()
    this.getFood()
    this.getNotes()
    window.sessionStorage.setItem("comName",'home')
   },
   methods:{
    async getAttractions(){
     const arr = await this.$http({
      method:'post',
      url:'/attractions/all',
      data:{
       page:this.page
      }
     })
     this.attractions = arr.data.data
    },
    async getHotel() {
     const arr = await this.$http({
      method:'post',
      url:'/hotel/all',
      data:{
       page:this.page
      }
     })
     this.hotel = arr.data.data
    },
    async getRestaurant() {
     const arr = await this.$http({
      method:'post',
      url:'/restaurant/all',
      data:{
       page:this.page
      }
     })
     this.restaurant = arr.data.data
    },
    async getFood() {
     const arr = await this.$http({
      method:'post',
      url:'/food/all',
      data:{
       page:this.page
      }
     })
     this.food = arr.data.data
    },
    async getNotes() {
     const arr = await this.$http({
      method:'post',
      url:'/notes/all',
      data:{
       page:this.page
      }
     })
     console.log(arr);
     this.notes = arr.data.data
    },
    goDetails(id,type) {
     window.sessionStorage.setItem("comName",'details')
     this.$router.push({path:'/details',query:{id:id,type:type}})
     this.$emit('comNameChange','details')
    }
   }
 }
 </script>
<template>
  <div class="content">
   <a-carousel
   :style="{
     width: '100%',
     height: '400px',
   }"
   animation-name="card"
   indicator-position="outer"
   :auto-play="true"
   show-arrow="never"
   indicator-type="dot"
   >
    <a-carousel-item v-for="image in images" :style="{width:'60%'}">
     <img
       :src="image"
       :style="{
         width: '100%',
       }"
     />
    </a-carousel-item>
   </a-carousel>
   <div>
    <div class="option">
      <div class="title">
        <div class="left" @click="this.$router.push('/attractions')" >景点推荐</div>
        <div class="right" @click="this.$router.push('/attractions')" >more>></div>
      </div>
      <div class="option_content">
      <div v-for="item in attractions" :key="item.id" class="item" @click="goDetails(item.id,'attractions')">
       <a-image
       width="210px"
       height="158px"
       fit="cover"
       :src="item.image"
       style="margin:10px;"
       :title="item.area"
       :preview="preview"
     />
        <div class="wenzi" :title="item.title">{{item.title}}</div>
        <div class="information" :title="item.information">{{item.information}}</div>
        <div class="price">{{item.price}}</div>
      </div>
      </div>
   </div>
   </div> 
   <div>
    <div class="option">
      <div class="title">
        <div class="left" @click="this.$router.push('/hotel')" >酒店推荐</div>
        <div class="right"  @click="this.$router.push('/hotel')" >more>></div>
      </div>
      <div class="option_content">
      <div v-for="item in hotel" :key="item.id" class="item" @click="goDetails(item.id,'hotel')" >
       <a-image
       width="210px"
       height="158px"
       fit="cover"
       :src="item.image"
       style="margin:10px;"
       :title="item.score"
       :preview="preview"
     />
        <div class="wenzi" :title="item.name">{{item.name}}</div>
        <div class="hotel_information" :title="item.information">评价：{{item.assess}}</div>
      </div>
      </div>

    </div>
   </div>
   <div>
    <div class="option">
      <div class="title">
        <div class="left" @click="this.$router.push('/restaurant')" >餐厅推荐</div>
        <div class="right" @click="this.$router.push('/restaurant')" >more>></div>
      </div>
      <div class="option_content">
      <div v-for="item in restaurant" :key="item.id" class="item" @click="goDetails(item.id,'restaurant')" >
       <a-image
       width="210px"
       height="158px"
       fit="cover"
       :src="item.image"
       style="margin:10px;"
       :title="item.score"
       :preview="preview"
     />
        <div class="wenzi" :title="item.name">{{item.name}}</div>
        <div class="information" :title="item.address">{{item.address}}</div>
        <div class="price">{{item.price}}</div>
      </div>
      </div>
   </div>
   </div>
   <div>
    <div class="option">
      <div class="title">
        <div class="left"  @click="this.$router.push('/food')" >美食推荐</div>
        <div class="right" @click="this.$router.push('/food')" >more>></div>
      </div>
      <div class="option_content">
      <div v-for="item in food" :key="item.id" class="item" @click="goDetails(item.id,'food')">
       <a-image
       width="210px"
       height="158px"
       fit="cover"
       :src="item.image"
       style="margin:10px;"
       :title="item.number"
       :preview="preview"
     />
        <div class="wenzi" :title="item.name">{{item.name}}</div>
        <div class="information" :title="item.address">{{item.address}}</div>
      </div>
      </div>
   </div>
   </div>
   <div>
    <div class="option">
      <div class="title">
        <div class="left"  @click="this.$router.push('/notes')" >攻略推荐</div>
        <div class="right" @click="this.$router.push('/notes')" >more>></div>
      </div>
      <div class="option_content">
      <div v-for="item in notes" :key="item.id" class="item" @click="goDetails(item.id,'notes')" >
       <a-image
       width="210px"
       height="158px"
       fit="cover"
       :src="item.imageo"
       style="margin:10px;"
       :title="item.time"
       :preview="preview"
     />
        <div class="wenzi" :title="item.title">{{item.title}}</div>
        <div class="information" :title="item.address">{{item.address}}</div>
        <div class="like" :title="item.like">喜欢：{{item.like}}</div>
        <div class="price" :title="item.look">观看：{{item.look}}</div>
      </div>
      </div>
   </div>
   </div>
</div>
</template>
<style scoped lang="less">
 .content {
  width: 80%;
  margin: 0 auto 40px;
  position: relative;
 }
 .option {
  margin-bottom: 20px;
  .title {
   font-size: 20px;
   height: 30px;
   line-height: 30px;
   display: flex;
   justify-content: space-between;
   text-align: center;
   .left {
    height: 30px;
    border-bottom: 3px solid #3498db;
    width: 100px;
    cursor: pointer;
   }
   .left:hover {
    color: #3498db;
   }
   .right {
    font-size: 16px;
    text-align: center;
    cursor: pointer;
   }
   .right:hover {
    color: #3498db;
   }
   margin-bottom: 20px;
   cursor: default;
   user-select: none;
  }
  .option_content {
   display: flex;
   justify-content: space-around;
   .item {
    width: 230px;
    background-color: rgba(247,247,247,1);
    border-radius: 5px;
    cursor:default;
   }
  }
 }
 .option::before {
  content: '';
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  margin-top: 30px;
  z-index: -1;
  background-color: gainsboro;
 }
 .wenzi {
  font-size: 18px;
  width: 210px;
  height: 30px;
  line-height: 30px;
  margin:0 auto;
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
 }
 .information {
  display: -webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  width: 210px;
  height: 40px;
  line-height: 20px;
  margin:5px auto 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow: hidden;
 }
 .price {
  width: 210px;
  height: 20px;
  line-height: 20px;
  margin:0 auto 10px;
 }
 .like {
  width: 210px;
  height: 20px;
  line-height: 20px;
  margin:0 auto 5px;
 }
 .hotel_information {
  display: -webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  width: 210px;
  height: 40px;
  line-height: 20px;
  margin:0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
 }
</style>