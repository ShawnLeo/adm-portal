<template>
  <div>
    <div v-for="(item,index) in menus " :key="item._id">
      <Submenu :name="item.name" :n="item.name" v-if="item.children && item.children.length > 0">
        <template slot="title">
          <Icon :type="item.icon?item.icon:'ios-browsers'"></Icon>
          <span class="menu-ellipsis">{{item.name}}</span>
        </template>
        <my-menu :menus="item.children"></my-menu>
      </Submenu>
      <Menu-item :name="routerFilter(item.deployUrl, item.url, item.name)" v-else>
        <Icon :type="item.icon?item.icon:'chevron-right'"></Icon>
        <span class="menu-ellipsis">{{item.name}}</span>
      </Menu-item>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unneeded-ternary */
  import {domain} from '../../utils/utils';
  import menu from './menu.vue';
  export default {
    name: 'my-menu',
    props: ['menus'],
    methods: {
        /**
         * 选择菜单
         */
        selectFn(a) {
          this.$router.push({path: a});
          this.$nextTick(() => {
            this.$refs.menu.$children.forEach((item) => {
              item.opened = item.active;
            });
          });
        },
        routerFilter(deployUrl, url, name) {
          if (url && (url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0)) {
            return '/iframe?name=' + name + '&path=' + url;
          } else {
            deployUrl = deployUrl ? deployUrl : domain();
            return '/iframe?name=' + name + '&path=' + deployUrl + '#' + url;
          }
        }
    },
    components: {
      'my-menu': menu
    }
  };
</script>

<style>
</style>
