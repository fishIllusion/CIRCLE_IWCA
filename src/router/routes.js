// import HelloWorld from '@/components/HelloWorld'
import NotFound from '@/components/NotFound'
import HomePage from '@/components/HomePage'
import Login from '@/components/Login'
import Register from '@/components/Register'
import MyPrivacy from '@/pages/@me.vue'
import UserPage from '@/pages/channels'
import ServerAndRoom from '@/pages/serverAndRoom'
import PmArea from '@/pages/pmArea' //私聊路由
import Friend from '@/pages/friend' //朋友状态
import GrArea from '@/pages/gmArea'
import InviteWin from '@/pages/inviteWindow'

export default [
    {
        path: '/',
        component: HomePage,
        name: 'homePage'
    },
    {
        path: '/no',
        component: NotFound
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/channels',
        component: UserPage,
        children: [
            {
                path: '@me',
                component: MyPrivacy,
                children: [
                    {
                        path: '/channels/@me/pm/:pid',
                        name: 'pm',
                        component: PmArea,
                    },
                    {   
                        path: 'friend',
                        component: Friend,
                    },
                    {
                        path: '/channels/@me',
                        redirect: '/channels/@me/friend',
                    }
                ]
            },
            {
                path: 'server/:sid',
                component: ServerAndRoom,
                children: [
                    {
                        path: '/channels/server/:sid/:gid',
                        name: 'gr',
                        component: GrArea,
                    }
                ]
            },
            // {
            //     path: 'server',
            //     component: ServerAndRoom,
            //     children: [
            //         {
            //             path: '/channels/server/gr/:gid',
            //             name: 'gr',
            //             component: GrArea
            //         }
            //     ]
            // },
            {
                path: '/channels',
                redirect: '/channels/@me'
            }
        ]
        
    },
    {
        path: '/invite/:inviteMes',
        component: InviteWin,
        name: 'inviteWindow',
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/no'
    }
]