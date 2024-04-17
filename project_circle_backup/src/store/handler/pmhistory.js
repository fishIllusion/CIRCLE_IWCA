import { getPmdata } from '../../api/index'
const state = {
     pmdata: {
          // '13': [{a:1}]
     }
}

const mutations = {
     GETPMDATA(state, data) {
          state.pmdata[data.pid] = data.value
          // console.log(state.pmdata[data.pid]);
     },
     SENDLOCALMES(state, {data, pid}) {
          // console.log(data);
          if(state.pmdata[pid] == undefined) {
               state.pmdata[pid] = []
               state.pmdata[pid].push(data)
          }else {
               state.pmdata[pid].push(data)
          }
     }
}


const actions = {
     async getPmdata({commit}, pid) {
          let result = await getPmdata(pid)
          // console.log(result.data);
          commit('GETPMDATA', {value: result.data, pid})
     },
}


export default {
     state, actions, mutations
}