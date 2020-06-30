import Vue from 'vue'
import Vuex from 'vuex'

import request from '../network/request'

Vue.use(Vuex)

const mutations = {
    set_routes: (state, routes) => {
        state.routes = routes
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    set_UserInfo: (state, userInfo) => {
        state.userInfo = userInfo
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    loginOut({ commit }) {
        return new Promise((resolve, reject) => {
            return request({
                url: '/loginOut',
                method: 'get'
            }).then(res => {
                resolve(res)
            }).catch(e => {
                reject(e)
            })
        })
    }
}

const modules = {

}

const store = new Vuex.Store({
    state: {
        token: '',//登陆token
        userInfo: '',//用户信息
        name: '',//用户名称
        roles: '',//用户角色
        avatar: '',//用户头像
        routes: window.sessionStorage.getItem('routes'), //保存当前用户的所有路由
    },
    // 保存state信息
    mutations,
    // 进行异步操作（数据请求）
    actions,
    modules
})
export default store;
