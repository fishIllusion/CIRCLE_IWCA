import { getFriend } from '../../api/index'

const state = {
     incomingList: [],
     outgoingList: []
}

const mutations = {
     FREQ(state, data) {
          state.incomingList = data.inList || []
          state.outgoingList = data.outList|| []
     },
     REMOVEINCOMING(state, data) {
          let new_array = []
          state.incomingList.forEach(item => {
               if(item.uname != data) {
                    new_array.push(item)
               }
          });
          state.incomingList = new_array
     },
     REMOVEOUTGOING(state, data) {
          let new_array = []
          state.outgoingList.forEach(item => {
               if(item.uname != data) {
                    new_array.push(item)
               }
          });
          state.outgoingList = new_array
     }
}

const actions = {

     async freq({commit}, uname) {
          let result = await getFriend(uname)
          commit('FREQ', result.data)
     }
 }


export default {
     state, actions, mutations
}