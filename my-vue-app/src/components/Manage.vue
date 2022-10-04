<script>
  import { House,User,Document,Message,Wallet,Service,Orange,Setting } from '@element-plus/icons-vue'
  export default {
    data() {
      return {
        activePath:'1',
        info:[],
        size:51,
        a:false,
        iconSize1:30,
        iconSize2:32,
        iconSize3:30,
      }
    },
    components:{
      House,
      User,
      Document,
      Message,
      Wallet,
      Service,
      Orange,
      Setting
    },
    created() {
      console.log(this.$route.params.info);
      this.info = JSON.parse(window.sessionStorage.getItem('info'))
    },
    mounted() {
      if(window.sessionStorage.getItem('activePath') == null) {
  
      }else {
        this.activePath = window.sessionStorage.getItem('activePath')
      }
      this.circleUrl = window.sessionStorage.getItem('')
    },
    methods:{
      gotoroute(e,activePath){
        this.$router.push(e).catch(err => err)
        if(activePath) {
          window.sessionStorage.setItem('activePath',activePath)
        }
        this.activePath = activePath
      },
      showAvatar() {
        console.log(1234);
      },
      closeAvatar() {
        console.log('kkkkkkkkkk');
      }
    }
  }
  </script>
  
  <template>
    <div class="common-layout">
      <el-container>
        <el-header>
          <div class="left">北京旅游服务系统后台管理</div>
          <div class="center"></div>
          <div class="avatar">
            <el-avatar :size="size" :src="info.avatar" class="avatar_img" @mouseenter="showAvatar" @mouseleave="closeAvatar" @click="gotoroute('/ma_personal','7')" />
            <div class="icon" @click="gotoroute('/home','1')">
              <el-icon :size="iconSize1" color="white" style="margin-top: 9px;"><Service /></el-icon>
              <div class="text">前台</div>
            </div>
            <div class="icon"  @click="gotoroute('/ma_personal','7')" >
              <el-icon :size="iconSize3" color="white" style="margin-top: 9px;"><Orange /></el-icon>
              <div class="text">设置</div>
            </div>
          </div>
        </el-header>
        <el-container>
          <el-aside>
            <el-row class="tac">
              <el-col :span="12">
                <el-menu
                  :default-active="activePath"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                >
                  <el-menu-item index="1" @click="gotoroute('/ma_dashboard','1')">
                    <el-icon><House /></el-icon>
                    <span>首页</span>
                  </el-menu-item>
                  <el-menu-item index="2" @click="gotoroute('/ma_attractions','2')">
                    <el-icon><Wallet /></el-icon>
                    <span>景点管理</span>
                  </el-menu-item>
                  <el-menu-item index="3" @click="gotoroute('/ma_hotel','3')">
                    <el-icon><Document /></el-icon>
                    <span>酒店管理</span>
                  </el-menu-item>
                  <el-menu-item index="4" @click="gotoroute('/ma_restaurant','4')">
                    <el-icon><Service /></el-icon>
                    <span>餐厅管理</span>
                  </el-menu-item>
                  <el-menu-item index="5" @click="gotoroute('/ma_food','5')">
                    <el-icon><Message /></el-icon>
                    <span>美食管理</span>
                  </el-menu-item>
                  <el-menu-item index="6" @click="gotoroute('/ma_notes','6')" icon="">
                    <el-icon><Orange /></el-icon>
                    <span>攻略管理</span>
                  </el-menu-item>
                  <el-menu-item index="7" @click="gotoroute('/ma_personal','7')" icon="">
                    <el-icon><Orange /></el-icon>
                    <span>个人中心</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
            </el-row> 
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <style scoped lang="less">
  .common-layout {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .read-the-docs {
    color: #888;
  }
  .el-container {
    height: 100vh;
    user-select: none;
    .el-header {
      height: 80px;
      display: flex;
      justify-content: space-around;
      line-height: 80px;
      border-bottom: 1px solid grey;
      background-image: linear-gradient(120deg,#3498db,#8e44ad);
      .left {
        width: 40%;
        text-align: left;
        font-size: 32px;
        color: white;
        line-height: 80px;
      }
      .center {
        flex: 1;
        text-align: center;
      }
      .avatar {
        display: flex;
        justify-content: right;
        align-content: center;
        margin-top: 10px;
        .icon {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-content: center;
          width: 60px;
          height: 39px;
          line-height: 39px;
          font-size: 20px;
          .text {
            display: block;
            height: 20px;
            font-size: 16px;
            line-height: 16px;
            text-align: center;
            color: white;
          }
          .el-icon {
            margin-top: 5px;
            margin-left: 14px;
          }
        }
        .avatar_img {
          cursor: pointer;
          margin-top: 4px;
          margin-right: 15px;
          text-align: right;
          line-height: 51px;
          height: 51px;
          display: block;
        }
      }
    }
  }
  .el-aside {
    width: 200px;
    border-right: 1px solid gray;
    text-align: center;
    .el-col{
      margin: 0;
      display: block;
      text-align: center;
      max-width: 100%;
      flex: 1;
    }
  }
  .el-main {
    background-color: rgb(227, 226, 228);
    height: calc(100vh - 80px);
  }
  </style>
  