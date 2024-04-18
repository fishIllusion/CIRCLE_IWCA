import { getServerInfo } from '../../api/index'
import store from '@/store';

const state = {
     servers: {

     }
}

const mutations = {
     GETSERVERINFO(state, data) {
          state.servers[data.sid] = data.data
     },
     INITCATAGORY(state, data) {
          // console.log(data);
          data.forEach(item => {
               state.servers[item.sid] = {catagory: [], directGroups:[]}
          });
     },
     //当用户添加一个服务器时触发
     ADDMORECATAGORY(state, sid) {
               state.servers[sid] = {catagory: [], directGroups:[]}
     }
}


const actions = {
     async getServerInfo({commit}, sid) {
          await getServerInfo(sid).then(res => {
               if(res.code == 200) {
                    commit('GETSERVERINFO', {data: res.data, sid})
                    store.commit('GETSERVERNAME', res.data.sName)
               }
          })
     }
}


export default {
     state, actions, mutations
}