import { menuList } from './interface';
// import Cookies from 'js-cookie';
import {getStore, setStore} from '../utils/storage';
let menus = [];
let iteratorInitMenuJsTree = (parent, children) => {
  if (!children) {
    return;
  }
  for (let i = 0; i < children.length; i++) {
    let menu = {
      name: children[i].li_attr.name,
      url: children[i].li_attr.path,
      icon: JSON.parse(children[i].li_attr.style) ? JSON.parse(children[i].li_attr.style).className : 'person-stalker',
      _id: children[i].li_attr.id
    };
    if (children[i].children.length) {
      menu.children = [];
      iteratorInitMenuJsTree(menu.children, children[i].children);
    }
    parent.push(menu);
  }
};

let getMenuList = async (system, env) => {
  if (!getStore('menus-' + system)) {
    await menuList({system: system}, env).then(r => {
      iteratorInitMenuJsTree(menus, r.body.children);
      setStore('menus-' + system, JSON.stringify(menus));
    });
  }
};

let getMenusFromCookies = (system, menus) => {
  if (!getStore('menus-' + system)) {
    setTimeout(() => {
        getMenusFromCookies(system, menus);
    }, 100);
  } else {
    menus(JSON.parse(getStore('menus-' + system)));
  }
};

export {getMenuList, getMenusFromCookies};
