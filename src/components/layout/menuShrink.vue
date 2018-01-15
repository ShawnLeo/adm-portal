<template>
  <div style="position: fixed;left: 0;top: 50px; z-index: 11111;">
    <div v-for="(item, index) in menu">
      <div style="text-align: center;" :key="index">
        <!--不为0-->
        <Dropdown :transfer=false v-if="item.children" placement="right-start" :key="index"
                  @on-click="changeMenu" class="menu-shrink">
          <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
            <Icon :size="20" :type="item.icon?item.icon:'checkmark'" color="#fff"></Icon>
          </Button>
          <DropdownMenu style="width: 180px;" slot="list">
            <template v-for="(child, i) in item.children">
              <DropdownItem :key="i" v-if="i===0">
                <Icon :size="15" :type="child.icon"></Icon>
                <span style="padding-left:10px;">{{ child.name }}</span>
              </DropdownItem>

              <DropdownItem :name="child.url" :key="i" v-else>
                <!--<Icon :type="child.icon" style="padding-left:10px;"></Icon>-->
                <span style="padding-left:30px;">{{ child.name }}</span>
              </DropdownItem>
            </template>
          </DropdownMenu>
        </Dropdown>
        <Dropdown :transfer=false v-else placement="right-start" :key="index" @on-click="changeMenu"
                  class="menu-shrink">
          <Button style="width: 70px;margin-left: -5px;padding:10px 0;"
                  type="text">
            <Icon :size="20" :type="item.icon?item.icon:'checkmark'" color="#fff"></Icon>
          </Button>
          <DropdownMenu style="width: 180px;" slot="list">
            <DropdownItem :name="item.url" :key="'d' + index">
              <Icon :size="15" :type="item.icon"></Icon>
              <span style="padding-left:10px;">{{ item.name }}</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getMenusFromCookies} from '../../utils/menu';

  export default {
    name: 'menuShrink',
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
      changeMenu (a) {
        this.$router.push({path: a});
      }
    },
    mounted() {
      let self = this;
      getMenusFromCookies(function (menu) {
        self.menu = menu;
      });
    }
  };
</script>

<style>
  .menu-shrink .ivu-select-dropdown {
    padding: 0 !important;
    background: rgba(7, 22, 37, 0.6) !important;
  }

  .menu-shrink .ivu-dropdown-item {
    color: #fff;
    text-align: left;
  }

  .menu-shrink .ivu-dropdown-item:hover {
    background-color: #2db7f5;
  }
</style>
