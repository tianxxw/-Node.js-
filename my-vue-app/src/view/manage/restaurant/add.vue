<script>
 import { Plus } from '@element-plus/icons-vue'
export default{
  data() {
   return {
     GoodsForm:{
       commodity_name:'',
       name:'',
       address:'',
       price:'',
       comment:'',
       link:''
     },
     GoodsFormRules: {

     },
     head:{
       authorization:''
     },
     dialogVisible:false,
     dialogImageUrl:'',
   }
  },
  components:{
    Plus
  },
  created() {

  },
  methods:{
   handlePictureCardPreview(){

   },
   handleAvatarSuccess(res) {
     this.dialogImageUrl = res.data.fileUrl
   },
   handleRemove() {

   },
   resetForm() {
     this.$refs.GoodsFormRef.resetFields()
   },
   async addInfo() {
     const arr = await this.$http({
      method:'post',
      url:'/restaurant/add',
      data:{
       name:this.GoodsForm.name,
       dialogImageUrl:this.dialogImageUrl,
       link:this.GoodsForm.link,
       address:this.GoodsForm.address,
       price:this.GoodsForm.price,
       comment:this.GoodsForm.comment
      },
     })
     if(arr.status == 200) {
       this.dialogVisible1 = false
       ElMessage({
         message: arr.data.message,
         type: 'success',
         grouping:true
       })
     }else {
       ElMessage({
         message: '餐厅添加失败',
         type: 'errer',
         grouping:true
       })
     }
     this.resetForm()
     this.dialogImageUrl = ''
     window.sessionStorage.setItem('comName3','Index')
     window.sessionStorage.setItem('cssPath3',0)
     setTimeout(()=>{
       window.location.reload()
     },1000)
   }
  }
}
</script>
<template>
 <div>
   <el-form ref="GoodsFormRef" :model="GoodsForm" :rules="GoodsFormRules" label-width="0px">
    <el-form-item prop="name">
     <span>名字：</span>
     <el-input type="text" v-model="GoodsForm.name" placeholder="输入名称" clearable >
     </el-input>
    </el-form-item>
    <el-form-item prop="address">
    <span>地区：</span>
    <el-input type="text" v-model="GoodsForm.address" placeholder="输入评价" clearable >
    </el-input>
    </el-form-item>
    <el-form-item prop="comment">
     <span>评论数：</span>
     <el-input type="text" v-model="GoodsForm.comment" placeholder="输入评分" clearable >
     </el-input>
     </el-form-item>
     <el-form-item prop="price">
      <span>价格：</span>
      <el-input type="text" v-model="GoodsForm.price" placeholder="输入链接" clearable >
      </el-input>
      </el-form-item>
      <el-form-item prop="link">
        <span>链接：</span>
        <el-input type="text" v-model="GoodsForm.link" placeholder="输入链接" clearable >
        </el-input>
        </el-form-item>
   </el-form>
   <span class="img">商品图片</span>
   <el-upload
     action="http://119.29.141.196:9000/img/upload"
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
   <el-dialog v-model="dialogVisible">
     <img w-full :src="dialogImageUrl" alt="Preview Image">
   </el-dialog>
   <div>
     <span class="dialog-footer">
       <el-button @click="resetForm">重置</el-button>
       <el-button type="primary" @click="addInfo" >确定</el-button
       >
     </span>
   </div>
 </div>
</template>
<style scoped lang="less">
.el-form {
 margin-top: 20px;
 display: grid;
 grid-template-columns: 40% 40%;
 justify-content: left;
 grid-template-rows: repeat(4,50px);
 .el-form-item {
  height: 40px;
   width: 400px;
   display: grid;
   span {
    display: block;
    width: 60px;
   }
   .el-input {
    width: 320px;
   }
 }
}
.img {
 display: block;
 margin-bottom: 10px;
}
.el-upload__tip {
 margin-bottom: 10px;
}
</style>