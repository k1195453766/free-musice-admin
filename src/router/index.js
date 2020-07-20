import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
const Login = () => import('@/views/login')
const Home = () => import('@/views/home')
const Config = () => import('@/views/config')
const Layout = () => import('@/views/layout')
const Welcome = () => import('@/views/welcome')
const User = () => import('@/views/user')
const Profile = () => import('@/views/profile')
const Page404 = () => import('@/views/error-page/404')

Vue.use(VueRouter)

// 解决一个路由跳转多次报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let routes = [
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome,
        name: 'Welcome',
        meta: { title: '欢迎光临', icon: 'user', roles: ['admin', 'user'], affix: true, hidden: false }
      },
      {
        path: '/home',
        component: Home,
        name: 'Home',
        meta: { title: '首页', icon: 'dashboard', roles: ['admin', 'user'], affix: true, hidden: false }
      },
      {
        path: '/profile',
        component: Profile,
        name: 'Profile',
        meta: { title: '个人信息', icon: 'setting', roles: ['admin'], affix: true, hidden: false }
      },
      {
        path: '/user',
        component: User,
        name: 'User',
        meta: { title: '用户管理', icon: 'user', roles: ['admin'], affix: true, hidden: false },
        children: [
          {
            path: '/user',
            component: User,
            name: 'User',
            meta: { title: '用户列表1', icon: 'user', roles: ['admin'], affix: true, hidden: false },
          },
        ]
      },
      {
        path: '/config',
        component: Config,
        name: 'Config',
        meta: { title: '系统设置', icon: 'setting', roles: ['admin'], affix: true, hidden: false }
      },
      {
        path: '/404',
        component: Page404,
        name: 'Page404',
        meta: { title: '404', icon: 'setting', roles: ['admin', 'user'], affix: false, hidden: false }
      },
    ]
  },
  {
    path: '/',
    component: Login,
    name: 'Login',
    meta: { title: 'Login', icon: 'setting', affix: false, hidden: false }
  },
]

export const setMenuTree = function (menuTree) {
  let temp = new Vue({ routes })
  //console.log('allRouters', temp.$options.routes[0].children);
  let allRouters = temp.$options.routes[0].children;
  for (const index in allRouters) {
    if (!allRouters[index].meta.roles.includes(menuTree)) {
      // 不包含
      allRouters[index].meta.hidden = true
    } else {
      // 包含
      if (allRouters[index].children && allRouters[index].children.length > 0) {
        // 是否有子路由 -> 有
        for (const i in allRouters[index].children) {
          if (!allRouters[index].children[i].meta.roles.includes(menuTree)) {
            allRouters[index].children[i].meta.hidden = true
          }
        }
      }
    }
  }
  //console.log('allRouters--', temp.$options.routes[0].children);
  // 保存路由到缓存
  window.sessionStorage.setItem('routes', JSON.stringify(temp.$options.routes[0].children))
}

const routers = new VueRouter({
  routes,
  mode: 'history'
})

routers.beforeEach((to, from, next) => {
  //console.log('to', to)

  if (to.path == undefined) return next({ name: 'Login' })
  if (to.path == '/' || to.path == '/login') return next();
  else {
    const token = window.sessionStorage.getItem("token")
    if (token == null || token == undefined) {
      return next({ name: 'Login' })
    } else {
      next()
    }
  }
})

export default routers;
