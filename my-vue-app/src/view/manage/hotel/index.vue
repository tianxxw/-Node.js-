<script>
 import { Delete,Edit,Search,Plus } from '@element-plus/icons-vue'
 export default{
   data() {
    return {
    orders:'',
    pageSize:7,
    small:false,
    disabled:false,
    background:true,
    currentPage:1,
    total:'',
    details:'',
    dialogVisible:false,
    dialogVisible1:false,
    dialogVisible3:false,
    details:'',
    index:'',
    removeData:'',
    GoodsForm:{
          name:'',
          link:'',
          score:'',
          assess:''
       },
    dialogImageUrl:'',
    GoodsFormRules: {},
    }
   },
   created() {
    this.getOrder()
   },
   mounted(){
    let contain = this.$refs.body
      let viewHeight = document.documentElement.clientHeight
      console.log(viewHeight-220);
      let height = parseInt((viewHeight - 180)/75)
      this.pageSize = height
      window.addEventListener('resize',this.resize)
   },
   components:{
      Delete,
      Edit,
      Search,
      Plus
   },
   methods:{
    async resize() {
      let contain = this.$refs.body
      let viewHeight = document.documentElement.clientHeight
      console.log(viewHeight-220);
      let height = parseInt((viewHeight - 180)/75)
      this.pageSize = height
    },
    async getOrder() {
      const arr = await this.$http({
        method:'get',
        url:'/hotel/ma_all',
      })
      console.log(arr);
      this.orders = arr.data.data
      this.total = arr.data.data.length
      ElMessage({
        message: '数据获取成功',
        type: 'success',
        grouping:true,
        duration:3000
      })
      },
      viewDetails (row,column,event) {
        console.log(row); 
        this.details = row
        this.dialogVisible = true
      },
      updataButton(index) {
       this.dialogVisible1 = true
       this.index = index
     },
     deleteButton(index) {
       this.dialogVisible3 = true
       this.index = index
       let list = this.orders
       console.log(list);
       let arr = [];
       list.map((item)=>{
        console.log(item);
        if(item.id == index) {
          arr = [item]
        }
       })
       this.removeData = arr
     },
     async updateInfo() {
       const arr = await this.$http({
        method:'post',
        url:'/hotel/update',
        data:{
          name:this.GoodsForm.name,
          link:this.GoodsForm.link,
          score:this.GoodsForm.score,
          assess:this.GoodsForm.assess,
          id:this.index
        },
       })
       await this.getOrder()
       console.log(arr);
       if(arr.status == 200) {
         this.dialogVisible1 = false
         ElMessage({
           message: arr.data.message,
           type: 'success',
           grouping:true
         })
       }else {
         ElMessage({
           message: '酒店修改失败',
           type: 'errer',
           grouping:true
         })
       }
     },
     async deleteInfo() {
      const data = await this.$http({
       method:'post',
       url:'/hotel/delete',
       data:{
         id:this.index
       }
      })
      await this.getOrder()
      console.log(data);
      if(data.status == 200) {
         this.dialogVisible3 = false
         ElMessage({
           message: data.data.message,
           type: 'success',
           grouping:true
         })
       }else {
         ElMessage({
           message: '酒店删除失败',
           type: 'errer',
           grouping:true
         })
       }
     },
   }
 }
 </script>
<template>
  <div ref="body">
    <el-table :data="orders.slice((currentPage-1)*pageSize,currentPage*pageSize)" border @row-click="viewDetails" >
      <el-table-column prop="id" label="id" width="80" />
      <el-table-column prop="name" label="店名" width="200" />
      <el-table-column prop="image" label="图片" width="80">
       <template #default="scope">
        <div style="height:50px;margin:0px auto;">
         <img :src="scope.row.image" min-width="50" height="50" style="display:block;margin:0px auto;">
        </div>
       </template>
      </el-table-column>
      <el-table-column prop="link" label="链接">
       <template #default="link">
        <div>
         <a class="link" target="_blank" :href="link.row.link">{{link.row.link}}</a>
        </div>
       </template>
      </el-table-column>
      <el-table-column prop="assess" label="评价" width="90" />
      <el-table-column prop="score" label="评分" width="70" />
      <el-table-column prop="id" label="操作" width="101" >
       <template #default="button">
        <el-row>
         <el-button icon="" type="primary" @click.stop="updataButton(button.row.id)" circle>
          <el-icon><Edit /></el-icon>
         </el-button>
         <el-button icon="" type="danger" @click.stop="deleteButton(button.row.id)" circle>
           <el-icon><Delete /></el-icon>
         </el-button>
        </el-row>
       </template>
      </el-table-column>
     </el-table>
     <el-pagination 
      background 
      layout="total, prev, pager, next, jumper" 
      :total="total"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :small="small"
      :disabled="disabled"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      />
      <el-dialog
      v-model="dialogVisible"
      title="订单详情"
      width="1000px"
      center="true"
      align-center="true"
      :before-close="handleClose"
    >
      <div class="dialog">
        <div class="left">
          <div>订单号：{{details.order_number}}</div>
          <div>商品数量：{{details.order_num}}件</div>
          <div>订单金额：{{details.price}}元</div>
          <div>收货地址：{{details.position}}</div>
          <div>收货人：{{details.username}}</div>
          <div>电话：{{details.tel_number}}</div>
          <div>邮编地址：{{details.postal_code}}</div>
          <div>下单时间：{{details.create_time}}</div>
          <div>订单状态：{{details.state}}</div>
        </div>
        <el-scrollbar height="270px" class="right">
          <div>商品列表</div>
          <div v-for="item in details.good_id" class="right_content">
            <div class="demo-image__preview">
              <el-image
              style="width: 110px; height: 110px; margin:5px;border-radius: 5px;"
              :src="item.commodity_imgurl"
              :preview-src-list="[item.commodity_imgurl]"
              :initial-index="0"
              fit="cover"
              />
            </div>
            <div class="wenzi">
              <div class="sp_name" :title="item.commodity_name" >商品名称：{{item.commodity_name}}</div>
              <div>商品单价：{{item.commodity_price}}</div>
              <div>商品数量：{{item.number}}</div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <template #footer>
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogVisible1" title="景点修改" width="60%" draggable center="true" align-center="true" @close="closeDialog">
     <el-form ref="GoodsFormRef" :model="GoodsForm" :rules="GoodsFormRules" label-width="0px">
      <el-form-item prop="name">
         <span>地点名称</span>
         <el-input type="text" v-model="GoodsForm.name"  placeholder="输入新的名称" clearable >
         </el-input>
       </el-form-item>
       <el-form-item prop="assess">
        <span>评价</span>
        <el-input type="text" v-model="GoodsForm.assess"  placeholder="输入新的评价" clearable >
        </el-input>
      </el-form-item>      
      <el-form-item prop="score">
       <span>评分</span>
       <el-input type="text" v-model="GoodsForm.score"  placeholder="输入新的评分" clearable >
       </el-input>
     </el-form-item>
     <el-form-item prop="link">
      <span>链接</span>
      <el-input type="text" v-model="GoodsForm.link"  placeholder="输入新的链接" clearable >
      </el-input>
    </el-form-item>
     </el-form>
     <span class="img">景点图片</span>
     <el-upload
       action="http://127.0.0.1:3020/img/upload"
       list-type="picture-card"
       :on-preview="handlePictureCardPreview"
       :on-success="handleAvatarSuccess"
       :on-remmove="handleRemove"
       :headers="head"
       multiple
       limit="1"
       >
       <el-icon><Plus /></el-icon>
       <template #tip>
         <div class="el-upload__tip">
           jpg/png files with a size less than 500kb, and only one can be added
         </div>
       </template>
     </el-upload>
     <el-dialog v-model="dialogVisible2">
       <img w-full :src="dialogImageUrl" alt="Preview Image">
     </el-dialog>
     <template #footer>
       <span class="dialog-footer">
         <el-button @click="resetForm">重置</el-button>
         <el-button type="primary" @click="updateInfo" >确定</el-button
         >
       </span>
     </template>
   </el-dialog>
   <el-dialog
     v-model="dialogVisible3"
     center="true"
     align-center="true"
     title="提示"
     width="30%"
     @close="closeDialog2"
   > 
     <div class="delete">店名序号：{{removeData[0].id}}</div>
     <div class="delete">店名：{{removeData[0].name}}</div>
     <div>
       <img :src="removeData[0].image" width="200" style="border-radius: 5px;">
     </div>
     <div style="color: red;font-size:18px;text-align:center;width:100%;margin-top:10px;">确认删除此酒店吗</div>
     <template #footer>
       <span class="dialog-footer">
         <el-button type="success" @click="dialogVisible3 = false">离开</el-button>
         <el-button type="danger" @click="deleteInfo">确认</el-button>
       </span>
     </template>
   </el-dialog>
  </div>
</template>
<style scoped lang="less">
  .el-table {
    margin: 10px auto;
   }
  .el-pagination {
   position: absolute;
   bottom: 30px;
  }
  .dialog {
    display: flex;
    .left {
      width: 500px;
      height: 270px;
      div {
        height: 30px;
        line-height: 30px;
      }
    }
    .right {
      flex: 1;
      height: 270px;
      .right_content {
        display: flex;
      }
    }
  }
  .demo-image__error .image-slot {
    font-size: 30px;
  }
  .demo-image__error .image-slot .el-icon {
    font-size: 30px;
  }
  .demo-image__error .el-image {
    width: 100%;
    height: 140px;
  }
  .wenzi {
    height: 30px;
    line-height: 30px;
    width: 320px;
    .sp_name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
  }
  .link {
   display: block;
   height: 50px;
   line-height: 50px;
   color: black;
  }
  .link:active {
   color: black;
  }
  .link:visited {
   color: black;
  }
</style>