import { createWebHistory, createRouter } from "vue-router";
import routes from './routes'
import store from "@/store";
const history = createWebHistory()

const router = createRouter({
    mode: 'hash',
    history,
    routes
})


router.beforeEach(async(to, from, next) => {
    let token = localStorage.getItem('token')
    let uid = localStorage.user_id_cache


    //避免在处理gr组件直接刷新时，vuex中无法获取深度数据报错的问题（直接跳走，不允许用户通过直接刷新来访问）
    if(from.path == '/' && to.name == 'gr') {
        // console.log('test');
        router.push('channels')
    }


    //用来处理在server页面时刷新导致的store中，未存储值的问题
    if(from.path == '/' && to.path.indexOf('/channels/server') != -1 && localStorage.user_id_cache != null && localStorage.getItem('token') != null) {
        await store.dispatch('getUserInfo', uid)
    }
    localStorage.setItem('preRoute', router.currentRoute.value.fullPath)
    // console.log(router.currentRoute.value.fullPath);
    if(token != null) {
        if(to.path == '/login' || to.path =='/register') next('/')
        else next()
    }else {
        if(localStorage.user_id_cache) localStorage.removeItem('user_id_cache')
        if(to.path.indexOf('/channels') !== -1) {
            next(false)
            router.push('login')
        }else 
        next()
    }
})


export default router

