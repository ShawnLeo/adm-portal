<template>
  <Row>
    <iCol span="24">
      <Card>
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          条件筛选
        </p>
        <a href="#" slot="extra">
          <Button type="info" shape="circle" icon="ios-search" v-on:click="query()">查询</Button>
          <Button type="ghost" shape="circle" icon="refresh" @click="handleReset()">重置</Button>
        </a>
        <Form ref="logVO" :model="logVO" :label-width="80">
          <Row :gutter="60">
            <i-col span="12">
              <Form-item label="操作模块">
                <Input v-model="logVO.logModule" placeholder="请输入"></Input>
              </Form-item>
            </i-col>
            <i-col span="12">
              <Form-item label="操作员号">
                <Input v-model="logVO.userId" placeholder="请输入"></Input>
              </Form-item>
            </i-col>
          </Row>

          <Form-item label="起止日期">
            <Row>
              <i-col span="3">
              <Date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" v-model="logVO.beginTime"></Date-picker>
              </i-col>
              <i-col span="1" style="text-align: center">—</i-col>
              <i-col span="3">
                <Date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" v-model="logVO.endTime"></Date-picker>
              </i-col>
            </Row>
          </Form-item>
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
          <!--<Button type="success" shape="circle" icon="plus">添加</Button>-->
          <Button type="ghost" shape="circle" icon="refresh" v-on:click="query()">刷新</Button>
        </a>

        <Table border :columns="columns7" :data="data6"></Table>
      </Card>
    </iCol>
    <iCol span="24" class="top-30 inner-right">
      <Page :total="totalCount" :page-size="pageSize" :page-size-opts="pageSizeOpts" show-sizer show-total @on-change="pageNumChange" @on-page-size-change="pageSizeChange"></Page>
    </iCol>
  </Row>
</template>

<script type="text/ecmascript-6">
  import {logList} from '../../utils/interface';
  import {dateFormat} from '../../utils/utils';
  export default {
    data() {
      return {
        logVO: {
          logModule: '',
          userId: '',
          beginTime: '',
          endTime: ''
        },
        columns7: [
          {
            title: 'ID',
            key: 'userId',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.userId)
              ]);
            }
          },
          {
            title: '主机',
            key: 'host'
          },
          {
            title: '模块',
            key: 'logModule'
          },
          {
            title: '日志类型',
            key: 'logType'
          },
          {
            title: '操作时间',
            key: 'operTime',
            render: (h, params) => {
              return dateFormat(new Date(params.row.operTime), 'yyyy-MM-dd hh:mm:ss.S');
            }
          },
          {
            title: '备注',
            key: 'remarks'
          }
//          ,{
//            title: '操作',
//            key: 'action',
//            width: 200,
//            align: 'center',
//            render: (h, params) => {
//              return h('div', [
//                h('Button', {
//                  props: {
//                    type: 'warning',
//                    size: 'small'
//                  },
//                  style: {
//                    marginRight: '5px'
//                  },
//                  on: {
//                    click: () => {
//                      this.show(params.index);
//                    }
//                  }
//                }, '权限设置'),
//                h('Button', {
//                  props: {
//                    type: 'text',
//                    icon: 'trash-a'
//                  },
//                  style: {
//                    marginRight: '5px'
//                  },
//                  on: {
//                    click: () => {
//                      this.remove(params.index);
//                    }
//                  }
//                })
//              ]);
//            }
//          }
        ],
        data6: [],
        pageSizeOpts: [10, 20, 50],
        totalCount: 0,
        pageSize: 10,
        pageNumber: 1
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init: async function () {
        await logList({'pageNumber': this.pageNumber, 'pageSize': this.pageSize}, this.logVO, this.$store.state.app.env).then(r => {
          this.data6 = r.body.page.content;
          this.totalCount = r.body.page.totalElements;
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
        let res = await logList({'pageNumber': this.pageNumber, 'pageSize': this.pageSize}, this.logVO, this.$store.state.app.env);
        this.data6 = res.body.page.content;
        this.totalCount = res.body.page.totalElements;
      },
      handleReset () {
        this.logVO = {};
      }
//      ,
//      show(index) {
//        this.$Modal.info({
//          title: '用户信息',
//          content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
//        });
//      },
//      remove(index) {
//        this.data6.splice(index, 1);
//      }
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
