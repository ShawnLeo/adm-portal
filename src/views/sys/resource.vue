<template>
  <div class="top-30">
    <Row :gutter="10">
      <iCol span="7">
        <Card style="overflow-y: scroll;min-height: 450px;">
          <a href="#" slot="extra" @click.prevent="init()">
            <Icon type="ios-loop-strong"></Icon>
          </a>
          <v-jstree :resources="resources" v-on:change="val => changeResource(val)" v-on:refresh="init()"
                    v-on:add="parent => addResource(parent)"></v-jstree>
        </Card>
      </iCol>
      <iCol span="17">
        <Card>
          <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            资源配置    <span v-if="resource.id">资源Id:{{resource.id}}</span>
          </p>
          <div class="form-content">
            <Form :model="resource" :label-width="100">
              <!--<Row>-->
              <!--<i-col span="22">-->
              <Row>
                <i-col span="12">
                  <Form-item label="资源名称">
                    <Input v-model="resource.name" placeholder="请输入"></Input>
                  </Form-item>
                </i-col>
                <i-col span="12">
                  <Form-item label="排列序号">
                    <Input v-model="resource.dispOrder" placeholder="请输入"></Input>
                  </Form-item>
                </i-col>
              </Row>
              <!--</i-col>-->
              <!--</Row>-->
              <Row>
                <i-col span="12">
                  <FormItem label="资源类型">
                    <RadioGroup v-model="resource.resType">
                      <Radio label="1" :disabled="api">API资源</Radio>
                      <Radio label="2" :disabled="module">功能模块</Radio>
                    </RadioGroup>
                  </FormItem>
                </i-col>
                <i-col span="12" v-show="resource.resType === '2' ">
                  <FormItem label="模块类型">
                    <Select v-model="resource.modType" placeholder="请选择">
                      <Option value="1" :disabled="platform">平台</Option>
                      <Option value="2" :disabled="menu">菜单</Option>
                      <Option value="3" :disabled="func">功能</Option>
                    </Select>
                  </FormItem>
                </i-col>
              </Row>
              <Row v-if="resource.resType !== '2' ">
                <i-col span="24">
                  <Form-item label="url链接">
                    <Input v-model="resource.path" placeholder="请输入"></Input>
                  </Form-item>
                </i-col>
              </Row>
              <Row v-if="resource.modType === '2' && resource.resType === '2' ">
                <i-col span="24">
                  <Form-item label="菜单路由">
                    <Input v-model="resource.path" placeholder="请输入"></Input>
                  </Form-item>
                </i-col>
              </Row>
              <Row v-if="resource.modType === '2' && resource.resType === '2' ">
                <i-col span="12">
                  <Form-item label="菜单样式">
                    <Input v-model="resource.style" placeholder="请输入"></Input>
                  </Form-item>
                </i-col>
                <i-col span="12">
                  <FormItem label='*格式 例如：{"className":"settings"}' :label-width= 250></FormItem>
                </i-col>
              </Row>

              <Row>
                <i-col span="12">
                  <Form-item label="创建者">
                    <Input v-model="resource.createBy" placeholder="请输入" disabled></Input>
                  </Form-item>
                </i-col>
                <i-col span="12">
                  <Form-item label="创建日期">
                    <Date-picker type="date" placeholder="选择日期" v-model="resource.createTime" disabled></Date-picker>
                  </Form-item>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <Form-item label="修改者">
                    <Input v-model="resource.updateBy" placeholder="请输入" disabled></Input>
                  </Form-item>
                </i-col>
                <i-col span="12">
                  <Form-item label="修改日期">
                    <Date-picker type="date" placeholder="选择日期" v-model="resource.updateTime" disabled></Date-picker>
                  </Form-item>
                </i-col>
              </Row>
              <Row>
                <i-col span="24">
                  <Form-item label="备注说明">
                    <Input v-model="resource.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入..."></Input>
                  </Form-item>
                </i-col>
              </Row>
              <Row>
                <i-col span="24">
                  <Form-item>
                    <Button type="primary" v-on:click="save()">保存</Button>
                    <Button type="ghost" style="margin-left: 8px">重置</Button>
                  </Form-item>
                </i-col>
              </Row>
            </Form>
          </div>

        </Card>

      </iCol>
    </Row>

  </div>
</template>

<script type="text/ecmascript-6">
  import jstree from '../../components/jstree.vue';
  import {resourceList, resourceSave} from '../../utils/interface';

  export default {
    data() {
      return {
        resource: {
          resType: '1'
        },
        api: false,
        module: false,
        platform: false,
        menu: false,
        func: false,
        resources: []
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init: async function () {
        let res = await resourceList();
        this.dataAdapter(res.body);
        this.resources = res.body;
      },
      save: async function () {
        if (!this.resource.parentId) {
          this.$Message.warning('请在左侧树节点 右键->新增！');
          return;
        }
        if (this.resource.resType === '1') {
          this.resource.modType = '';
        }
        let res = await resourceSave(this.resource);
        if (res.header.code === '0') {
          this.$Message.success('保存成功！');
          this.init();
        } else if (res.header.code === '-2') {
          this.$Message.info(res.header.message);
        }
      },
      changeResource: function (_resource) {
        if (!_resource) {
          this.$Message.warning('操作失败！');
          return;
        }
        this.cancelDisable();
        if (_resource.parentId === '0') { // 根节点下只添加平台
          this.api = true;
          this.func = true;
          this.menu = true;
        } else {
          this.platform = true;  // 其余的节点下不能添加平台
          if (_resource.modType === '3') {
            this.menu = true; // 功能模块下不能添加菜单
          }
        }
        this.resource = _resource;
      },
      addResource: function (parent) {
        this.cancelDisable();
        // 平台 > 菜单 >= 功能 > 资源
        if (parent.id === '-1') { // 根节点下只添加平台
          this.resource = {
            resType: '2',
            modType: '1'
          };
          this.api = true;
          this.func = true;
          this.menu = true;
        } else {
          this.platform = true;  // 其余的节点下不能添加平台
          if (parent.modType === '3') {
            this.menu = true; // 功能模块下不能添加菜单
          }
          this.resource = {
            resType: '1',
            modType: '',
            parentId: parent.id
          };
        }
      },
      cancelDisable() { // 取消disable状态
        this.api = false;
        this.module = false;
        this.platform = false;
        this.func = false;
        this.menu = false;
      },
      dataAdapter: function (data) {
        if (!data) {
          return;
        }
        for (let i = 0; i < data.children.length; i++) {
          this.iterator(data.children[i]);
        }
      },
      iterator: function (data) {
        if (data.li_attr) {
          if (data.li_attr.resType === '1') { // 资源文件样式
            data.icon = 'fa fa-file icon-state-default';
          } else if (data.li_attr.resType === '2') {
            if (data.li_attr.modType === '1') {
              data.icon = 'fa fa-folder icon-state-info';
            } else if (data.li_attr.modType === '2') {
              data.icon = 'fa fa-folder icon-state-success';
            } else if (data.li_attr.modType === '3') {
              data.icon = 'fa fa-folder icon-state-danger';
            }
          }
        }
        if (!data.children) {
          return;
        }
        for (let i = 0; i < data.children.length; i++) {
          this.iterator(data.children[i]);
        }
      }
    },
    watch: {
      'resource.resType': function (val, oldval) {
        if (val === '1') {
          this.resource.modType = '';
        }
      }
    },
    components: {
      'v-jstree': jstree
    }
  };
</script>

<style>
</style>
