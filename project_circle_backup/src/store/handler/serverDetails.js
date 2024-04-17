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
     }
}


const actions = {
     async getServerInfo({commit}, sid) {
          let result = await getServerInfo(sid)
          commit('GETSERVERINFO', {data: result.data, sid})
          store.commit('GETSERVERNAME', result.data.sName)
          // console.log(result.data);
     }
}


export default {
     state, actions, mutations
}