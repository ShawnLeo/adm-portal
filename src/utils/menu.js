import { roleMenuList } from './interface';
import {getStore, setStore} from '../utils/storage';

let menus = [];
let iteratorInitMenuJsTree = (parent, children, deployUrl) => {
  if (!children) {
    return;
  }
  for (let i = 0; i < children.length; i++) {
    if (children[i].li_attr.resType === '1') {
      continue;
    }
    // 样式
    let icon = '';
    try {
      icon = JSON.parse(children[i].li_attr.style).className;
      console.log(icon);
    } catch (err) {
      console.log(children[i].li_attr.name + '样式转换异常！');
    }
    // deployUrl 部署路径
    if (children[i].li_attr.modType === '1') {
      deployUrl = children[i].li_attr.deployUrl;
    }

    let menu = {
      name: children[i].li_attr.name,
      url: children[i].li_attr.path,
      icon: icon,
      deployUrl: deployUrl,
      _id: children[i].li_attr.id
    };
    if (children[i].children.length > 0) {
      menu.children = [];
      iteratorInitMenuJsTree(menu.children, children[i].children, deployUrl);
    }
    parent.push(menu);
  }
};

let getMenuList = async (baseUrl, authId) => {
  if (!getStore('menus-' + authId)) {
    await roleMenuList(baseUrl).then(r => {
      iteratorInitMenuJsTree(menus, r.body.children, '');
      setStore('menus-' + authId, JSON.stringify(menus));
    });
  }
};

let getMenusFromCookies = (authId, _menus) => {
  if (!getStore('menus-' + authId)) {
    setTimeout(() => {
        getMenusFromCookies(authId, _menus);
    }, 100);
  } else {
    _menus(JSON.parse(getStore('menus-' + authId)));
  }
};

export {getMenuList, getMenusFromCookies};
