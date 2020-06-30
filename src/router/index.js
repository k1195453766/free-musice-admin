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
        meta: { title: '欢迎光临', icon: 'user', affix: true }
      },
      {
        path: '/home',
        component: Home,
        name: 'Home',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      },
      {
        path: '/profile',
        component: Profile,
        name: 'Profile',
        meta: { title: '个人信息', icon: 'setting', affix: true }
      },
      {
        path: '/404',
        component: Page404,
        name: 'Page404',
        meta: { title: '404', icon: 'setting', affix: false }
      }
    ]
  },
  {
    path: '/',
    component: Login,
    name: 'Login',
    meta: { title: 'Login', icon: 'setting', affix: false }
  }
]

// 动态路由权限
let dynamicRoutes = [
  {
    path: '/user',
    component: User,
    name: 'User',
    meta: { title: '用户管理', icon: 'user', roles: ['admin'], affix: true },
    children: [
      {
        path: '/user',
        component: User,
        name: 'User',
        meta: { title: '用户列表', icon: 'user', roles: ['admin'], affix: true },
      }
    ]
  },
  {
    path: '/config',
    component: Config,
    name: 'Config',
    meta: { title: '系统设置', icon: 'setting', roles: ['admin'], affix: true }
  },

]

let menuList = []

export const setMenuTree = function (menuTree) {

  let temp = new Vue({ routes })
  hanleFor(menuTree)
  console.log('allRouters', temp.$options.routes[0].children);
  console.log('menuList', menuList);
  temp.$options.routes[0].children.push(...menuList)
  // 保存路由到缓存
  window.sessionStorage.setItem('routes', JSON.stringify(temp.$options.routes[0].children))
  //temp.$router.addRoutes([{ path: '*', redirect: '/404' }])
}


const hanleFor = function (role) {
  menuList = []
  for (var i = 0; i < dynamicRoutes.length; i++) {
    if (dynamicRoutes[i].meta.roles.indexOf(role) > -1) {
      menuList.push(dynamicRoutes[i])
    }
  }
}


const routers = new VueRouter({
  routes,
  mode: 'history'
})

routers.beforeEach((to, from, next) => {
  console.log('to', to)
  // let paths = [];
  // let role = store.state.role;
  // let routes = JSON.parse(store.state.routes)
  // if (routes == null) return next();

  // routes.forEach(route => {
  //   paths.push(route.path)
  // });

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
