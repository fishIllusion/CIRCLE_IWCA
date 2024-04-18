<template>
     <div class="myPrivacy">
          <div class="left">
               <div class="serverName">
                    <!-- <div class="wrap">
                         <span>Dash Mark</span>
                         <img src="../assets/init-icon-pics/arrow-down-s-line.png" alt="">
                    </div> -->
               </div>
               <div class="roomGroup">
                    <div class="groupName" @click="goFriend">
                         <img src="../assets/init-icon-pics/friends.png" alt="svg"
                              style="scale: 1.8;margin-right: 10px;opacity: .4;">
                         <span>Friends</span>
                         <span class="incoming" v-if="freq.incomingList.length !== 0">{{ freq.incomingList.length }}</span>
                    </div>
                    <!-- <div class="groups">
                         <div class="container">
                              <div class="room">
                                   <span>#Genneral</span>
                              </div>
                         </div>
                         <div class="split"></div>
                    </div> -->
               </div>
               <div class="one">
                    <div class="room">
                         <span>DIRECT MESSAGES +</span>
                    </div>
               </div>
               <div @click="goMes(item.uid)" v-if="users.userInfo.directMes.length != 0" class="one friend" v-for="(item, index) in users.userInfo.directMes" :key="index">
                    <div class="room">
                         <img src="../assets/background/background2.png" alt="">
                         <span>{{ item.uname }}</span>
                    </div>
               </div>
          </div>
          <div class="right">
               <router-view></router-view>
          </div>
     </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { mapState } from 'vuex';
import { useState } from '../hooks/useState'
import store from '@/store'
export default {
     setup() {
          const router = useRouter()
          let useMap = useState(['freq', 'users'], mapState)

          console.log(useMap);
          let hostid = localStorage.user_id_cache
          // let pid = uid < hostid?(uid + hostid):(hostid + uid)
          //与某人开启聊天
          const goMes = (uid) => {
               console.log('uid:',uid,'hostid',hostid);
               let pid = uid < hostid?(uid + hostid):(hostid + uid)

               router.push(`/channels/@me/pm/${pid}`)
               localStorage.privateChatUid = uid
          }
          const goFriend = () => {
               router.push('/channels/@me/friend')
          }
          return {
               goMes, goFriend, ...useMap
          }
     }


}
</script>

<style lang="less" scoped>
.myPrivacy {
     width: calc(100vw - 70px);
     height: 100vh;
     display: flex;

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
                    height: 40px;
                    margin: 0 auto;
                    border-radius: 5px;
                    color: rgb(148, 156, 164);
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    position: relative;
                    &:hover {
                         color: #fff;
                         background:rgb(148, 156, 164) ;
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

                    .incoming {
                         position: absolute;
                         right: 5px;
                         width: 20px;
                         height: 20px;
                         line-height: 20px;
                         font-size: 15px;
                         text-align: center;
                         background: rgb(241, 74, 74);
                         color: #fff;
                         border-radius: 50%;
                         display: inline-block;
                         font-family: var(--nomal-font_family);
                    }
               }

               // .groups {
               //      margin-top: 5px;
               //      width: 100%;
               //      display: flex;
               //      flex-direction: column;
               //      align-items: center;
               //      justify-content: center;

               //      .container {
               //           width: 80%;
               //           height: 30px;
               //           display: flex;
               //           justify-content: center;
               //           align-items: center;
               //           border-radius: 8px;
               //           transition: .4s;
               //           cursor: pointer;

               //           &:hover {
               //                background-color: rgb(53, 55, 61);
               //           }

               //           .room {
               //                width: 90%;
               //                font-family: var(--nomal-font_family);
               //                color: rgb(149, 150, 155);
               //           }
               //      }


               //      .split {
               //           width: 90%;
               //           height: 1px;
               //           background-color: rgb(100, 102, 105);
               //           margin: 10px 0;
               //      }
               // }
          }

          .one {
               margin: 0 auto;
               width: 95%;
               height: 43px;
               display: flex;
               justify-content: center;
               align-items: center;
               border-radius: 8px;
               transition: .4s;
               cursor: pointer;

               // background-color: rgb(53, 55, 61);

               .room {
                    width: 90%;
                    font-family: var(--nomal-font_family);
                    color: rgb(148, 156, 164);
                    display: flex;
                    align-items: center;
                    font-size: 13px;
               }
          }

          .friend {
               margin-bottom: 5px;
               .room {
                    font-size: 1rem;

                    img {
                         width: 33px;
                         height: 33px;
                         object-fit: cover;
                         border-radius: 50%;
                         margin-right: 10px;
                    }
               }

               &:hover {
                    background-color: rgb(53, 55, 61);

                    .room {
                         color: #fff;
                    }
               }
          }
     }

     .right {
          width: calc(100vw - 70px - 240px);
          height: 100vh;
          background-color: rgb(49, 51, 56);
     }
}</style>