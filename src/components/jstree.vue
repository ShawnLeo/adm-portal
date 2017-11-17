<template>
  <div>
    <div id="resource-tree"></div>
  </div>

</template>

<script type="text/ecmascript-6">
  import $ from 'jquery';
  import 'jstree/dist/jstree.min.js';
  import 'font-awesome/css/font-awesome.min.css';
  import 'jstree/dist/themes/default/style.min.css';
  import {resourceGet, resourceDelete} from '../utils/interface';

  export default {
    props: ['resources'],
    data() {
      return {
        modalAdd: false
      };
    },
    methods: {
      init: function () {
        let self = this;
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
          plugins: ['contextmenu', 'dnd', 'types'],
          contextmenu: {
            items: {
              create: {
                label: '新增',
                action: function (data) {
                  var instance = $.jstree.reference(data.reference);
                  var node = instance.get_node(data.reference);
//                  var module = node.li_attr.modType;
                  var resType = node.li_attr.resType;
                  // API资源下不可以添加操作
                  if (resType === '1') {
                    self.$Modal.error({
                      title: '提示',
                      content: 'API资源下不可以添加操作！'
                    });
                    return;
                  }
                  // 根节点下只能添加平台
//                  if (resType === '2') {

                    self.addResource(node.li_attr);
//                  }
                  // 平台下添加需选择是功能模块还是API资源，如果是模块需指定是否是菜单模块
                }
              },
              remove: {
                label: '删除',
                action: function (data) {
                  var instance = $.jstree.reference(data.reference);
                  var node = instance.get_node(data.reference);
                  // 有子节点，不能删除
                  if (node.children && node.children.length > 0) {
                    self.$Modal.error({
                      title: '提示',
                      content: '有子节点，不能删除！'
                    });
                  } else if (node.id === '-1') { // 根节点，不能删除
                    self.$Modal.error({
                      title: '提示',
                      content: '根节点，不能删除！'
                    });
                  } else {
                    self.$Modal.confirm({
                      title: '提示',
                      content: '<p>确定删除节点 </p>',
                      onOk: () => {
                        self.deleteById(node.id);
                      }
                    });
                  }
                }
              }
            }
          }
        });

        $tree.on('move_node.jstree', function (e, data) { // 移动事件
          console.log(data);
        });
        $tree.bind('activate_node.jstree', function (obj, e) {  // 点击事件
          self.getById(e.node.id);
        });
      },
      getById: async function (id) {
        let response = await resourceGet({id: id});
        this.$emit('change', response.body); // 通知父组件，刷新右侧内容
      },
      deleteById: async function (id) {
        console.log(id);
        let response = await resourceDelete({id: id});
        if (response.header.code === '0') {
          this.$emit('refresh'); // 通知父组件，刷新右侧内容
        }
      },
      addResource: function (id) {
        this.$emit('add', id); // 通知父组件，刷新右侧内容
      }
    },
    mounted() {
      this.init();
    },
    watch: {
      resources: function (val, oldval) {
        console.log(val);
        let $jstree = $('#resource-tree').jstree(true);
        $jstree.settings.core.data = val;
        $jstree.refresh();
      }
    }
  };
</script>

<style>
</style>
