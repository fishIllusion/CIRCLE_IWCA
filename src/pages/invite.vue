<template>
     <Transition>
          <div class="mask dialog" v-show="visible" @click="closeInOut($event)">
               <div class="addPanel" ref="initPanel" id="container">
                    <div class="close" @click="close(_this.refs, tween, back)">
                         <i class="iconfont icon-ln_quxiao"></i>
                    </div>
                    <div class="wrap" id="addPanel">
                         <section>
                              <div class="intro">
                                   <span class="text start">Invite friends to fishman_ultra's server</span>
                                   <span class="text grname">#Genneral
                                   </span>
                              </div>
                              <div class="option">
                                   <div class="center">
                                        <div class="left">
                                             <img src="../assets/SVGS/1.svg" alt="">
                                             <span class="text">Create My Own</span>
                                        </div>
                                        <i class="iconfont icon-jiantou_liebiaoxiangyou_o"></i>
                                   </div>
                              </div>
                         </section>
                         <section>

                         </section>
                         <section>
                              <span class="text">OR, SEND A SERVER INVITE LINK TO A FRIEND</span>
                              <div class="text copyArea">
                                   <div class="center">
                                        <div class="links" id="test">localhost:1024/invite/</div>
                                        <button id="copyButton" @click="copyLinks">Copy</button>
                                   </div>
                              </div>
                         </section>
                    </div>
               </div>
          </div>
     </Transition>
</template>

<script>
import { closeInvite } from '@/utils/openDialog';
import gsap from 'gsap';
import { getCurrentInstance, onMounted, ref } from 'vue';
import store from '@/store';
import router from '@/router';
import base64 from 'base-64'
export default {
     setup() {
          const _this = getCurrentInstance()
          const APIs = _this.appContext.config.globalProperties.$API//获取全局绑定的API
          const { visible, close } = closeInvite("invite");
          const tween = gsap.timeline()
          const back = gsap.timeline()
          const hostNickname = JSON.parse(localStorage.AccountStore).user.nickname
          const hostAvatar = JSON.parse(localStorage.AccountStore).user.avatar
          const hostUname = JSON.parse(localStorage.AccountStore).user.uname
          const hostUid = localStorage.user_id_cache
          const placeholderMes = hostNickname + "'s server"//提示语:创建的服务器默认名是$ {nickname}'s server $ 
          const create_sname = ref('')
          const default_sname = placeholderMes
          let timer = null
          let formData
          //点击外侧也关闭弹窗 
          const closeInOut = (e) => {
               if (e.srcElement.classList[0] == 'mask') {
                    close(_this.refs, tween, back)
               }
          }
          //点击移动到创建页面
          const toCreate = () => {
               tween.to('#container', { duration: .2, height: 350, ease: 'power0' })
               back.to('#addPanel', { duration: .2, x: -410, ease: 'power0' })
          }
          //点击返回
          const returnAdd = () => {
               tween.to('#container', { duration: .2, height: 300, ease: 'power0' })
               back.to('#addPanel', { duration: .2, x: 0, ease: 'power0' })
          }
          //上传图片
          const uploadImg = (e) => {
               const file = e.target.files[0]
               // console.log(file);
               formData = new FormData()
               formData.append('files', file)
               const reader = new FileReader()
               reader.onload = (e) => {
                    const url = e.target.result
                    _this.refs.svg.style.opacity = '0'
                    _this.refs.loadImg.src = url
               }
               reader.readAsDataURL(file)
          }
          //发起创建请求
          const sendToCreate = async () => {
               let data = {
                    sName: create_sname.value == '' ? default_sname : create_sname.value,
                    hostUid: Number(localStorage.user_id_cache),
                    hostUname: hostUname,
                    hostNickname: hostNickname,
                    hostAvatar: hostAvatar
               }
               let result = await APIs.createServer(data)
               if (result.code == 200) {
                    close(_this.refs, tween, back)
                    let sAvatar = 'http://' + '121.43.139.166:3000' + '/icon/' + 'logo.png'
                    let imgData = await APIs.imgUpload(formData, hostUid, result.sid)
                    if (imgData.code == 200) {
                         sAvatar = imgData.data
                         console.log(sAvatar);
                    }
                    // let sAvatar = result.sAvatar  写了图片上传逻辑再更改
                    store.commit('ADDMYSERVERS', { sid: result.sid, sname: create_sname.value, sAvatar })
                    router.push(`/channels/server/${result.sid}`)
                    console.log(formData);
                    return create_sname.value = ''
               }
               create_sname.value = ''
               // console.log(result);
          }

          const copyLinks = async () => {
               let content = document.getElementById('test').innerHTML
               try {
                    await navigator.clipboard.writeText(content).then(() => {
                         let copyButton = document.getElementById('copyButton')
                         if(copyButton.classList.length != 1) {
                              clearTimeout(timer) 
                              copyButton.classList.toggle('turnGreen')
                              copyButton.innerHTML = 'Copied'
                              timer = setTimeout(() => {
                                   copyButton.classList.toggle('turnGreen')
                                   copyButton.innerHTML = 'Copy'
                              }, 3000);
                         }
                    })
               } catch (error) {

               }


          }
          onMounted(() => {
               let params = router.currentRoute.value.params
               let test = document.getElementById('test')
               let query = base64.encode({
                    uid: localStorage.user_id_cachem,
                    sid: params.sid
               })
               test.innerHTML += query
               // if (params.gid != undefined) {
               //      let test = document.getElementById('test')
               //      let query = base64.encode(params)
               //      test.innerHTML += query
               // }
          })
          return {
               tween, back, visible, copyLinks, close, closeInOut, toCreate, returnAdd, uploadImg, sendToCreate, _this, placeholderMes, create_sname
          }
     },

}
</script>

<style lang="less" scoped>
.v-enter-active,
.v-leave-active {
     transition: opacity 0.45s linear;

     .addPanel {
          transition: scale .5s ease;
     }
}

.v-enter-from,
.v-leave-to {
     opacity: 0;

     .addPanel {
          scale: 0;
     }
}

.mask {
     width: 100vw;
     height: 100vh;
     z-index: 9;
     position: absolute;
     top: 0;
     bottom: 0;
     left: 0;
     right: 0;
     background-color: rgba(0, 0, 0, .8);
     display: flex;
     justify-content: center;
     align-items: center;

     .addPanel {
          // z-index: 11;
          width: 450px;
          height: 400px;
          border-radius: 5px;
          background-color: rgb(48, 51, 56);
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;

          .close {
               z-index: 11;

               position: absolute;
               right: 5px;
               top: 5px;
               width: 25px;
               height: 25px;
               display: flex;
               justify-content: center;
               align-items: center;
               border-radius: 50%;
               transition: .1s;

               // border: 1px solid #fff;
               i {
                    transition: .3s;
                    color: #fff;
                    font-size: 20px;
               }

               &:hover {
                    border: 1px solid #fff;
                    cursor: pointer;

                    i {
                         font-size: 14px;
                    }
               }

               &:active {
                    i {
                         font-size: 18px;
                    }
               }
          }


          .wrap {
               width: 95%;
               height: 100%;
               // display: flex;
               // flex-direction: column;
               // justify-content: space-between;
               position: relative;
               // border: 1px solid #fff;

               section {
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    // width: 100%;
                    // border: 1px solid #fff;

                    .text {
                         display: block;
                         width: 100%;
                         text-align: center;
                         color: #fff;
                    }

                    &:nth-child(1) {
                         margin-bottom: 10px;

                         .intro {
                              margin-top: 5px;
                              width: 95%;

                              .start {
                                   text-align: start;
                                   // border: 1px solid #fff;
                                   width: 100%;
                                   font-size: 15px;
                                   font-family: var(--nomal-font_family);
                              }

                              .grname {
                                   text-align: start;

                                   color: rgb(157, 155, 155);
                              }
                         }

                         .option {
                              transition: .2s;

                              &:hover {
                                   background: rgb(39, 41, 41);
                                   cursor: pointer;
                              }

                              margin-top: 5px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              width: 95%;
                              height: 50px;
                              border-radius: 5px;
                              border: 1px solid rgb(116, 113, 113);

                              .center {
                                   width: 95%;
                                   height: 100%;
                                   display: flex;
                                   justify-content: space-between;
                                   align-items: center;

                                   .left {
                                        display: flex;
                                        align-items: center;

                                        img {
                                             border-radius: 50%;
                                             object-fit: cover;
                                             height: 35px;
                                             width: 35px;
                                        }

                                        span {
                                             font-family: var(--nomal-font_family);
                                             margin-left: 5px;
                                        }
                                   }

                                   i {
                                        font-size: 23px;
                                        font-weight: 600;
                                        color: #fff;
                                   }
                              }
                         }

                         ;
                    }

                    &:nth-child(3) {
                         // width: 105%;
                         position: absolute;
                         bottom: 0;
                         left: 50%;
                         transform: translateX(-50%);
                         height: 100px;
                         // background-color: rgb(43, 45, 49);
                         display: flex;
                         justify-content: center;
                         align-items: center;
                         // border: 1px solid #fff;

                         span {
                              font-family: var(--nomal-font_family);
                              margin-bottom: 5px;
                              font-size: 14px;
                              color: #acabab;
                         }

                         .copyArea {
                              // background-color: rgb(78, 80, 87);
                              background-color: rgb(30, 31, 34);
                              border: 0;
                              outline: 0;
                              height: 40px;
                              border-radius: 3px;
                              width: 100%;
                              transition: .2s;
                              display: flex;
                              justify-content: center;
                              align-items: center;

                              .center {
                                   width: 98%;
                                   height: 32px;
                                   // border: 1px solid #fff;
                                   display: flex;
                                   justify-content: space-between;
                                   align-items: center;

                                   .links {
                                        height: 32px;
                                        width: calc(100% - 85px);
                                        background-color: rgb(30, 31, 34);
                                        line-height: 32px;
                                        display: block;
                                        text-align: start;
                                        padding-left: 7px;
                                        overflow-x: hidden;
                                   }

                                   button {
                                        height: 90%;
                                        width: 70px;
                                        color: #fff;
                                        background-color: rgb(87, 100, 243);
                                        border: none;
                                        border-radius: 3px;
                                        cursor: pointer;
                                        transition: .3s;
                                        font-family: var(--nomal-font_family);

                                        &:hover {
                                             background-color: rgb(67, 77, 189);
                                        }
                                   }

                                   .turnGreen {
                                        background-color: rgb(45, 168, 88);
                                        &:hover {
                                             background-color: rgb(26, 99, 51);
                                        }
                                   }
                              }

                         }
                    }
               }
          }

          .createPanel {
               width: 400px;
               height: 350px;
               background-color: rgb(48, 51, 56);
               position: absolute;
               left: 400px;
               top: 0;

               .top,
               .bottom {
                    width: 400px;
               }

               .top {
                    height: 80%;
                    display: flex;
                    flex-direction: column;
                    justify-content: start;
                    align-items: center;

                    .title {
                         margin-top: 5px;
                         display: block;
                         color: #fff;
                         font-family: var(--nomal-font_family);
                         font-size: 20px;
                    }

                    p {
                         text-align: center;
                         font-family: var(--nomal-font_family);
                         margin-top: 10px;
                         font-size: 14px;
                         width: 90%;
                         color: rgb(157, 155, 155);
                    }

                    .addSavatar {
                         position: relative;
                         height: 60px;
                         width: 100%;
                         // border: 1px solid #fff;
                         margin-top: 30px;
                         margin-bottom: 40px;
                         display: flex;
                         justify-content: center;
                         align-items: center;

                         .svg {
                              color: rgb(157, 155, 155);
                              z-index: 1;
                         }

                         img {
                              z-index: 2;
                              position: absolute;
                              height: 80px;
                              width: 80px;
                              top: 50%;
                              left: 50%;
                              transform: translate(-50%, -50%);
                              border-radius: 50%;
                              object-fit: cover;
                         }

                         input {
                              z-index: 3;
                              position: absolute;
                              height: 80px;
                              width: 80px;
                              top: 50%;
                              left: 50%;
                              transform: translate(-50%, -50%);
                              // opacity: 0;
                              font-size: 0;
                              border-radius: 50%;
                              cursor: pointer;
                         }

                    }

                    .serverName {
                         display: flex;
                         flex-direction: column;
                         width: 100%;

                         span {
                              font-family: var(--nomal-font_family);
                              color: #fff;
                              margin-left: 12px;
                              display: block;
                         }

                         .inputArea {
                              margin: 0 auto;
                              width: 380px;
                              height: 40px;
                              // display: flex;
                              // justify-content: start;
                              // align-items: center;
                              background-color: rgb(30, 31, 34);
                              position: relative;
                              border-radius: 5px;
                              margin-bottom: 5px;

                              .input {
                                   position: absolute;
                                   left: 50%;
                                   top: 50%;
                                   transform: translate(-50%, -50%);
                                   width: 95%;
                                   background-color: rgb(30, 31, 34);
                                   outline: none;
                                   border: none;
                                   height: 40px;
                                   font-size: 18px;
                                   color: #fff;
                              }
                         }

                    }

               }

               .bottom {
                    height: 20%;
                    background-color: rgb(43, 45, 49);
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .center {
                         width: 90%;
                         height: 100%;
                         display: flex;
                         justify-content: space-between;
                         align-items: center;

                         span {
                              font-family: var(--nomal-font_family);
                         }

                         button {
                              height: 35px;
                              width: 80px;
                              background-color: rgb(87, 100, 243);
                              outline: none;
                              border: none;
                              border-radius: 3px;
                              color: #fff;
                              font-family: var(--nomal-font_family);
                         }
                    }
               }
          }
     }
}</style>