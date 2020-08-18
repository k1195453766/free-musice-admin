/*
* @Description: api接口列表
* @Author: wangkai
* @Date: 2020-08-14
* @LastEditTime: 2020-08-14
* @LastEditors: Please set LastEditors
*/

const BaseUrl = 'http://www.musicefree.com:8081/'//本地映射，对应127.0.0.1
//const BaseUrl = 'http://www.sidama.work/'//服务器ip

// 获取token
export const getToken = BaseUrl + 'getToken'
// 登陆
export const login = BaseUrl + 'login'
// 退出登陆
export const loginOut = BaseUrl + 'loginOut'
// 获取用户列表
export const userList = BaseUrl + 'api/userList'