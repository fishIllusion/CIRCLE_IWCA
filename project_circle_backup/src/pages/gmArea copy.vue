<template>
     <div class="right">
          <div class="roomNavs">
               <div class="middle">
                    <div class="roomName one">
                         <span>#AZUR LANE</span>
                    </div>
                    <div class="taps one"></div>
               </div>
          </div>
          <!-- <div class="displayArea">
               <div class="chatArea" id="chatArea" ref="chatArea">
                    <div class="welcome">
                         <img src="../assets/background/background2.png" alt="">
                         <span class="nickName">Welcome to #AZUR LANE</span>
                         <p class="welcomes">This is the start of #AZUR LANE Channels</p>
                    </div>
                    <div class="split"></div>
                    <ul class="chatList">
                         <li class="oneMes">
                              <div class="leftPart">
                                   <img src="../assets/background/background2.png" alt="" class="avatar">
                              </div>
                              <div class="rightPart">
                                   <div class="basicMes">
                                        <span class="nickName">fishman_ultra</span>
                                        <span class="sendTime">Today at 3.41PM</span>
                                   </div>
                                   <div class="sendContent">
                                        <span>its fucking cool!</span>
                                   </div>
                              </div>

                         </li>
                    </ul>
               </div>
          </div> -->
          <div class="chatArea one" id="chatArea" ref="chatArea">
               <div class="welcome">
                    <img src="../assets/background/background2.png" alt="">
                    <span class="nickName">Welcome to #AZUR LANE</span>
                    <p class="welcomes">This is the start of #AZUR LANE Channels</p>
               </div>
               <div class="split"></div>
               <ul class="chatList">
                    <li class="oneMes">
                         <div class="leftPart">
                              <img src="../assets/background/background2.png" alt="" class="avatar">
                         </div>
                         <div class="rightPart">
                              <div class="basicMes">
                                   <span class="nickName">fishman_ultra</span>
                                   <span class="sendTime">Today at 3.41PM</span>
                              </div>
                              <div class="sendContent">
                                   <span>its fucking cool!</span>
                              </div>
                         </div>

                    </li>
                    <li class="oneMes">
                         <div class="leftPart">
                              <img src="../assets/background/background2.png" alt="" class="avatar">
                         </div>
                         <div class="rightPart">
                              <div class="basicMes">
                                   <span class="nickName">fishman_ultra</span>
                                   <span class="sendTime">Today at 3.41PM</span>
                              </div>
                              <div class="sendContent">
                                   <span>its fucking cool!</span>
                              </div>
                         </div>

                    </li>
                    <li class="oneMes">
                         <div class="leftPart">
                              <img src="../assets/background/background2.png" alt="" class="avatar">
                         </div>
                         <div class="rightPart">
                              <div class="basicMes">
                                   <span class="nickName">fishman_ultra</span>
                                   <span class="sendTime">Today at 3.41PM</span>
                              </div>
                              <div class="sendContent">
                                   <span>its fucking cool!</span>
                              </div>
                         </div>

                    </li>
                    <li class="oneMes">
                         <div class="leftPart">
                              <img src="../assets/background/background2.png" alt="" class="avatar">
                         </div>
                         <div class="rightPart">
                              <div class="basicMes">
                                   <span class="nickName">fishman_ultra</span>
                                   <span class="sendTime">Today at 3.41PM</span>
                              </div>
                              <div class="sendContent">
                                   <span>its fucking cool!</span>
                              </div>
                         </div>

                    </li>
                    <li class="oneMes">
                         <div class="leftPart">
                              <img src="../assets/background/background2.png" alt="" class="avatar">
                         </div>
                         <div class="rightPart">
                              <div class="basicMes">
                                   <span class="nickName">fishman_ultra</span>
                                   <span class="sendTime">Today at 3.41PM</span>
                              </div>
                              <div class="sendContent">
                                   <span>its fucking cool!</span>
                              </div>
                         </div>

                    </li>
                    <li class="oneMes">
                         <div class="leftPart">
                              <img src="../assets/background/background2.png" alt="" class="avatar">
                         </div>
                         <div class="rightPart">
                              <div class="basicMes">
                                   <span class="nickName">fishman_ultra</span>
                                   <span class="sendTime">Today at 3.41PM</span>
                              </div>
                              <div class="sendContent">
                                   <span>its fucking cool!</span>
                              </div>
                         </div>

                    </li>
                    <li class="oneMes">
                         <div class="leftPart">
                              <img src="../assets/background/background2.png" alt="" class="avatar">
                         </div>
                         <div class="rightPart">
                              <div class="basicMes">
                                   <span class="nickName">fishman_ultra</span>
                                   <span class="sendTime">Today at 3.41PM</span>
                              </div>
                              <div class="sendContent">
                                   <span>its fucking cool!</span>
                              </div>
                         </div>

                    </li>
               </ul>
          </div>
          <div class="sendMes one" ref="parent" id="parent">
               <div class="wrap">
                    <div class="outFile">
                         <i class="iconfont icon-jiahao"></i>
                    </div>
               </div>
               <p @keypress.enter="keySend($event)" v-on:input="getInput" id="child" ref="child" class="input"
                    contenteditable="plaintext-only" placeholder="Message #AZUR LANE">
               </p>
          </div>
     </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from 'vue'
import store from '@/store'
// import { mapState } from 'vuex';
// import { useState } from '../hooks/useState'
export default {
     setup() {
          const _this = getCurrentInstance()
          let content = ref('')
          let isScroll = false
          const hostName = JSON.parse(localStorage.AccountStore).user.nickname
          const hostAvatar = JSON.parse(localStorage.AccountStore).user.avatar

          //使消息框滑至最底部(只进行滑动，不做其他操作)
          const onlySlide = () => {
               setTimeout(() => {
                    _this.refs.chatArea.scrollTop = _this.refs.chatArea.scrollHeight
               }, 0);
          }
          //使消息框滑至最底部(动态滑动)
          const slideToBottom = async () => {
               setTimeout(() => {
                    _this.refs.chatArea.scrollTop = _this.refs.chatArea.scrollHeight
                    document.getElementById('parent').style.height = _this.refs.child.offsetHeight + 'px'
                    document.getElementById('chatArea').style.height = ((document.body.clientHeight - 48) * 0.96 - 33 - _this.refs.child.offsetHeight - 4) + 'px'
               }, 0);
          }
          //当输入的信息超过输入框的高度限制后触发
          const limitHeight = () => {
               let currentHeight = _this.refs.child.offsetHeight //子元素的当前高度
               let parentHeight = _this.refs.parent.offsetHeight            //父元素的当前高度
               if (_this.refs.chatArea.scrollTop + _this.refs.chatArea.offsetHeight + 2 >= _this.refs.chatArea.scrollHeight) {
                    isScroll = true
               } else {
                    isScroll = false
               }
               // console.log(_this.refs.chatArea.scrollTop+_this.refs.chatArea.offsetHeight, _this.refs.chatArea.scrollHeight);
               if (parentHeight !== currentHeight - 0.5) {
                    document.getElementById('parent').style.height = currentHeight + 'px'
                    document.getElementById('chatArea').style.height = ((document.body.clientHeight - 48) * 0.96 - 33 - currentHeight - 4) + 'px'
                    if (isScroll) {
                         _this.refs.chatArea.scrollTop = _this.refs.chatArea.scrollHeight
                    }
               }
          }
          //用户输入时触发
          const getInput = () => {
               content = child.innerHTML
               limitHeight()
          }
          //发送消息函数
          const send = () => {
               let data = {
                    content,
                    fromUid: localStorage.user_id_cache,
                    avatar: hostAvatar,
                    nickname: hostName
               }
               store.commit('SENDLOCALMES', { data, pid })
               slideToBottom()
               let mes = {
                    type: 'personalChat',
                    pid,
                    content,
                    toUid: localStorage.privateChatUid,
                    hostName: hostName,
                    avatar: hostAvatar,
                    fromUid: localStorage.user_id_cache
               }
               // console.log(mes);
               wss.send(JSON.stringify(mes))
          }
          //按下回车发送信息
          const keySend = (Event) => {
               console.log(111);
               //禁止默认回车
               Event.preventDefault()
               if (content.value == '' || child.innerHTML == '') {
                    return false
               }
               send()
               child.innerHTML = ''
               content = ''
          }
          onMounted(() => {

          })

          return { getInput, content, keySend, }
     }
}
</script>

<style lang="less" scoped>
.right {
     width: calc(100vw - 70px - 240px);
     border: 1px solid #fff;
     height: 100vh;
     background-color: rgb(49, 51, 56);
     position: relative;
     z-index: 1;

     .roomNavs {
          width: 100%;
          height: 48px;
          border-bottom: 1px solid rgb(29, 29, 29);

          .middle {
               height: 48px;
               margin: 0 auto;
               width: 95%;
               display: flex;
               justify-content: space-between;
               align-items: center;

               .one {
                    height: 40px;
                    // border: 1px solid #fff;
               }

               .roomName {
                    min-width: 300px;

                    span {
                         height: 40px;
                         line-height: 40px;
                         color: #fff;
                         font-family: var(--nomal-font_family);
                         font-size: 14px;
                    }
               }

               .taps {
                    min-width: 50%;
               }
          }

     }

     // .displayArea {
     //      border: 1px solid #fff;
     //      display: flex;
     //      justify-content: space-around;
     //      width: 100%;
     //      height: calc(96% - 48px - 66px - 18px);
     // }

     

     .chatArea {
          width: 80%;
          // border: 1px solid #fff;
          height: calc(96% - 48px - 66px - 18px);
          // height: 100%;
          overflow: scroll;

          .welcome {
               display: flex;
               flex-direction: column;

               img {
                    margin: 15px 0;
                    width: 65px;
                    height: 65px;
                    border-radius: 50%;
               }

               span {
                    color: #fff;
                    font-family: var(--nomal-font_family);
               }

               .nickName {
                    font-size: 30px;
               }

               .userName {
                    font-size: 1.4rem;
                    margin: 10px 0;
               }

               p {
                    color: #b4b4b4;
                    font-weight: 500;
               }
          }

          .split {
               width: 100%;
               height: 1px;
               background-color: #fff;
               margin: 20px 0;
          }

          .chatList {
               width: 100%;
               min-height: 0;

               .oneMes {
                    display: flex;
                    margin-top: 20px;

                    .leftPart {
                         height: inherit;

                         img {
                              width: 40px;
                              height: 40px;
                              object-fit: cover;
                              border-radius: 50%;

                         }
                    }

                    .rightPart {
                         padding-left: 15px;
                         height: 80%;
                         display: flex;
                         flex-direction: column;
                         justify-content: center;

                         .basicMes {
                              min-height: 20px;

                              .nickName {
                                   color: rgb(47, 201, 112);
                                   font-family: var(--nomal-font_family);
                                   margin-right: 10px;
                              }

                              .sendTime {
                                   color: #6f6e6e;
                                   font-size: 12px;
                              }
                         }

                         .sendContent {
                              color: #fff;
                         }
                    }
               }
          }
     }

     .one {
          margin: 0 auto;
          width: 95%;
     }
     .sendMes {
          min-height: 44px;
          border-radius: 8px;
          box-shadow: 1px 1px 5px rgb(45, 45, 45);
          background-color: rgb(56, 58, 64);
          position: absolute;
          bottom: 6%;
          left: 50%;
          transform: translateX(-50%);

          .wrap {
               min-height: 44px;
               // border: 1px solid #fff;
               width: 100%;
               position: relative;

               .outFile {
                    position: absolute;
                    top: 50%;
                    left: 40px;
                    transform: translate(-50%, -50%);
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    background-color: #a2a0a0;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    i {
                         font-size: 20px;
                         font-weight: bolder;
                         color: #2c2c2c;
                    }
               }
          }

          .input {
               // border: 1px solid #fff;
               width: 60%;
               min-height: 44px;
               position: absolute;
               left: 70px;
               bottom: 50%;
               transform: translateY(50%);
               color: #fff;
               outline: none;
               line-height: 44px;
               max-height: 40vh;
               overflow: scroll;

               &:empty:before {
                    content: attr(placeholder);
                    color: #ccc;
                    font-family: var(--nomal-font_family);
               }
          }
     }
}
</style>