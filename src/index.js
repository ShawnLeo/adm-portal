// 公共布局
import Layout from './components/layout';
// 公共工具库
import utils from './utils';
// 公共组件
import {resource, user, role, roleResource, log} from './views/sys';
import iframe from './components/iframe';
import {index, login, _404} from './views';
// 公共Vuex模块
import app from './store';
let AdmPortal = {
  Layout: Layout,
  resource: resource,
  user: user,
  role: role,
  roleResource: roleResource,
  log: log,
  iframe: iframe,
  index: index,
  login: login,
  _404: _404
};

const install = function (Vue, opts = {}) {
  Object.keys(AdmPortal).forEach(key => {
    Vue.component(key, AdmPortal[key]);
  });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  Layout, resource, user, role, roleResource, log, iframe, index, login, _404, utils, app
};
