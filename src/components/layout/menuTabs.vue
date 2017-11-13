<template>
  <nav id="tabs" class="opend-tab" v-if="menuTabs.length > 0">
    <Button class="prev" @click="tabScroll('next')" icon="ios-arrow-left"></Button>
    <div id="tabs-bar" ref="elemTabar" class="tabs-bar">
      <ul ref="elemScroll" class="utab">
        <router-link tag="li" v-for="(item, index) in menuTabs" :key="index" ref="tabsPageOpened"
                     :to="{ path: item.path}" class="scr-menu-item">
          {{ item.title}}
          <span v-if="item.path !=='/index'" class="tab-close" v-on:click.stop="removeOpenTab(index,$event)"><Icon
            type="close-circled"></Icon></span>
        </router-link>
      </ul>
    </div>
    <div class="menu-tab-right">
      <Button class="next" @click="tabScroll('prev')" icon="ios-arrow-right"></Button>
      <Dropdown trigger="click" placement="bottom-end" @on-click="dropCloseTabs">
        <Button icon="arrow-down-b">
        </Button>
        <Dropdown-menu slot="list">
          <Dropdown-item name='1'>
            <Icon type="ios-minus-outline"></Icon>
            关闭当前
          </Dropdown-item>
          <Dropdown-item name='2'>
            <Icon type="close"></Icon>
            关闭其他
          </Dropdown-item>
          <Dropdown-item name='3'>
            <Icon type="power"></Icon>
            关闭所有
          </Dropdown-item>
        </Dropdown-menu>
      </Dropdown>
    </div>
  </nav>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'menu-tabs',
    data() {
      return {};
    },
    computed: {
      state() {
        return this.$store.state.app;
      },
      menuTabs() {
        return this.$store.state.app.menuTabs;
      }
    },
    mounted() {
      // 窗口改变时改变 menuTabWidth
      this.$store.dispatch('setMenuTabWidth', this.$refs.elemTabar.offsetWidth);
      let self = this;
      window.onresize = function temp() {
        self.$store.dispatch('setMenuTabWidth', self.$refs.elemTabar.offsetWidth);
      };
      // 激活当前tab Menu
      let index = this.menuTabs.findIndex((n) => {
        return n.path === this.$router.app._route.path;
      });
      let tabs = this.$refs.tabsPageOpened;
      this.moveToView(tabs[index].$el);
    },
    methods: {
      removeOpenTab(index, event) { // 移除tab
        if (this.menuTabs.length > 1) {
          if (this.menuTabs[index].path === this.$route.path) {
            let next = (this.menuTabs.length - 1) === index ? this.menuTabs[index - 1] : this.menuTabs[index + 1];
            this.$nextTick(() => {
              this.$router.push(next.path);
            });
          }
          this.$store.dispatch('removeTab', index);
        }
      },
      goTabRouter(item) { // 跳转至
        this.$router.push(item);
      },
      addTabScroll() {
        let maxWidth = this.state.menuTabarWidth;
        let lft;
        let curWidth = parseInt(getComputedStyle(this.$refs.elemScroll, null)['width']);
//        如果tab页签的宽度小于最大宽度 prev 和 next 都不可以点击
        if (maxWidth > curWidth) {
          return false;
        } else {
          lft = curWidth - maxWidth;
        }
        this.$refs.elemScroll.style.left = -lft + 'px';
      },
      tabScroll(dir) {
        let maxWidth = this.state.menuTabarWidth;
        let curleft = parseInt(getComputedStyle(this.$refs.elemScroll, null)['left']);
        let lft;
        let curWidth = parseInt(getComputedStyle(this.$refs.elemScroll, null)['width']);
//        如果tab页签的宽度小于最大宽度 prev 和 next 都不可以点击
        if (maxWidth > curWidth) {
          return false;
        }
        if (dir === 'prev') {
          if (Math.abs(curleft) >= (curWidth - maxWidth)) {
            return false;
          }
          lft = curleft - maxWidth + 100;
          this.$refs.elemScroll.style.left = lft + 'px';
        } else {
          lft = curleft + maxWidth - 100;
          if (lft > 0) {
            lft = 0;
          }
          this.$refs.elemScroll.style.left = lft + 'px';
        }
      }, // 向前向后翻页
      dropCloseTabs(dropIndex) {
//        1 关闭当前
        if (dropIndex === '1') {
          if (this.$route.path === '/index') {
            return;
          }
          let curIndex = this.menuTabs.findIndex((item) => {
            return item.path === this.$route.path;
          });
          this.removeOpenTab(curIndex);
        }
//        2 关闭其他
        if (dropIndex === '2') {
          this.$store.dispatch('removeOtherTab', this.$route.path);
          this.$refs.elemScroll.style.left = '0px';
        }
//        3关闭所有
        if (dropIndex === '3') {
          this.$store.dispatch('removeAllTab');
          this.$nextTick(() => {
            this.$router.push('/index');
            this.$refs.elemScroll.style.left = '0px';
          });
        }
      },
      moveToView(tab) {
        let curleft = parseInt(getComputedStyle(this.$refs.elemScroll, null)['left']);
        let offsetLeft = tab.offsetLeft;
        if (offsetLeft + curleft < 0) {
          // 标签在可视区域左边
          this.$refs.elemScroll.style.left = -offsetLeft + 'px';
        } else if (offsetLeft + curleft > this.state.menuTabarWidth - 50) {
          // 标签在可视区右边
          this.$refs.elemScroll.style.left = -offsetLeft + 'px';
        }
        // 标签在可视区域
      }
    },
    watch: {
      '$route'(to) {
        // 激活当前tab Menu
        let index = this.menuTabs.findIndex((n) => {
          return n.path === to.path;
        });
        let tabs = this.$refs.tabsPageOpened;
        this.moveToView(tabs[index].$el);
      }
    }
  };
</script>

<style>
</style>
