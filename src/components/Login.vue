<template>
     <div class="main_container">
          <div class="logo" @click="goHomePage">
               <img src="../assets//logo/logo.png" alt="logo">
               <span>Circle</span>
          </div>
          <span class="register" @click="goRegister">Sign up</span>
          <div class="loginPanel" id="panel">
               <span class="title">Sign in</span>
               <span class="tip">Welcome To Circle and Come To Start Your Jouney</span>
               <div :class="{ active: isShow == -1 && formData.account || showPwd == -3 }" class="account input"
                    ref="accountPanel">
                    <input autocomplete="off" ref="account" type="text" placeholder="Account" v-model="formData.account">
                    <img class="pass litTip" src="../assets/init-icon-pics/duigou1.png" alt="pass"
                         v-show="isShow == 1 && formData.account !== ''">
                    <img class="error litTip" src="../assets/init-icon-pics/cuowu.png" alt="error"
                         v-show="isShow == -1 && formData.account !== ''">
                    <img src="../assets/init-icon-pics/account.png" alt="account">
                    <div v-show="isShow == -1 && formData.account !== ''" class="statu">account format error</div>
                    <div v-show="showPwd == -3 || isShow == -2" class="statu">account should not be empty</div>
               </div>
               <div :class="{ active: showPwd == -1 || showPwd == -3 }" class="pwd input">
                    <!-- v-if="isShow" -->
                    <input autocomplete="off" type="password" placeholder="Password" ref="pwd" v-model="formData.password">
                    <img class="pass litTip" src="../assets/init-icon-pics/duigou1.png" alt="pass" v-show="showPwd == 1">
                    <!-- <img src="../assets/init-icon-pics/cuowu.png" alt="error"> -->
                    <img src="../assets/init-icon-pics/lock.png" alt="pwd">
                    <div v-show="showPwd == -3 || showPwd == -2" class="statu">password should not be empty</div>
               </div>
               <div class="reAndFo">
                    <div class="remember">
                         <input type="checkbox">
                         <div class="rememberMe">Remember me</div>
                    </div>
                    <div class="forgot">Forget password?</div>
               </div>
               <button @click="Login">Login</button>
          </div>
     </div>
</template>

<script>
import gsap from 'gsap';
import { useRouter } from 'vue-router';
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { debounce } from '../utils/index.js'
export default {
     name: 'Login',
     setup() {
          let _this = getCurrentInstance()//获取this
          let APIs = _this.appContext.config.globalProperties.$API//获取全局绑定的API
          let tween = gsap.timeline()
          //登录表单数据
          let formData = reactive({
               account: '',
               password: ''
          })
          const ACTIVE = ' active'
          let isShow = ref(0)
          let showPwd = ref(0)
          //路由相关函数
          const router = useRouter();
          const goHomePage = () => [
               router.push('/')
          ];
          const goRegister = () => {
               router.push('/register')
          }
          //对账号的正则判断
          const accountReg = /^[a-zA-Z0-9_]{4,10}$/;

          //事先启用debouce的回调
          let debounceAccount = debounce(REGA, 800)
          let debouncePwd = debounce(REGP, 800)

          // console.log(debounceAccount, debouncePwd);
          //account正则判断函数
          function REGA() {
               if (accountReg.test(formData.account) == false && formData.account !== '') {
                    isShow.value = -1
               }
               else {
                    isShow.value = 1
               }
          }
          function REGP() {
               if (formData.password) {
                    showPwd.value = 1
               } else {
                    showPwd.value = 0
               }
          }
          //监听鼠标事件的回调函数，如果键入回车（Enter），尝试进行登录操作
          const keyboardDownBack = (event) => {
               if(event.code == 'Enter') {
                    Login()
               }
          }
          //登录函数
          const Login = async () => {
               if (formData.account == '' && formData.password == '') {
                    showPwd.value = -3
                    return
               }
               if (formData.password == '') {
                    showPwd.value = -2
                    return
               }
               if (formData.account == '') {
                    isShow.value = -2
                    return
               }
               //登录处理函数
               await APIs.login(JSON.stringify({ account: formData.account, pwd: formData.password })).then(ctx => {
                    if (!ctx.response) {
                         localStorage.token = String(ctx.token)
                         localStorage.user_id_cache = ctx.uid
                         localStorage.foption = 1
                         localStorage.AccountStore = JSON.stringify({
                              'user': {
                                   id: ctx.uid,
                                   uname: formData.account,
                                   avatar: ctx.avatar,
                                   nickname: ctx.nickname
                              }
                         })
                         router.push('/channels')
                         document.removeEventListener("keyup", keyboardDownBack, true)
                    }
               })
          }

          
          onMounted(() => {
               tween.from('#panel', { duration: 0.5, scale: 0, opacity: 0, ease: 'power0' })
               tween.to('#panel', { duration: 0.5, scale: 1, opacity: 1, ease: 'power0' })

               _this.refs.account.oninput = (value) => {
                    if (showPwd.value == -3) {
                         showPwd.value = -2
                    }
                    if (formData.account.length < 4) isShow.value = 0
                    debounceAccount()
               }
               _this.refs.pwd.oninput = (value) => {
                    showPwd.value = 0
                    debouncePwd()
               }
               //监听回车事件
               document.addEventListener("keyup", keyboardDownBack, true)
          })
          return {
               goHomePage, goRegister, isShow, formData, showPwd, Login
          }
     }
}
</script>

<style lang="less" scoped>
.main_container {
     width: 100vw;
     height: 100vh;
     background-color: rgb(61, 63, 97);
     position: relative;

     .logo {
          position: absolute;
          left: 5vw;
          top: 20px;
          display: flex;
          height: 40px;

          span {
               font-family: Montserrat-BlackItalic;
               font-size: 25px;
               height: 40px;
               line-height: 40px;
               font-weight: 800;
               color: #fff;
          }
     }

     .register {
          position: absolute;
          right: 5vw;
          top: 20px;
          display: flex;
          height: 30px;
          color: #fff;
          font-family: Montserrat-BlackItalic;
          border-bottom: 1px solid #fff;
          cursor: pointer;
     }

     .loginPanel {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 500px;
          height: 700px;
          // border: 2px dashed blue;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          row-gap: 40px;

          .title {
               color: #fff;
               font-size: 40px;
               font-family: Montserrat-BlackItalic;
          }

          .tip {
               @media screen and (max-width: 1024px) {
                    font-size: 16px;
               }

               @media screen and (max-width: 768px) {
                    font-size: 13.5px;
               }

               color: #fff;
               font-size: 18px;
               font-family: var(--nomal-font_family);
          }

          .input {
               width: 300px;
               height: 50px;
               background-color: rgb(69, 71, 103);
               border-radius: 25px;
               position: relative;
               border: 1px solid rgba(154, 149, 149, 0.3);
               backdrop-filter: blur(20px) !important;

               .statu {
                    position: absolute;
                    bottom: -25px;
                    left: 20px;
                    font-family: var(--nomal-font_family);
                    color: rgb(231, 77, 77)
               }

               .litTip {
                    width: 20px;
                    position: absolute;
                    top: 5px;
                    right: -20px;
                    opacity: 1;
               }

               input {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    // background-color: rgb(61, 63, 97);
                    background-color: rgb(69, 71, 103);
                    transform: translate(0, -50%);
                    background-color: none;
                    height: 80%;
                    width: 80%;
                    margin-left: 20px;
                    outline: none;
                    border: none;
                    color: #fff;
                    font-family: var(--nomal-font_family);

                    &::placeholder {
                         color: #fff;
                         font-family: var(--nomal-font_family);
                    }
               }

               img {
                    opacity: .4;
                    position: absolute;
                    right: 0;
                    top: 50%;
                    margin-right: 20px;

                    transform: translate(0, -50%);
               }

          }

          .active {
               border-color: red;
          }

          .reAndFo {
               width: 300px;
               display: flex;
               justify-content: space-between;

               .remember {
                    display: flex;

                    input {
                         background-color: blue;
                    }

                    .rememberMe {
                         margin-left: 5px;
                         color: #fff;
                         font-family: var(--nomal-font_family);
                    }
               }

               .forgot {
                    color: rgb(64, 201, 173);
                    font-family: var(--nomal-font_family);
               }
          }

          button {
               width: 300px;
               height: 45px;
               border-radius: 20px;
               border: none;
               background-color: rgb(0, 242, 121);
               color: #fff;
               font-family: var(--nomal-font_family);
               font-size: 18px;
          }
     }

}
</style>