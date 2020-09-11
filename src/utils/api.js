/*
* @Description: api接口列表
* @Author: wangkai
* @Date: 2020-08-14
* @LastEditTime: 2020-08-14
* @LastEditors: Please set LastEditors
*/

const BaseUrl = 'http://admin.musicefree.com/'//本地映射，对应127.0.0.1
//const BaseUrl = 'http://sidama.sidama.work/'//服务器ip

// 获取token
export const getToken = BaseUrl + 'getToken'
// 登陆
export const login = BaseUrl + 'login'
// 退出登陆
export const loginOut = BaseUrl + 'api/loginOut'
// 获取用户列表
export const userList = BaseUrl + 'api/userList'
// 备份数据库
export const copySql = BaseUrl + 'api/copySql'
// 获取文章列表
export const newsList = BaseUrl + 'api/newsList'
// 获取文章分类列表
export const newsTypeList = BaseUrl + 'api/newsTypeList'
// 新增文章
export const addNews = BaseUrl + 'api/addNews'
// 删除文章
export const deleteNews = BaseUrl + 'api/deleteNews'