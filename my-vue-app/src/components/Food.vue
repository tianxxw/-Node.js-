<script>
 import Index from '../view/manage/food/index.vue'
 import Search from '../view/manage/food/search.vue'
 import Add from '../view/manage/food/add.vue'
 export default{
   data() {
    return {
     comName4:'Index',
     cssPath4:0
    }
   },
   components:{
     Index,
     Search,
     Add
   },  
   created() {
    
   },
   mounted() {
    this.$nextTick(()=>{
      this.getSeesion()
      this.svaeCss(this.cssPath4)
    })
   },
   methods:{
     gotoCom(route,e) {
      console.log(e.currentTarget.id);
       this.comName4 = route
       window.sessionStorage.setItem('comName4',route)
       window.sessionStorage.setItem('cssPath4',e.currentTarget.id)
       this.svaeCss(e.currentTarget.id)
     },
     svaeCss(index) {
      const arr = this.$refs.select.children
       for(let i =0 ;i<arr.length;i++) {
        arr[i].className = ''
       }
       console.log(Number.parseInt(index));
       arr[Number.parseInt(index)].className = "sk"
     },
     getSeesion () {
      if(window.sessionStorage.getItem('comName4')) {
        this.comName4 = window.sessionStorage.getItem('comName4')
      }
      if(window.sessionStorage.getItem("cssPath4")) {
        this.cssPath4 = window.sessionStorage.getItem("cssPath4")
      }
     }
   }
 }
 </script>
<template>
 <div class="content">
   <div class="title" ref="select">
    <div @click="gotoCom('Index',$event)" class="sk" id="0">美食列表</div>
    <div @click="gotoCom('Add',$event)" id="1">添加美食</div>
   </div>
   <keep-alive>
    <component :is="comName4" style="margin: 0px 10px;"></component>
   </keep-alive>
 </div>
</template>
<style scoped lang="less">
 .content {
  background-color: white;
  height: 100%;
  width: 100%;
  border-radius: 2px;
  .title {
   display: flex;
   justify-content: left;
   z-index: 2;
   div {
    padding: 10px;
    cursor: default;
    user-select: none;
   }
  }
  .sk {
   background-color: rgba(64,158,255,1);
   box-shadow: 1px 1px gainsboro;
   color: white;
   transition: all 0.2s;
  }
 }
</style>