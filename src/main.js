import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import request from './network/request'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
Vue.use(ElementUI);

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

import echarts from 'echarts'

Vue.use(echarts)

Vue.config.productionTip = false

Vue.prototype.$http = request
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})