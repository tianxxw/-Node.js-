<script>
export default{
 data() {
  return {
   search_contain:'北京',
   option:'attractions',
   busy:true,
   more:true,
   bottom:'',
   viewHeight:'',
   flag:true,
   loading:false,
   type:'',
   list:'',
   images:[
     'http://127.0.0.1:3020/1.jpeg',
     'http://127.0.0.1:3020/2.jpeg',
     'http://127.0.0.1:3020/3.jpeg',
     'http://127.0.0.1:3020/4.jpeg',
     'http://127.0.0.1:3020/5.jpeg',
    ],
   page:2,
   info:''
  }
 },
 components:{
 
 },
 created() {
  if(this.$route.query.search_contain && this.$route.query.search_contain) {
   this.search_contain = this.$route.query.search_contain
   this.option = this.$route.query.option
  }
 },
 mounted() {
   window.addEventListener("scroll",this.scroll)
   if(window.sessionStorage.getItem('info')) {
     this.info = JSON.parse(window.sessionStorage.getItem('info'))
   }
 },
 watch:{
  
 },
 computed:{
   view() {
    if(this.bottom>=0 && this.top < this.viewHeight) {
     console.log('会了');
    }
   }
 },
 methods:{
  async scroll() {
    let contain = this.$refs.contain
    let viewHeight = document.documentElement.clientHeight
    let rect = contain.getBoundingClientRect()
    this.top = rect.top
    this.bottom = rect.bottom
    this.viewHeight = viewHeight
    if(Number.parseInt(this.bottom) - viewHeight <= 130 && this.flag && this.more) {
     console.log(1);
     this.flag = false
     let arr = ''
     if(this.option == 'attractions' || this.option == 'notes') {
      arr = await this.$http({
       method:'post',
       url:'/'+ this.option +'/search',
       data:{
         page:this.page * 10,
         title:this.search_contain
       }
      })
     }else {
      arr = await this.$http({
       method:'post',
       url:'/'+ this.option +'/search',
       data:{
         page:this.page * 10,
         name:this.search_contain
       }
      })
     }
     this.loading = true
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
  async SearchContent() {
    let arr = ''
    this.list = ''
    this.page = 2
    if(this.option == 'attractions' || this.option == 'notes') {
     arr = await this.$http({
      method:'post',
      url:'/'+ this.option +'/search',
      data:{
        page:this.page * 10,
        title:this.search_contain
      }
     })
    }else {
     arr = await this.$http({
      method:'post',
      url:'/'+ this.option +'/search',
      data:{
        page:this.page * 10,
        name:this.search_contain
      }
     })
    }
    this.page = 4,
    console.log(arr);
    this.list = arr.data.data
    this.type = this.option
    ElMessage({
        message: '内容搜索成功',
        type: 'success',
        grouping:true,
        duration:1000
      })
  },
  load() {
    
  },
  goDetails(id,type) {
     window.sessionStorage.setItem("comName",'details')
     this.$router.push({path:'/details',query:{id:id,type:type}})
     this.$emit('comNameChange','details')
  },
  login () {
      if(this.info == '') {
         this.$router.push('/manage')
      }else {
         if(this.info.type == 0) {
            if(!this.timer){
               console.log(1);
                  ElMessage({
                    message: '你没有此权限',
                    type: 'error',
                    grouping:true,
                    duration:3000
                  })
               this.timer = setTimeout(()=>{
                  this.timer = null
               },3000)
            }
         }else {
            this.$router.push('/manage')
         }
      }
    }
 }
}
</script>
<template>
  <ul v-infinite-scroll="load"  class="infinite-list" style="overflow: auto" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
   <header>
    <div class="title">
       <div class="left_title">
          北京旅游服务系统
       </div>
       <div class="right_title">
        <div class="login" v-if="info ==''" >请<span @click="this.$router.push('/login')" >登录</span>或<span @click="this.$router.push('/register')" >免费注册</span></div>
        <div class="avatar" v-else @click="login">
          <el-avatar :size="56" :src="info.avatar" />
        </div>
        <div @click="this.$router.push('/manage')" class="ht" >
           <img src="../assets/image/into.png" height="30" >
           <span class="icon_ma">后台管理</span>
        </div>
     </div>
    </div>
    <nav>
       <ul>
          <li @click="this.$router.push('/home')">首页</li>
          <li @click="this.$router.push('/attractions')">景点</li>
          <li @click="this.$router.push('/hotel')">酒店</li>
          <li @click="this.$router.push('/restaurant')">餐厅</li>
          <li @click="this.$router.push('/food')">美食</li>
          <li @click="this.$router.push('/notes')">攻略</li>
       </ul>
    </nav>
  </header>
  <div id="contain" ref="contain">
   <div class="content">
    <div class="title"><span @click="this.$router.push('/home')" class="home" >首页</span> > <span>搜索</span></div>
    <el-radio-group v-model="option" fill="#3498db" >
     <el-radio-button label="attractions">景点</el-radio-button>
     <el-radio-button label="hotel">酒店</el-radio-button>
     <el-radio-button label="restaurant">餐厅</el-radio-button>
     <el-radio-button label="food">美食</el-radio-button>
     <el-radio-button label="notes">攻略</el-radio-button>
   </el-radio-group>
   <div class="search_content">
    <el-input type="text" v-model="search_contain"  placeholder="请输入想要搜索的内容" @keyup.enter.native="SearchContent" />
    <el-button icon="" color="#3498db" @click="SearchContent">
      开始搜索
    </el-button>
   </div>
   <!-- ------------------------------------------------------------- -->
   </div>
   <div v-if="type == 'attractions'">
    <li v-for="item in list" :key="item" class="infinite-list-item option" @click="goDetails(item.id,'attractions')">
      <a-image
       height="180px"
       :src="item.image"
       style="margin:10px;display:block;"
       :title="item.area"
       fit="fill"
      />
      <div class="option_content">
        <div class="right_wenzi">地点：{{item.title == undefined ? '暂无数据' : item.title}}</div>
        <div class="right_wenzi">热度：{{item.product == undefined ? '暂无数据' : item.product}}</div>
        <div class="right_wenzi">区域：{{item.area == undefined ? '暂无数据' : item.area}}</div>
        <div class="right_wenzi">{{item.address == undefined ? '暂无数据' : item.address}}</div>
        <div class="right_wenzi">内容：{{item.information == undefined ? '暂无数据' : item.information}}</div>
        <div class="right_wenzi">价格：{{item.price == undefined ? '暂无数据' : item.price}}</div>
        <div class="right_wenzi">评论数：{{item.amount == undefined ? '暂无数据' : item.amount + '条'}}</div>
      </div>
   </li>
   </div>
   <div v-else-if="type == 'hotel'">
    <li v-for="item in list" :key="item" class="infinite-list-item option" @click="goDetails(item.id,'hotel')">
      <a-image
       height="180px"
       :src="item.image"
       style="margin:10px;display:block;"
       :title="item.name"
       fit="fill"
      />
      <div class="option_content">
       <div class="right_wenzi">地址：{{item.name == undefined ? '暂无数据' : item.name}}</div>
       <div class="right_wenzi">评价：{{item.assess == undefined ? '暂无数据' : item.assess}}</div>
       <div class="right_wenzi">评分：{{item.score == undefined ? '暂无数据' : item.score}}</div>
       <div class="right_wenzi"></div>
       <div class="right_wenzi"></div>
       <div class="right_wenzi"></div>
       <div class="right_wenzi"></div>
      </div>
   </li>
   </div>
   <div v-else-if="type == 'restaurant'">
    <li v-for="item in list" :key="item" class="infinite-list-item option" @click="goDetails(item.id,'restaurant')">
      <a-image
       height="180px"
       :src="item.image"
       style="margin:10px;display:block;"
       :title="item.name"
       fit="fill"
      />
      <div class="option_content">
       <div class="right_wenzi">店名：{{item.name== undefined ? '暂无数据' : item.name}}</div>
       <div class="right_wenzi">地址：{{item.address == undefined ? '暂无数据' : item.address}}</div>
       <div class="right_wenzi">价格：{{item.price == undefined ? '暂无数据' : item.price}}</div>
       <div class="right_wenzi">评分：{{item.score == undefined ? '暂无数据' : item.score}}</div>
       <div class="right_wenzi">评论数：{{item.comment == undefined ? '暂无数据' : item.comment}}</div>
       <div class="right_wenzi"></div>
       <div class="right_wenzi"></div>
      </div>
   </li>
   </div>
   <div v-else-if="type == 'food'">
    <li v-for="item in list" :key="item" class="infinite-list-item option" @click="goDetails(item.id,'food')">
      <a-image
       height="180px"
       :src="item.image"
       style="margin:10px;display:block;"
       :title="item.address"
       fit="fill"
      />
      <div class="option_content">
       <div class="right_wenzi">菜名：{{item.name== undefined ? '暂无数据' : item.name}}</div>
       <div class="right_wenzi">地址：{{item.address == undefined ? '暂无数据' : item.address}}</div>
       <div class="right_wenzi">{{item.number == undefined ? '暂无数据' : item.number}}</div>
       <div class="right_wenzi"></div>
       <div class="right_wenzi"></div>
       <div class="right_wenzi"></div>
       <div class="right_wenzi"></div>
      </div>
   </li>
   </div>
   <div v-else-if="type == 'notes'">
    <li v-for="item in list" :key="item" class="infinite-list-item option" @click="goDetails(item.id,'notes')">
      <a-image
       height="180px"
       :src="item.imageo"
       style="margin:10px;display:block;"
       :title="item.time"
       fit="fill"
      />
      <div class="option_content">
       <div class="right_wenzi">题目：{{item.title== undefined ? '暂无数据' : item.title}}</div>
       <div class="right_wenzi">行程：{{item.address == undefined ? '暂无数据' : item.address}}</div>
       <div class="right_wenzi">花费时间：{{item.days == undefined ? '暂无数据' : item.days}}</div>
       <div class="right_wenzi">记录：{{item.quantity == undefined ? '暂无数据' : item.quantity}}</div>
       <div class="right_wenzi">评论数：{{item.comment == undefined ? '暂无数据' : item.comment}}</div>
       <div class="right_wenzi">喜欢：{{item.like == undefined ? '暂无数据' : item.like}}</div>
       <div class="right_wenzi">观看：{{item.look == undefined ? '暂无数据' : item.look}}</div>
      </div>
   </li>
   </div>
  <div class="None" ref="None">
    No more
  </div>
  </div>
   <footer>
    <div>北京旅游服务系统</div>
  </footer>
 </ul>
</template>
<style scoped lang="less">
 .zaozi {
  position: absolute;
  height: 100vh;
  width: 100%;
  z-index: -1;
  background-color: rgba(0,0,0,0);
 }
 .content {
  width: 80%;
  margin: 0 auto;
  position: relative;
  .title {
   font-size: 16px;
   height: 26px;
   line-height: 26px;
   border-bottom: 1px solid black;
   cursor: default;
 }
 .home {
  cursor: pointer;
}
.home:hover {
  color: #3498db;
}
 .el-input {
   width: 30%;
   margin-bottom: 10px;
 }
 .el-button {
   display: block;
   color: white;
 }
 .el-radio-group {
   width: 60%;
   margin: 10px 0px;
   display: block;
 }
}
.right_content {
 flex: 1;
 .arco-carousel {
   margin: 0 auto;
 }
 }
 .search_content {
  display: flex;
 }
 .infinite-list {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  margin: 0;
  list-style: none;
  min-height: 100vh;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 220px;
  width: 80%;
  border-radius: 5px;
  background: var(--el-color-primary-light-9);
  margin: 10px auto;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

.option {
 display: flex;
 justify-content: left;
 margin-bottom: 20px;
 .title {
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  width: 100px;
  text-align: center;
  border-bottom: 3px solid s#3498db;
  margin-bottom: 20px;
  cursor: default;
  user-select: none;
 }
 .option_content {
   flex: 1;
  .right_wenzi {
   height: 26px;
   line-height: 26px;
   white-space:nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   color: black;
   cursor:default;
  }
 }
}
.body {
 display: flex;
 flex-direction: column;
 min-height: 100vh;
 overflow: hidden;
}
header {
 height: 120px;
 .title{
    display: flex;
    justify-content: center;
    height: 80px;
    .left_title {
       width: 40%;
       line-height: 80px;
       font-size: 32px;
       cursor: default;
       user-select: none;   
    }
    .right_title {
       width: 40%;
       font-size: 16px;
       display: flex;
       justify-content: right;
       line-height: 32px;
       .login {
          margin-right: 40px;
       }
    }
 }
 nav {
    height: 40px;
    background-color: #3498db;
    ul {
       display: flex;
       width: 80%;
       margin: 0 auto;
       
       li {
          list-style-type: none;
          margin-right: 20px;
          font-size: 20px;
          height: 40px;
          line-height: 40px;
          color: white;
          cursor: pointer;
       }
       li:hover {
        color: #8e44ad;
        transition: all .2s;
     }
    }
 }
}
#contain {
 margin-top: 20px;
 flex: 1;
}
footer {
 height: 120px;
 line-height: 120px;
 background-color: #3498db;
 text-align: center;
 font-size: 24px;
 color: white;
}
.None {
 text-align: center;
 height: 200px;
 line-height: 200px;
 display: none;
 cursor: default;
 user-select: none
}
</style>