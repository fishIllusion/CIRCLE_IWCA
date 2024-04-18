import store from '..'
import { getUserInit } from '../../api/index'
const state = {
     userInfo: {friends: [], directMes: [], myServers: []}
     // name: 'xiaowu'
}

const mutations = {
     GETUSERINFO(state, data) {
          state.userInfo = data || {}
     },
     //添加好友请求,好友添加成功后，
     ADDFRIENDS(state, data) {
          state.userInfo.friends.unshift(data)
     },
     //添加直接俩天
     ADDDIRECTMES(state, data) {
          state.userInfo.directMes.unshift(data)
     },
     //添加我的群组
     ADDMYSERVERS(state, data) {
          state.userInfo.myServers.unshift(data)
          console.log(state.userInfo.myServers, data, '@@@@@@@');
     }
}


const actions = {
     async getUserInfo({commit}, uid) {
          let result = await getUserInit(uid)
          commit('GETUSERINFO', result.data)
          // console.log(result);
          store.commit('INITCATAGORY', result.data.myServers)
     }
}


export default {
     state, actions, mutations
}