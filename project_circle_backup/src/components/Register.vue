<template>
     <div class="main_container">
          <div class="logo" @click="goHomePage">
               <img src="../assets//logo/logo.png" alt="logo">
               <span>Circle</span>
          </div>
          <span class="login" @click="goRegister">Sign in</span>
          <div class="loginPanel" id="panel">
               <span class="title">Create Account</span>
               <span class="tip">Own Your Personal Circle Accont</span>

               <div :class="{ active: status.accountError == -1 || status.accountError == 4 || status.accountError == 10}" class="account input">
                    <input autocomplete="off" type="text" placeholder="Account" ref="accountRef" v-model="formData.account">
                    <img class="pass litTip" src="../assets/init-icon-pics/duigou1.png"
                         v-show="status.accountError == 2 && formData.account !== ''" alt="pass">
                    <img class="error litTip" src="../assets/init-icon-pics/cuowu.png" v-show="status.accountError == -1 || status.accountError == 10"
                         alt="error">
                    <img src="../assets/init-icon-pics/account.png" alt="account">
                    <div v-show="status.accountError == 1" class="statu">4-10 letters or numbers</div>
                    <div v-show="status.accountError == -1 && formData.account !== ''" class="statu" style="color: red;">
                         account format error</div>
                    <div v-show="status.accountError == 4" class="statu" style="color: red;">account should not be empty
                    </div>
                    <div v-show="status.accountError == 10" class="statu" style="color: red;">account already exit</div>
               </div>

               <div :class="{ active: status.pwdError == -1 || status.pwdError == 4 }" class="pwd input">
                    <input autocomplete="off" type="text" placeholder="Password" ref="pwdRef" v-model="formData.password">
                    <img class="pass litTip" src="../assets/init-icon-pics/duigou1.png"
                         v-show="status.pwdError == 2 && formData.password !== ''" alt="pass">
                    <img class="error litTip" src="../assets/init-icon-pics/cuowu.png" v-show="status.pwdError == -1"
                         alt="error">
                    <img src="../assets/init-icon-pics/lock.png" alt="pwd">
                    <div v-show="status.pwdError == 1" class="statu">at least one upper and samll letter</div>
                    <div v-show="status.pwdError == -1 && formData.password !== ''" class="statu" style="color: red;">
                         password format error</div>
                    <div v-show="status.pwdError == 4" class="statu" style="color: red;">password should not be empty</div>
               </div>

               <div :class="{ active: status.pwdCheckError == -1 || status.pwdCheckError == 3 || status.pwdCheckError == 4 }"
                    class="pwdChecked input">
                    <input autocomplete="off" type="text" placeholder="AgainPassword" ref="pwdCheckRef" v-model="formData.password_check">
                    <img class="pass litTip" src="../assets/init-icon-pics/duigou1.png"
                         v-show="status.pwdCheckError == 2 && formData.password_check !== ''" alt="pass">
                    <img class="error litTip" src="../assets/init-icon-pics/cuowu.png"
                         v-show="status.pwdCheckError == -1 || status.pwdCheckError == 3" alt="error">
                    <img src="../assets/init-icon-pics/lock.png" alt="pwd">
                    <div v-show="status.pwdCheckError == 1" class="statu">two entrances should be same</div>
                    <div v-show="status.pwdCheckError == -1 && formData.password_check !== ''" class="statu"
                         style="color: red;">two entrances are different</div>
                    <div v-show="status.pwdCheckError == 3" class="statu" style="color: red;">please enter the checked</div>
                    <div v-show="status.pwdCheckError == 4" class="statu" style="color: red;">check should not be empty</div>
               </div>

               <div :class="{ active: status.emailError == -1 || status.emailError == 10 }" class="email input">
                    <input autocomplete="off" type="text" placeholder="E-mail" ref="emailRef" v-model="formData.email">
                    <img class="pass litTip" src="../assets/init-icon-pics/duigou1.png"
                         v-show="status.emailError == 2 && formData.email !== ''" alt="pass">
                    <img class="error litTip" src="../assets/init-icon-pics/cuowu.png" v-show="status.emailError == -1 || status.emailError == 10"
                         alt="error">
                    <img src="../assets/init-icon-pics/email.png" alt="email">
                    <div v-show="status.emailError == 1" class="statu">optional</div>
                    <div v-show="status.emailError == -1" class="statu" style="color: red;">invalid email</div>
                    <div v-show="status.emailError == 10" class="statu" style="color: red;">email already exit</div>
               </div>
               <!-- <div class="reAndFo">
                         <div class="remember">
                              <input type="checkbox">
                              <div class="rememberMe">Remember me</div>
                         </div>
                         <div class="forgot">Forget password?</div>
                    </div> -->
               <button @click="Register">Register</button>
          </div>
     </div>
</template>

<script>
import gsap from 'gsap';
import { useRouter } from 'vue-router';
import { getCurrentInstance, onMounted, reactive } from 'vue';
import { debounce } from '../utils/index.js'

export default {
     name: 'Register',
     setup() {
          // let pwdReg = /^(?=.*[a-z])(?=.*[A-Z]){8,16}$/
          const _this = getCurrentInstance()
          let APIs = _this.appContext.config.globalProperties.$API//获取全局绑定的API
          let formData = reactive({
               account: '',
               password: '',
               password_check: '',
               email: ''
          })

          let status = reactive({
               errorAll: 0,
               accountError: 1, //1 为正常显示
               pwdError: 1,
               pwdCheckError: 1,
               emailError: 1
          })

          const Regs = {
               'accountReg': /^[a-zA-Z0-9_]{4,10}$/,
               // 'pwdReg': /^(?=.*[a-z])(?=.*[A-Z]){8,20}$/
               'pwdReg': /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9])[^]{8,16}$/,
               // 'pwdReg': /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9])[^]{8,16}$/,
               'emailReg': /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          }

          const RegFuns = {
               'account': async function REGA() {
                    if (Regs['accountReg'].test(formData.account) == false) {
                         status.accountError = -1
                    } else {
                         await APIs.registerCheckAccount(formData.account).then(ctx => {
                              console.log(formData.account);
                              console.log(ctx);
                              if (ctx.response !== undefined) {
                                   return status.accountError = 10
                              }else {
                                   status.accountError = 2
                              }
                         })
                    }
                    if (formData.account == '') {
                         status.accountError = 1
                    }

               },
               'pwd': function REGP() {
                    if (Regs['pwdReg'].test(formData.password) == false) {
                         status.pwdError = -1
                         if (status.pwdError == status.pwdCheckError) {
                              status.pwdCheckError = 2
                         }
                         if (formData.password !== formData.password_check && formData.password_check !== '') {
                              status.pwdCheckError = -1
                         }
                    } else {
                         if (formData.password !== formData.password_check && formData.password_check !== '') {
                              status.pwdCheckError = -1
                         }
                         status.pwdError = 2
                    }
                    if (formData.password == '') {
                         status.pwdError = 1
                         if (status.pwdCheckError == -1) {
                              status.pwdCheckError = 1
                              formData.password_check = ''
                         }
                    }
               },
               'pwd_check': function REGPC() {
                    if (formData.password !== formData.password_check) {
                         status.pwdCheckError = -1
                         if (status.pwdCheckError == -1 && formData.password_check == '') {
                              status.pwdCheckError = 3
                         }
                    }
                    if (formData.password == formData.password_check) {
                         status.pwdCheckError = 2
                         if (formData.password_check == '') {
                              status.pwdCheckError = 1
                         }
                    }
                    if (formData.password_chec == '') {
                         status.pwdCheckError = 1
                    }

               },
               'email': async function REGE() {
                    if (Regs['emailReg'].test(formData.email) == false) {
                         status.emailError = -1
                    } else {
                         await APIs.registerCheckEmail(formData.email).then(ctx => {
                              console.log(formData.email);
                              console.log(ctx);
                              if (ctx.response !== undefined) {
                                   return status.emailError = 10
                              }else {
                                   status.emailError = 2
                              }
                         })
                    }
                    if (formData.email == '') {
                         status.emailError = 1
                    }
               }
          }

          let _debounces = {
               'debounceAccount': debounce(RegFuns['account'], 800),
               'debouncePwd': debounce(RegFuns['pwd'], 800),
               'debouncePwdCheck': debounce(RegFuns['pwd_check'], 800),
               'debounceEmail': debounce(RegFuns['email'], 800),
          }
          const router = useRouter();
          let tween = gsap.timeline()
          const goHomePage = () => [
               router.push('/')
          ];
          const goRegister = () => {
               router.push('/login')
          }
          //注册函数
          const Register = async() => {
               // if (!formData.account && !formData.password && !formData.password_check && !formData.email) {
               //      return status.accountError = status.pwdError = status.pwdCheckError = 4
               // }
               formData.account?'':status.accountError = 4
               formData.password?'':status.pwdError = 4
               formData.password_check?'':status.pwdCheckError = 4
               // if((status.accountError==2&&status.pwdError==2&&status.pwdCheckError==2&&formData.email=='') || (status.accountError==2&&status.pwdError==2&&status.pwdCheckError==2&&status.emailError==2)) {
               //      status.errorAll = 1
               // }
               console.log(status.errorAll);
               if((status.accountError==2&&status.pwdError==2&&status.pwdCheckError==2&&formData.email=='') || (status.accountError==2&&status.pwdError==2&&status.pwdCheckError==2&&status.emailError==2)) {
                    console.log('good');
                    await APIs.register(JSON.stringify({
                         account: formData.account,
                         pwd: formData.password,
                         email: formData.email
                    }))
               }
          }

          onMounted(() => {
               tween.from('#panel', { duration: .5, x: -400, scale: 1.5 }).to('#panel', { duration: .5, x: 0, scale: 1, ease: 'power2' })
               //检测account的输入
               _this.refs.accountRef.oninput = (value) => {
                    status.accountError = 0
                    if (formData.account == '') {
                         status.accountError = 1
                    }
                    _debounces['debounceAccount']()
                    console.log(_debounces['debounceAccount']());
               }
               //检测password的输入
               _this.refs.pwdRef.oninput = (value) => {
                    status.pwdError = 0
                    if (formData.password == '') {
                         status.pwdError = 1
                    }
                    _debounces['debouncePwd']()
                    // console.log(_debounces['debouncePwd']());
                    // console.log(status.pwdError);
               }
               //检测password_check的输入
               _this.refs.pwdCheckRef.oninput = (value) => {
                    status.pwdCheckError = 0
                    if (formData.pwdCheckError == '') {
                         status.pwdCheckError = 1
                    }
                    _debounces['debouncePwdCheck']()
                    // console.log(_debounces['debouncePwdCheck']());
                    // console.log(status.pwdCheckError);
               }
               //检测email的输入
               _this.refs.emailRef.oninput = (value) => {
                    status.emailError = 0
                    if (formData.email == '') {
                         status.emailError = 1
                    }
                    _debounces['debounceEmail']()
               }
          })
          return {
               goHomePage, goRegister, formData, status, Register
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

     .login {
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
                    font-size: 14px;
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
                    color: rgb(239, 239, 92)
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
               background-color: rgb(149, 0, 242);
               color: #fff;
               font-family: var(--nomal-font_family);
               font-size: 18px;
          }
     }

}</style>