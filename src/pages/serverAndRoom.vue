<template>
     <div class="myPrivacy" id="testPC">
          <div class="left">
               <div class="serverName">
                    <div class="wrap">
                         <span>{{ serverDetails.servers[sid].sName }}</span>
                         <!-- <span>{{ middleData.serverName }}</span> -->
                         <img src="../assets/init-icon-pics/arrow-down-s-line.png" alt="">
                    </div>
               </div>
               <!-- 设置聊天分类 -->
               <!-- v-if="serverDetails.servers[sid]" -->
               <div class="roomGroup" v-for="(item, Index) in serverDetails.servers[sid].catagory" :key="Index">
                    <div class="groupName">
                         <img src="../assets/init-icon-pics/arrow-down-s-line.png" alt="">
                         <span>{{ item.cname }}</span>
                    </div>
                    <div class="groups">
                         <div class="container" v-for="(element, index) in item.hideGroups" :key="index">
                              <div class="room" @click="goMes(111, Index, index)" @contextmenu.prevent="openMenu">
                                   <span>{{ element.gname }}</span>
                                   <i class="iconfont icon-yaoqing" @click="openAction"></i>
                              </div>
                         </div>
                         <div class="split" v-show="serverDetails.servers[sid].directGroups.length != 0"></div>
                    </div>
               </div>
               <!-- 直接聊天室 -->
               <!-- v-if="serverDetails.servers[sid].directGroups.length != 0" -->
               <div class="container_single" v-if="serverDetails.servers[sid].directGroups.length != 0">
                    <div class="room" v-for="(item, index) in serverDetails.servers[sid].directGroups">
                         <span>#AZUR LANE</span>
                    </div>
               </div>
          </div>
          <div class="right">
               <router-view></router-view>
          </div>
          <inviteDialog />
     </div>
</template>

<script>
import { useRouter } from 'vue-router'
import store from '@/store';
import { mapState } from 'vuex';
import { useState } from '../hooks/useState'
import { openContextMenu } from '@/utils/openMenu';
import { onMounted, reactive } from 'vue';
import inviteDialog from '../pages/invite.vue'
import { openInvite } from '../utils/openDialog'
import $bus from '@/utils/event_bus'

export default {
     components: {
          inviteDialog
     },
     setup() {
          const { isOpen, openMenu, closeMenu } = openContextMenu()
          const router = useRouter()
          let useMap = useState(['serverDetails', 'middleData'], mapState)//获取store中存储的数据
          const sid = router.currentRoute.value.params.sid //获取服务器的sid
          const { openAction } = openInvite('invite')
          //定义该组件的方法
          const methods = {
               //获取当前服务器的信息
               getServerInfo(sid) {
                    console.log(store.state.serverDetails.servers[sid]);
                    let num = 0
                    for (let i in store.state.serverDetails.servers[sid]) {
                         num++
                    }
                    if (num == 2) {
                         // console.log(store.state.serverDetails.servers[sid]);
                         store.dispatch('getServerInfo', sid)
                    }
               },
               goMes(gid, catagoryIndex, hidegroupIndex) {
                    store.commit('GETINDEXES', { catagoryIndex, hidegroupIndex })
                    localStorage.GlobalBaseInfo = JSON.stringify({ catagoryIndex, hidegroupIndex })
                    
                    router.push({
                         path: `/channels/server/${sid}/${gid}`,
                    })
               },
               rightClick(event) {
                    event.preventDefault();
                    let x = event.clientX;
                    let y = event.clientY;
                    console.log(x, y);
               }
          }
          methods.getServerInfo(sid)
          onMounted(() => {
               //当点击非gr_container的元素时，关闭黑窗口
               window.onclick = (e) => {
                    if (e.srcElement.className != 'gr_container' && e.srcElement.className.indexOf('justOpen') == -1) {
                         closeMenu()    
                    }
               }
               window.oncontextmenu = (e) => {
                    if(e.srcElement.className == 'room') {
                         return 
                    }
                    else{
                         e.preventDefault()
                         closeMenu()
                    }
               }
               $bus.on('showDialog', () => {
                    openAction()
                    closeMenu()
               })
          })
          // const goMes = (gid) => {
          //      // let pid = uid < hostid?(uid + hostid):(hostid + uid)
          //      // console.log(router.currentRoute.value.params);
          //      router.push(`/channels/server/${sid}/${gid}`)
          // }
          return {
               ...useMap, ...methods, sid, store, openContextMenu, isOpen, openMenu, closeMenu, openAction
          }

     }
}
</script>

<style lang="less" scoped>
.myPrivacy {
     width: calc(100vw - 70px);
     height: 100vh;
     display: flex;

     // position: relative;
     .left {
          width: 240px;
          height: calc(100vh - 40px);
          background-color: rgb(43, 45, 49);

          .serverName {
               width: 100%;
               height: 48px;
               border-bottom: 1px solid rgb(29, 29, 29);
               display: flex;
               justify-content: center;
               align-items: center;
               margin-bottom: 10px;

               .wrap {
                    width: 85%;
                    height: 95%;
                    // border: 1px solid #fff;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #fff;
                    font-family: var(--nomal-font_family);
               }
          }

          .roomGroup {
               width: 100%;

               .groupName {
                    transition: .2s;
                    width: 90%;
                    height: 24px;
                    color: rgb(148, 156, 164);
                    display: flex;
                    align-items: center;
                    cursor: pointer;

                    &:hover {
                         color: #fff;
                    }

                    img {
                         width: 24px;
                         padding-left: 5px;
                         // transform: rotateZ(270deg);
                    }

                    span {
                         height: 24px;
                         line-height: 24px;
                         font-family: Montserrat-BlackItalic;
                    }
               }

               .groups {

                    margin-top: 5px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    .container {
                         width: 90%;
                         height: 35px;
                         display: flex;
                         justify-content: center;
                         align-items: center;
                         border-radius: 5px;
                         transition: .2s;
                         cursor: pointer;
                         &:hover {
                              background-color: rgb(72, 73, 74);

                              .room {
                                   color: #fff;
                              }
                         }

                         .room {
                              width: 90%;
                              font-family: var(--nomal-font_family);
                              color: rgb(149, 150, 155);
                              display: flex;
                              justify-content: space-between;
                              align-items: center;
                              i {
                                   transition: .3s;
                                   &:hover {
                                        font-size: 18px;
                                   }
                              }
                         }
                    }


                    .split {
                         width: 90%;
                         height: 1px;
                         background-color: rgb(100, 102, 105);
                         margin: 10px 0;
                    }
               }
          }

          .container_single {
               margin: 0 auto;
               width: 80%;
               height: 30px;
               display: flex;
               justify-content: center;
               align-items: center;
               border-radius: 8px;
               transition: .4s;
               cursor: pointer;

               &:hover {
                    background-color: rgb(53, 55, 61);
               }

               background-color: rgb(53, 55, 61);

               .room {
                    width: 90%;
                    font-family: var(--nomal-font_family);
                    color: #fff;
               }
          }
     }

     .right {
          width: calc(100vw - 70px - 240px);
          height: 100vh;
          background-color: rgb(49, 51, 56);
          // z-index: 1;

          // .roomNavs {
          //      width: 100%;
          //      height: 48px;
          //      border-bottom: 1px solid rgb(29, 29, 29);

          //      .middle {
          //           height: 48px;
          //           margin: 0 auto;
          //           width: 95%;
          //           display: flex;
          //           justify-content: space-between;
          //           align-items: center;

          //           .one {
          //                height: 40px;
          //                // border: 1px solid #fff;
          //           }

          //           .roomName {
          //                min-width: 300px;

          //                span {
          //                     height: 40px;
          //                     line-height: 40px;
          //                     color: #fff;
          //                     font-family: var(--nomal-font_family);
          //                     font-size: 14px;
          //                }
          //           }

          //           .taps {
          //                min-width: 50%;
          //           }
          //      }

          // }

          // .one {
          //      margin: 0 auto;
          //      width: 95%;
          // }

          // .chatArea {
          //      height: calc(96% - 48px - 66px - 18px);
          //      // min-height: 50%;
          //      // border: 1px solid #fff;
          //      overflow: scroll;

          //      .welcome {
          //           display: flex;
          //           flex-direction: column;

          //           img {
          //                margin: 15px 0;
          //                width: 65px;
          //                height: 65px;
          //                border-radius: 50%;
          //           }

          //           span {
          //                color: #fff;
          //                font-family: var(--nomal-font_family);
          //           }

          //           .nickName {
          //                font-size: 30px;
          //           }

          //           .userName {
          //                font-size: 1.4rem;
          //                margin: 10px 0;
          //           }

          //           p {
          //                color: #b4b4b4;
          //                font-weight: 500;
          //           }
          //      }

          //      .split {
          //           width: 100%;
          //           height: 1px;
          //           background-color: #fff;
          //           margin: 20px 0;
          //      }

          //      .chatList {
          //           width: 100%;
          //           // height: 100%;
          //           min-height: 0;

          //           .oneMes {
          //                display: flex;
          //                margin-top: 20px;

          //                .leftPart {
          //                     height: inherit;

          //                     img {
          //                          width: 40px;
          //                          height: 40px;
          //                          object-fit: cover;
          //                          border-radius: 50%;

          //                     }
          //                }

          //                .rightPart {
          //                     padding-left: 15px;
          //                     height: 80%;
          //                     display: flex;
          //                     flex-direction: column;
          //                     justify-content: center;

          //                     .basicMes {
          //                          min-height: 20px;

          //                          .nickName {
          //                               color: rgb(47, 201, 112);
          //                               font-family: var(--nomal-font_family);
          //                               margin-right: 10px;
          //                          }

          //                          .sendTime {
          //                               color: #6f6e6e;
          //                               font-size: 12px;
          //                          }
          //                     }

          //                     .sendContent {
          //                          color: #fff;
          //                     }
          //                }
          //           }
          //      }
          // }

          // .sendMes {
          //      min-height: 44px;
          //      border-radius: 8px;
          //      box-shadow: 1px 1px 5px rgb(45, 45, 45);
          //      background-color: rgb(56, 58, 64);
          //      position: absolute;
          //      bottom: 6%;
          //      left: 50%;
          //      transform: translateX(-50%);

          //      .wrap {
          //           min-height: 44px;
          //           // border: 1px solid #fff;
          //           width: 100%;
          //           position: relative;

          //           .outFile {
          //                position: absolute;
          //                top: 50%;
          //                left: 40px;
          //                transform: translate(-50%, -50%);
          //                width: 25px;
          //                height: 25px;
          //                border-radius: 50%;
          //                background-color: #a2a0a0;
          //                display: flex;
          //                justify-content: center;
          //                align-items: center;

          //                i {
          //                     font-size: 20px;
          //                     font-weight: bolder;
          //                     color: #2c2c2c;
          //                }
          //           }
          //      }

          //      .input {
          //           // border: 1px solid #fff;
          //           width: 60%;
          //           min-height: 44px;
          //           position: absolute;
          //           left: 70px;
          //           bottom: 50%;
          //           transform: translateY(50%);
          //           color: #fff;
          //           outline: none;
          //           line-height: 44px;
          //           max-height: 40vh;
          //           overflow: scroll;

          //           &:empty:before {
          //                content: attr(placeholder);
          //                color: #ccc;
          //                font-family: var(--nomal-font_family);
          //           }
          //      }
          // }
     }
}</style>