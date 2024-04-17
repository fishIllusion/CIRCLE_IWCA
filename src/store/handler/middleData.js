const state = {
     pid: '',
     serverName: '',
     catagoryIndex: '',
     hidegroupIndex: '',
}

const mutations = {
     GETPID(state, data) {
          state.pid = data || ''
     },
     GETSERVERNAME(state, data) {
          state.serverName = data || ''
     },
     GETINDEXES(state, data) {
          state.catagoryIndex = data.catagoryIndex,
          state.hidegroupIndex = data.hidegroupIndex
     }
}

const actions = {
}


export default {
     state, actions, mutations
}