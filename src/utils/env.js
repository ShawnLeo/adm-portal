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
    baseUrl = 'https://api-test.meimeitech.com';
  } else if (env === 'pre') { // 预生产环境
    baseUrl = 'https://api-pre.meimeitech.com';
  } else if (env === 'prod') { // 生产环境
    baseUrl = 'https://api.meimeitech.com';
  }
  return baseUrl;
};
export {getBaseUrl};
