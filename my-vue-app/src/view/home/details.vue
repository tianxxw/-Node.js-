<script>
 export default{
   data() {
    return {
      id:'',
      type:'',
      search:''
    }
   },
   created() {
    this.id = this.$route.query.id
    this.type = this.$route.query.type
   },
   mounted() {
    this.getDetail()
   },
   methods:{
     async getDetail() {
      console.log(this.type);
      console.log('/'+this.type+'/search');
       const arr = await this.$http({
       method:'post',
       url: '/'+this.type+'/details',
       data:{
        id:this.id,
        name:''
       }
      })
      console.log(arr);
      this.search = arr.data.data
     }
   }
 }
 </script>
<template>
 <div class="content">
   <div class="title"><span @click="this.$router.push('/home')" class="home" >首页</span> > <span>详情</span></div>
   <div class="details_content"  v-for="item in search" :key="id" >
     <div class="left" v-if="type == 'attractions' || type == 'hotel' || type == 'restaurant' || type == 'food' ">
        <a-image
         height="300px"
         :src="item.image"
         style="margin:10px;"
         :title="item.area"
         fit="fill"
        />
     </div>
     <div class="right" v-if="type == 'attractions' ">
       <div class="right_wenzi">地点：{{item.title == undefined ? '暂无数据' : item.title}}</div>
       <div class="right_wenzi">热度：{{item.product == undefined ? '暂无数据' : item.product}}</div>
       <div class="right_wenzi">区域：{{item.area == undefined ? '暂无数据' : item.area}}</div>
       <div class="right_wenzi">{{item.address == undefined ? '暂无数据' : item.address}}</div>
       <div class="right_wenzi">内容：{{item.information == undefined ? '暂无数据' : item.information}}</div>
       <div class="right_wenzi">价格：{{item.price == undefined ? '暂无数据' : item.price}}</div>
       <div class="right_wenzi">评论数：{{item.amount == undefined ? '暂无数据' : item.amount + '条'}}</div>
     </div>
     <div class="right" v-else-if="type == 'hotel' ">
      <div class="right_wenzi">地址：{{item.name == undefined ? '暂无数据' : item.name}}</div>
      <div class="right_wenzi">评价：{{item.assess == undefined ? '暂无数据' : item.assess}}</div>
      <div class="right_wenzi">评分：{{item.score == undefined ? '暂无数据' : item.score}}</div>
    </div>
    <div class="right" v-else-if="type == 'restaurant' ">
      <div class="right_wenzi">店名：{{item.name== undefined ? '暂无数据' : item.name}}</div>
      <div class="right_wenzi">地址：{{item.address == undefined ? '暂无数据' : item.address}}</div>
      <div class="right_wenzi">价格：{{item.price == undefined ? '暂无数据' : item.price}}</div>
      <div class="right_wenzi">评分：{{item.score == undefined ? '暂无数据' : item.score}}</div>
      <div class="right_wenzi">评论数：{{item.comment == undefined ? '暂无数据' : item.comment}}</div>
    </div>
    <div class="right" v-else-if="type == 'food' ">
      <div class="right_wenzi">菜名：{{item.name== undefined ? '暂无数据' : item.name}}</div>
      <div class="right_wenzi">地址：{{item.address == undefined ? '暂无数据' : item.address}}</div>
      <div class="right_wenzi">{{item.number == undefined ? '暂无数据' : item.number}}</div>
    </div>
    <div class="right" v-else-if="type == 'notes' ">
      <div class="right_wenzi">题目：{{item.title== undefined ? '暂无数据' : item.title}}</div>
      <div class="right_wenzi">行程：{{item.address == undefined ? '暂无数据' : item.address}}</div>
      <div class="right_wenzi">开始时间：{{item.time == undefined ? '暂无数据' : item.time}}</div>
      <div class="right_wenzi">花费时间：{{item.days == undefined ? '暂无数据' : item.days}}</div>
      <div class="right_wenzi">记录：{{item.quantity == undefined ? '暂无数据' : item.quantity}}</div>
      <div class="right_wenzi">评论数：{{item.comment == undefined ? '暂无数据' : item.comment}}</div>
      <div class="right_wenzi">喜欢：{{item.like == undefined ? '暂无数据' : item.like}}</div>
      <div class="right_wenzi">观看：{{item.look == undefined ? '暂无数据' : item.look}}</div>
      <div class="right_wenzi">照片墙</div>
      <a-image
      height="160px"
      :src="item.imageo"
      style="margin:10px;"
      :title="item.area"
      fit="fill"
     />
     <a-image
      height="160px"
      :src="item.imaget"
      style="margin:10px;"
      :title="item.area"
      fit="fill"
     />
     <a-image
      height="160px"
      :src="item.images"
      style="margin:10px;"
      :title="item.area"
      fit="fill"
     />
     <a-image
      height="160px"
      :src="item.imagef"
      style="margin:10px;"
      :title="item.area"
      fit="fill"
     />
    </div>
   </div>
 </div>
</template>
<style scoped lang="less">
 .content {
  width: 80%;
  margin: 0 auto 40px;
  position: relative;
  .title {
    font-size: 16px;
    height: 26px;
    line-height: 26px;
    border-bottom: 1px solid black;
    cursor: default;
    .home {
      cursor: pointer;
    }
    .home:hover {
      color: seagreen;
    }
  }
  .details_content {
    display: flex;
    margin-top: 20px;
    padding: 20px;
    border-radius: 5px;
    background-color: rgba(247,247,247,1);
    .left_notes {
      display: grid;
      grid-template-columns: 200px 200px;
      grid-template-rows: 200px 200px;
      grid-gap: 20px;
    }
    .right {
      margin: 10px;
      cursor: default;
      .right_wenzi {
        height: 30px;
        font-size: 18px;
        line-height: 30px;
        white-space:nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
 }
</style>