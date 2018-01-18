// import Cookies from 'js-cookie';
import {getBaseUrl, getLoginUrl} from '../utils/env';
import * as mainConst from '../utils/const';
import {getStore, setStore} from '../utils/storage';
import iView from 'iview';

const app = {
  state: {
    userInfo: {},
    sidebar: {
      opened: !+getStore('sidebarStatus'),
      minOpen: false // 小屏时菜单状态
    },
    router: {
      currentPageName: mainConst.ADM_INDEX
    },
    lang: {
      icon: '#icon-zhongguo',
      type: 'CN'
    },
    searchState: {
      show: false,
      params: ''
    },
    menuTabs: [{
      title: '首页',
      fullPath: mainConst.ADM_INDEX,
      params: {
        prevLevelName: '首页',
        title: '首页'
      }
    }],
    menuTabarWidth: null,
    menuFirsClick: true,
    system: 'all',
    menuType: 3, // 菜单等级，2-显示某系统菜单  3-显示平台及菜单
    baseUrl: getBaseUrl(process.env.NODE_ENV), // 接口路径
    loginUrl: getLoginUrl(process.env.NODE_ENV) // 登陆页面
  },
  mutations: {
    /**
     * 初始化用户信息
     * @param state
     * @param payload
     * @constructor
     */
    INIT_USER_INFO: (state, payload) => {
      state.userInfo = payload;
    },
    /**
     * 菜单的缩展
     */
    TOGGLE_SIDEBAR: state => {
      let winWidth = document.documentElement.clientWidth;
      if (winWidth <= 600) {
        state.sidebar.minOpen = !state.sidebar.minOpen;
        state.sidebar.opened = false;
        setStore('sidebarStatus', 0);
        return;
      } else {
        if (state.sidebar.opened) {
          setStore('sidebarStatus', 1);
        } else {
          setStore('sidebarStatus', 0);
        }
        state.sidebar.opened = !state.sidebar.opened;
      }
    },
    CLOSE_SLIDEBAR: state => {
      setStore('sidebarStatus', 0);
      state.sidebar.opened = false;
      state.sidebar.minOpen = false;
    },
    OPEN_SLIDEBAR: state => {
      setStore('sidebarStatus', 1);
      state.sidebar.opened = true;
    },
    /**
     * 面包屑
     */
    GET_CURRENT_PAGE_NAME: (state, payload) => {
      state.router.currentPageName = payload;
    },
    /**
     * 设置语言
     */
    SET_LANG: (state, payload) => {
      state.lang = payload;
      setStore('lang', payload);
    },
    /**
     * 搜索过滤
     */
    SEARCH_FILTER: (state, payload) => {
      if (!payload.params.meta.search) { // 路由元信息设置是否有搜索模块
        iView.Message.error('该页不提供搜索!');
        return;
      } else {
        Object.assign(state.searchState, {show: !state.searchState.show}, payload);
      }
    },
    INIT_TAB: (state) => {
      state.menuTabs = getStore('menuTabs') ? JSON.parse(getStore('menuTabs')) : state.menuTabs;
    },
    ADD_TAB: (state, payload) => {
      if (!payload.meta.title) {
        return;
      }
      let r = {
        title: payload.query.name,
        fullPath: payload.fullPath,
        params: {
          prevLevelName: '首页',
          title: payload.query.name
        }
      };
      state.menuTabs.push(r);
      setStore('menuTabs', JSON.stringify(state.menuTabs));
    },
    REMOVE_TAB: (state, index) => {
      state.menuTabs.splice(index, 1);
      setStore('menuTabs', JSON.stringify(state.menuTabs));
    },
    SET_MENU_TAB_WIDTH: (state, w) => {
      state.menuTabarWidth = w;
    },
    CLOSE_ALL_OPENED_TAB: (state) => {
      state.menuTabs = state.menuTabs.filter((item) => {
        return item.fullPath === mainConst.ADM_INDEX;
      });
      setStore('menuTabs', JSON.stringify(state.menuTabs));
    },
    CLOSE_OTHER_TAB: (state, curpath) => {
      state.menuTabs = state.menuTabs.filter((item) => {
        return (item.fullPath === mainConst.ADM_INDEX) || (item.fullPath === curpath);
      });
      setStore('menuTabs', JSON.stringify(state.menuTabs));
    }
  },
  actions: {
    initUserInfo: ({commit}, payload) => {
      commit('INIT_USER_INFO', payload);
    },
    ToggleSideBar: ({commit}) => {
      commit('TOGGLE_SIDEBAR');
    },
    getCurrentPageName: ({commit}, payload) => {
      commit('GET_CURRENT_PAGE_NAME', payload);
    },
    setLang: ({commit}, payload) => {
      commit('SET_LANG', payload);
    },
    searchFilter: ({commit}, payload) => {
      commit('SEARCH_FILTER', payload);
    },
    // tabMenu相关操作
    initTab: ({commit, state}) => {
      commit('INIT_TAB');
    },
    addTab: ({commit, state}, router) => {
      commit('INIT_TAB');
      document.title = router.meta.title;
      let pathIndex = state.menuTabs.findIndex((n, index) => {
        if (!n) {
          return false;
        }
        if (router.path === '/iframe') {
          // console.log(JSON.stringify(n));

          let r = {
            title: router.query.name,
            fullPath: router.fullPath,
            params: {
              prevLevelName: '首页',
              title: router.query.name
            }
          };

          // console.log(JSON.stringify(r));
          if (JSON.stringify(n) === JSON.stringify(r)) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      });
      if (pathIndex === -1) {
        commit('ADD_TAB', router);
      }
    },
    removeTab: ({commit, state}, index) => {
      if (state.menuTabs.length > 1) {
        commit('REMOVE_TAB', index);
        // bus.$emit('delete-slide');
      }
    },
    removeOtherTab: ({commit}, curpath) => {
      commit('CLOSE_OTHER_TAB', curpath);
    },
    removeAllTab: ({commit}) => {
      commit('CLOSE_ALL_OPENED_TAB');
    },
    setMenuTabWidth: ({commit}, w) => {
      commit('SET_MENU_TAB_WIDTH', w);
    }
  }
};

export default app;
