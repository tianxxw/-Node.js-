import { createRouter,createWebHashHistory } from 'vue-router'

const router = createRouter({
 history:createWebHashHistory(),
 routes:[
   {
      path:'/home',
      name:'Home',
      component:()=>import("./components/Home.vue"),
      children:[
        {path:'/home',name:'Home',component:()=>import("./view/home/home.vue")},
        {path:'/attractions',name:'Attractions',component:()=>import("./view/home/attractions.vue")},
        {path:'/food',name:'Food',component:()=>import("./view/home/food.vue")},
        {path:'/hotel',name:'Hotel',component:()=>import("./view/home/hotel.vue")},
        {path:'/notes',name:'Notes',component:()=>import("./view/home/notes.vue")},
        {path:'/restaurant',name:'Restaurant',component:()=>import("./view/home/restaurant.vue")},
        {path:'/details',name:'Details',component:()=>import("./view/home/details.vue")},
        {path:'/setting',name:'Setting',component:()=>import("./view/home/setting.vue")}
      ],
      redirect:'/home'
    },
   {path:'/',redirect:'/home'},
   {path:'/search',name:'Search',component:()=>import("./components/Search.vue")},
   {path:'/login',name:'Login',component:()=>import("./components/Login.vue")},
   {
    path:'/manage',
    name:'Manage',
    component:()=>import("./components/Manage.vue"),
    children:[
      {path:'/ma_dashboard',name:'Ma_Dashboard',component:()=>import("./components/Dashboard.vue")},
      {path:'/ma_attractions',name:'Ma_Attractions',component:()=>import("./components/Attractions.vue")},
      {path:'/ma_hotel',name:'Ma_Hotel',component:()=>import("./components/Hotel.vue")},
      {path:'/ma_restaurant',name:'Ma_Restaurant',component:()=>import("./components/Restaurant.vue")},
      {path:'/ma_food',name:'Ma_Food',component:()=>import("./components/Food.vue")},
      {path:'/ma_notes',name:'Ma_Notes',component:()=>import("./components/Notes.vue")},
      {path:'/ma_personal',name:'Ma_Personal',component:()=>import("./components/Personal.vue")}
    ],
    redirect:'/ma_dashboard' 
   }
  ]
})

router.beforeEach((to,from,next)=> {
  const tokenStr = window.sessionStorage.getItem('info')
  if(to.path == '/ma_dashboard') {
    if (tokenStr == null) {
      return next('/login')
    }else {  
      return next()
    }
  }else {
    return next()
  }
})

export default router