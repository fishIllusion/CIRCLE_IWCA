<template>
  <div class="pmContainer">
    <div class="talkTo">
      <div class="middle">
        <div class="toName one">
          <img src="../assets/background/background2.png" alt="" />
          <span>xiaofange</span>
        </div>
        <!-- <div class="taps one"></div> -->
      </div>
    </div>
    <div class="wrap">
      <div class="left one">
        <div class="chatArea two" id="chatArea" ref="chatArea">
          <div class="welcome">
            <img src="../assets/background/background2.png" alt="">
            <span class="nickName">fishman_ultra</span>
            <span class="userName">xiaoyuren</span>
            <p class="welcomes">This is the beginning of your direct message history with Lover</p>
          </div>
          <div class="split" v-show="store.state.pmhistory.pmdata[pid] != undefined"></div>
          <ul class="chatList">
            <li class="oneMes" v-show="pmhistory.pmdata[pid] != []" v-for="(item, index) in pmhistory.pmdata[pid]"
              :key=index>
              <div class="leftPart">
                <img src="../assets/background/background2.png" alt="" class="avatar">
                <span></span>
              </div>
              <div class="rightPart">
                <div class="basicMes">
                  <span class="nickName" :style="item.nickname == hostName ? '' : 'color: rgb(255, 77, 0);'">{{ item.nickname }}</span>
                  <span class="sendTime">Today at 3.41PM</span> 
                </div>
                <div class="sendContent">
                  <span>{{ item.content }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="sendMes two" ref="parent" id="parent">
          <div class="container">
            <div class="outFile">
              <i class="iconfont icon-jiahao"></i>
            </div>
          </div>
          <p @keypress.enter="keySend($event)" v-on:input="getInput" id="child" ref="child" class="input"
            contenteditable="plaintext-only" placeholder="Message #AZUR LANE">
          </p>
        </div>
      </div>
      <div class="right one">
        <div class="userCard" ref="userCardEl">
          <div class="top"></div>
          <img src="../assets/background/background2.png" alt="" class="avatar" />
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
                    <!-- <div class="statusPanel">
                    <div class="online one">
                      <i
                        class="iconfont icon-yuandianzhong"
                        style="color: rgb(34, 165, 89)"
                      ></i>
                      <span>online</span>
                      <div class="splitLine"></div>
                    </div>
                    <div class="idle one">
                      <i
                        class="iconfont icon-yueliang"
                        style="color: rgb(223, 207, 81)"
                      ></i>
                      <span>idle</span>
                    </div>
                    <div class="noDisturb one">
                      <i
                        class="iconfont icon-wurao"
                        style="color: rgb(223, 81, 81)"
                      ></i>
                      <span>do not disturb</span>
                    </div>
                    <div class="stealth one">
                      <i class="iconfont icon-yuanquanxuanzhong"></i>
                      <span>stealth</span>
                    </div>
                  </div> -->
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
                  <span> SWICH ACCOUNT </span>
                  <i class="iconfont icon-jiantou_liebiaoxiangyou_o"></i>
                  <!-- <div class="accountPanel">
                  <ul class="accounts">
                    <li>
                      <img src="../assets/background/background2.png" alt="" />
                      <span class="userName">xiaoyuren</span>
                      <i class="iconfont icon-jiahao"></i>
                    </li>
                    <li>
                      <img src="../assets/background/background2.png" alt="" />
                      <span class="userName">xiaoyuren</span>
                      <i class="iconfont icon-jiahao"></i>
                    </li>
                  </ul>
                  <div class="splitLine"></div>
                  <div class="manage"><span>MANAGE YOUR ACCOUNTS</span></div>
                </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from 'vue'
import store from '@/store'
import router from '@/router';
import { mapState } from 'vuex';
import { useState } from '../hooks/useState'
//注册全局事件总线（引入第三方包）
import $bus from '@/utils/event_bus'
export default {
  setup() {
    const _this = getCurrentInstance()
    let isScroll = false
    let content = ref('')
    let useMap = useState(['pmhistory'], mapState)
    let pid = router.currentRoute.value.params.pid
    const hostName = JSON.parse(localStorage.AccountStore).user.nickname
    const hostAvatar = JSON.parse(localStorage.AccountStore).user.avatar

    let wss = _this.appContext.config.globalProperties.$wss//获取全局绑定的wss
    if (!wss) {
      // console.log('重来了哦');
      wss = new WebSocket('ws://121.43.139.166:9000')
      _this.appContext.config.globalProperties.$wss = wss
    }
    //使消息框滑至最底部(只进行滑动，不做其他操作)
    const onlySlide = () => {
      setTimeout(() => {
        _this.refs.chatArea.scrollTop = _this.refs.chatArea.scrollHeight
      }, 0);
    }
    //使消息框滑至最底部(动态滑动)
    const slideToBottom = async() => {
      setTimeout(() => {
        _this.refs.chatArea.scrollTop = _this.refs.chatArea.scrollHeight
        document.getElementById('parent').style.height = _this.refs.child.offsetHeight + 'px'
        document.getElementById('chatArea').style.height = ((document.body.clientHeight - 48) * 0.96 - 33 - _this.refs.child.offsetHeight - 4) + 'px'
      }, 0);
    }
    //将pid存入store中
    const storePid = async (pid) => {
      await store.commit('GETPID', pid)
    }
    storePid(pid)
    //获取和此人的历史聊天记录
    const getPm = async () => {
      if(!store.state.pmhistory.pmdata[pid]) {
        await store.dispatch('getPmdata', pid)
      }
      onlySlide()
    }
    getPm()
    //当输入的信息超过输入框的高度限制后触发
    const limitHeight = () => {
      let currentHeight = _this.refs.child.offsetHeight //子元素的当前高度
      let parentHeight = _this.refs.parent.offsetHeight            //父元素的当前高度
      if (_this.refs.chatArea.scrollTop +_this.refs.chatArea.offsetHeight+2 >= _this.refs.chatArea.scrollHeight) {
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
      //禁止默认回车
      Event.preventDefault()
      if (content.value == '' || child.innerHTML == '') {
        return false
      }
      send()
      child.innerHTML = ''
      content = ''
    }
    //接收到消息后判断此时消息框是否在最底部。如在保持
    const whetherTobottom = () => {
      setTimeout(() => {
        if( _this.refs.chatArea.scrollHeight - 50 >= _this.refs.chatArea.scrollTop + _this.refs.chatArea.clientHeight
        && _this.refs.chatArea.scrollTop + _this.refs.chatArea.clientHeight >= _this.refs.chatArea.scrollHeight - 58) {
          onlySlide()
        }
      }, 0);
    }
    onMounted(() => {
      $bus.on('tobottom', () => {
        whetherTobottom()
      })
    })

    return {
      getInput, content, keySend, ...useMap, pid, store, hostName
    }
  }
}
</script>

<style lang="less" scoped>
.pmContainer {
  height: 100vh;

  .talkTo {
    width: 100%;
    height: 48px;
    border-bottom: 1px solid rgb(29, 29, 29);

    .middle {
      height: 48px;
      margin: 0 auto;
      width: 97%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .one {
        height: 40px;
        // border: 1px solid #fff;
      }

      .toName {
        display: flex;
        align-items: center;
        min-width: 300px;

        img {
          margin-right: 10px;
          width: 25px;
          height: 25px;
          border-radius: 50%;
        }

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

  .wrap {
    // border: 1px solid #fff;
    display: flex;
    height: calc(100% - 48px);
    width: calc(100vw - 240px -70px);

    .one {
      height: 100%;
    }

    .left {
      width: 75%;
      // border-right: 1px solid #fff;
      position: relative;

      .two {
        margin: 0 auto;
        width: 95%;
      }

      .chatArea {
        height: calc(96% - 48px - 33px);
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

          // overflow: scroll;
          // border: 1px solid #fff;
          .oneMes {
            display: flex;
            margin-top: 10px;

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

      .sendMes {
        min-height: 44px;
        border-radius: 8px;
        box-shadow: 1px 1px 5px rgb(45, 45, 45);
        background-color: rgb(56, 58, 64);
        position: absolute;
        bottom: 6%;
        left: 50%;
        transform: translateX(-50%);

        .container {
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

    .right {
      width: 25%;
      position: relative;
      // background-color: #fff;
      background-color: rgb(35, 36, 40);

      .userCard {
        z-index: 2;
        width: 330px;
        height: 480px;
        position: absolute;
        // background-color: rgb(35, 36, 40);
        top: 0;
        left: 0;
        border-radius: 10px;
        // box-shadow: 0.5px 0.5px 10px #898888;

        img {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 6px solid rgb(35, 36, 40);
          position: absolute;
          top: calc(110px - 45px);
          left: 20px;
          z-index: 1;
        }

        .top {
          // border-radius: 5px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          width: 100%;
          height: 110px;
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
                  transition: 0.3s;
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
                    content: "";
                    width: 30px;
                    height: 120px;
                    // border: 1px solid #fff;
                  }

                  // .statusPanel {
                  //   border-radius: 8px;
                  //   min-width: 300px;
                  //   height: 220px;
                  //   position: absolute;
                  //   background-color: rgb(17, 18, 20);
                  //   left: 282px;
                  //   top: -30px;
                  //   margin-left: 10px;
                  //   display: none;
                  //   flex-direction: column;
                  //   justify-content: space-around;
                  //   row-gap: 10px;
                  //   padding: 30px 0;

                  //   .online {
                  //     position: relative;

                  //     .splitLine {
                  //       position: absolute;
                  //       bottom: -5px;
                  //       left: 50%;
                  //       transform: translateX(-50%);
                  //       width: 90%;
                  //       height: 1px;
                  //       background-color: #858484;
                  //       // margin-bottom: 5px;
                  //     }
                  //   }

                  //   .one {
                  //     width: 90%;
                  //     margin: 0 auto;
                  //     height: 40px;
                  //     border-radius: 5px;
                  //     display: flex;
                  //     align-items: center;

                  //     i {
                  //       height: 40px;
                  //       line-height: 40px;
                  //       font-size: 18px;
                  //       display: block;
                  //       text-align: center;
                  //       margin-right: 10px;
                  //       padding-left: 10px;
                  //     }

                  //     span {
                  //       height: 100%;
                  //       line-height: 40px;
                  //     }

                  //     &:hover {
                  //       background-color: rgb(87, 100, 242);

                  //       i {
                  //         color: #fff !important;
                  //       }
                  //     }

                  //     // border: 1px solid #fff;
                  //   }
                  // }
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
                transition: 0.3s;
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
                  content: "";
                  width: 25px;
                  height: 45px;
                  top: -5px;
                  left: 268px;
                  // background-color: #fff;
                }
              }

              // .accountPanel {
              //   position: absolute;
              //   width: 200px;
              //   min-height: 80px;
              //   background-color: rgb(17, 18, 20);
              //   left: 282px;
              //   bottom: -35px;
              //   margin-left: 10px;
              //   display: none;
              //   flex-direction: column;
              //   align-items: center;
              //   border-radius: 8px;

              //   .accounts {
              //     margin-top: 5px;
              //     width: 100%;
              //     min-height: 50px;
              //     display: flex;
              //     flex-direction: column;
              //     justify-content: center;
              //     align-items: center;
              //     row-gap: 5px;

              //     li {
              //       width: 95%;
              //       height: 40px;
              //       // border: 1px solid blue;
              //       display: flex;
              //       align-items: center;
              //       border-radius: 5px;
              //       transition: 0.3s;

              //       // justify-content: space-around;
              //       img {
              //         position: static;
              //         border: none;
              //         width: 30px;
              //         height: 30px;
              //         margin-left: 5px;
              //       }

              //       span {
              //       }

              //       i {
              //         padding-left: 40px;
              //       }

              //       &:hover {
              //         background-color: rgb(87, 100, 242);
              //       }
              //     }
              //   }

              //   .splitLine {
              //     bottom: -5px;
              //     left: 50%;
              //     width: 90%;
              //     height: 1px;
              //     background-color: #858484;
              //     margin-top: 5px;
              //   }

              //   .manage {
              //     height: 40px;
              //     margin-block: 5px;
              //     width: 95%;

              //     transition: 0.3s;
              //     border-radius: 5px;

              //     span {
              //       height: 40px;
              //       line-height: 40px;
              //       font-size: 12px;
              //     }

              //     &:hover {
              //       background-color: rgb(87, 100, 242);
              //     }
              //   }
              // }
            }
          }
        }
      }
    }
  }
}
</style>