<template>
     <div class="main_page">
          <div class="leftList">
               <!-- 用户好友信息 -->
               <div class="myPrivate one">
                    <div ref="shell" class="shell" @click="goMyPrivacy(-1)">
                         <img src="../assets/logo/logo.png" alt="">
                         <div class="leftLine"></div>
                    </div>
                    <div class="splitLine"></div>
               </div>
               <!-- 用户自己的服务器列表 -->
               <div class="myServers template" v-show="users.userInfo.myServers.length != 0">
                    <div ref="test" class="item" :class="{ 'active': item.sAvatar == 'http://121.43.139.166/icon/logo.png' }"
                         v-for="(item, index) in users.userInfo.myServers" @click="goMyServer(item.sid, index)" :key="index">
                         <div class="leftLine"></div>
                         <img :src="item.sAvatar" alt="">
                         <div class="text">
                              <span>{{ item.sname }}</span>
                         </div>
                    </div>
                    <div class="splitLine"></div>
               </div>
               <!-- 用户所加入的服务器列表 -->
               <div class="joinedServers template">
                    <div class="item">
                         <div class="leftLine"></div>
                         <img src="../assets/temps/background.jpg" alt="">
                    </div>
                    <div class="splitLine"></div>
               </div>
               <!-- 基本功能列表 -->
               <div class="funcs one">
                    <div class="shell" @click="openAction">
                         <i class="iconfont icon-jiahao"></i>
                         <div class="leftLine"></div>
                    </div>
                    <div class="shell">
                         <!-- <img src="../assets/logo/logo.png" alt=""> -->
                         <i class="iconfont icon-browser"></i>
                         <div class="leftLine"></div>
                    </div>
                    <div class="leftLine"></div>
               </div>
          </div>
          <div class="userMes">
               <div class="userBasic" @click="isShowUser">
                    <img src="../assets/background/background2.png" alt="">
                    <div class="userTitles">
                         <span class="nickName">{{ store.state.users.userInfo.nickname }}</span>
                         <span class="userName">{{ store.state.users.userInfo.uname }}</span>
                    </div>
               </div>
               <div class="options">
                    <div class="setting">
                         <i class="iconfont icon-Settingscontroloptions"></i>
                    </div>
               </div>
               <div class="userCard" ref="userCardEl">
                    <div class="top"></div>
                    <img src="../assets/background/background2.png" alt="" class="avatar">
                    <div class="bottom">
                         <div class="board">
                              <div class="names one">
                                   <div class="userTitles">
                                        <span class="nickName">fishman_ultra</span>
                                        <span class="userName">xiaoyuren</span>
                                   </div>
                              </div>
                              <div class="registerTime one">
                                   <div class="timeText">
                                        <span class="text">CIRCLE REGISTER TIME</span>
                                        <span class="time">2023.11.12</span>
                                   </div>
                              </div>
                              <div class="designStatu one">
                                   <div class="statueOption">
                                        <div class="option1 optionE">
                                             <i class="iconfont icon-zhuangtai"></i>
                                             <i class="iconfont icon-jiantou_liebiaoxiangyou_o"></i>
                                             <div class="statusPanel">
                                                  <div class="online one">
                                                       <i class="iconfont icon-yuandianzhong"
                                                            style="color: rgb(34, 165, 89);"></i>
                                                       <span>online</span>
                                                       <div class="splitLine"></div>
                                                  </div>
                                                  <div class="idle one">
                                                       <i class="iconfont icon-yueliang"
                                                            style="color: rgb(223, 207, 81);"></i>
                                                       <span>idle</span>
                                                  </div>
                                                  <div class="noDisturb one">
                                                       <i class="iconfont icon-wurao" style="color: rgb(223, 81, 81);"></i>
                                                       <span>do not disturb</span>
                                                  </div>
                                                  <div class="stealth one">
                                                       <i class="iconfont icon-yuanquanxuanzhong"></i>
                                                       <span>stealth</span>
                                                  </div>
                                             </div>
                                        </div>
                                        <div class="option2 optionE">
                                             <i class="smile iconfont icon-iconzhengli-"></i>
                                             <span>CUSTOMIZE STATUS</span>
                                        </div>
                                        <!-- <span class="time">2023.11.12</span> -->
                                   </div>
                              </div>
                              <div class="swichAccounts one">
                                   <div class="swich">
                                        <span>
                                             SWICH ACCOUNT
                                        </span>
                                        <i class="iconfont icon-jiantou_liebiaoxiangyou_o"></i>
                                        <div class="accountPanel">
                                             <ul class="accounts">
                                                  <li>
                                                       <img src="../assets/background/background2.png" alt="">
                                                       <span class="userName">xiaoyuren</span>
                                                       <i class="iconfont icon-jiahao"></i>
                                                  </li>
                                                  <li>
                                                       <img src="../assets/background/background2.png" alt="">
                                                       <span class="userName">xiaoyuren</span>
                                                       <i class="iconfont icon-jiahao"></i>
                                                  </li>
                                             </ul>
                                             <div class="splitLine"></div>
                                             <div class="manage"><span>MANAGE YOUR ACCOUNTS</span></div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <router-view :key="new Date().getTime()"></router-view>
          <Dialog />
     </div>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/store';
import app from '../main'
import Dialog from '../pages/addServer.vue'
import { openDialog } from '../utils/openDialog'
import { mapState } from 'vuex';
import { useState } from '../hooks/useState'

//注册全局事件总线（引入第三方包）
import $bus from '@/utils/event_bus'
export default defineComponent({
     components: {
          Dialog
     },
     setup() {
          let wsClient = new WebSocket('ws://121.43.139.166:9000')
          app.config.globalProperties.$wss = wsClient
          let useMap = useState(['users'], mapState)
          const HIGHLIGNT = 'highlight'
          const HIGHLIGNTDEFAULT = 'highlightDefault'
          const ACTIVE = 'active'
          const router = useRouter()
          const _this = getCurrentInstance()//获取this
          //用户信息变量
          document.documentElement.style.overflow = "hidden";
          //处理左下角的用户面板点击显示
          const isShowUser = () => {
               _this.refs.userCardEl.classList.toggle(ACTIVE)
          };
          //选中后持续保持高亮
          const getHighLight = (index) => {
               //取消所有的样式
               _this.refs.shell.classList.remove(HIGHLIGNTDEFAULT)
               if(_this.refs.test !== undefined) {
                    for (let i = 0; i < _this.refs.test.length; i++) {
                    if (_this.refs.test[i].classList.contains('active')) {
                         _this.refs.test[i].classList.remove(HIGHLIGNTDEFAULT)
                    } else {
                         _this.refs.test[i].classList.remove(HIGHLIGNT)
                    }

               }
               }
               
               //针对打开用户所选择的样式
               if (index == -1) {
                    _this.refs.shell.classList.add(HIGHLIGNTDEFAULT)
                    return
               }
               if (_this.refs.test[index].classList.contains('active')) {
                    _this.refs.test[index].classList.add(HIGHLIGNTDEFAULT)
               } else {
                    _this.refs.test[index].classList.add(HIGHLIGNT)
               }
          }
          //跳转到个人
          const goMyPrivacy = (index) => {
               router.push('/channels/@me')
               getHighLight(index)
          }
          //跳转到所加入的服务器
          const goServer = () => {
               router.push('/channels/server/1')
          }
          //登录进入channel页面后获取用户的基本资料
          const getUserInfo = async () => {
               if(!store.state.users.userInfo.uname) {
                    let uid = localStorage.user_id_cache
                    await store.dispatch('getUserInfo', uid)
               }
          }
          //打开用户自己创建的服务器
          const goMyServer = (sid, index) => {
               console.log(sid, '我是点击后的sid');
               router.push(`/channels/server/${sid}`)
               getHighLight(index)
          }
          //获取用户基本资料  
          getUserInfo()
          //获取请求好友状态
          store.dispatch('freq', JSON.parse(localStorage.AccountStore).user.uname)
          //建立socket连接时触发 
          let onOpen = () => function onOpen() {
               let authentication = {
                    type: 'auth',
                    token: localStorage.token,
                    uid: localStorage.user_id_cache,
               }
               wsClient.send(JSON.stringify(authentication))
          }
          //断开socket服务器连接时触发
          let onClose = () => function onClose() {
               localStorage.removeItem('token')
               localStorage.removeItem('user_id_cache')
               router.push('/login')
               console.log('ws连接断开');
               return console.log("%c%s", 'color: red;font-size:17px', 'connection break');
          }
          //接收socket服务器的信息时触发
          let onMessage = (event) => function onMessage(event) {
               let message = JSON.parse(event.data)
               if (message.type == 'personalChat') {
                    let pid = store.state.middleData.pid
                    let data = {
                         content: message.content,
                         fromUid: message.fromUid,
                         nickname: message.nickname
                    }
                    store.commit('SENDLOCALMES', { data, pid })
                    //触发pm页面是否消息框滑至底部
                    $bus.emit('tobottom')
               }
               if (message.type == 'incomingReq') {
                    // console.log(message);
                    store.state.freq.incomingList.unshift({
                         avatar: message.avatar,
                         uname: message.uname,
                         fromWhoUid: message.fromWhoUid  //发起添加好友的人的UID
                    })
               }                         
               if (message.type == 'acceptSuccess') {
                    console.log(message);
                    store.commit('REMOVEINCOMING', message.fromWho)
                    store.commit('ADDFRIENDS', { uName: message.fromWho, avatar: message.fromWhoAvatar, uid: message.fromWhoUid })
               }
               if (message.type == 'freqAccepted') {
                    console.log(message, '&&&&&');
                    store.commit('REMOVEOUTGOING', message.whoAccept)
                    store.commit('ADDFRIENDS', { uName: message.whoAcceptUname, avatar: message.whoAcceptAvatar, uid: message.whoAcceptUid })
               }
          }
          const { openAction } = openDialog('dialog')
          onMounted(() => {
               wsClient.onopen = onOpen()
               // wsClient.onmessage = onMessage()
               wsClient.onclose = onClose()
               wsClient.onmessage = onMessage()
          })
          return { isShowUser, goMyPrivacy, goServer, store, ...useMap, openAction, goMyServer, getHighLight }
     },
})
</script>

<style lang="less" scoped>
.main_page {
     width: 100vw;
     height: 100vh;
     display: flex;
     position: relative;

     .leftList {
          min-height: 100vh;
          width: 70px;
          background-color: rgb(30, 31, 34);
          display: flex;
          flex-direction: column;
          overflow: scroll;
          .one {
               width: 100%;
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: center;
               cursor: pointer;
               position: relative;

               .shell {

                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgb(48, 51, 56);

                    img {
                         width: 60%;
                    }

                    &:hover {
                         transition: .3s;
                         background-color: rgb(87, 100, 242);
                         border-radius: 30%;
                    }

                    .leftLine {
                         position: absolute;
                         left: 0;
                         width: 3px;
                         height: 0px;
                         border-radius: 30%;
                         background-color: #ffffff;
                         transition: .3s;
                    }
               }


               .splitLine {
                    height: 10px;
                    width: 40px;
                    border-bottom: 2px solid rgb(48, 51, 56); //34,165,89
               }

          }

          .myPrivate {
               height: 80px;

               .shell {
                    &:hover {
                         .leftLine {
                              height: 20px;
                         }
                    }
               }

               .highlightDefault {
                    border-radius: 30%;
                    background-color: rgb(87, 100, 242);

                    .leftLine {
                         height: 25px;
                         background-color: rgb(87, 100, 242);
                    }
               }
          }



          .template {
               width: 100%;
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: center;
               margin-bottom: 10px;

               .item {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    cursor: pointer;
                    // padding-bottom: 10px;
                    margin-bottom: 10px;

                    span {
                         display: none;
                    }

                    // border-left: 2px solid #fff;
                    .leftLine {
                         position: absolute;
                         left: 0;
                         width: 3px;
                         height: 10px;
                         border-radius: 30%;
                         background-color: #fff;
                         transition: .3s;
                    }

                    img {
                         width: 50px;
                         height: 50px;
                         object-fit: cover;
                         border-radius: 50%;
                         transition: .3s;
                    }

                    &:hover {
                         .leftLine {
                              height: 20px;
                         }

                         img {
                              border-radius: 30%;
                         }
                    }
               }


               .active {
                    width: 50px;
                    background-color: rgb(48, 51, 56);
                    border-radius: 50%;
                    height: 50px;
                    text-align: center;

                    // overflow: hidden;
                    &:hover {
                         transition: .3s;
                         background-color: rgb(87, 100, 242);
                         border-radius: 30%;
                    }

                    .leftLine {
                         left: -10px;
                    }

                    img {
                         opacity: 0.5;
                         width: 30px;
                         height: 30px;
                         object-fit: cover;
                         border-radius: 50%;
                         transition: .3s;
                    }

                    .text {

                         // width: 50px;
                         // height: 50px;
                         // overflow: hidden;
                         // position: relative;
                         // left: 50%;
                         // top: 50%;
                         // transform: translate(-50%, -50%);
                         span {
                              position: absolute;
                              left: 50%;
                              top: 50%;
                              transform: translate(-50%, -50%);
                              display: block;
                              color: #fff;
                              font-family: var(--nomal-font_family);
                              width: 50px;
                              overflow: hidden;
                              text-wrap: nowrap;
                         }
                    }

               }

               .highlight {
                    .leftLine {
                         height: 25px;
                         background-color: rgb(87, 100, 242);
                    }

                    img {
                         border-radius: 30%;
                    }
               }

               .highlightDefault {
                    border-radius: 30%;
                    background-color: rgb(87, 100, 242);

                    .leftLine {
                         height: 25px;
                         background-color: rgb(87, 100, 242);
                    }
               }

               .splitLine {
                    // padding-top: 10px;
                    height: 1px;
                    width: 40px;
                    border-bottom: 2px solid rgb(48, 51, 56);
               }
          }

          .funcs {
               margin-bottom: 30px;
               row-gap: 8px;

               .shell {
                    i {
                         font-size: 25px;
                         color: rgb(34, 165, 89);
                    }

                    // position: relative;
                    &:hover {
                         .leftLine {
                              height: 20px;
                         }

                         i {
                              color: #fff;
                         }

                         background-color: rgb(34, 165, 89);

                    }

                    .leftLine {
                         position: absolute;
                         left: 0;
                         width: 3px;
                         height: 0px;
                         border-radius: 30%;
                         background-color: rgb(34, 165, 89);
                         transition: .3s;
                    }
               }
          }

     }

     .userMes {
          width: 240px;
          height: 50px;
          background-color: rgb(34, 36, 40);
          position: absolute;
          bottom: 0;
          left: 70px;

          .userBasic {
               // border: 1px solid #fff;
               width: 120px;
               border-radius: 6px;
               height: 90%;
               position: absolute;
               top: 50%;
               left: 10px;
               transform: translateY(-50%);
               display: flex;
               justify-content: center;
               column-gap: 10px;
               align-items: center;
               transition: .3s;
               cursor: pointer;

               &:hover {
                    background-color: rgb(61, 62, 69);
               }

               img {
                    // margin-left: 5px;
                    width: 30px;
                    height: 30px;
                    object-fit: cover;
                    border-radius: 50%;
               }

               .userTitles {
                    // border: 1px solid #fff;
                    height: 75%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;

                    span {
                         color: #fff;
                         font-family: var(Poppins-Medium);
                         font-size: 12px;
                         line-height: 15px;
                         width: 75px;
                         height: 20px;
                         overflow-y: hidden;
                         text-overflow: ellipsis;
                    }

                    .nickName {
                         font-size: 13.5px;
                    }

                    // align-items: center;
               }
          }

          .options {
               position: absolute;
               top: 50%;
               right: 0px;
               transform: translate(-50%, -50%);

               .setting {
                    height: 30px;
                    width: 30px;
                    border-radius: 5px;
                    transition: .5s;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &:hover {
                         background-color: rgb(61, 62, 69);
                    }

                    i {
                         font-size: 20px;
                         color: #fff;
                    }
               }
          }

          .userCard {
               z-index: 2;
               width: 330px;
               height: 380px;
               position: absolute;
               background-color: rgb(35, 36, 40);
               bottom: 70px;
               left: -20px;
               border-radius: 10px;
               // overflow:hidden;
               box-shadow: 0.5px 0.5px 10px #898888;
               display: none;

               img {
                    width: 90px;
                    height: 90px;
                    border-radius: 50%;
                    border: 6px solid rgb(35, 36, 40);
                    position: absolute;
                    top: calc(60px - 45px);
                    left: 20px;
                    z-index: 1;
               }

               .top {
                    // border-radius: 5px;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                    width: 100%;
                    height: 60px;
                    background-color: #e39f9f;
               }

               .bottom {
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                    width: 100%;
                    height: calc(100% - 60px);
                    background-color: rgb(35, 36, 40);
                    position: relative;

                    .board {
                         position: absolute;
                         top: 50px;
                         width: 90%;
                         height: 80%;
                         left: 50%;
                         transform: translateX(-50%);
                         border-radius: 8px;
                         background-color: rgb(17, 18, 20);

                         .one {
                              width: 100%;
                              color: #d2d1d1;
                              font-family: var(--nomal-font_family);
                         }

                         .names {
                              height: 24%;
                              border-bottom: 1px solid #6b6969;

                              .userTitles {
                                   width: 90%;
                                   height: 100%;
                                   margin: 0 auto;
                                   display: flex;
                                   flex-direction: column;
                                   justify-content: center;

                                   .nickName {
                                        font-family: Montserrat-BlackItalic;
                                        font-size: var(--initTextFontSize);
                                   }

                                   .userName {
                                        font-size: 14px;
                                   }
                              }

                         }

                         .registerTime {
                              height: 24%;
                              width: 90%;
                              margin: 0 auto;
                              border-bottom: 1px solid #6b6969;

                              .timeText {
                                   width: 110%;
                                   height: 100%;
                                   margin: 0 auto;
                                   display: flex;
                                   flex-direction: column;
                                   justify-content: center;

                                   .text {}

                                   .time {
                                        font-size: 14px;
                                   }
                              }
                         }

                         .designStatu {
                              width: 90%;
                              margin: 0 auto;
                              height: 32%;
                              border-bottom: 1px solid #6b6969;
                              display: flex;
                              justify-content: center;
                              align-items: center;

                              .statueOption {
                                   width: 110%;
                                   height: 80%;
                                   margin: 0 auto;
                                   display: flex;
                                   flex-direction: column;
                                   justify-content: center;

                                   // overflow: hidden;
                                   // background-color: #fff;
                                   .optionE {
                                        height: 50%;
                                        width: 100%;
                                        transition: .3s;
                                        border-radius: 5px;
                                        cursor: pointer;
                                        display: flex;
                                        align-items: center;

                                        // justify-content: space-between;
                                        &:hover {
                                             .statusPanel {
                                                  display: flex;
                                             }

                                             background-color: #2a2828;
                                        }

                                        .smile {
                                             font-size: 20px;
                                             margin-right: 10px;
                                        }

                                   }

                                   .option1 {
                                        justify-content: space-between;
                                        position: relative;
                                        width: 100%;

                                        &::after {
                                             position: absolute;
                                             left: 265px;
                                             content: '';
                                             width: 30px;
                                             height: 120px;
                                             // border: 1px solid #fff;
                                        }

                                        .statusPanel {
                                             border-radius: 8px;
                                             min-width: 300px;
                                             height: 220px;
                                             position: absolute;
                                             background-color: rgb(17, 18, 20);
                                             left: 282px;
                                             top: -30px;
                                             margin-left: 10px;
                                             display: none;
                                             flex-direction: column;
                                             justify-content: space-around;
                                             row-gap: 10px;
                                             padding: 30px 0;

                                             .online {
                                                  position: relative;

                                                  .splitLine {
                                                       position: absolute;
                                                       bottom: -5px;
                                                       left: 50%;
                                                       transform: translateX(-50%);
                                                       width: 90%;
                                                       height: 1px;
                                                       background-color: #858484;
                                                       // margin-bottom: 5px;
                                                  }
                                             }

                                             .one {
                                                  width: 90%;
                                                  margin: 0 auto;
                                                  height: 40px;
                                                  border-radius: 5px;
                                                  display: flex;
                                                  align-items: center;

                                                  i {
                                                       height: 40px;
                                                       line-height: 40px;
                                                       font-size: 18px;
                                                       display: block;
                                                       text-align: center;
                                                       margin-right: 10px;
                                                       padding-left: 10px;
                                                  }

                                                  span {
                                                       height: 100%;
                                                       line-height: 40px;
                                                  }

                                                  &:hover {
                                                       background-color: rgb(87, 100, 242);

                                                       i {
                                                            color: #fff !important;
                                                       }
                                                  }

                                                  // border: 1px solid #fff;
                                             }
                                        }
                                   }
                              }
                         }

                         .swichAccounts {
                              height: 20%;
                              width: 90%;
                              margin: 0 auto;
                              display: flex;
                              align-items: center;
                              position: relative;

                              .swich {
                                   width: 100%;
                                   height: 80%;
                                   margin: 0 auto;
                                   display: flex;
                                   align-items: center;
                                   justify-content: space-between;
                                   border-radius: 5px;
                                   transition: .3s;
                                   position: relative;
                                   cursor: pointer;

                                   &:hover {
                                        background-color: #2a2828;

                                        .accountPanel {
                                             display: flex;
                                        }
                                   }

                                   span {
                                        padding-left: 10px;
                                        font-size: 15px;
                                   }

                                   i {
                                        font-size: 20px;
                                   }

                                   &::after {
                                        position: absolute;
                                        content: '';
                                        width: 25px;
                                        height: 45px;
                                        top: -5px;
                                        left: 268px;
                                        // background-color: #fff;
                                   }
                              }

                              .accountPanel {
                                   position: absolute;
                                   width: 200px;
                                   min-height: 80px;
                                   background-color: rgb(17, 18, 20);
                                   left: 282px;
                                   bottom: -35px;
                                   margin-left: 10px;
                                   display: none;
                                   flex-direction: column;
                                   align-items: center;
                                   border-radius: 8px;

                                   .accounts {
                                        margin-top: 5px;
                                        width: 100%;
                                        min-height: 50px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: center;
                                        align-items: center;
                                        row-gap: 5px;

                                        li {
                                             width: 95%;
                                             height: 40px;
                                             // border: 1px solid blue;
                                             display: flex;
                                             align-items: center;
                                             border-radius: 5px;
                                             transition: .3s;

                                             // justify-content: space-around;
                                             img {
                                                  position: static;
                                                  border: none;
                                                  width: 30px;
                                                  height: 30px;
                                                  margin-left: 5px;
                                             }

                                             span {}

                                             i {
                                                  padding-left: 40px;
                                             }

                                             &:hover {
                                                  background-color: rgb(87, 100, 242);
                                             }
                                        }
                                   }

                                   .splitLine {
                                        bottom: -5px;
                                        left: 50%;
                                        width: 90%;
                                        height: 1px;
                                        background-color: #858484;
                                        margin-top: 5px;
                                   }

                                   .manage {
                                        height: 40px;
                                        margin-block: 5px;
                                        width: 95%;

                                        transition: .3s;
                                        border-radius: 5px;

                                        span {
                                             height: 40px;
                                             line-height: 40px;
                                             font-size: 12px;
                                        }

                                        &:hover {
                                             background-color: rgb(87, 100, 242);
                                        }
                                   }
                              }
                         }
                    }
               }
          }

          .active {
               display: block;
          }
     }
}
</style>