import Vue from 'vue';
import Router from 'vue-router';
import Cookies from 'js-cookie';
import store from '../store/store';
import layouts from '../components/layout';
// import full from '../components/layout/full.vue';

import {resource, user, role, roleResource, log} from '../views/sys';
import iframe from '../components/iframe';
import {index, login, _404} from '../views';

import {LoadingBar} from 'iview';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [{
    path: '/',
    meta: {
      title: '首页 '
    },
    component: layouts.Layout,
    redirect: '/index',
    children: [{
      path: '/index',
      meta: {
        title: '首页'
      },
      component: index
    }, {
      path: '/sys/resource',
      name: '资源管理',
      meta: {
        prevLevelName: '系统管理',
        title: '资源管理'
      },
      component: resource
    }, {
      path: '/sys/user',
      name: '用户管理',
      meta: {
        prevLevelName: '系统管理',
        title: '用户管理'
      },
      component: user
    }, {
      path: '/sys/role',
      name: '角色管理',
      meta: {
        prevLevelName: '系统管理',
        title: '角色管理'
      },
      component: role
    }, {
      path: '/sys/roleResource',
      name: '角色权限',
      meta: {
        prevLevelName: '系统管理',
        title: '角色权限'
      },
      component: roleResource
    }, {
      path: '/sys/log',
      name: '操作日志',
      meta: {
        prevLevelName: '系统管理',
        title: '操作日志'
      },
      component: log
    }, {
      path: '/iframe',
      meta: {
        title: 'iframe'
      },
      component: iframe
    }]
  }, {
    path: '/login',
    name: 'login',
    component: login
  }, {
    //   path: '/user/group/testselect',
    //   name: 'testselect',
    //   component: (resolve) => require(['../views/user/testSelect.vue'], resolve)
    // }, {
    path: '/404',
    name: '404',
    component: _404
  }]
});
router.beforeEach((to, from, next) => {
  LoadingBar.start();
  let sessionId = Cookies.get('sessionId');
  if (sessionId) { // 如果是登陆状态
    store.dispatch('addTab', to);
    to.path === '/login' ? next({path: '/index'}) : next();
  } else { // 不是登陆状态
    to.path !== '/login' ? next({path: '/login'}) : next();
  }
});

router.afterEach(() => {
  LoadingBar.finish();
  window.scrollTo(0, 0);
});

export default router;
