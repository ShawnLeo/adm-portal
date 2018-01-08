<template>
  <div class="navbar" :class="theme">
    <Menu width="220" ref="menu" :theme="theme" :open-names="[$route.meta.prevLevelName]" :active-name="$route.path"
          accordion @on-select="selectFn">
      <div v-for="(item,index) in menu " :key="item._id">
        <Submenu :name="item.name" :n="item.name" v-if="item.children">
          <template slot="title">
            <Icon :type="item.icon?item.icon:'checkmark'"></Icon>
            <span class="menu-ellipsis">{{item.name}}</span>
          </template>
          <Menu-item :name="routerFilter(sub.iframe, sub.url, sub.name)" v-for="sub in item.children" :key="sub._id">
            <!--<Icon :type="sub.icon?sub.icon:'checkmark'"></Icon>-->
            <span  class="menu-ellipsis">{{sub.name}}</span>
          </Menu-item>
        </Submenu>
        <Menu-item :name="routerFilter(item.iframe, item.url, item.name)" v-else>
          <Icon :type="item.icon?item.icon:'checkmark'"></Icon>
          <span class="menu-ellipsis">{{item.name}}</span>
        </Menu-item>
      </div>
    </Menu>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getMenuList, getMenusFromCookies} from '../../utils/menu';

  export default {
    name: 'menus',
    data() {
      return {
        theme: 'dark', // 主题
        menu: [] // 导航菜单
      };
    },
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
        routerFilter(iframe, url, name) {
          if (iframe === 1) {
            return '/iframe?name=' + name + '&path=' + url;
          } else {
            return url;
          }
        }
    },
    beforeCreate() {
      getMenuList(this.$store.state.app.system, this.$store.state.app.env);
    },
    mounted() {
      let self = this;
      getMenusFromCookies(this.$store.state.app.system, function (menu) {
        self.menu = menu;
      });
    }
  };
</script>

<style>
</style>
