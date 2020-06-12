import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/login')
const Home = () => import('@/views/home')
const Config = () => import('@/views/config')
const Layout = () => import('@/views/layout')
const Welcome = () => import('@/views/welcome')
const User = () => import('@/views/user')

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new VueRouter({
  routes: [
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
          path: '/config',
          component: Config,
          name: 'Config',
          meta: { title: 'Config', icon: 'setting', affix: false }
        }, {
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
    }
  ],
  mode: 'history'
})
