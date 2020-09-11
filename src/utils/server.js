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

// 请求失败方法
function errorFun(msg) {
    return { 'status': 0, 'msg': msg, data: [] };
}

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
    }).catch(e => {

    })
}
/**
 * @func 获取用户列表
 * @desc 
 * @param {}  
 * @return {} 
 */
export function userList(page, size, callback) {
    let url = `${api.userList}?page=${page}&size=${size}`
    axios.get(url).then(res => {
        console.log('userList', res);
        callback(res.data)
    }).catch(e => {
        callback(errorFun(e.toString()))
    })
}

/**
 * @func 备份数据库
 * @desc 
 * @param {}  
 * @return {} 
 */
export function copySql() {
    let url = `${api.copySql}`
    axios.get(url).then(res => {
        callback(res.data)
    }).catch(e => {

    })
}
/**
 * @func 获取文章列表
 * @desc 
 * @param {}  
 * @return {} 
 */
export function newsList(page, size, callback) {
    let url = `${api.newsList}?page=${page}&size=${size}`
    axios.get(url).then(res => {
        callback(res.data)
    }).catch(e => {
        callback(errorFun(e.toString()))
    })
}

/**
 * @func 获取文章分类列表
 * @desc 
 * @param {}  
 * @return {} 
 */
export function newsTypeList(callback) {
    let url = `${api.newsTypeList}`
    axios.get(url).then(res => {
        callback(res.data)
    }).catch(e => {
        callback(errorFun(e.toString()))
    })
}


/**
 * @func 新增/编辑文章
 * @desc 
 * @param {}  
 * @return {} 
 */
export function addNews(params, callback) {
    let url = `${api.addNews}?id=${params.id}&title=${params.title}&description=${params.description}&content=${encodeURI(params.content)}&browse_count=${params.browse_count}&type=${params.type}`
    axios.get(url).then(res => {
        callback(res.data)
    }).catch(e => {
        console.log('error', e);
        callback(errorFun(e.toString()))
    })
}

/**
 * @func 删除文章
 * @desc 
 * @param {}  
 * @return {} 
 */

export function deleteNews(ids, callback) {
    let url = `${api.deleteNews}?ids=${ids}`;
    axios.get(url).then(res => {
        callback(res.data)
    }).catch(e => {
        alert('删除文章报错')
    })
}