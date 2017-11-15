import Vue from 'vue';
import Router from 'vue-router';
import {getStore} from '../util/storage';
import store from '../store/index';
import layout from '../components/layout/layout.vue';

import {LoadingBar} from 'iview';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [{
    path: '/',
    meta: {
      title: '首页 '
    },
    component: layout,
    redirect: '/index',
    children: [{
      path: '/index',
      meta: {
        title: '首页'
      },
      component: (resolve) => require(['../views/index.vue'], resolve)
    }, {
      path: '/sys/resource',
      name: '资源管理',
      meta: {
        prevLevelName: '系统管理',
        title: '资源管理'
      },
      component: (resolve) => require(['../views/sys/resource.vue'], resolve)
    }, {
      path: '/sys/user',
      name: '用户管理',
      meta: {
        prevLevelName: '系统管理',
        title: '用户管理'
      },
      component: (resolve) => require(['../views/sys/user.vue'], resolve)
    }, {
      path: '/sys/role',
      name: '角色管理',
      meta: {
        prevLevelName: '系统管理',
        title: '角色管理'
      },
      component: (resolve) => require(['../views/sys/role.vue'], resolve)
    }, {
      path: '/sys/roleResource',
      name: '角色权限',
      meta: {
        prevLevelName: '系统管理',
        title: '角色权限'
      },
      component: (resolve) => require(['../views/sys/roleResource.vue'], resolve)
    }, {
      path: '/sys/log',
      name: '操作日志',
      meta: {
        prevLevelName: '系统管理',
        title: '操作日志'
      },
      component: (resolve) => require(['../views/sys/log.vue'], resolve)
    }, {
      path: '/iframe',
      meta: {
        title: 'iframe'
      },
      component: (resolve) => require(['../components/layout/iframe.vue'], resolve)
    }]
  }, {
    path: '/login',
    name: 'login',
    component: (resolve) => require(['../views/login.vue'], resolve)
  }, {
    //   path: '/user/group/testselect',
    //   name: 'testselect',
    //   component: (resolve) => require(['../views/user/testSelect.vue'], resolve)
    // }, {
    path: '/404',
    name: '404',
    component: (resolve) => require(['../views/404.vue'], resolve)
  }]
});
router.beforeEach((to, from, next) => {
  LoadingBar.start();
  let sessionId = getStore('sessionId');
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
