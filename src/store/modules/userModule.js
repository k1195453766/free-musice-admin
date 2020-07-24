/*
* @Description: 用户列表module
* @Author: wangkai
* @Date: 2020-06-16
* @LastEditTime: 2020-06-16
* @LastEditors: Please set LastEditors
*/

export default {
    namespaced: true,//这里是解决不同模块命名冲突的问题,但是所有数据都还在一个挂载点上

    state: {
        userList: [],
        title: '这里是userModule',
        content:'这里是content字段'
    },
    mutations: {
        set_user_list: (state, userList) => {
            state.userList = userList
        },
    },
    actions: {
        getUserList({ commit }, page, size) {
            return new Promise((resolve, reject) => {
                this.$http({
                    url: '/getMusiceList',
                    method: 'get',
                    params: { 'page': page, 'size': size }
                })
            })
        }
    }
}