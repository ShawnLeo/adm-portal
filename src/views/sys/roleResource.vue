<template>
  <Row>
    <iCol span="24">
      <Card>
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          当前角色
        </p>
        <Form :model="formSearch" :label-width="80" ref="formSearch">
          <Row :gutter="60">
            <i-col span="12">
              <Form-item label="角色CODE" prop="roleCode">
                <Input v-model="formSearch.roleCode" placeholder="请输入" readonly></Input>
              </Form-item>
            </i-col>
            <i-col span="12">
              <Form-item label="名称" prop="name">
                <Input v-model="formSearch.name" placeholder="请输入" readonly></Input>
              </Form-item>
            </i-col>
            <i-col span="12">
              <Form-item label="描述" prop="remarks">
                <Input v-model="formSearch.remarks" placeholder="请输入" readonly></Input>
              </Form-item>
            </i-col>
          </Row>
        </Form>

      </Card>
    </iCol>
    <iCol span="24" class="top-30">
      <Card>
        <a href="#" slot="extra" @click.prevent="init()">
          <Icon type="ios-loop-strong"></Icon>
        </a>
        <v-jstree :resources="resources, roleResources, id" v-on:change="val => resource = val" v-on:refresh="init()"></v-jstree>
      </Card>
    </iCol>
  </Row>
</template>

<script type="text/ecmascript-6">
  import roleResourceTree from '../../components/roleResourceTree.vue';
  import {resourceList} from '../../utils/interface';
  export default {
    data() {
      return {
        formSearch: {
          roleCode: this.$route.query.roleCode,
          name: this.$route.query.name,
          remarks: this.$route.query.remarks
//          roleResources: this.$route.query.roleResources
        },
        id: this.$route.query.id,
        roleResources: [],
        resources: []
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init: async function () {
        this.roleResources = this.$route.query.roleResources;
        let res = await resourceList(this.$store.state.app.baseUrl);
        this.resources = res.body;
      }
    },
    components: {
      'v-jstree': roleResourceTree
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
