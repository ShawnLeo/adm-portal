<template>
  <Row>
    <iCol span="24">
      <Card>
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          条件筛选
        </p>
        <a href="#" slot="extra">
          <Button type="info" shape="circle" v-on:click="query()" icon="ios-search">查询</Button>
          <Button type="ghost" shape="circle" v-on:click="reset()" icon="refresh">重置</Button>
        </a>
        <Form :model="user"  :label-width="80">
          <Row :gutter="60">
            <i-col span="12">
              <Form-item label="姓名">
                <Input v-model="user.realName" placeholder="请输入"></Input>
              </Form-item>
            </i-col>
            <i-col span="12">
              <Form-item label="登陆账号">
                <Input v-model="user.authId" placeholder="请输入"></Input>
              </Form-item>
            </i-col>
          </Row>
          <Row :gutter="60">
            <i-col span="12">
              <Form-item label="用户ID">
                <Input v-model="user.id" @on-keyup="watchId(user.id)" placeholder="请输入"></Input>
              </Form-item>
            </i-col>
            <i-col span="12">
              <Form-item label="用户角色" >
              <Select  v-model="user.roles"
                      multiple
                      filterable
                      :remote="isRemote"
                      :remote-method="remote" :loading="loading">
                <Option v-for="item in conditionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              </Form-item>
            </i-col>
          </Row>
          <Row :gutter="60">
            <i-col span="12">
              <Form-item label="联系电话">
                <Input v-model="user.phone"  placeholder="请输入"></Input>
              </Form-item>
            </i-col>
            <i-col span="12">
              <Form-item label="性别">
                <Select v-model="user.gender" placeholder="请选择">
                  <Option value="">请选择</Option>
                  <Option value="0">男</Option>
                  <Option value="1">女</Option>
                </Select>
              </Form-item>
            </i-col>
          </Row>
        </Form>

      </Card>
    </iCol>
    <iCol span="24" class="top-30">
      <Card>
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          用户列表
        </p>
        <a href="#" slot="extra">
          <Button type="success" shape="circle" v-on:click="modalAdd = true;" icon="plus">添加</Button>
          <Button type="ghost" shape="circle" v-on:click="init()" icon="refresh">刷新</Button>
        </a>
        <Table border :columns="columns7" :data="data6"></Table>
      </Card>
    </iCol>

    <iCol span="24" class="top-30 inner-right">
      <Page :total="totalCount" :page-size="pageSize" :page-size-opts="pageSizeOpts"
            show-sizer show-total @on-change="pageNumChange" @on-page-size-change="pageSizeChange"></Page>
    </iCol>
    <!--账号设置-->
    <Modal v-model="modalManager" title="账号管理" width="930"
           @on-ok="" @on-cancel="">
      <Table  width="900"  border :columns="columns1" :data="data1"></Table>
    </Modal>

    <!--账号设置-->
    <Modal v-model="modalAdd" title="用户添加" width="730"
           @on-ok="handleSubmit('formValidate')"  @on-cancel="hideModal('modalAdd')">
        <Form :model="formValidate" ref="formValidate" :label-width="80" :rules="ruleValidate">
          <Row :gutter="60">
            <i-col span="12">
              <Form-item label="姓名" prop="realName">
                <Input v-model="formValidate.realName" @on-enter="handleSubmit('formValidate')" placeholder="请输入"></Input>
              </Form-item>
            </i-col>

            <i-col span="12">
              <Form-item label="性别" prop="gender">
                <RadioGroup v-model="formValidate.gender"  >
                  <Radio label="0" >男</Radio>
                  <Radio label="1" >女</Radio>
                </RadioGroup>
              </Form-item>
            </i-col>

          </Row>
          <Row :gutter="60">
            <i-col span="12">
              <Form-item label="登录密码" prop="authPass">
                <Input type="password" v-model="formValidate.authPass" placeholder="请输入"></Input>
              </Form-item>
            </i-col>
            <i-col span="12">
              <Form-item label="密码确认" prop="confirmPassword">
                <Input type="password" v-model="formValidate.confirmPassword" placeholder="请输入"></Input>
              </Form-item>
            </i-col>
          </Row>
          <Row :gutter="60">
              <i-col span="12">
                <Form-item label="登陆账号" prop="authId">
                  <Input v-model="formValidate.authId" placeholder="请输入"></Input>
                </Form-item>
              </i-col>
            <i-col span="12">
              <Form-item label="用户角色" prop="roles">
                <Select  v-model="formValidate.roles" multiple filterable :remote="isRemote" :remote-method="remote" :loading="loading">
                  <Option v-for="item in conditionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Form-item>
            </i-col>
          </Row>
          <Row :gutter="60">
            <i-col span="12">
              <Form-item label="联系电话" prop="phone">
                <Input v-model="formValidate.phone"   placeholder="请输入"></Input>
              </Form-item>
            </i-col>
            <i-col span="12">
              <Form-item label="邮箱" prop="email">
                <Input v-model="formValidate.email"  placeholder="请输入"></Input>
              </Form-item>
            </i-col>
          </Row>
        </Form>

      <div slot="footer">
        <Button type="info" size="large"  @click="handleSubmit('formValidate')">确定</Button>
        <Button type="info" size="large" v-on:click="hideModal('modalAdd')">关闭</Button>
      </div>

    </Modal>


    <Modal v-model="modalEdit" title="用户修改" width="730"
           @on-ok="handleSubmit('userEdit')"  @on-cancel="hideModal('modalEdit')">
      <Form :model="userEdit" ref="userEdit" :label-width="80" :rules="ruleValidate">
        <Row :gutter="60">
          <i-col span="12">
            <Form-item label="姓名" prop="realName">
              <Input v-model="userEdit.realName" @on-enter="handleSubmit('modalEdit')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>

          <i-col span="12">
            <Form-item label="性别" prop="gender">
              <RadioGroup v-model="userEdit.gender"  >
                <Radio label="0" >男</Radio>
                <Radio label="1" >女</Radio>
              </RadioGroup>
            </Form-item>
          </i-col>

        </Row>
        <Row :gutter="60">
          <i-col span="12">
            <Form-item label="联系电话" prop="phone">
              <Input v-model="userEdit.phone"   placeholder="请输入"></Input>
            </Form-item>
          </i-col>
          <i-col span="12">
            <Form-item label="用户角色" prop="roles">
              <Select v-model="userEdit.roles"   multiple filterable :remote="isRemote" :clearable="true" :remote-method="remote" :loading="loading">
                <Option v-for="item in conditionList" :value="item.value" :key="item.label">{{ item.label }}</Option>
              </Select>
            </Form-item>
          </i-col>
        </Row>
      </Form>

      <div slot="footer">
        <Button type="info" size="large"  @click="handleSubmit('userEdit')">确定</Button>
        <Button type="info" size="large" v-on:click="hideModal('modalEdit')">关闭</Button>
      </div>

    </Modal>

  </Row>
</template>

<script type="text/ecmascript-6">
  import {userList, roleSearch, passResest, lockUser, updateUser, saveUser} from '../../utils/interface';
  import {} from '../../utils/utils';
  import dateUtil from 'iview/src/utils/date';
  import {setStore, getStore} from '../../utils/storage';
  export default {
    data() {
      const validatePassword = (rule, value, callback) => {
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (!reg.test(value)) {
            callback(new Error('密码由数字和字母组成,长度6~20！'));
          }
          callback();
        }
      };
      const confirmPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码'));
        } else {
          if (value !== this.formValidate.authPass) {
            callback(new Error('确认密码输入不一致'));
          }
          callback();
        }
      };
      // 联系电话是否只是手机号码
      const validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } else {
//          if (value.length !== this.formValidate.authPass) {
//            callback(new Error('确认密码输入不一致'));
//          }
          callback();
        }
      };
      const validateEmail = (rule, value, callback) => {
        let email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!email.test(value)) {
          return callback(new Error('请填写正确的邮箱'));
        } else {
          callback();
        }
      };
      const validateRoles = (rule, value, callback) => {
        if (value[0] === '' || value[0] === undefined) {
           callback(new Error('用户角色不能为空'));
        } else {
          callback();
        }
      };
      return {
        ruleValidate: {
          realName: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          authPass: [
            {required: true, message: '登录密码不能为空', trigger: 'blur'},
            {validator: validatePassword, trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, message: '确认密码不能为空', trigger: 'blur'},
            {validator: confirmPassword, trigger: 'blur'}
          ],
          authId: [
            {required: true, message: '登录账号不能为空', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '性别不能为空', trigger: 'change'}
          ],
          phone: [
            {required: true, message: '联系电话不能为空', trigger: 'blur'},
            {validator: validatePhone, trigger: 'blur'}
          ],
          email: [
            {required: true, message: 'email不能为空', trigger: 'blur'},
            {validator: validateEmail, trigger: 'blur'}
          ],
          roles: [
            {required: true, validator: validateRoles, trigger: 'change'}
          ]
        },
        verifyUrl: '',
        conditionList: {},
        loading: false,
        isRemote: false,
        modelRoles: '',
        user: {
          id: '',
          realName: '',
          roles: [],
          authId: '',
          phone: '',
          gender: ''
        },
        formValidate: {
          id: '',
          realName: '',
          roles: [],
          authId: '',
          phone: '',
          gender: '0',
          authPass: '',
          confirmPassword: '',
          email: ''
        },
        userEdit: {
          id: '',
          realName: '',
          roles: [],
          phone: '0',
          gender: ''
        },
        modalManager: false,
        modalAdd: false,
        modalEdit: false,
        formAdd: {
          input: ''
        },
        columns1: [
          {
            title: '认证账号',
            key: 'userAuth',
            width: 120,
            fixed: 'left',
            align: 'center',
            render: (h, params) => {
              return this.data1[params.index].authId;
            }
          },
          {
            title: '认证方式',
            width: 100,
            align: 'center',
            key: 'authType',
            render: (h, params) => {
              let authType = '';
              if (this.data1[params.index].authType === '1') {
                authType = '手机认证';
              } else if (this.data1[params.index].authType === '2') {
                authType = 'email认证';
              } else if (this.data1[params.index].authType === '3') {
                authType = '昵称认证';
              }
              return authType;
            }
          },
          {
            title: '登陆次数',
            width: 80,
            align: 'center',
            key: 'loginCount',
            render: (h, params) => {
              return this.data1[params.index].loginCount;
            }
          },
          {
            title: '最近登陆时间',
            width: 160,
            align: 'center',
            key: 'lastLoginTime',
            render: (h, params) => {
              return dateUtil.format(this.data1[params.index].lastLoginTime, 'yyyy-MM-dd');
            }
          },
          {
            title: '修改密码时间',
            width: 160,
            align: 'center',
            key: 'passTime',
            render: (h, params) => {
              return dateUtil.format(this.data1[params.index].passTime, 'yyyy-MM-dd HH:mm:ss');
            }
          }, {
            title: '创建时间',
            width: 160,
            align: 'center',
            key: 'createTime',
            render: (h, params) => {
              return dateUtil.format(this.data1[params.index].createTime, 'yyyy-MM-dd HH:mm:ss');
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 120,
            align: 'center',
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.passReset(this.data1[params.index].authId, this.userId);
                    }
                  }
                }, '密码重置')
              ]);
            }
          }
        ],
        data1: [],
        userId: '',
        columns7: [
          {
            title: '序号',
            key: 'index',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('strong', params.index + 1)
              ]);
            }
          },
          {
            title: '姓名',
            key: 'name',
            align: 'center',
            render: (h, params) => {
              return this.data6[params.index].realName;
            }
          },
          {
            title: '性别',
            key: 'gender',
            align: 'center',
            render: (h, params) => {
              let gender = this.data6[params.index].gender === '0' ? '男' : '女';
              return gender;
            }
          },
          {
            title: '联系电话',
            key: 'phone',
            align: 'center',
             render: (h, params) => {
               return this.data6[params.index].phone;
             }
          },
          {
            title: '所属角色',
            key: 'roles',
            align: 'center',
            render: (h, params) => {
              let roles = '';
              let length = this.data6[params.index].roles.length;
              for (var i = 0; i < length; i++) {
                roles += this.data6[params.index].roles[i].name + ',';
              };
              return roles.substring(0, roles.length - 1);
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 320,
            align: 'center',
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'eye'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      let authSet = this.data6[params.index].userAuths;
                      this.data1 = authSet;
                      this.userId = this.data6[params.index].id;
                      this.modalManager = true;
                    }
                  }
                }, '账号'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.userEdit.realName = this.data6[params.index].realName;
                      this.userEdit.gender = this.data6[params.index].gender;
                      this.userEdit.phone = this.data6[params.index].phone;
                      this.userEdit.id = this.data6[params.index].id;
                      let r = [];
                      for (let e of this.data6[params.index].roles) {
                        r.push(e.id);
                      }
                      this.userEdit.roles = r;
                      this.modalEdit = true;
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    icon: 'trash-a',
                    align: 'center'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '警告',
                        content: '<p>确定更改用户状态吗？</p>',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                          this.lockUser(this.data6[params.index].id);
                        }
                      });
                    }
                  }
                }, this.data6[params.index].status === '-1' ? '解锁' : '锁定')
              ]);
            }
          }
        ],
        data6: [],
        pageSizeOpts: [1, 2, 5, 10, 20, 50],
        totalCount: null,
        pageSize: 5,
        pageNumber: 1
      };
    },
    mounted() {
      this.storeLocal();
      this.init();
    },
    methods: {
      remote(query) {
        if (query !== '') {
          this.loading = true;
          this.conditionList = JSON.parse(getStore('roles')).filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
          this.loading = false;
        }
      },
      storeLocal: async function () {
        if (getStore('rolesCheck') != null && new Date().getDate().toString() === getStore('rolesCheck').toString()) {
          this.conditionList = JSON.parse(getStore('roles')).length > 10 ? JSON.parse(getStore('roles')).slice(0, 10) : JSON.parse(getStore('roles'));
          this.isRemote = true;
          return;
        }
        let citiesData = await roleSearch({
          remarks: '',
          name: '',
          page: 1,
          size: 1000000
        });
        let cities = [];
        for (let e of citiesData.body.content) {
          cities.push({value: e.id, label: e.name});
        }
        setStore('roles', cities);
        setStore('rolesCheck', new Date().getDate());
        this.conditionList = JSON.parse(getStore('roles')).length > 10 ? JSON.parse(getStore('roles')).slice(0, 10) : JSON.parse(getStore('roles'));
        this.isRemote = true;
      },
      init: async function () {
        await userList({'pageNumber': this.pageNumber, 'pageSize': this.pageSize}, this.user).then(r => {
           this.data6 = r.body.content;
           this.totalCount = r.body.totalElements;
        });
      },
      pageNumChange: function (pageNum) {
        this.pageNumber = pageNum;
        this.init();
      },
      pageSizeChange: function (pageSize) {
        this.pageSize = pageSize;
        this.init();
      },
      query: async function () {
        let res = await userList({'pageNumber': this.pageNumber, 'pageSize': this.pageSize}, this.user);
        this.data6 = res.body.content;
        this.totalCount = res.body.totalElements;
      },
      passReset: async function (authId, userId) {
        this.user.authId = authId;
        await passResest({'id': userId}, this.user).then(r => {
         let resultCode = r.header.code;
         if (resultCode === '0') {
           this.$Message.success('密码重置成功!');
         } else {
           this.$Message.error(r.header.message);
         }
        });
      },
      lockUser: async function(id) {
        await lockUser({'id': id}).then(r => {
          let resultCode = r.header.code;
          if (resultCode === '0') {
            this.$Message.success('用户状态更改成功!');
            this.init();
          } else {
            this.$Message.error(r.header.message);
          }
        });
      },
      handleSubmit(name) {
        this.$refs[name].validate(async (valid) => {
          if (valid && name === 'formValidate') {
            await saveUser(this.formValidate).then(r => {
              let resultCode = r.header.code;
              if (resultCode === '0') {
                this.$Message.success('用户保存成功!');
                this.isRemote = false;
                this.formValidate = {};
                this.formValidate.roles = [];
                this.modalAdd = false;
                this.init();
                setTimeout(() => {
                  this.isRemote = true;
                }, 2000);
              } else {
                this.$Message.error(r.header.message);
              }
            });
          }

          if (valid && name === 'userEdit') {
            await updateUser(this.userEdit).then(r => {
              let resultCode = r.header.code;
              if (resultCode === '0') {
                this.$Message.success('用户修改成功!');
                this.isRemote = false;
                this.userEdit = {};
                this.userEdit.roles = [];
                this.modalEdit = false;
                this.init();
                setTimeout(() => {
                  this.isRemote = true;
                }, 2000);
              } else {
                this.$Message.error(r.header.message);
              }
            });
          }
        });
      },
      reset() {
        this.isRemote = false;
         this.user = {};
        this.user.roles = [];
        setTimeout(() => {
          this.isRemote = true;
        }, 2000);
      },
      watchId(val) {
        if (val.length === 1) {
          this.user.id = val.replace(/[^1-9]/g, '');
        } else {
          this.user.id = val.replace(/\D/g, '');
        }
      },
      hideModal(modal) {
        this.isRemote = false;
        if (modal === 'modalEdit') {
          this.userEdit = {};
          this.userEdit.roles = [];
          this.modalEdit = false;
        } else {
          this.formValidate = {};
          this.formValidate.roles = [];
          this.modalAdd = false;
        }
        setTimeout(() => {
          this.isRemote = true;
        }, 2000);
      }
    }
  };
</script>

<style>
  .inner-right > div, .inner-right > ul {
    float: right;
  }

  .ivu-icon-edit, .ivu-icon-trash-a {
    font-size: 20px;
  }

</style>
