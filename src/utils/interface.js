/**
 * Created by Shawn on 2017/6/23.
 */

const PLATFORM_SYS = 'platform-sys';

import {fetch, download} from './fetch';

// 登陆
export const login = (data, env) => fetch('/login', {
  reqParams: data,
  env: env
}, 'POST');

// 角色列表
export const roleSearch = (data, env) => fetch(PLATFORM_SYS + '/role/list', {
  reqBody: data,
  env: env
}, 'POST');

// 角色增加
export const roleAdd = (data, env) => fetch(PLATFORM_SYS + '/role/save', {
  reqBody: data,
  env: env
}, 'POST');

// 角色编辑
export const roleEdit = (data, env) => fetch(PLATFORM_SYS + '/role/update', {
  reqBody: data,
  env: env
}, 'POST');

// 角色权限
export const roleResources = (data, env) => fetch(PLATFORM_SYS + '/role/set', {
  reqBody: data,
  env: env
}, 'POST');

export const roleDelete = (data, env) => fetch(PLATFORM_SYS + '/role/delete/' + data.id, {env: env}, 'POST');

export const resourceList = (env) => fetch(PLATFORM_SYS + '/resource/list', {env: env}, 'POST');

export const resourceGet = (data, env) => fetch(PLATFORM_SYS + '/resource/get/' + data.id, {env: env}, 'GET');

export const resourceChange = (data, env) => fetch(PLATFORM_SYS + '/resource/change/' + data.id, {
  reqParams: data,
  env: env
}, 'POST');

export const resourceExport = (data, env) => download(PLATFORM_SYS + '/resource/export/' + data.id, {env: env}, 'GET');

export const resourceSave = (data, env) => fetch(PLATFORM_SYS + '/resource/save', {
  reqBody: data,
  env: env
}, 'POST');

export const resourceDelete = (data, env) => fetch(PLATFORM_SYS + '/resource/delete/' + data.id, {env: env}, 'POST');

// 菜单列表
export const menuList = (data, env) => fetch(PLATFORM_SYS + '/resource/menu/list', {
  reqParams: data,
  env: env
}, 'POST');

export const userList = (data, body, env) => fetch(PLATFORM_SYS + '/user/page', {
  reqParams: data,
  reqBody: body,
  env: env
}, 'POST');

export const passResest = (data, body, env) => fetch(PLATFORM_SYS + '/user/resetPwd/' + data.id, {
  reqBody: body,
  env: env
}, 'POST');

export const updatePwd = (body, env) => fetch(PLATFORM_SYS + '/user/updatePwd/', {
  reqBody: body,
  env: env
}, 'POST');

export const lockUser = (data, env) => fetch(PLATFORM_SYS + '/user/lock/' + data.id, {env: env}, 'POST');

export const saveUser = (body, env) => fetch(PLATFORM_SYS + '/user/save', {
  reqBody: body,
  env: env
}, 'POST');

export const updateUser = (body, env) => fetch(PLATFORM_SYS + '/user/update', {
  reqBody: body,
  env: env
}, 'POST');

export const logList = (data, body, env) => fetch(PLATFORM_SYS + '/syslog/page', {
  reqParams: data,
  reqBody: body,
  env: env
}, 'POST');

export const getUserInfo = (env) => fetch(PLATFORM_SYS + '/auth/info', {env: env}, 'GET');
