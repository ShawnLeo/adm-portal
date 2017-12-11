/**
 * Created by Shawn on 2017/6/23.
 */

const PLATFORM_SYS = 'platform-sys';

import {fetch, download} from './fetch';

// 登陆
export const login = (data, codeEvents) => fetch('/login', {
  reqParams: data,
  codeEvents: codeEvents
}, 'POST');

// 角色列表
export const roleSearch = (data) => fetch(PLATFORM_SYS + '/role/list', {
  reqBody: data
}, 'POST');

// 角色增加
export const roleAdd = (data) => fetch(PLATFORM_SYS + '/role/save', {
  reqBody: data
}, 'POST');

// 角色编辑
export const roleEdit = (data) => fetch(PLATFORM_SYS + '/role/update', {
  reqBody: data
}, 'POST');

// 角色权限
export const roleResources = (data) => fetch(PLATFORM_SYS + '/role/set', {
  reqBody: data
}, 'POST');

export const roleDelete = (data) => fetch(PLATFORM_SYS + '/role/delete/' + data.id, {}, 'POST');

export const resourceList = () => fetch(PLATFORM_SYS + '/resource/list', {}, 'POST');

export const resourceGet = (data) => fetch(PLATFORM_SYS + '/resource/get/' + data.id, {}, 'GET');

export const resourceChange = (data) => fetch(PLATFORM_SYS + '/resource/change/' + data.id, {
  reqParams: data
}, 'POST');

export const resourceExport = (data) => download(PLATFORM_SYS + '/resource/export/' + data.id, {}, 'GET');

export const resourceSave = (data) => fetch(PLATFORM_SYS + '/resource/save', {
  reqBody: data
}, 'POST');

export const resourceDelete = (data) => fetch(PLATFORM_SYS + '/resource/delete/' + data.id, {}, 'POST');

// 菜单列表
export const menuList = (data) => fetch(PLATFORM_SYS + '/resource/menu/list', {reqParams: data}, 'POST');

export const userList = (data, body) => fetch(PLATFORM_SYS + '/user/page', {
  reqParams: data,
  reqBody: body
}, 'POST');

export const passResest = (data, body) => fetch(PLATFORM_SYS + '/user/resetPwd/' + data.id, {
  reqBody: body
}, 'POST');

export const updatePwd = (body) => fetch(PLATFORM_SYS + '/user/updatePwd/', {
  reqBody: body
}, 'POST');

export const lockUser = (data, body) => fetch(PLATFORM_SYS + '/user/lock/' + data.id, {}, 'POST');

export const saveUser = (body) => fetch(PLATFORM_SYS + '/user/save', {
  reqBody: body
}, 'POST');

export const updateUser = (body) => fetch(PLATFORM_SYS + '/user/update', {
  reqBody: body
}, 'POST');

export const logList = (data, body) => fetch(PLATFORM_SYS + '/syslog/page', {
  reqParams: data,
  reqBody: body
}, 'POST');
