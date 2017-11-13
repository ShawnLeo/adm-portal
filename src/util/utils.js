/**
 * 公共工具包
 * Created by Shawn on 2017/6/25.
 */

/**
 * 将js对象拼接成url params字符串
 */
export const joint = (object) => {
  let dataStr = '';
  if (object) {
    Object.keys(object).forEach(key => {
      dataStr += key + '=' + object[key] + '&';
    });
    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
  }
  return dataStr;
};

export const formator = (val, digits) => {
  let lessThanZero = false;
  if (isNaN(val)) {
    val = '0.0000';
  }
  if (val < 0) {
    val = Math.abs(val);
    lessThanZero = true;
  }
  val = Math.round(val * Math.pow(10, digits)) / Math.pow(10, digits);
  return (lessThanZero ? '-' : '') + val.toFixed(digits);
};
export const dateFormat = (date, fmt) => {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  };

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  }
  return fmt;
};
