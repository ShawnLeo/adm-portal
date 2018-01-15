/**
 * Created by Shawn on 2017/6/23.
 */

const PLATFORM_SYS = 'platform-sys';

import {fetch, download} from './fetch';

// 登陆
export const login = (data, baseUrl) => fetch('/login', {
  reqParams: data,
  baseUrl: baseUrl
}, 'POST');

// 角色列表
export const roleSearch = (data, baseUrl) => fetch(PLATFORM_SYS + '/role/list', {
  reqBody: data,
  baseUrl: baseUrl
}, 'POST');

// 角色增加
export const roleAdd = (data, baseUrl) => fetch(PLATFORM_SYS + '/role/save', {
  reqBody: data,
  baseUrl: baseUrl
}, 'POST');

// 角色编辑
export const roleEdit = (data, baseUrl) => fetch(PLATFORM_SYS + '/role/update', {
  reqBody: data,
  baseUrl: baseUrl
}, 'POST');

// 角色权限
export const roleResources = (data, baseUrl) => fetch(PLATFORM_SYS + '/role/set', {
  reqBody: data,
  baseUrl: baseUrl
}, 'POST');

export const roleDelete = (data, baseUrl) => fetch(PLATFORM_SYS + '/role/delete/' + data.id, {baseUrl: baseUrl}, 'POST');

export const resourceList = (baseUrl) => fetch(PLATFORM_SYS + '/resource/list', {baseUrl: baseUrl}, 'POST');

export const resourceGet = (data, baseUrl) => fetch(PLATFORM_SYS + '/resource/get/' + data.id, {baseUrl: baseUrl}, 'GET');

export const resourceChange = (data, baseUrl) => fetch(PLATFORM_SYS + '/resource/change/' + data.id, {
  reqParams: data,
  baseUrl: baseUrl
}, 'POST');

export const resourceExport = (data, baseUrl) => download(PLATFORM_SYS + '/resource/export/' + data.id, {baseUrl: baseUrl}, 'GET');

export const resourceSave = (data, baseUrl) => fetch(PLATFORM_SYS + '/resource/save', {
  reqBody: data,
  baseUrl: baseUrl
}, 'POST');

export const resourceDelete = (data, baseUrl) => fetch(PLATFORM_SYS + '/resource/delete/' + data.id, {baseUrl: baseUrl}, 'POST');

// 系统菜单列表
export const menuList = (data, baseUrl) => fetch(PLATFORM_SYS + '/resource/menu/list', {
  reqParams: data,
  baseUrl: baseUrl
}, 'POST');

// 角色菜单数据
export const roleMenuList = (baseUrl) => fetch(PLATFORM_SYS + '/role/menus', {
  baseUrl: baseUrl
}, 'GET');

export const userList = (data, body, baseUrl) => fetch(PLATFORM_SYS + '/user/page', {
  reqParams: data,
  reqBody: body,
  baseUrl: baseUrl
}, 'POST');

export const passResest = (data, body, baseUrl) => fetch(PLATFORM_SYS + '/user/resetPwd/' + data.id, {
  reqBody: body,
  baseUrl: baseUrl
}, 'POST');

export const updatePwd = (body, baseUrl) => fetch(PLATFORM_SYS + '/user/updatePwd/', {
  reqBody: body,
  baseUrl: baseUrl
}, 'POST');

export const lockUser = (data, baseUrl) => fetch(PLATFORM_SYS + '/user/lock/' + data.id, {baseUrl: baseUrl}, 'POST');

export const saveUser = (body, baseUrl) => fetch(PLATFORM_SYS + '/user/save', {
  reqBody: body,
  baseUrl: baseUrl
}, 'POST');

export const updateUser = (body, baseUrl) => fetch(PLATFORM_SYS + '/user/update', {
  reqBody: body,
  baseUrl: baseUrl
}, 'POST');

export const logList = (data, body, baseUrl) => fetch(PLATFORM_SYS + '/syslog/page', {
  reqParams: data,
  reqBody: body,
  baseUrl: baseUrl
}, 'POST');

export const getUserInfo = (baseUrl) => fetch(PLATFORM_SYS + '/auth/info', {baseUrl: baseUrl}, 'GET');
