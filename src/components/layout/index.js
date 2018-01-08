/**
 *  Layout是portal布局
 *  full表示不使用布局（远程嵌套iframe）
 *
 *  *注：除portal外的系统开发环境使用Layout，打包部署测试后使用full
 */
import Layout from './layout.vue';
import full from './full.vue';

let layouts = {Layout, full};

export default layouts;
