import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/login')
const Home = () => import('@/views/home')
const Config = () => import('@/views/config')
const Layout = () => import('@/views/layout')
const Welcome = () => import('@/views/welcome')
const User = () => import('@/views/user')

Vue.use(VueRouter)

// 解决一个路由跳转多次报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let role = 'admin';

let routes = [
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/',
        component: Welcome,
        name: 'Welcome',
        meta: { title: 'Welcome', icon: 'user', affix: false }
      },
      {
        path: '/welcome',
        component: Welcome,
        name: 'Welcome',
        meta: { title: 'Welcome', icon: 'user', affix: false }
      },
      {
        path: '/home',
        component: Home,
        name: 'Home',
        meta: { title: 'Home', icon: 'dashboard', affix: false }
      },
      {
        path: '/user',
        component: User,
        name: 'User',
        meta: { title: 'User', icon: 'user', affix: false },
        // children: [{
        //   path: '/user/userList',
        //   component: Config,
        //   name: 'UserList',
        //   meta: { title: 'UserList', icon: 'setting', affix: false }
        // }]
      }
    ]
  },
  {
    path: '/',
    component: Login,
    name: 'Login',
    meta: { title: 'Login' }
  },
  {
    path: '*',
    redirect: '/login'
  }
]

// 动态路由权限
let dynamicRoutes = [
  {
    path: '/config',
    component: Config,
    name: 'Config',
    meta: { title: 'Config', icon: 'setting', role: 'admin', affix: false }
  },
]

let menuList = []

export const setMenuTree = function (menuTree) {
  let temp = new Vue({ router })
  hanleFor(menuTree)
  temp.$router.addRoutes(menuList)
  temp.$router.addRoutes([{ path: '*', redirect: '/' + menuList[0].redirect }])
}


const hanleFor = function (list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].children) {
      hanleFor(list[i].children)
    } else {
      menuList.push(menu[list[i].name])
    }
  }
}

export default new VueRouter({
  routes,
  mode: 'history'
})
