<script>
 import { Plus } from '@element-plus/icons-vue'
export default{
  data() {
   return {
     GoodsForm:{
       area:'',
       name:'',
       address:'',
       link:'',
       number:''
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
      url:'/food/add',
      data:{
       name:this.GoodsForm.name,
       image:this.dialogImageUrl,
       area:this.GoodsForm.area,
       address:this.GoodsForm.address,
       dialogImageUrl:this.dialogImageUrl,
       link:this.GoodsForm.link,
       number:this.GoodsForm.number
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
         message: '美食添加失败',
         type: 'errer',
         grouping:true
       })
     }
     this.resetForm()
     this.dialogImageUrl = ''
     window.sessionStorage.setItem('comName4','Index')
     window.sessionStorage.setItem('cssPath4',0)
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
     <span>美食：</span>
     <el-input type="text" v-model="GoodsForm.name" placeholder="输入美食名称" clearable >
     </el-input>
    </el-form-item>
    <el-form-item prop="link">
    <span>美食链接：</span>
    <el-input type="text" v-model="GoodsForm.level" placeholder="输入美食链接" clearable >
    </el-input>
    </el-form-item>
    <el-form-item prop="address">
   <span>店铺名：</span>
   <el-input type="text" v-model="GoodsForm.address"  placeholder="输入店铺名" clearable >
   </el-input>
    </el-form-item>
    <el-form-item prop="area">
      <span>店铺链接：</span>
      <el-input type="text" v-model="GoodsForm.area"  placeholder="输入店铺链接" clearable >
      </el-input>
       </el-form-item>
       <el-form-item prop="number">
        <span>推荐量：</span>
        <el-input type="text" v-model="GoodsForm.number"  placeholder="输入推荐量" clearable >
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
    width: 80px;
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