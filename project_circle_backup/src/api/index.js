import request from '@/api/request.js'
import binaryReq from '@/api/binaryReq'

//登录接口
export const login = (data) => request({url: '/login', data, method: 'post'})
//注册检测用户名存在接口
export const registerCheckAccount = (account) => request({url: `/registerCheck?account=${account}` ,method: 'get'})
//注册检测用户名存在接口
export const registerCheckEmail = (email) => request({url: `/emailCheck?email=${email}` ,method: 'get'})
//注册接口
export const register = (data) => request({url: '/register', data, method: 'post'})

//获取用户基本信息接口
export const getUserInit = (uid) => request({url: `/user-profile-effects?uid=${uid}`, method: 'get'})


//获取私聊历史记录接口
export const getPmdata = (pid) => request({url: `/pmdata?pid=${pid}`, method: 'get'})
//鉴别此次要添加的用户是否存在
export const discriminator = (data) => request({url: '/discriminator', data, method: 'post'})


//获取请求或被请求添加好友的信息
export const getFriend = (uname) => request({ url: `/freq?uname=${uname}`, method: 'get'})


//添加直接对话
export const addDirectMes = (data) => request({url: '/directMes', data, method: 'post'})

//用户创建server
export const createServer = (data) => request({url: '/createServer', data, method:'post'})

//获取服务器的基本信息（服务器名，包含的聊天室）
export const getServerInfo = (sid) => request({url: `/server_init_info?sid=${sid}`, method: 'get'})


//图片上传接口
export const imgUpload = (data, uid, sid) => binaryReq({url: `/imgUpload?uid=${uid}&sid=${sid}`, data: data, method: 'post'})