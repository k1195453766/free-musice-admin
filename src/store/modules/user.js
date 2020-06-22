/*
* @Description: 用户列表module
* @Author: wangkai
* @Date: 2020-06-16
* @LastEditTime: 2020-06-16
* @LastEditors: Please set LastEditors
*/

export const moduleUser = {
    state: {
        userList: [],
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