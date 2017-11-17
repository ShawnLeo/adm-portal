<template>
  <div class="app-wrapper" :class="{hideSidebar:!state.sidebar.opened,hoverSideBar:state.sidebar.minOpen}">
    <!-- 左侧 -->
    <div class="side-wrapper" :class="{hover:!state.sidebar.minOpened,light:theme=='light'}">
      <!-- logo -->
      <div class="logo-box">
        <img v-if="state.sidebar.opened == '0'" src="../../assets/img/logo.png" width="24" height="26" alt=""/>
        <img v-if="state.sidebar.opened == '1'" src="../../assets/img/logo-open.png" width="84" height="20" alt=""/>
      </div>
      <!-- logo /-->
      <!-- 左侧导航 -->
      <menus></menus>
      <!-- 左侧导航 /-->
    </div>
    <!-- 左侧 /-->
    <!-- 主体 -->
    <div class="main-wrapper">
      <!-- 头部 -->
      <t-header>
        <!-- 用户信息 -->
        <div class="userBox" slot='right'>
          <!--<Avatar class="user-head" icon="person"></Avatar>-->
          <Dropdown transfer class="user-drop">
            <a href="javascript:void(0)">

              Shawn
              <Icon type="arrow-down-b"></Icon>
            </a>
            <Dropdown-menu slot="list">
              <Dropdown-item @click.native="modalUser=true">个人信息</Dropdown-item>
              <Dropdown-item @click.native="logout">退出登录</Dropdown-item>
            </Dropdown-menu>
          </Dropdown>
        </div>
        <!--用户信息 -->
        <!--<div class="messageBox" slot='msg-icon'>-->
          <!--<div class="theme-switch">-->
            <!--<i-switch size="large" @on-change="themeChange" v-model="themeBool">-->
              <!--<span slot="open">Dark</span>-->
              <!--<span slot="close">Light</span>-->
            <!--</i-switch>-->
          <!--</div>-->
        <!--</div>-->
      </t-header>
      <!-- 头部 /-->
      <!-- 内容部分 -->
      <div class="main-container">
        <menu-tabs/>
        <container>
          <!-- 面包屑 -->
          <!--<Breadcrumb>-->
            <!--<Breadcrumb-item href="/">-->
              <!--<Icon type="ios-home-outline"></Icon>-->
              <!--Home-->
            <!--</Breadcrumb-item>-->
            <!--<Breadcrumb-item>-->
              <!--<Icon type="pound"></Icon>-->
              <!--{{state.router.currentPageName}}-->
            <!--</Breadcrumb-item>-->
          <!--</Breadcrumb>-->

          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
          <!-- 路由/ -->
        </container>
      </div>
      <!-- 内容部分 /-->
    </div>
    <!-- 主体 /-->
    <Modal v-model="modalUser" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>修改密码</span>
      </p>
      <div style="text-align:center">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
          <Form-item prop="authPass" label="原始密码">&nbsp;&nbsp;
          <Input v-model="formValidate.authPass" type="password"  icon="ios-locked-outline" placeholder="请输入..."
                 style="width: 220px"></Input>
        </Form-item>
          <Form-item prop="newPassword" label="新登录密码">
            <Input v-model="formValidate.newPassword" type="password" icon="ios-locked-outline" placeholder="请输入..."
                   style="width: 220px"></Input>
          </Form-item>
          <Form-item prop="confirmPassword" label="新密码确认">
            <Input v-model="formValidate.confirmPassword" type="password" icon="ios-locked-outline" placeholder="请输入..."
                   style="width: 220px"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="info" size="large" long :loading="modal_loading" @click="checkUser('formValidate')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import THeader from './THeader.vue';

  import container from './container.vue';
  import menuTabs from './menuTabs.vue';
  import menus from './menu.vue';
  import {removeStore} from '../../util/storage';
  import {updatePwd} from '../../util/interface';
  export default {
    name: 'full',
    components: {
      THeader,
//      NavBar,
      container,
      menuTabs,
      menus
    },
    data() {
      const validatePass = (rule, value, callback) => {
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
        if (!reg.test(value)) {
          callback(new Error('密码由数字和字母组成,长度6~20！'));
        } else {
          callback();
        }
      };
      const validatePassConfirm = (rule, value, callback) => {
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
        if (!reg.test(value)) {
          callback(new Error('密码由数字和字母组成,长度6~20！'));
        } else if (value !== this.formValidate.newPassword) {
          callback(new Error('密码输入不一致！'));
        } else {
          callback();
        }
      };
      return {
        theme: 'dark', // 主题
//        themeBool: true,
        modalUser: false,
        modal_loading: false,
        formValidate: {
          authPass: '',
          newPassword: '',
          confirmPassword: ''
        },
//        是否展示左右滑动按钮 默认是false
        scrollBtnShow: false,
        ruleValidate: {
          authPass: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
       //     {validator: validateOldPass, trigger: 'blur'}
          ],
          newPassword: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, message: '新确认密码不能为空', trigger: 'blur'},
            {validator: validatePassConfirm, trigger: 'blur'}
          ]
        }
      };
    },
    computed: {
      state() {
        return this.$store.state.app;
      }
    },
    mounted() {

    },
    created() {
      this.$store.dispatch('initTab');
    },
    methods: {
      // 查看个人信息密码验证
      checkUser(name) {
        this.modal_loading = true;
        this.$refs[name].validate((valid) => {
          setTimeout(() => {
            if (valid) {
              updatePwd(this.formValidate).then(r => {
                let resultCode = r.header.code;
                if (resultCode === '0') {
                  this.$Message.success('修改成功！');
                  this.modalUser = false;
                } else {
                  this.$Message.error(r.header.message);
                }
              });
            } else {
//              this.$Notice.warning({
//                title: '提示',
//                desc: '密码 : 123456'
//              });
              this.$Message.error('表单验证失败!');
            }
            this.modal_loading = false;
          }, 2000);
        });
      },
      /* 改变语言 */
      changeLang() {
        if (this.state.lang.icon === '#icon-yingguo') {
          this.$store.dispatch('setLang', {
            icon: '#icon-zhongguo',
            type: 'CN'
          });
        } else {
          this.$store.dispatch('setLang', {
            icon: '#icon-yingguo',
            type: 'EN'
          });
        }
        window.location.reload();
      },
      /**
       *退出
       */
      logout() {
        removeStore('sessionId');
        this.$router.push('/login');
        this.$Message.success('退出成功');
      },
      themeChange(state) {
        if (state) {
          this.theme = 'dark';
        } else {
          this.theme = 'light';
        }
      }
    }
  };
</script>
