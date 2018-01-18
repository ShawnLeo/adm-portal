/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 *
 */
const getBaseUrl = function (env) {
  let baseUrl = 'http://localhost:7031';
  if (env === 'dev') { // 开发环境
    baseUrl = 'http://10.133.255.201:5001';
  } else if (env === 'test') { // 测试环境
    baseUrl = 'http://10.133.255.201:5001';
  } else if (env === 'pre') { // 预生产环境
    baseUrl = 'https://api-pre.meimeitech.com';
  } else if (env === 'prod') { // 生产环境
    baseUrl = 'https://api.meimeitech.com';
  }
  return baseUrl;
};

const getLoginUrl = function (env) {
  let loginUrl = 'http://localhost:8080#/login';
  if (env === 'dev') { // 开发环境
    loginUrl = 'http://10.133.255.201:5001/pc/portal/index.html#/login';
  } else if (env === 'test') { // 测试环境
    loginUrl = 'https://static-test.meimeitech.com/pc/portal/index.html#/login';
  } else if (env === 'pre') { // 预生产环境
    loginUrl = 'https://static-pre.meimeitech.com/pc/portal/index.html#/login';
  } else if (env === 'prod') { // 生产环境
    loginUrl = 'https://static.meimeitech.com/pc/portal/index.html#/login';
  }
  return loginUrl;
};
export {getBaseUrl, getLoginUrl};
