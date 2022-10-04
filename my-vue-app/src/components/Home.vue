<script>
 export default {
  data() {
   return {
     comName:'homee',
     info:'',
     timer:''
   }
  },
  components:{

  },
  created() {
   if(window.sessionStorage.getItem('comName')) {
      this.comName = window.sessionStorage.getItem('comName')
   }
  },
  mounted() {
   if(window.sessionStorage.getItem('info')) {
     this.info = JSON.parse(window.sessionStorage.getItem('info'))
   }
  },
  methods:{
    getComName(val) {
      this.comName = val
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
  },
  computed:{

  }
 }
</script>
<template>
   <div class="body">
      <header>
         <div class="title">
            <div class="left_title">
              北京旅游服务系统
            </div>
            <div class="right_title">
               <div class="login" v-if="info ==''" >请<span @click="this.$router.push('/login')" >登录</span>或<span @click="this.$router.push('/login')" >免费注册</span></div>
               <div class="avatar" v-else >
                 <el-avatar :size="56" :src="info.avatar" @click="this.$router.push('/setting')" />
               </div>
               <div @click="login" class="ht" >
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
       <div id="contain">
         <router-view :is="comName" @comNameChange="getComName" ></router-view>
       </div>
       <footer>
         <div>北京旅游服务系统</div>
       </footer>
   </div>
</template>
<styel scoped lang="less">
   .body {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
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
            color: #8e44ad;
         }
         .right_title {
            width: 40%;
            font-size: 16px;
            display: flex;
            justify-content: right;
            line-height: 32px;
            .login,div{
               span {
                  color: #3498db;
                  cursor: pointer;
               }
            }
            .login {
               height: 70px;
               line-height: 70px;
            }
            .ht {
               cursor: pointer;
               width: 80px;
               img {
                  display: block;
                  margin: 15px auto 0;
               }
               .icon_ma {
                  display: block;
                  height: 30px;
                  line-height: 30px;
                  width: 80px;
                  text-align: center;
               }
            }
            .avatar {
               margin-right: 20px;
               width: 80px;
               position: relative;
               .el-avatar {
                  display: block;
                  margin: 12px auto;
               }

               
            }
         }
      }
      nav {
         height: 40px;
         background-image: linear-gradient(120deg,#3498db,#8e44ad);
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
      background-image: linear-gradient(120deg,#3498db,#8e44ad);
      text-align: center;
      font-size: 24px;
      color: white;
   }
</styel>