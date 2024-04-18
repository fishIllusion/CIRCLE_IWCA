<template>
  <div class="friend_container">
    <div class="friendNavs">
      <div class="middle">
        <div class="title one">
          <img src="../assets/init-icon-pics/friends.png" style="scale: 0.8;opacity: .4;" alt="">
          <span>Friends</span>
        </div>
        <div class="split one"></div>
        <div class="status one">
          <div class="option" ref="o1" @click="active(1)"><span>Online</span></div>
          <div class="option" ref="o2" @click="active(2)"><span>All</span></div>
          <div class="option" ref="o3" @click="active(3)"><span>Pending</span><span class="incoming" v-if="freq.incomingList.length !== 0">{{ freq.incomingList.length }}</span></div>
          <div class="option" ref="o4" @click="active(4)"><span>Block</span></div>
          <div class="option" ref="o5" @click="active('addfriends')"><span>Add Friends</span></div>
        </div>
      </div>
    </div>
    <div class="bottom friend_bottom" ref="options">
      <div class="box-online box option" ref="online">
        <div class="searchBox">
          <input autocomplete="off" id="search" v-on:input="getSearch" class="search" placeholder="Search" maxlength='20'>
          <i class="iconfont icon-chazhao"></i>
        </div>
        <span class="Count">
          ONLINE - 0
        </span>
        <div class="split"></div>
        <ul class="people">
          <!-- <li>
            <img src="../assets/background/background2.png" alt="">
            <div class="mes">
              <span>xiaoyuren</span>
              <span class="statu">online</span>
            </div>
            <div class="moreAction">
              <div class="message item one">
                <i class="iconfont icon-xiaoxi"></i>
                <span class="toMessage">Message</span>
              </div>
              <div class="action item one">
                <i class="iconfont icon-a-13Bshenglve"></i>
                <span class="toMessage">More</span>
              </div>
            </div>
          </li> -->
        </ul>
      </div>
      <div class="box-All box option" ref="all">
        <div class="searchBox">
          <input autocomplete="off" id="search" v-on:input="getSearch" class="search" placeholder="Search" maxlength='20'>
          <i class="iconfont icon-chazhao"></i>
        </div>
        <span class="Count">
          ALL FRIENDS - {{ users.userInfo.friends.length }}
          <!-- {{ users.userInfo.friends.length }} -->
        </span>
        <div class="split"></div>
        <ul class="people">
          <li v-for="(item, index) in users.userInfo.friends" :key="index">
            <img src="../assets/background/background2.png" alt="">
            <div class="mes">
              <span>{{ item.uName }}</span>
              <span class="statu">online</span>
            </div>
            <div class="moreAction">
              <div class="message item one" @click="goMes(item.uid, item.avatar, item.uName)">
                <i class="iconfont icon-xiaoxi"></i>
                <span class="toMessage">Message</span>
              </div>
              <div class="action item one">
                <i class="iconfont icon-a-13Bshenglve"></i>
                <span class="toMessage">More</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="box-Pending box option" ref="pending">
        <div class="searchBox">
          <input autocomplete="off" id="search" v-on:input="getSearch" class="search" placeholder="Search" maxlength='20'>
          <i class="iconfont icon-chazhao"></i>
        </div>
        <span class="Count">
          PENGDING - {{ freq.incomingList.length + freq.outgoingList.length   }}
        </span>
        <div class="split"></div>
        <ul class="people" v-if="(freq.incomingList.length + freq.outgoingList.length !== 0)">
          <li v-for="(item, index) in freq.incomingList" :key="index">
            <img src="../assets/background/background2.png" alt="">
            <div class="mes">
              <span>{{ item.uname }}</span>
              <span class="statu">Incoming Friend Request</span>
            </div>
            <div class="moreAction">
              <div class="message item one">
                <i class="iconfont icon-ln_zhengque" @click="acceptOrRefuse(item.uname, item.fromWhoUid, item.avatar ,ACCEPT)"></i>
                <span class="toMessage">Accept</span>
              </div>
              <div class="action item one">
                <i class="iconfont icon-ln_quxiao" @click="acceptOrRefuse(item.uname ,REFUSE)"></i>
                <span class="toMessage cancel">Refuse</span>
              </div>
            </div>
          </li>
          <li v-for="(item, index) in freq.outgoingList" :key="index">
            <img src="../assets/background/background2.png" alt="">
            <div class="mes">
              <span>{{ item.uname }}</span>
              <span class="statu">Outgoing Friend Request</span>
            </div>
            <div class="moreAction">
              <!-- <div class="message item one">
                <i class="iconfont icon-xiaoxi"></i>
                <span class="toMessage">Message</span>
              </div> -->
              <div class="action item one">
                <i class="iconfont icon-ln_quxiao" @click="acceptOrRefuse(item.uname, item.fromwhoUid ,CANCEL)"></i>
                <span class="toMessage cancel">Cancel</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="box-Block box option" ref="block">
        <div class="searchBox">
          <input autocomplete="off" id="search" v-on:input="getSearch" class="search" placeholder="Search" maxlength='20'>
          <i class="iconfont icon-chazhao"></i>
        </div>
        <span class="Count">
          BLOCK - 0
        </span>
        <div class="split"></div>
        <ul class="people">
          <!-- <li>
            <img src="../assets/background/background2.png" alt="">
            <div class="mes">
              <span>xiaoyuren</span>
              <span class="statu">online</span>
            </div>
            <div class="moreAction">
              <div class="message item one">
                <i class="iconfont icon-xiaoxi"></i>
                <span class="toMessage">Message</span>
              </div>
              <div class="action item one">
                <i class="iconfont icon-a-13Bshenglve"></i>
                <span class="toMessage">More</span>
              </div>
            </div>
          </li> -->
        </ul>
      </div>
    </div>
    <div class="bottom addFriends_bottom" ref="addFriends">
      <div class="box-online box addFriends">
        <span class="title tags">ADD FRIENDS</span>
        <span class="titleTags tags">You can add friends with their Circle username</span>
        <div class="searchBox" ref="searchBox">
          <input autocomplete="off" @focus="borderActive" @blur="borderDebuff" id="search" v-model="content" v-on:input="addFriend"
            class="search" placeholder="You can add friends with their Circle username" maxlength='20'>
          <span style="cursor: not-allowed;" class="send" ref="sendButton" @click="sendRequest">Send Friend Request</span>
        </div>
        <span class="failure one" ref="fail">Hi, didn't work. Double check the username is correct</span>
        <span class="success one" ref="success">Success!Your friend request to <span style="font-size: 16px; font-weight: 400;color: rgb(64, 183, 64);">{{ content }}</span> was sent</span>
      </div>
      <div class="split"></div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { getCurrentInstance, onMounted } from 'vue';
import { ref } from 'vue';
import store from '@/store';
import { mapState } from 'vuex';
import { useState } from '../hooks/useState'
export default {
  setup() {
    const router = useRouter()
    const _this = getCurrentInstance()
    const ACCEPT = 'acceptFriend'
    const REFUSE = 'refuseFriend'
    const CANCEL = 'cancelAdd'
    let wss = _this.appContext.config.globalProperties.$wss//获取全局绑定的wss
    let APIs = _this.appContext.config.globalProperties.$API//获取全局绑定的API
    let useMap = useState(['freq', 'users'], mapState)
    const ACTIVE = 'active'
    const DEBUFF = 'debuff'
    const SUCCESS = 'success'
    const FAIL = 'FAIL'
    const fromwho = JSON.parse(localStorage.AccountStore).user.uname
    const myAvatar = JSON.parse(localStorage.AccountStore).user.avatar
    let hostid = localStorage.user_id_cache
    //添加好友时的查询状态
    let statuCode = 0
    //避免非法用户删除本地的fopen键值对
    localStorage.foption == undefined ? localStorage.foption : 1
    //定义输入变量
    const content = ref('')
    //输入待添加的好友名后触发
    const addFriend = () => {
      if (content.value !== '') {
        if (_this.refs.sendButton.classList.length == 1) {
          _this.refs.sendButton.style.cursor = 'pointer'
          _this.refs.sendButton.classList.toggle(ACTIVE)
        }
      } else {
        _this.refs.sendButton.style.cursor = 'not-allowed'
        _this.refs.sendButton.classList.toggle(ACTIVE)
        statuCode == 0
        _this.refs.success.style.display = 'none'
        _this.refs.fail.style.display = 'none'
        _this.refs.searchBox.style.border = '1px solid rgb(30, 31, 34)'
      }
    }
    //查询之后进行对查询处进行样式复原
    const successOrFail = () => {
      content.value = ''
      _this.refs.searchBox.style.border = '1px solid rgb(30, 31, 34)'
      if (statuCode == 1) {
        _this.refs.success.style.display = 'none'
      } else {
        _this.refs.fail.style.display = 'none'
      }
      statuCode = 0
    }
    //隐藏选项高亮
    const hideLight = () => {
      let active = Number(localStorage.foption)
      switch (active) {
        case 1:
          _this.refs.o1.classList.toggle(ACTIVE)
          break;
        case 2:
          _this.refs.o2.classList.toggle(ACTIVE)
          break
        case 3:
          _this.refs.o3.classList.toggle(ACTIVE)
          break
        case 4:
          _this.refs.o4.classList.toggle(ACTIVE)
          break
        default:
          break;
      }
      localStorage.foption = 0
    }
    //隐藏addFrinds的高亮
    const hideDebuff = () => {
      if (_this.refs.o5.classList.length == 2) {
        _this.refs.o5.classList.toggle(DEBUFF)
      }
    }
    //功能切换函数
    const active = (funcName) => {
      hideLight()
      if (funcName == 'addfriends') {
        _this.refs.options.style.display = 'none'
        _this.refs.addFriends.style.display = 'block'
        if (_this.refs.o5.classList.length == 1) {
          _this.refs.o5.classList.toggle(DEBUFF)
        }
        hideLight()
      } else {
        _this.refs.addFriends.style.display = 'none'
        _this.refs.options.style.display = 'block'
        _this.refs.online.style.display = 'none'
        _this.refs.all.style.display = 'none'
        _this.refs.pending.style.display = 'none'
        _this.refs.block.style.display = 'none'

        switch (funcName) {
          case 1:
            _this.refs.online.style.display = 'block'
            localStorage.foption = 1
            _this.refs.o1.classList.toggle(ACTIVE)
            hideDebuff()
            successOrFail()
            break;
          case 2:
            _this.refs.all.style.display = 'block'
            localStorage.foption = 2
            _this.refs.o2.classList.toggle(ACTIVE)
            hideDebuff()
            successOrFail()
            break
          case 3:
            _this.refs.pending.style.display = 'block'
            localStorage.foption = 3
            _this.refs.o3.classList.toggle(ACTIVE)
            hideDebuff()
            successOrFail()
            break
          case 4:
            _this.refs.block.style.display = 'block'
            localStorage.foption = 4
            _this.refs.o4.classList.toggle(ACTIVE)
            hideDebuff()
            successOrFail()
          default:
            break;
        }
      }
    }
    //点击改变添加好友框的颜色
    const borderActive = () => {
      if (statuCode == 0)
        _this.refs.searchBox.style.border = '1px solid rgb(5, 167, 252)'
    }
    //点击改变删除好友框的颜色
    const borderDebuff = () => {
      if (statuCode == 0)
        _this.refs.searchBox.style.border = '1px solid rgb(30, 31, 34)'
    }
    //通过localstorage记录上次friend组件的路由
    const firstActive = () => {
      _this.refs.options.style.display = 'block'
      let active = Number(localStorage.foption)
      // console.log(active);
      switch (active) {
        case 1:
          _this.refs.online.style.display = 'block'
          _this.refs.o1.classList.toggle(ACTIVE)
          break;
        case 2:
          _this.refs.all.style.display = 'block'
          _this.refs.o2.classList.toggle(ACTIVE)
          break
        case 3:
          _this.refs.pending.style.display = 'block'
          _this.refs.o3.classList.toggle(ACTIVE)
          break
        case 4:
          _this.refs.block.style.display = 'block'
          _this.refs.o4.classList.toggle(ACTIVE)
          break
        default:
          _this.refs.online.style.display = 'block'
          _this.refs.o1.classList.toggle(ACTIVE)
          localStorage.foption = 1
          break;
      }
    }
    //发起添加好友请求
    const sendRequest = async () => {
      _this.refs.searchBox.style.border = '1px solid rgb(30, 31, 34)'
      _this.refs.success.style.display = 'none'
      _this.refs.fail.style.display = 'none'
      if (content.value == '') return false
      let exit = APIs.discriminator({ target: content.value, avatar: store.state.users.userInfo.avatar, fromwho: fromwho, fromUid: localStorage.user_id_cache}).then(result => {
        if (result.code == 200) { 
          statuCode = 1
          _this.refs.searchBox.style.border = '1px solid rgb(64, 183, 64)'
          _this.refs.success.style.display = 'block'
          //进行socket的发送
          let data = {
            type: 'outgoingReq',
            uid: result.friendid,
            uname: fromwho,
            avatar: store.state.users.userInfo.avatar,
            fromWhoUid: localStorage.user_id_cache
          }
          wss.send(JSON.stringify(data))
          store.state.freq.outgoingList.unshift({
            avatar: result.avatar,
            uname: content.value
          })
          return
        } else {
          statuCode = -1
          _this.refs.searchBox.style.border = '1px solid red'
          _this.refs.fail.style.display = 'block'
          return
        }
      })
    }
    //同意或拒绝添加好友
    const acceptOrRefuse = (uname, fromUid, avatar, type) => {
      let data = {
        type: type,
        outgoingWho: uname,   //谁发起的好友请求
        outgoingAvatar:avatar,
        outgoingUid: fromUid,   //接收谁的好友UID
        incomingName: fromwho, //谁接谁的收好友请求
        incomingAvatar: myAvatar, //接收谁的好友头像
        incomingUid: localStorage.user_id_cache //接收者的uid
      }
      console.log(data);
      wss.send(JSON.stringify(data))
    }
    //与某人开启聊天
    const goMes = async(uid, avatar, uname) => {
      let pid = uid < hostid?(uid + hostid):(hostid + uid)
      localStorage.privateChatUid = uid
      router.push(`/channels/@me/pm/${pid}`)

      let tag = 0
      for (let index = 0; index < store.state.users.userInfo.directMes.length; index++) {
        if(store.state.users.userInfo.directMes[index].uid == uid) {
          tag = index
          break
        }
        tag++
      }
      if(tag == store.state.users.userInfo.directMes.length) {
        console.log('there is no result');
        let data = {
          hostid,
          uid,
          avatar,
          uname
        }
        store.commit('ADDDIRECTMES', data)
        await APIs.addDirectMes(data)
      }
    }
    onMounted(() => {
      firstActive()
    })
    return {
      goMes, active, borderActive, borderDebuff, addFriend, sendRequest, content, ...useMap, acceptOrRefuse, ACCEPT, REFUSE, CANCEL
    }
  }
}
</script>

<style lang="less" scoped>
.friend_container {
  .friendNavs {
    width: 100%;
    height: 48px;
    border-bottom: 1px solid rgb(29, 29, 29);

    .middle {
      height: 48px;
      margin: 0 auto;
      width: 98%;
      display: flex;
      // justify-content: space-between;
      align-items: center;

      .one {
        height: 40px;
        // border: 1px solid #fff;
      }

      .title {
        display: flex;
        // border: 1px solid #fff;
        width: 100px;

        span {
          height: 40px;
          line-height: 40px;
          color: #fff;
          font-family: var(--nomal-font_family);
          font-size: 14px;
        }
      }

      .split {
        width: 2px;
        height: 50%;
        background-color: #fff;
        margin: 0 20px;
      }

      .status {
        min-width: 50%;
        // border: 1px solid #fff;
        display: flex;
        align-items: center;
        column-gap: 15px;

        .option {
          height: 80%;
          border-radius: 5px;
          transition: .3s;
          cursor: pointer;

          &:hover {
            background-color: #504f4f;

            span {
              color: #fff;
            }
          }

          span {
            height: 32px;
            line-height: 32px;
            font-family: var(--nomal-font_family);
            padding: 0 6px;
            color: #8c8b8b;
            font-size: 1.1rem;
          }

          .incoming {
            width: 20px;
            height: 20px;
            line-height: 20px;
            font-size: 15px;
            text-align: center;
            background: rgb(241, 74, 74);
            color: #fff;
            border-radius: 50%;
            margin-right: 4px;
            display: inline-block;
          }
          &:nth-child(5) {
            background-color: rgb(51, 157, 51);

            span {
              color: #fff;
            }
          }
        }

        .active {
          background-color: #504f4f;

          span {
            color: #fff;
          }
        }

        .debuff {
          background-color: rgb(48, 51, 56) !important;

          span {
            color: rgb(64, 183, 64) !important;
          }
        }
      }
    }

  }

  .bottom {
    width: 90%;
    display: none;

    .box {
      margin-top: 20px;
      width: 70%;
      height: 95%;
      margin-left: 35px;
      overflow: scroll;

      // border-left: 1px solid blue;
      .searchBox {
        width: 100%;
        background-color: black;
        border-radius: 5px;
        overflow: hidden;
        display: flex;
        justify-content: space-around;
        align-items: center;

        i {
          color: #fff;
          padding-right: 10px;
        }

        .search {
          // margin: 0 auto;
          background-color: black;
          border: none;
          padding-left: 10px;
          width: 95%;
          height: 35px;
          line-height: 35px;
          outline: none;
          color: #fff;
          font-family: var(--nomal-font_family);
          font-size: 1.05rem;
        }
      }

      .Count {
        color: #fff;
        font-family: var(--nomal-font_family);
        font-size: 13px;
        margin: 25px 0;
        display: block;
      }

      .split {
        width: 100%;
        height: 1px;
        background-color: #6f6d6d;
        margin-bottom: 5px;
      }

      ul {
        width: 100%;
        height: calc(80%);

        // border: 1px solid #fff;
        li {
          height: 60px;
          font-size: 1rem;
          display: flex;
          padding: 0 10px;
          align-items: center;
          border-radius: 8px;
          transition: .4s;
          cursor: pointer;
          color: #fff;
          font-family: var(--nomal-font_family);
          position: relative;
          margin-bottom: 5px;

          &:hover {
            background-color: rgb(56, 59, 65);
          }

          .moreAction {
            position: absolute;
            right: 0;
            display: flex;
            padding-right: 10px;

            .item {
              width: 31px;
              height: 31px;
              background-color: #1e1e1e;
              border-radius: 50%;
              margin-left: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: 900;
              transition: .3s;
              &:hover {
                background-color: #636363;
              }
              i {
                font-size: 14px;
              }
            }



            .one {
              position: relative;

              &:hover {
                span {
                  opacity: 1;
                }
              }

              span {
                transition: .2s;
                position: absolute;
                // width: 75px;
                padding: 0 10px;
                opacity: 0;
                height: 35px;
                background-color: black;
                display: block;
                top: -39px;
                text-align: center;
                line-height: 35px;
                border-radius: 7px;
                font-size: 13px;
                font-weight: var(--nomal-font_family);
              }

              .cancel {
                right: -5px;
              }
            }
          }

          img {
            width: 33px;
            height: 33px;
            object-fit: cover;
            border-radius: 50%;
            margin-right: 10px;
          }

          .mes {
            display: flex;
            flex-direction: column;

            span {
              height: 15px;
              line-height: 15px;
            }

            .statu {
              color: #9d9b9b;
            }
          }
        }
      }
    }

    .option {
      display: none;
    }

    .addFriends {

      width: 100%;

      .tags {
        color: #fff;
        display: block;
        width: 100%;

        &:nth-child(1) {
          font-weight: 600;
          font-size: 20px;
          font-family: var(--nomal-font_family);
          margin-bottom: 5px;
        }

        &:nth-child(2) {
          color: #a09d9d;
          font-weight: 300;
          font-size: 15px;
          font-family: var(--nomal-font_family);
          margin-bottom: 15px;
        }
      }

      .searchBox {
        transition: .1s;
        background-color: rgb(30, 31, 34);
        border: 1px solid rgb(30, 31, 34);
        border-radius: 10px;
        overflow: hidden;
        height: 50px;

        .search {
          background-color: rgb(30, 31, 34);
          height: 50px;
        }

        .send {
          margin-right: 5px;
          display: block;
          min-width: 160px;
          text-align: center;
          outline: none;
          border: none;
          border-radius: 4px;
          height: 30px;
          line-height: 30px;
          color: #848181;
          font-weight: 500;
          font-size: 14px;
          background-color: rgb(59, 66, 139);
        }

        .active {
          color: #fff;
          background-color: rgb(81, 90, 183);
        }
      }
    }
  }

  .addFriends_bottom {
    position: relative;

    .one {
      position: absolute;
      bottom: 0;
      display: none;
      padding-bottom: 5px;
      font-family: var(--nomal-font_family);
    }

    .failure {
      color: red;
    }

    .success {
      color: rgb(52, 148, 52);
      
    }

    .split {
      margin-top: 35px;
      width: calc(100%/0.9);
      height: 1px;
      background-color: #6f6d6d;
      margin-bottom: 5px;
    }
  }

  .friend_bottom {
    height: 800px;
  }
}</style> 