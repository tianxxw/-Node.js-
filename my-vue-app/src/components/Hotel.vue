<script>
 import Index from '../view/manage/hotel/index.vue'
 import Search from '../view/manage/hotel/search.vue'
 import Add from '../view/manage/hotel/add.vue'
 export default{
   data() {
    return {
     comName2:'Index',
     cssPath2:0
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
      this.svaeCss(this.cssPath2)
    })
   },
   methods:{
     gotoCom(route,e) {
      console.log(e.currentTarget.id);
       this.comName2 = route
       window.sessionStorage.setItem('comName2',route)
       window.sessionStorage.setItem('cssPath2',e.currentTarget.id)
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
      if(window.sessionStorage.getItem('comName2')) {
        this.comName2 = window.sessionStorage.getItem('comName2')
      }
      if(window.sessionStorage.getItem("cssPath2")) {
        this.cssPath2 = window.sessionStorage.getItem("cssPath2")
      }
     }
   }
 }
 </script>
<template>
 <div class="content">
   <div class="title" ref="select">
    <div @click="gotoCom('Index',$event)" class="sk" id="0">酒店列表</div>
    <div @click="gotoCom('Add',$event)" id="1">添加酒店</div>
   </div>
   <keep-alive>
    <component :is="comName2" style="margin: 0px 10px;"></component>
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