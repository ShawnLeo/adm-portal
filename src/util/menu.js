const menu = [{
  name: '首页',
  url: '/index',
  icon: 'stats-bars',
  _id: '0'
}, {
  name: '系统管理',
  icon: 'settings',
  _id: '11',
  children: [{
    name: '资源管理',
    url: '/sys/resource',
    icon: 'folder',
    _id: '11_0'
  }, {
    name: '用户管理',
    url: '/sys/user',
    icon: 'person-stalker',
    _id: '11_1'
  }, {
    name: '角色管理',
    url: '/sys/role',
    icon: 'ios-person',
    _id: '11_2'
  }, {
    name: '操作日志',
    url: '/sys/log',
    icon: 'social-buffer-outline',
    _id: '11_3'
  }]
}, {
  name: '百度',
  path: 'www.baidu.com',
  url: '/iframe',
  icon: 'social-buffer-outline',
  _id: '11_3'
}];

export default menu;
