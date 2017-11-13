<template>
  <Row>
    <iCol span="24">
      <Card>
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          条件筛选
        </p>
        <a href="#" slot="extra">
          <Button type="info" shape="circle" icon="ios-search" @click="handleSubmit()">查询</Button>
          <Button type="ghost" shape="circle" icon="refresh" @click="reSet()">重置</Button>
        </a>
        <Form :model="formSearch" :label-width="80" ref="formSearch">
          <Row :gutter="60">
            <i-col span="12">
              <Form-item label="角色CODE" prop="roleCode">
                <Input v-model="formSearch.roleCode" placeholder="请输入"></Input>
              </Form-item>
            </i-col>
            <i-col span="12">
              <Form-item label="名称" prop="name">
                <Input v-model="formSearch.name" placeholder="请输入"></Input>
              </Form-item>
            </i-col>
            <i-col span="12">
              <Form-item label="描述" prop="remarks">
                <Input v-model="formSearch.remarks" placeholder="请输入"></Input>
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
          角色列表
        </p>
        <a href="#" slot="extra">
          <Button type="success" shape="circle" icon="plus" @click="roleNew()">添加</Button>
          <Button type="ghost" shape="circle" icon="refresh" @click="roleRefresh()">刷新</Button>
        </a>

        <Table border :columns="columns" :data="roles" ></Table>
      </Card>
    </iCol>

    <iCol span="24" class="top-30 inner-right">
      <Page :total="totalCount" :page-size="pageSize" :page-size-opts="pageSizeOpts"
            show-sizer show-total @on-change="pageNumChange" @on-page-size-change="pageSizeChange"></Page>
    </iCol>

    <!--增加角色-->
    <Modal v-model="roleAdd" title="增加角色" width="730"
           @on-ok="addSubmit('roleAddForm')" @on-cancel="cancelSubmit()">
      <Form :model="roleAddForm" :label-width="100" ref="roleAddForm" :rules="ruleValidate">
        <Row :gutter="60">
          <i-col span="12">
            <Form-item label="角色CODE" prop="roleCode">
              <Input v-model="roleAddForm.roleCode" placeholder="请输入" @on-keyup="checkData(roleAddForm.roleCode)"></Input>
            </Form-item>
          </i-col>
          <i-col span="12">
            <Form-item label="名称" prop="name">
              <Input v-model="roleAddForm.name" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
          <i-col span="12">
            <Form-item label="描述" prop="remarks">
              <Input v-model="roleAddForm.remarks" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>
      </Form>
    </Modal>
  </Row>
</template>

<script type="text/ecmascript-6">
  import {roleSearch, roleAdd, roleEdit, roleDelete} from '../../util/interface';
  import {removeStore} from '../../util/storage';
  export default {
    data() {
      return {
        formSearch: {
          roleCode: '',
          name: '',
          remarks: ''
        },
        roleAddForm: {
          roleCode: '',
          name: '',
          remarks: ''
        },
        ruleValidate: {
          roleCode: [
            {required: true, message: '角色CODE不能为空', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ]
        },
        roleAdd: false,
        columns: [
          {
            title: '序号',
            width: 80,
            align: 'center',
            key: 'pk',
            render: (h, params) => {
              return h('div', [
                h('strong', params.index + 1)
              ]);
            }
          },
          {
            title: '角色CODE',
            key: 'roleCode',
            render: (h, params) => {
              return this.roles[params.index].editing ? h('div', [
                h('div', params.row.roleCode)
              ]) : h('div', params.row.roleCode);
            }
          },
          {
            title: '角色名称',
            key: 'name',
            render: (h, params) => {
              return this.roles[params.index].editing ? h('div', [
                h('i-input', {
                  attrs: {
                    id: 'editing-name-' + params.index,
                    value: params.row.name
                  }
                })
              ]) : h('div', params.row.name);
            }
          },
          {
            title: '角色描述',
            key: 'remarks',
            render: (h, params) => {
              return this.roles[params.index].editing ? h('div', [
                h('i-input', {
                  attrs: {
                    id: 'editing-remarks-' + params.index,
                    value: params.row.remarks
                  }
                })
              ]) : h('div', params.row.remarks);
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 300,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.setting(params.index);
                    }
                  }
                }, '权限设置'),
                h('Button', {
                  props: {
                    type: this.roles[params.index].editing ? 'success' : 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.roles[params.index].editing ? this.editSubmit(params.index) : (this.roles[params.index].editing = true);
                    }
                  }
                }, this.roles[params.index].editing ? '保存' : '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.removeSubmit(this.roles[params.index].id);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        roles: [],
        pageSizeOpts: [1, 2, 5, 10, 20, 50],
        totalCount: null,
        pageSize: 5,
        pageNumber: 1
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      checkData: function (value) {
        var data = /^[a-zA-Z0-9_]{1,}$/;
        if (!value.match(data)) {
          this.$Notice.warning({
            title: '验证提示',
            desc: '输入有误,只能输入英文数字下划线！'
          });
          this.roleAddForm.roleCode = '';
        }
       },
      addSubmit: function (name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            let res = await roleAdd({
              roleCode: this.roleAddForm.roleCode,
              name: this.roleAddForm.name,
              remarks: this.roleAddForm.remarks
            });
            if (res && res.header) {
              if (res.header.code === '0') {
                this.$Message.success('添加成功!');
                removeStore('roles');
                removeStore('rolesCheck');
              }
            }
            this.roleAddForm = {};
            this.init();
          } else {
            this.$Message.error('表单验证失败!');
          }
        });
      },
      editSubmit: async function (index) {
        var roleName = document.getElementById('editing-name-' + index).getElementsByTagName('input')[0].value;
        if (roleName !== null && roleName !== '') {
          let res = await roleEdit({
            roleCode: this.roles[index].roleCode,
            name: document.getElementById('editing-name-' + index).getElementsByTagName('input')[0].value,
            remarks: document.getElementById('editing-remarks-' + index).getElementsByTagName('input')[0].value,
            id: this.roles[index].id
          });
          if (res && res.header) {
            if (res.header.code === '0') {
              this.$Message.success('编辑成功!');
              removeStore('roles');
              removeStore('rolesCheck');
            }
          }
          this.init();
        } else {
          this.$Message.error('验证失败，角色名称和CODE不能为空!');
        }
      },
      removeSubmit: async function (id) {
        let res = await roleDelete({id: id});
        if (res && res.header) {
          if (res.header.code === '0') {
            this.$Message.success('删除成功!');
            removeStore('roles');
            removeStore('rolesCheck');
          }
        }
        this.init();
      },

      roleNew: function () {
        this.roleAdd = true;
      },

      roleRefresh: function () {
        this.init();
      },

      reSet: function () {
        this.formSearch = {};
      },

      cancelSubmit: function () {
        this.roleAddForm = {};
      },

      init: async function () {
        let res = await roleSearch({
          roleCode: this.formSearch.roleCode,
          remarks: this.formSearch.remarks,
          name: this.roleAddForm.name,
          page: this.pageNumber,
          size: this.pageSize
        });
        var data = res.body.content;
        for (var i in data) {
          data[i].editing = false;
        }
        this.roles = data;
        this.totalCount = res.body.totalElements;
      },
      pageNumChange: function (pageNum) {
        this.pageNumber = pageNum;
        this.init();
      },
      pageSizeChange: function (pageSize) {
        this.pageSize = pageSize;
        this.init();
      },
      handleSubmit: async function() {
        let res = await roleSearch({
          roleCode: this.formSearch.roleCode,
          remarks: this.formSearch.remarks,
          name: this.formSearch.name,
          page: this.pageNumber,
          size: this.pageSize
        });
        var data = res.body.content;
        for (var i in data) {
          data[i].editing = false;
        }
        this.roles = data;
        this.totalCount = res.body.totalElements;
      },
      show(index) {
        this.roles[index].editing = true;
      },
      save(index) {
        this.roles[index].editing = false;
      },
      setting(index) {
//        this.roles.splice(index, 1);
//        alert(this.roles[index].resources[0].id);
        this.$router.push({path: 'roleResource', query: {id: this.roles[index].id, roleCode: this.roles[index].roleCode, name: this.roles[index].name, remarks: this.roles[index].remarks, roleResources: this.roles[index].resources}});
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
