<template>

  <div>
    <Row>
      <iCol span="24" class="top-30">
        <Card>
          <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            权限列表
          </p>
          <a href="#" slot="extra">
            <Button type="success" shape="circle" icon="plus" @click="saveResources()">保存</Button>
          </a>
          <div id="resource-tree"></div>
        </Card>
      </iCol>
    </Row>
  </div>

</template>

<script type="text/ecmascript-6">
  import $ from 'jquery';
  import 'jstree/dist/jstree.min';
  import 'font-awesome/css/font-awesome.min.css';
  import 'jstree/dist/themes/default/style.min.css';
  import {roleResources} from '../utils/interface';

  export default {
    props: ['resources', 'roleResources', 'id'],
    data() {
      return {
        modalAdd: false
      };
    },
    methods: {
      init: function () {
        let $tree = $('#resource-tree');
        $tree.jstree({
          core: {
            data: this.resources,
            themes: {
              'responsive': false,
              'variant': 'large'
            },
            check_callback: true
          },
          types: {
            default: {
              icon: 'fa fa-folder icon-state-warning icon-lg'
            },
            file: {
              icon: 'fa fa-file icon-state-warning icon-lg'
            }
          },
          // 'checkbox'
          plugins: ['dnd', 'types', 'checkbox']
        });
      },

      saveResources: async function () {
        let $tree = $('#resource-tree').jstree(true);
        let sel = $tree.get_bottom_selected();
//        console.log('-----' + sel);
//        console.log('id===' + this.id);
        let res = await roleResources({
          id: this.id,
          roleResources: sel
        }, this.$store.state.app.baseUrl);
        if (res && res.header) {
          if (res.header.code === '0') {
            this.$Message.success('保存成功!');
          }
        }
      },

      getRoleResource: function (data, id) {
        for (var i = 0; i < data.children.length; i++) {
//          console.log('i====' + i);
//          console.log('id=' + id);
//          console.log('childrenID' + data.children[i].id);
//          console.log(data.children[i].id === id + '');
          if (data.children[i].id === id + '') {
//            console.log('确认选中');
            data.state.opened = true;
            data.children[i].state.opened = true;
            data.children[i].state.selected = true;
            break;
          } else {
            this.getRoleResource(data.children[i], id);
          }
        }
      }
    },
    mounted() {
      this.init();
    },

    watch: {
      resources: function (val, oldval) {
//        console.log('-------' + val);
        let $jstree = $('#resource-tree').jstree(true);
        $jstree.settings.core.data = val;
        $jstree.refresh();
        for (var i in this.roleResources) {
//          console.log('i-----' + i);
//          console.log('====' + this.resources.children[i].id);
          this.getRoleResource(this.resources, this.roleResources[i].id);
        }
//        this.resources.children[2].children[2].state.selected = true;
        $jstree.refresh();
      }
    }
  };
</script>

<style>
</style>
