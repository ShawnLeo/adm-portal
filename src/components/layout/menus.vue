<template>
  <div class="navbar" :class="theme">
    <Menu width="220" ref="menu" :theme="theme" :open-names="[$route.meta.prevLevelName]" :active-name="$route.path"
          accordion @on-select="selectFn">
      <!--迭代 支持多级菜单-->
      <my-menu :menus="menus"></my-menu>
    </Menu>
  </div>
</template>

<script type="text/ecmascript-6">
  import menu from './menu.vue';
  import {getMenuList, getMenusFromCookies} from '../../utils/menu';

  export default {
    name: 'menus',
    data() {
      return {
        theme: 'dark', // 主题
        menus: [] // 导航菜单
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
      getMenuList(this.$store.state.app.baseUrl, this.$store.state.app.userInfo.authId);
    },
    mounted() {
      let self = this;
      getMenusFromCookies(this.$store.state.app.userInfo.authId, function (menus) {
        self.menus = menus;
      });
    },
    components: {
      'my-menu': menu
    }
  };
</script>

<style>
</style>
