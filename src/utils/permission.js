import { setMenuTree } from '@/router'

/**
 * @func 根据角色信息动态添加路由
 * @desc 
 * @param {}  
 * @return {} 
 */

export function checkPermission(role) {
    console.log('checkPermission-role', role);
    console.log('checkPermission-dynamicRoutes', setMenuTree(role));

}