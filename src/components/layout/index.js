/**
 *  layout是portal布局
 *  full表示不使用布局（远程嵌套iframe）
 *
 *  *注：除portal外的系统开发环境使用layout，打包部署测试后使用full
 */
import layout from './layout.vue';
import full from './full.vue';

let layouts = {layout, full};

export default layouts;
