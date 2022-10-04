<script>
 import { Delete,Edit,Search,Plus } from '@element-plus/icons-vue'
  export default{
    data() {
     return {
       allow:'',
       goods:'',
       pageSize:7,
       small:false,
       disabled:false,
       background:true,
       currentPage:1,
       total:'',
       dialogVisible1:false,
       dialogVisible2:false,
       dialogImageUrl:'',
       removeData:'',
       dialogVisible3:false,
       dialogVisible5:false,
       details:'',
       index:'',
       head:{
         authorization:''
       },
       commodity_name:'',
       commodity_price:'',
       GoodsForm:{
         name:'',
         link:'',
         address:'',
         price:'',
         comment:''
       },
       GoodsFormRules: {
         commodity_name: [
           { required: true, message: '输入新的景点名称', trigger: 'blur' },
           { min: 0, max: 30, message: '长度在 0 到 30 个字符', trigger: 'blur' }
         ],
         commodity_price: [
           { required: true, message: '输入新的景点价格', trigger: 'blur' },
           { min: 0, max: 10, message: '长度在 6 到 15 个数字', trigger: 'blur' }
         ],
       },
     }
    },
    components:{
      Delete,
      Edit,
      Search,
      Plus
    },

    created() {

    },
    mounted() {
     this.goGood()
     this.head.authorization = window.sessionStorage.getItem('token')
     let contain = this.$refs.body
      let viewHeight = document.documentElement.clientHeight
      console.log(viewHeight-220);
      let height = parseInt((viewHeight - 180)/75)
      this.pageSize = height
      window.addEventListener('resize',this.resize)
    },
    methods:{
      async resize() {
      let contain = this.$refs.body
      let viewHeight = document.documentElement.clientHeight
      console.log(viewHeight-220);
      let height = parseInt((viewHeight - 180)/75)
      this.pageSize = height
    },
     async goGood(){
      const arr = await this.$http({
       method:'get',
       url:'/restaurant/ma_all',
      })
      console.log(arr);
      this.goods = arr.data.data
      this.total = this.goods.length
      ElMessage({
         message: '数据获取成功',
         type: 'success',
         grouping:true,
         duration:3000
       })
     },
     updataButton(index) {
       this.dialogVisible1 = true
       this.index = index
     },
     deleteButton(index) {
       this.dialogVisible3 = true
       this.index = index
       let list = this.goods
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
        url:'/restaurant/update',
        data:{
          name:this.GoodsForm.name,
          link:this.GoodsForm.link,
          comment:this.GoodsForm.comment,
          image:this.dialogImageUrl,
          id:this.index,
          address:this.GoodsForm.address,
          price:this.GoodsForm.price,
        },
       })
       await this.goGood()
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
           message: '景点修改失败',
           type: 'errer',
           grouping:true
         })
       }
     },
     async deleteInfo() {
      const data = await this.$http({
       method:'post',
       url:'/restaurant/delete',
       data:{
         id:this.index
       }
      })
      await this.goGood()
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
           message: '景点删除失败',
           type: 'errer',
           grouping:true
         })
       }
     },
     handleSizeChange() {
 
     },
     handleCurrentChange() {
      
     },
     handleAvatarSuccess(res) {
       console.log(res);
       this.dialogImageUrl = res.data.fileUrl
       this.showPlus = false
       // this.dialogVisible1 = false
       // this.resetForm()
       console.log('success');
     },
     handlePictureCardPreview() {
 
     },
     handleRemove(uploadFile) {
       console.log(uploadFile);
       this.dialogVisible2 = true
     },
     resetForm() {
       this.$refs.GoodsFormRef.resetFields()
     },
     closeDialog() {
       this.resetForm()
       this.dialogImageUrl = ''
     },
     closeDialog2() {
 
     },
     handleClose() {
 
     },
     handleClose5() {
       this.dialogVisible5 = false
     },
     handleSizeChange() {
 
     },
     handleCurrentChange() {
       
     },
     viewDetails (row,column,event) {
        console.log(row); 
        this.details = row
        this.dialogVisible5 = true
      }
    }
  }
  </script>
 <template>
  <div>
   <el-table :data="goods.slice((currentPage-1)*pageSize,currentPage*pageSize)" border @row-click="viewDetails" >
    <el-table-column prop="id" label="Id" width="80" />
    <el-table-column prop="image" label="图片" width="80">
     <template #default="scope">
      <div style="height:50px;margin:0px auto;">
       <img :src="scope.row.image" min-width="50" height="50" style="display:block;margin:0px auto;">
      </div>
     </template>
    </el-table-column>
    <el-table-column prop="name" label="店名" width="200" />
    <el-table-column prop="address" label="地址" width="300" />
    <el-table-column prop="link" label="链接">
     <template #default="link">
      <div>
       <a target="_blank" class="link" :href="link.row.link">{{link.row.link}}</a>
      </div>
     </template>
    </el-table-column>
    <el-table-column prop="price" label="价格" width="100" />
    <el-table-column prop="comment" label="评论数" width="120" />
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
   <el-dialog v-model="dialogVisible1" title="景点修改" width="60%" draggable center="true" align-center="true" @close="closeDialog">
     <el-form ref="GoodsFormRef" :model="GoodsForm" :rules="GoodsFormRules" label-width="0px">
       <el-form-item prop="name">
         <span>地点名称</span>
         <el-input type="text" v-model="GoodsForm.name"  placeholder="输入新的地点名称" clearable >
         </el-input>
       </el-form-item>
       <el-form-item prop="price">
         <span>价格</span>
         <el-input type="text" v-model="GoodsForm.price"  placeholder="输入新的价格" clearable >
         </el-input>
       </el-form-item>
       <el-form-item prop="link">
        <span>价格</span>
        <el-input type="text" v-model="GoodsForm.link"  placeholder="输入新的链接" clearable >
        </el-input>
      </el-form-item>
       <el-form-item prop="address">
       <span>地址</span>
       <el-input type="text" v-model="GoodsForm.address"  placeholder="输入新的地址" clearable >
       </el-input>
       </el-form-item>
       <el-form-item prop="comment">
     <span>评论数</span>
     <el-input type="text" v-model="GoodsForm.comment"  placeholder="输入新的评论数" clearable >
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
     <div class="delete">餐厅序号：{{removeData[0].id}}</div>
     <div class="delete">名称：{{removeData[0].name}}</div>
     <div class="delete">地区：{{removeData[0].address}}</div>     
     <div class="delete">价格：{{removeData[0].price}}</div>
     <div class="delete">评论数：{{removeData[0].comment}}</div>
     <div>
       <img :src="removeData[0].image" width="200" style="border-radius: 5px;">
     </div>
     <div style="color: red;font-size:18px;text-align:center;width:100%;margin-top:10px;">确认删除此餐厅吗</div>
     <template #footer>
       <span class="dialog-footer">
         <el-button type="success" @click="dialogVisible3 = false">离开</el-button>
         <el-button type="danger" @click="deleteInfo">确认</el-button>
       </span>
     </template>
   </el-dialog>
   <el-dialog
   v-model="dialogVisible5"
   title="景点详情"
   width="900px"
   center="true"
   align-center="true"
   :before-close="handleClose5"
 >
   <div class="dialog">
     <div class="left">
       <div>Id：{{details.id}}</div>
       <div>名字：{{details.name}}</div>
       <div>地区：{{details.address}}</div>
       <div>{{details.address}}</div>
       <div>价格：{{details.price}}</div>
       <div>评论数：{{details.comment}}</div>
     </div>
     <el-scrollbar height="270px" class="right">
       <div class="right_content">
         <div class="demo-image__preview">
           <el-image
           style="width: 250px; height: 250px; margin:5px;border-radius: 5px;"
           :src="details.image"
           fit="cover"
           />
         </div>
       </div>
     </el-scrollbar>
   </div>
   <template #footer>
     <el-button type="primary" @click="dialogVisible5 = false">关闭</el-button>
   </template>
 </el-dialog>
   <el-pagination
   v-model:currentPage="currentPage"
   v-model:page-size="pageSize"
   :small="small"
   :disabled="disabled"
   :background="background"
   layout="total, prev, pager, next, jumper"
   :total="total"
   @size-change="handleSizeChange"
   @current-change="handleCurrentChange"
 />
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
 .el-dialog {
  .input {
   display: flex;
   justify-content: center;
   height: 40px;
   line-height: 40px;
   margin-top: 10px;
   span{
     width: 90px;
   }
   .el-input{
     height: 30px;
     margin-top: 5px;
   }
  }
  .input:nth-child(2) {
   margin-bottom: 10px;
  }
  .img {
   display: block;
   margin: 10px 0px;
  }
  .delete {
   margin-bottom: 10px;
  }
  .el-form {
   display: grid;
   grid-template-columns: 40% 40%;
   justify-content: space-around;
  }
 }
 .dialog {
  display: flex;
  .left {
    width: 500px;
    height: 245px;
    div {
      height: 38px;
      line-height: 38px;
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