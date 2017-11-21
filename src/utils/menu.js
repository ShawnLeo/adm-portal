// const menu = [{
//   name: '概览统计',
//   url: '/index',
//   icon: 'stats-bars',
//   _id: '0'
// }, {
//   name: '用户列表',
//   icon: 'ios-people',
//   _id: '1',
//   children: [{
//     name: '用户列表',
//     url: '/user/list',
//     icon: 'ios-people',
//     _id: '1_0'
//   }, {
//     name: '分群管理列表',
//     url: '/user/group/list',
//     icon: 'checkmark',
//     _id: '1_1'
//   }, {
//     name: '创建用户分群',
//     url: '/user/group/create',
//     icon: 'checkmark',
//     _id: '1_2'
//   }, {
//     name: '用户细查',
//     url: '/user/query',
//     icon: 'checkmark',
//     _id: '1_3'
//   }
//   ]
// }, {
//   name: '转化漏斗',
//   icon: 'funnel',
//   _id: '2',
//   children: [{
//     name: '转化漏斗列表',
//     url: '/funnel/list',
//     icon: 'heart',
//     _id: '2_0'
//   }, {
//     name: '创建转化漏斗',
//     url: '/funnel/create',
//     icon: 'checkmark',
//     _id: '2_1'
//   }, {
//     name: '转化详情',
//     url: '/funnel/query',
//     icon: 'checkmark',
//     _id: '2_2'
//   }
//   ]
// }, {
//   name: '自定义表格管理列表',
//   url: '/example/table',
//   icon: 'grid',
//   _id: '3'
// }, {
//   name: '渠道分析',
//   url: '/channel/list',
//   icon: 'connection-bars',
//   _id: '4'
// }, {
//   name: '用户留存分析',
//   url: '/table/list',
//   icon: 'pie-graph',
//   _id: '5'
// }, {
//   name: '指标统计',
//   icon: 'arrow-graph-up-right',
//   _id: '6',
//   children: [{
//     name: '指标统计(页面)',
//     url: '/kpi/pageList',
//     icon: 'heart',
//     _id: '6_0'
//   }, {
//     name: '指标统计(事件)',
//     url: '/kpi/eventList',
//     icon: 'checkmark',
//     _id: '6_1'
//   }, {
//     name: '转化详情',
//     url: '/funnel/query',
//     icon: 'checkmark',
//     _id: '6_2'
//   }]
// }, {
//   name: '数据日报',
//   url: '/daily/list',
//   icon: 'ios-list-outline',
//   _id: '8'
// }, {
//   name: '页面与行为设置',
//   icon: 'ios-settings',
//   _id: '9',
//   children: [{
//     name: '页面管理',
//     url: '/page/list',
//     icon: 'checkmark',
//     _id: '6_0'
//   }, {
//     name: '行为管理',
//     url: '/action/list',
//     icon: 'checkmark',
//     _id: '6_1'
//   }, {
//     name: '创建页面',
//     url: '/page/create',
//     icon: 'checkmark',
//     _id: '6_2'
//   }, {
//     name: '创建行为',
//     url: '/action/create',
//     icon: 'checkmark',
//     _id: '6_2'
//   }]
// }, {
// //   name: '404',
// //   url: '/404',
// //   icon: 'home',
// //   _id: '10'
// // }, {
//   name: '系统管理',
//   icon: 'settings',
//   _id: '11',
//   children: [{
//     name: '资源管理',
//     url: '/sys/resource',
//     icon: 'folder',
//     _id: '11_0'
//   }, {
//     name: '用户管理',
//     url: '/sys/user',
//     icon: 'person-stalker',
//     _id: '11_1'
//   }, {
//     name: '角色管理',
//     url: '/sys/role',
//     icon: 'ios-person',
//     _id: '11_2'
//   }, {
//     name: '操作日志',
//     url: '/sys/log',
//     icon: 'social-buffer-outline',
//     _id: '11_3'
//   }]
// }, {
//   name: '调度任务管理',
//   icon: 'settings',
//   _id: '12',
//   children: [{
//     name: '系统调度',
//     url: '/statjob/syslist',
//     icon: 'eye',
//     _id: '12_0'
//   }, {
//     name: '人工调度',
//     url: '/statjob/artjob',
//     icon: 'person-stalker',
//     _id: '12_1'
//   }]
// }];

import { menuList } from './interface';
let menus = [];
let iteratorInitMenuJsTree = (parent, children) => {
  if (!children) {
    return;
  }
  for (let i = 0; i < children.length; i++) {
    let menu = {
      name: children[i].li_attr.name,
      url: children[i].li_attr.path,
      icon: 'person-stalker',
      _id: children[i].li_attr.id,
      children: []
    };
    iteratorInitMenuJsTree(menu.children, children[i].children);
    parent.push(menu);
  }
};

let getMenuList = async () => {
  // TODO 1.应用系统传递值  2.缓存菜单
  await menuList({system: '10'}).then(r => {
    iteratorInitMenuJsTree(menus, r.body.children);
  });
};
getMenuList();

export default menus;
