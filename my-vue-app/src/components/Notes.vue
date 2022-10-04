<script>
 import Index from '../view/manage/notes/index.vue'
 import Add from '../view/manage/notes/add.vue'
 export default{
   data() {
    return {
     comName:'Index',
     cssPath:0
    }
   },
   components:{
     Index,
     Add
   },  
   created() {
    
   },
   mounted() {
    this.$nextTick(()=>{
      this.getSeesion()
      this.svaeCss(this.cssPath)
    })
   },
   methods:{
     gotoCom(route,e) {
      console.log(e.currentTarget.id);
       this.comName = route
       window.sessionStorage.setItem('GoodPath',route)
       window.sessionStorage.setItem('cssPath',e.currentTarget.id)
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
      if(window.sessionStorage.getItem('GoodPath')) {
        this.comName = window.sessionStorage.getItem('GoodPath')
      }
      if(window.sessionStorage.getItem("cssPath")) {
        this.cssPath = window.sessionStorage.getItem("cssPath")
      }
     }
   }
 }
 </script>
<template>
 <div class="content">
   <div class="title" ref="select">
    <div @click="gotoCom('Index',$event)" class="sk" id="0">在售商品</div>
    <div @click="gotoCom('Add',$event)" id="1">添加商品</div>
   </div>
   <keep-alive>
    <component :is="comName" style="margin: 0px 10px;"></component>
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