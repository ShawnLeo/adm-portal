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
          <Menu-item :name="sub.url" v-for="sub in item.children" :key="sub._id">
            <!--<Icon :type="sub.icon?sub.icon:'checkmark'"></Icon>-->
            <span  class="menu-ellipsis">{{sub.name}}</span>
          </Menu-item>
        </Submenu>
        <Menu-item :name="item.url" v-else>
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
        }
    },
    beforeCreate() {
      getMenuList(this.$store.state.app.system);
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
