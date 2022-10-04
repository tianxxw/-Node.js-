<script>
 export default{
   data() {
    return {
      username:'',
      password:'',
      Innickname:'',
      Inusername:'',
      Inpassword:''
    }
   },
   components:{

   },
   created() {

   },
   mounted() {

   },
   computed:{

   },
   watch:{
    Inusername(newval,oldval) {
      
    }
   },
   methods:{
    checkRegister() {
     this.$refs.login_box.className = 'container right-panel-active'
    },
    checkLogin() {
     this.$refs.login_box.className = 'container'
    },
    foucsInput(e) {
     e.target.className = 'focus'
    },
    blurInput(e) {
     if(e.target.value == '') {
      e.target.className = ''
     }
    },
    async Register(e) {
     if(this.Inusername == '' && this.INpassword == '' && this.Innickname =='' ) {
      e.target.innerText = '账号、密码和用户名不能为空'
     }else if(this.INusername == '') {
      e.target.innerText = '账号不能为空'
     }else if(this.INpassword == '') {
      e.target.innerText = '密码不能为空'
     }else if(this.Innickname == '') {
      e.target.innerText = '用户名不能为空'
     }else {
      const arr = await this.$http({
      method:'post',
      url:'/user/register',
      data:{
       username:this.Inusername,
       password:this.Inpassword,
       nickname:this.Innickname
      }
     })
     console.log(arr);
     if(arr.data.message == '注册成功') {
      e.target.innerText = arr.data.message
      setTimeout(()=>{
        this.$refs.login_box.className = 'container'
      },1500)
      setTimeout(()=>{
        this.Innickname = ''
        this.Inpassword = ''
        this.Inusername = ''
      },2000)
     }else {
      e.target.innerText = arr.data.message
     }
     }
    },
    async Login(e) {
     if(this.username == '' && this.password == '' ) {
      e.target.innerText = '账号和密码不能为空'
     }else if(this.username == '') {
      e.target.innerText = '账号不能为空'
     }else if(this.password == '') {
      e.target.innerText = '密码不能为空'
     }else {
      const arr = await this.$http({
      method:'post',
      url:'/user/login',
      data:{
       username:this.username,
       password:this.password,
      }
     })
     console.log(arr);
     if(arr.data.message == '登录成功') {
      window.sessionStorage.setItem('info',JSON.stringify(arr.data.data))
      e.target.innerText = arr.data.message
      setTimeout(()=>{
        this.$router.replace("/home")
      },500)
     }else {
      e.target.innerText = '登录失败,账号或密码错误'
     }
     }
    }
   }
 }
 </script>
<template>
<div class="body">
 <div class="container" id="login-box" ref="login_box">
  <div class="form-container sign-up-container">
      <form>
          <h1>注册</h1>           
          <div class="txtb"  >
              <input type="text" v-model="Inusername"  @focus="foucsInput" @blur="blurInput" >
              <span data-placeholder="Useranme" ref="username" ></span>
          </div>
          <div class="txtb">
              <input type="text" v-model="Innickname"  @focus="foucsInput" @blur="blurInput"  >
              <span data-placeholder="Nickname" ref="nickname" ></span>
          </div> 
          <div class="txtb">
              <input type="password" v-model="Inpassword"  @focus="foucsInput" @blur="blurInput"  >
              <span data-placeholder="Password" ref="password" ></span>
          </div>       
          <button @click="Register" type="button" >注册</button>
      </form>
  </div>
  <div class="form-container sign-in-container">
      <form action="#">
          <h1>登录</h1>
          <div class="txtb">
              <input type="text" v-model="username"  @focus="foucsInput" @blur="blurInput"  >
              <span data-placeholder="Username" ></span>
          </div>
          <div class="txtb">
              <input type="password" v-model="password" ref="input" @focus="foucsInput" @blur="blurInput"  >
              <span data-placeholder="Password"></span>
          </div>
          <a href="#">忘记密码？</a>
          <button @click="Login" type="button">登录</button>
      </form>
  </div>

  <div class="overlay-container">
          <div class="overlay">
              <div class="overlay-panel overlay-left">
                  <h1>已有账号？</h1>
                  <p>请使用您的账号进行登录</p>
                  <button class="ghost" id="signIn" @click="checkLogin" >登录</button>
              </div>
              <div class="overlay-panel overlay-right">
                  <h1>没有账号?</h1>
                  <p>立即注册加入我们，和我们一起开始旅程吧</p>
                  <button class="ghost" id="signUp" ref="signUp" @click="checkRegister" >注册</button>
              </div>
          </div>
      
  </div>
</div>
</div>
</template>
<style scoped lang="less">
 * {
  box-sizing: border-box;
}
.body {
  font-family: 'Montserrat',sans-serif;
  background-image: linear-gradient(120deg,#3498db,#8e44ad);;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

h1 {
  font-weight: bold;
  margin: 0;
}
p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: .5px;
  margin: 20px 0 30px;
}
span {
  font-size: 12px;
}
a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}
.container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;   

}

.form-container form {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  justify-content: center;
  text-align: center;
}
.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.social-container a:hover {
  background-color: #eee;

}

.txtb {
  border-bottom: 2px solid #adadad;
  position: relative;
  margin: 10px 0;
}

.txtb input {
  font-size: 15px;
  color: #333;
  border: none;
  width: 100%;
  outline: none;
  background: none;
  padding: 0 3px;
  height: 35px;
}

.txtb span::before {
  content: attr(data-placeholder);
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  transition: .5s;
}
.txtb span::after {
  content: '';
  position: absolute;
  left: 0%;
  top: 100%;
  width: 0%;
  height: 2px;
  background-image: linear-gradient(120deg,#3498db,#8e44ad);
  transition: .5s;
}

.focus + span::before {
  top: -5px;
}

.focus + span::after {
  width: 100%;
}

button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background: #ff4b2b;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}

button:active {
  transform: scale(.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background: transparent;
  border-color: #fff;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all .6s ease-in-out;
}

.form-container button {
  background: linear-gradient(120deg, #3498db, #8e44ad);
  border: none;
  background-size: 200%;
  color: #fff;
  transition: .5s;
}

.form-container button:hover {
  background-position: right;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
.sign-in-container form a {
  position: relative;
  left: 100px;
}
.sign-up-container {
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
}
.sign-up-container button {
  margin-top: 20px;
}
.overlay-container {
  position:absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform .6s ease-in-out;
  z-index: 100;
}
.overlay {
  background-image: linear-gradient(120deg,#3498db,#8e44ad);
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateY(0);
  transition: transform .6s ease-in-out;
}
.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  height: 100%;
  width: 50%;
  text-align: center;
  transform: translateY(0);
  transition: transform .6s ease-in-out;
}
.overlay-right {
  right: 0;
  transform: translateY(0);
  
}

.overlay-left {
  transform: translateY(-20%);
}

.container.right-panel-active .sign-in-container {
  transform: translateY(100%);
}

.container.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}
.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}
.container.container.right-panel-active .overlay {
  transform: translateX(50%);
}
.container.container.right-panel-active .overlay-left {
  transform: translateY(0);
}
.container.container.right-panel-active .overlay-right {
  transform: translateY(20%);
}

</style>