import { createStore} from 'vuex'
import users from './handler/user'
import pmhistory from './handler/pmhistory'
import middleData from './handler/middleData'
import freq from './handler/friendReq'
import serverDetails from './handler/serverDetails'

export default createStore({
     modules: {
          users,
          pmhistory,
          middleData,
          freq,
          serverDetails
     }
})