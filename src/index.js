import Layout from './components/layout';
import utils from './utils';
import {resource, user, role, roleResource, log} from './views/sys';
import iframe from './components/iframe';
import {index, login, _404} from './views';
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
  Layout, resource, user, role, roleResource, log, iframe, index, login, _404, utils
};
