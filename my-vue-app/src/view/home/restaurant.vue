<script>
  import { Search } from '@element-plus/icons-vue'
  import View_lbt from '../view_lbt/index.vue'
  export default{
    data() {
     return {
      list:'',
      page:2,
      bottom:'',
      viewHeight:'',
      flag:true,
      more:true,
      preview:false
     }
    },
    components:{
     Search,
     View_lbt,
 },
    created() {
     this.getAttractions()
    },
    mounted() {
     window.addEventListener('scroll',this.scroll)
    },
    methods:{
     getData(val) {
       this.attractions = val
      },
     async getAttractions(){
      this.list = ''
      this.page = 2
      const arr = await this.$http({
       method:'post',
       url:'/restaurant/all',
       data:{
        page:this.page * 10
       }
      })
      this.list = arr.data.data
      this.page += 2
     },
     // -------------------------------------------------------------------------------------------------------------------
     async scroll() {
     let option = this.$refs.option
     let viewHeight = document.documentElement.clientHeight
     let rect = option.getBoundingClientRect()
     this.top = rect.top
     this.bottom = rect.bottom
     this.viewHeight = viewHeight
     if(Number.parseInt(this.bottom) - viewHeight <= 10 && this.flag && this.more) {
      console.log(1);
      this.flag = false
      let arr = ''
      arr = await this.$http({
       method:'post',
       url:'/restaurant/all',
       data:{
         page:this.page * 10
       }
      })
      setTimeout(()=>{
       this.flag = true
      },2000)
      console.log(arr);
      if(this.list.length == arr.data.data.length) {
         this.more = false
         this.$refs.None.style.display = 'block'
         this.loading = false
        await ElMessage({
           message: '没有更多数据了',
           type: 'warning',
           grouping:true,
           duration:3000
         })
       }else {
        await ElMessage({
           message: '数据加载中',
           type: 'success',
           grouping:true,
           duration:2000
         })
         setTimeout(()=>{
          this.page += 2
          this.list = arr.data.data
          this.loading = false
         },1200)
       }
     }
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
   <View_lbt @searchData="getData"></View_lbt>
   <div class="option" ref="option">
     <div class="title">餐厅推荐</div>
     <div class="option_content">
     <div v-for="item in list" :key="item" class="item" @click="goDetails(item.id,'restaurant')">
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
   .option {
     margin-bottom: 20px;
     .title {
      font-size: 20px;
      height: 30px;
      line-height: 30px;
      width: 100px;
      text-align: center;
      border-bottom: 3px solid #3498db;
      margin-bottom: 20px;
      cursor: default;
      user-select: none;
     }
     .option_content {
      display: grid;
      grid-template-columns: repeat(auto-fill,230px);
      grid-gap: 15px;
      .item {
       width: 230px;
       background-color: rgba(247,247,247,1);
       border-radius: 5px;
       cursor:default;
      }
     }
    }
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