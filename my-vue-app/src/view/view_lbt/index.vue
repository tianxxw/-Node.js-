<script>
 
 export default{
   data() {
    return {
     search_contain:'',
     option:'attractions',
     images:[
       'http://119.29.141.196:9000/1.jpeg',
       'http://119.29.141.196:9000/2.jpeg',
       'http://119.29.141.196:9000/3.jpeg',
       'http://119.29.141.196:9000/4.jpeg',
       'http://119.29.141.196:9000/5.jpeg',
      ],
     page:2
    }
   },
   components:{
     
   },
   created() {

   },
   mounted() {

   },
   methods:{
    async SearchContent() {
      let arr = ''
      this.$router.push({
       path:'/search',
       query:{
        search_contain:this.search_contain,
        option:this.option
       }
      })
      // this.page += 2
      // this.$emit('searchData',this.d)
    },
   }
 }
 </script>
<template>
 <div class="content1">
  <div class="head_content">
    <div class="left_content">
      <div class="title">
        北京（Beijing），简称“京”，古称燕京、北平，是中华人民共和国的首都、直辖市、国家中心城市、超大城市，国务院批复确定的中国政治中心、文化中心、国际交往中心、科技创新中心 [1]  ，截至2020年，全市下辖16个区，总面积16410.54平方千米 [100]  。2021年末，北京市常住人口2188.6万人，比2020年末减少0.4万人。 [17]  2021年，北京市全年实现地区生产总值40269.6亿元，按不变价格计算，比2020年增长8.5％。全市人均地区生产总值为18.4万元。
      </div>
      <el-radio-group v-model="option" fill="#3498db" >
        <el-radio-button label="attractions">景点</el-radio-button>
        <el-radio-button label="hotel">酒店</el-radio-button>
        <el-radio-button label="restaurant">餐厅</el-radio-button>
        <el-radio-button label="food">美食</el-radio-button>
        <el-radio-button label="notes">攻略</el-radio-button>
      </el-radio-group>
      <el-input type="text" v-model="search_contain"  placeholder="请输入想要搜索的内容" @keyup.enter.native="SearchContent" />
      <el-button icon="" color="#3498db" @click="SearchContent">
        开始搜索
      </el-button>
    </div>
    <div class="right_content">
      <a-carousel
      :style="{
        width: '80%',
        height: '300px'
      }"
      indicator-position="outer"
      :auto-play="true"
      show-arrow="never"
      indicator-type="dot"
      >
       <a-carousel-item v-for="image in images" :style="{width:'100%'}">
        <img
          :src="image"
          :style="{
            width: '100%',
          }"
        />
       </a-carousel-item>
      </a-carousel>
    </div>
  </div>
 </div>
</template>
<style scoped lang="less">
 .content1 {
  width: 100%;
  margin: 0 auto 40px;
  position: relative;
  .head_content {
    display: flex;
    justify-content: space-around;
    border-radius: 5px;

    background-color: rgba(247,247,247,1);
    padding: 10px;
    .left_content {
      .title {
        display: block;
        font-size: 18px;
        text-indent: 2em;
        line-height: 30px;
        display: -webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:7;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 10px;
      }
      width: 480px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .el-input {
        width: 100%;
        margin-bottom: 10px;
      }
      .el-button {
        display: block;
        width: 100%;
        color: white;
      }
      .el-radio-group {
        display: block;
        margin-bottom: 10px;
      }
    }
    .right_content {
      flex: 1;
      .arco-carousel {
        margin: 0 auto;
      }
    }
  }
 }
</style>