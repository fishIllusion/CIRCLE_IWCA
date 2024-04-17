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
                                   <span class="text">Create a server</span>
                                   <p class="text">Your server is where you and your friends hang out.Make yours and start
                                        talking
                                   </p>
                              </div>
                              <div class="option" @click="toCreate">
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
                              <span class="text">Have an invite Already?</span>
                              <button class="text">Join a Server</button>
                         </section>
                         <div class="createPanel">
                              <div class="top">
                                   <span class="title">Customise your server</span>
                                   <p>Give your new server a personality with a name and an icon.You can always change it
                                        later.</p>
                                   <div class="addSavatar">
                                        <img alt="" ref="loadImg" onerror="this.style.opacity='0'"
                                             onload="this.style.opacity='1'">
                                        <input type="file" accept="jpg, png, jpeg" @change="uploadImg($event)">
                                        <svg ref="svg" width="80" height="80" viewBox="0 0 80 80" fill="none" class="svg">
                                             <path fill-rule="evenodd" clip-rule="evenodd"
                                                  d="M54.8694 2.85498C53.8065 2.4291 52.721 2.04752 51.6153 1.71253L51.3254 2.66957L51.0354 3.62661C51.9783 3.91227 52.9057 4.23362 53.8161 4.58911C54.1311 3.98753 54.4832 3.40847 54.8694 2.85498ZM75.4109 26.1839C76.0125 25.8689 76.5915 25.5168 77.145 25.1306C77.5709 26.1935 77.9525 27.279 78.2875 28.3847L77.3304 28.6746L76.3734 28.9646C76.0877 28.0217 75.7664 27.0943 75.4109 26.1839ZM78.8148 43.8253L79.8102 43.9222C79.9357 42.6318 80 41.3234 80 40C80 38.6766 79.9357 37.3682 79.8102 36.0778L78.8148 36.1747L77.8195 36.2715C77.9389 37.4977 78 38.7414 78 40C78 41.2586 77.9389 42.5023 77.8195 43.7285L78.8148 43.8253ZM43.8253 1.18515L43.9222 0.189853C42.6318 0.0642679 41.3234 0 40 0C38.6766 0 37.3682 0.064268 36.0778 0.189853L36.1747 1.18515L36.2715 2.18045C37.4977 2.06112 38.7414 2 40 2C41.2586 2 42.5023 2.06112 43.7285 2.18045L43.8253 1.18515ZM28.6746 2.66957L28.3847 1.71253C25.8549 2.47897 23.4312 3.48925 21.1408 4.71604L21.6129 5.59756L22.0851 6.47907C24.2606 5.3138 26.5624 4.35439 28.9646 3.62661L28.6746 2.66957ZM15.2587 9.85105L14.6239 9.0784C12.5996 10.7416 10.7416 12.5996 9.0784 14.6239L9.85105 15.2587L10.6237 15.8935C12.2042 13.9699 13.9699 12.2042 15.8935 10.6237L15.2587 9.85105ZM5.59756 21.6129L4.71604 21.1408C3.48925 23.4312 2.47897 25.8549 1.71253 28.3847L2.66957 28.6746L3.62661 28.9646C4.35439 26.5624 5.3138 24.2607 6.47907 22.0851L5.59756 21.6129ZM0 40C0 38.6766 0.0642679 37.3682 0.189853 36.0778L1.18515 36.1747L2.18045 36.2715C2.06112 37.4977 2 38.7414 2 40C2 41.2586 2.06112 42.5023 2.18045 43.7285L1.18515 43.8253L0.189853 43.9222C0.064268 42.6318 0 41.3234 0 40ZM2.66957 51.3254L1.71253 51.6153C2.47897 54.1451 3.48926 56.5688 4.71604 58.8592L5.59756 58.3871L6.47907 57.9149C5.3138 55.7394 4.35439 53.4376 3.62661 51.0354L2.66957 51.3254ZM9.85105 64.7413L9.0784 65.3761C10.7416 67.4004 12.5996 69.2584 14.6239 70.9216L15.2587 70.1489L15.8935 69.3763C13.9699 67.7958 12.2042 66.0301 10.6237 64.1065L9.85105 64.7413ZM21.6129 74.4024L21.1408 75.284C23.4312 76.5107 25.8549 77.521 28.3847 78.2875L28.6746 77.3304L28.9646 76.3734C26.5624 75.6456 24.2607 74.6862 22.0851 73.5209L21.6129 74.4024ZM36.1747 78.8148L36.0778 79.8102C37.3682 79.9357 38.6766 80 40 80C41.3234 80 42.6318 79.9357 43.9222 79.8102L43.8253 78.8148L43.7285 77.8195C42.5023 77.9389 41.2586 78 40 78C38.7414 78 37.4977 77.9389 36.2715 77.8195L36.1747 78.8148ZM51.3254 77.3304L51.6153 78.2875C54.1451 77.521 56.5688 76.5107 58.8592 75.284L58.3871 74.4024L57.9149 73.5209C55.7394 74.6862 53.4376 75.6456 51.0354 76.3734L51.3254 77.3304ZM64.7413 70.1489L65.3761 70.9216C67.4004 69.2584 69.2584 67.4004 70.9216 65.3761L70.1489 64.7413L69.3763 64.1065C67.7958 66.0301 66.0301 67.7958 64.1065 69.3763L64.7413 70.1489ZM74.4024 58.3871L75.284 58.8592C76.5107 56.5688 77.521 54.1451 78.2875 51.6153L77.3304 51.3254L76.3734 51.0354C75.6456 53.4375 74.6862 55.7393 73.5209 57.9149L74.4024 58.3871Z"
                                                  fill="currentColor"></path>
                                             <circle cx="68" cy="12" r="12" fill="#5865f2"></circle>
                                             <path d="M73.3332 11.4075H68.5924V6.66675H67.4072V11.4075H62.6665V12.5927H67.4072V17.3334H68.5924V12.5927H73.3332V11.4075Z"
                                                  fill="white"></path>
                                             <path d="M40 29C37.794 29 36 30.794 36 33C36 35.207 37.794 37 40 37C42.206 37 44 35.207 44 33C44 30.795 42.206 29 40 29Z"
                                                  fill="currentColor"></path>
                                             <path d="M48 26.001H46.07C45.402 26.001 44.777 25.667 44.406 25.111L43.594 23.891C43.223 23.335 42.598 23 41.93 23H38.07C37.402 23 36.777 23.335 36.406 23.89L35.594 25.11C35.223 25.667 34.598 26 33.93 26H32C30.895 26 30 26.896 30 28V39C30 40.104 30.895 41 32 41H48C49.104 41 50 40.104 50 39V28C50 26.897 49.104 26.001 48 26.001ZM40 39C36.691 39 34 36.309 34 33C34 29.692 36.691 27 40 27C43.309 27 46 29.692 46 33C46 36.31 43.309 39 40 39Z"
                                                  fill="currentColor"></path>
                                             <path d="M24.6097 52.712V47.72H22.5457V52.736C22.5457 53.792 22.0777 54.404 21.1417 54.404C20.2177 54.404 19.7377 53.78 19.7377 52.712V47.72H17.6737V52.724C17.6737 55.04 19.0897 56.132 21.1177 56.132C23.1217 56.132 24.6097 55.016 24.6097 52.712ZM26.0314 56H28.0834V53.252H28.6114C30.6154 53.252 31.9474 52.292 31.9474 50.42C31.9474 48.62 30.7114 47.72 28.6954 47.72H26.0314V56ZM29.9554 50.456C29.9554 51.308 29.4514 51.704 28.5394 51.704H28.0594V49.268H28.5754C29.4874 49.268 29.9554 49.664 29.9554 50.456ZM37.8292 56L37.5532 54.224H35.0092V47.72H32.9572V56H37.8292ZM45.9558 51.848C45.9558 49.292 44.4078 47.564 42.0078 47.564C39.6078 47.564 38.0478 49.304 38.0478 51.872C38.0478 54.428 39.6078 56.156 41.9838 56.156C44.3958 56.156 45.9558 54.404 45.9558 51.848ZM43.8918 51.86C43.8918 53.504 43.1958 54.548 41.9958 54.548C40.8078 54.548 40.0998 53.504 40.0998 51.86C40.0998 50.216 40.8078 49.172 41.9958 49.172C43.1958 49.172 43.8918 50.216 43.8918 51.86ZM52.2916 56.084L54.3676 55.748L51.4876 47.684H49.2316L46.2556 56H48.2716L48.8236 54.284H51.6916L52.2916 56.084ZM50.2516 49.796L51.1756 52.676H49.3156L50.2516 49.796ZM62.5174 51.848C62.5174 49.388 61.0174 47.72 58.1374 47.72H55.2814V56H58.1854C60.9814 56 62.5174 54.308 62.5174 51.848ZM60.4534 51.86C60.4534 53.636 59.5414 54.404 58.0774 54.404H57.3334V49.316H58.0774C59.4814 49.316 60.4534 50.12 60.4534 51.86Z"
                                                  fill="currentColor"></path>
                                        </svg>
                                   </div>
                                   <div class="serverName">
                                        <span>
                                             SERVER NAME
                                        </span>
                                        <div class="inputArea">
                                             <input type="text" class="input" :placeholder="placeholderMes"
                                                  v-model="create_sname">
                                        </div>
                                   </div>
                              </div>

                              <div class="bottom">
                                   <div class="center">
                                        <span @click="returnAdd">Back</span>
                                        <button @click="sendToCreate">Create</button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

          </div>
     </Transition>
</template>

<script>
import { closeDialog } from '@/utils/openDialog';
import gsap from 'gsap';
import { getCurrentInstance, ref } from 'vue';
import store from '@/store';
import router from '@/router';

export default {
     setup() {
          const _this = getCurrentInstance()
          const APIs = _this.appContext.config.globalProperties.$API//获取全局绑定的API
          const { visible, close } = closeDialog("dialog");
          const tween = gsap.timeline()
          const back = gsap.timeline()
          const hostNickname = JSON.parse(localStorage.AccountStore).user.nickname
          const hostAvatar = JSON.parse(localStorage.AccountStore).user.avatar
          const hostUname = JSON.parse(localStorage.AccountStore).user.uname
          const hostUid = localStorage.user_id_cache
          const placeholderMes = hostNickname + "'s server"//提示语:创建的服务器默认名是$ {nickname}'s server $ 
          const create_sname = ref('')
          const default_sname = placeholderMes
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
               // if(create_sname.value == '') {
               //      sName = default_sname
               // }
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
                    if(imgData.code == 200) {
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
          return {
               tween, back, visible, close, closeInOut, toCreate, returnAdd, uploadImg, sendToCreate, _this, placeholderMes, create_sname
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
          width: 400px;
          height: 300px;
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
               display: flex;
               flex-direction: column;
               justify-content: space-between;
               position: relative;

               section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;

                    .text {
                         display: block;
                         width: 100%;
                         text-align: center;
                         color: #fff;
                    }

                    &:nth-child(1) {
                         .intro {
                              margin-top: 5px;

                              span {
                                   font-size: 18px;
                                   font-family: var(--nomal-font_family);
                              }

                              p {
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
                    }

                    &:nth-child(2) {
                         width: 105%;
                         position: absolute;
                         bottom: 0;
                         left: 50%;
                         transform: translateX(-50%);
                         height: 80px;
                         background-color: rgb(43, 45, 49);
                         display: flex;
                         justify-content: center;
                         align-items: center;

                         span {
                              font-family: var(--nomal-font_family);
                              margin-bottom: 5px;
                         }

                         button {
                              background-color: rgb(78, 80, 87);
                              border: 0;
                              outline: 0;
                              height: 35px;
                              border-radius: 5px;
                              width: 90%;
                              transition: .2s;

                              &:hover {
                                   background: rgb(97, 99, 106);
                                   cursor: pointer;
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