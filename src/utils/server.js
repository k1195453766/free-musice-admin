/*
* @Description: 数据请求接口
* @Author: wangkai
* @Date: 2020-08-14
* @LastEditTime: 2020-08-14
* @LastEditors: Please set LastEditors
*/

import * as api from './api'
import axios from 'axios'
import store from '../store'

/**
 * @func 获取token
 * @desc 
 * @param {}  
 * @return {} 
 */
export function getToken(userInfo, callback) {
    let url = `${api.getToken}?username=${userInfo.username}&password=${userInfo.password}`
    axios.get(url).then(res => {
        callback(res.data)
    })
}

/**
 * @func 登录
 * @desc 
 * @param {}  
 * @return {} 
 */
export function loginIn(userInfo, callback) {
    // let formData = new FormData()
    // formData.append('username', userInfo.username)
    // formData.append('password', userInfo.password)
    let url = `${api.login}?username=${userInfo.username}&password=${userInfo.password}`
    axios.get(url).then(res => {
        callback(res.data)
    })
}
/**
 * @func 获取用户列表
 * @desc 
 * @param {}  
 * @return {} 
 */
export function userList(page, size) {
    let url = `${api.userList}?page=${page}&size=${size}`
    axios.get(url).then(res => {
        callback(res.data)
    }).catch(e => {

    })
}