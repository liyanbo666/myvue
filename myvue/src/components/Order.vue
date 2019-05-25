<style>
  .ivu-table .demo-table-info-row td {
    background-color: #2db7f5;
    color: #fff;
  }

  .ivu-table .demo-table-error-row td {
    background-color: #ff8800;
    color: #fff;
  }

  .ivu-table td.demo-table-info-column {
    background-color: #2db7f5;
    color: #fff;
  }

  .ivu-table .demo-table-info-cell-name {
    background-color: #2db7f5;
    color: #fff;
  }

  .ivu-table .demo-table-info-cell-age {
    background-color: #ff8800;
    color: #fff;
  }

  .ivu-table .demo-table-info-cell-address {
    background-color: #187;
    color: #fff;
  }
  #mytable .ivu-table th {

    text-align: center;

  }
</style>
<template>
  <div>
    <div id="dateSelect" style="margin-top: 10px;">
      <i-form v-ref:form-validate :model="formValidate" :label-width="120">
        <Row style="text-align: center">
          <i-col span="5">
            <Form-item span="5" label="姓名" prop="name">
              <i-input v-model="formValidate.name" placeholder="请输入姓名"></i-input>
            </Form-item>
          </i-col>
          <i-col span="5">
            <Form-item label="电话" prop="phone">
              <i-input v-model="formValidate.phone" placeholder="请输入电话"></i-input>
            </Form-item>
          </i-col>
          <i-col span="5">
            <Form-item label="微信号" prop="customerWX">
              <i-input v-model="formValidate.customerWX" placeholder="请输入微信号"></i-input>
            </Form-item>
          </i-col>
          <i-col span="5">

          </i-col>
        </Row>

        <Row>
          <i-col span="8">
            <Form-item label="下一次跟进日期">
              <i-col span="11">
                <Form-item prop="nextConsultBeginTime">
                  <Date-picker type="datetime" @on-change="nextConsultBeginTimeModel" placeholder="选择日期" :value="formValidate.nextConsultBeginTime"></Date-picker>
                </Form-item>
              </i-col>
              <i-col span="1" style="text-align: center">-</i-col>
              <i-col span="11">
                <Form-item prop="nextConsultEndTime">
                  <Date-picker type="datetime" @on-change="nextConsultEndTimeModel" placeholder="选择日期" :value="formValidate.nextConsultEndTime"></Date-picker>
                </Form-item>
              </i-col>
            </Form-item>
          </i-col>
          <i-col span="5">
            <Form-item label="咨询/推荐课程" prop="courseId">
              <i-select v-model="formValidate.courseId" @click.native="findCourseSelectList('1')" placeholder="请选择课程">
                <i-option v-for="item in courseList" :key="item.id" :value="item.id">{{ item.label }}</i-option>
              </i-select>
            </Form-item>
          </i-col>
          <i-col span="5">
            <Form-item label="是否已加微信" prop="existWXId">
              <i-select v-model="formValidate.existWXId" @click.native="findSysDict('existWX','1')" placeholder="请选择是否已加微信">
                <i-option v-for="item in existWXList" :key="item.id" :value="item.id">{{ item.label }}</i-option>
              </i-select>
            </Form-item>
          </i-col>

          <i-col span="5">
            <i-button type="primary" shape="circle" @click.native="getOrderList()" icon="ios-search">搜索</i-button>
          </i-col>
        </Row>
      </i-form>

    </div>


    <div>
      <i-table id="mytable" style="text-align: center" width="100%" border :columns="columns1" :data="data8"></i-table>
    </div>
    <div id="tanchaugn">
      <Modal width="1200"
             v-model="modal1"
             title="普通的Modal对话框标题"
             @on-ok="ok"
             @on-cancel="cancel">
        <div style="margin:0 auto;">
          <i-form v-ref:form-validate :model="newFormValidate" :label-width="120">
             <Row>
               <i-col span="8">
            <Form-item span="1" label="姓名" prop="name">
              <i-input v-model="newFormValidate.name" placeholder="请输入姓名"></i-input>
            </Form-item>
               </i-col>
               <i-col span="8">
            <Form-item label="电话" prop="phone">
              <i-input v-model="newFormValidate.phone" placeholder="请输入电话"></i-input>
            </Form-item>
               </i-col>
               <i-col span="8">
            <Form-item label="微信号" prop="customerWX">
              <i-input v-model="newFormValidate.customerWX" placeholder="请输入微信号"></i-input>
            </Form-item>
               </i-col>
             </Row>
              <Row>
                <i-col span="8">
            <Form-item label="咨询/推荐课程" prop="courseId">
              <i-select v-model="newFormValidate.courseId" @click.native="findCourseSelectList('2')" placeholder="请选择课程">
                <i-option v-for="item in newCourseList" :key="item.id" :value="item.id">{{ item.label }}</i-option>
              </i-select>
            </Form-item>
                </i-col>
                <i-col span="8">
            <Form-item label="是否已加微信" prop="existWXId">
              <i-select v-model="newFormValidate.existWXId" @click.native="findSysDict('existWX','2')"
                        placeholder="请选择是否已加微信">
                <i-option v-for="item in newExistWXList" :key="item.id" :value="item.id">{{ item.label }}</i-option>
              </i-select>
            </Form-item>
                </i-col>
                <i-col span="8">
              <Form-item label="跟进日期">
                <Form-item prop="consultTime">
                  <Date-picker type="datetime" :value="consultTime" format="yyyy-MM-dd HH:mm:ss"   placeholder="选择日期" @on-change="ConsultTimeModel"></Date-picker>
                </Form-item>
              </Form-item>
                </i-col>
              </Row>
            <Row>
              <i-col span="8">
            <Form-item label="下一次跟进日期">
              <Form-item prop="nextConsultTime">
                <Date-picker type="datetime" :value="nextConsultTime" format="yyyy-MM-dd HH:mm:ss"   placeholder="选择日期" @on-change="nextConsultTimeModel"></Date-picker>
              </Form-item>
            </Form-item>
              </i-col>
              <i-col span="16">
            <Form-item label="备注" prop="remark">
              <i-input v-model="newFormValidate.remark" type="textarea" :rows="4" placeholder="请输入..."></i-input>
            </Form-item>
              </i-col>
            </Row>
          </i-form>

          <i-form v-ref:form-validate :model="addRecordFormValidate" :label-width="120">
            <Row style="text-align: center">
              <i-col span="10">
                <Form-item label="跟进计划" prop="followUpPlan">
                  <i-input v-model="addRecordFormValidate.followUpPlan" type="textarea" :rows="4" placeholder="请输入跟进计划"></i-input>
                </Form-item>
              </i-col>
              <i-col span="10">
                <Form-item label="跟进记录" prop="followUpProcess">
                  <i-input v-model="addRecordFormValidate.followUpProcess" type="textarea" :rows="4" placeholder="请输入跟进过程"></i-input>
                </Form-item>
              </i-col>
              <i-col span="4">
                <i-button type="success" shape="circle" icon="android-person-add" @click="saveFollowUpRecord">确定</i-button>
              </i-col>
            </Row>
          </i-form>
          <i-table id="processTable" style="text-align: center" width="100%" border :columns="processColumns" :data="processData"></i-table>
        </div>
      </Modal>

    </div>
  </div>
</template>
<script>
  import ICol from "iview/src/components/grid/col";

  export default {
    components: {ICol},
    data() {
      return {
        courseList: [],
        existWXList: [],
        modal1: false,
        followUpModal:false,
        nextConsultTime:'',
        consultTime:'',
        applyOrderId:'',
        formValidate: {
          name: '',
          phone: '',
          customerWX: '',
          nextConsultTime: '',
          courseId: '',
          existWXId: '',
          nextConsultBeginTime:'',
          nextConsultEndTime:''
        },
        addRecordFormValidate:{
          applyOrderId:this.applyOrderId,
          followUpPlan:'',
          followUpProcess:''
        },

        newCourseList: [],
        newExistWXList: [],
        newFormValidate: {
          id:'',
          name: '',
          phone: '',
          customerWX: '',
          consultTime:'',
          nextConsultTime: '',
          courseId: '',
          existWXId: '',
          remark: ''
        },
        processColumns: [

          {
            title: '跟进计划',
            key: 'followUpPlan',
            align:"center",
          },
          {
            title: '跟进记录',
            align:"center",
            key: 'followUpProcess',
          },
          {
            title: '创建时间',
            align:"center",
            key: 'createTime',
          },

          {
            title: '操作',
            align:"center",
            key: 'operation',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.updateFollowUpRecord(params.row)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.deleteFollowUpRecord(params.row)
                    }
                  }
                }, '删除')
              ])
            }
          }
          ],
        columns1: [

          {
            title: '姓名',
            key: 'name',
            align:"center",
            fixed: 'left',
            width: 200,

          },
          {
            title: '电话',
            align:"center",
            key: 'phone',
            width: 200,
          },
          {
            title: '微信号',
            align:"center",
            key: 'customerWX',
            width: 200,
          },
          {
            title: '是否已加微信',
            align:"center",
            key: 'existWX',
            width: 200,
          },
          {
            title: '咨询/推荐课程',
            align:"center",
            key: 'course',
            width: 200,
          },
          {
            title: '跟进日期',
            align:"center",
            key: 'consultTime',
            width: 200,
          },

          {
            title: '下一步跟进日期',
            align:"center",
            key: 'nextConsultTime',
            width: 200,
          },
          {
            title: '备注',
            align:"center",
            key: 'remark',
            width: 200,
          },

          {
            title: '操作',
            align:"center",
            key: 'operation',
            width: 250,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.findOrderDetail(params.row.id)
                    }
                  }
                }, '查看/修改'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.deleteOrder(params.row.id)
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.dealOrder(params.row.id)
                    }
                  }
                }, '成单')
              ])
            }
          }
        ],

        data8: [],
        processData:[]
      }
    },
    mounted() {
      this.getOrderList();
    },
    methods: {
      rowClassName(row, index) {
        if (index === 1) {
          return 'demo-table-info-row';
        } else if (index === 3) {
          return 'demo-table-error-row';
        }
        return '';
      },
      getOrderList() {
        this.$axios.post('/api/uploadFile/getOrderList', this.formValidate, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          console.log(res.data)
          if (res.data.code == "200") {
            this.data8 = res.data.data
          }
        })
      },
      getOrderListById(id) {
        var params = new URLSearchParams();
        params.append('id', id);
        this.$axios.post('/api/uploadFile/getOrderListById', params, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          console.log(res.data)
          if (res.data.code == "200") {
            this.findFollowUpRecordList(id)
            this.findSysDict('existWX','2')
            this.findCourseSelectList(2);
            this.applyOrderId=id
            this.addRecordFormValidate.applyOrderId=id
            this.nextConsultTime=res.data.data.nextConsultTime;
            this.consultTime=res.data.data.consultTime
            console.log(this.nextConsultTime)
            this.newFormValidate = res.data.data
          }
        })
      },
      ok() {
        this.$Message.info('点击了确定');
        console.log(this.newFormValidate)
        this.$axios.post('/api/uploadFile/saveOrUpdateOrder', this.newFormValidate, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          console.log(res.data)
          if (res.data.code == "200") {
            this.getOrderList()
          }
        })
      },
      cancel() {
        this.$Message.info('点击了取消');
      },
      findSysDict(type,from) {

        var params = new URLSearchParams();
        params.append('type', type);
        this.$axios.post('/api/system/findSysDict', params, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
         if(from=='1'){
           this.existWXList = res.data.data
         }else{
           this.newExistWXList = res.data.data
         }
        })
      },
      findCourseSelectList(from) {
        this.$axios.post('/api/system/findCourseSelectList', {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          if(from=='1'){
            this.courseList = res.data.data
          }else{
            this.newCourseList = res.data.data
          }
        })
      },
      findOrderDetail(id) {
        console.log(id)
        this.getOrderListById(id)
        this.modal1 = true
      },
      deleteOrder(id){
        var params = new URLSearchParams();
        params.append('id', id);
        this.$axios.post('/api/uploadFile/deleteOrder', params, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          console.log(res.data)
          if (res.data.code == "200") {
            this.$Message.info('删除成功');
            this.getOrderList()
          }
        })
      },
      dealOrder(id){
        var params = new URLSearchParams();
        params.append('applyOrderId', id);
        this.$axios.post('/api/dealOrder/createDealOrder', params, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          console.log(res.data)
          if (res.data.code == "200") {
            this.$Message.info('成单成功');
            this.getOrderList()
          }
        })
      },
      nextConsultTimeModel(e){
        this.newFormValidate.nextConsultTime=e;
      },
      ConsultTimeModel(e){
        this.newFormValidate.consultTime=e;
      },
      nextConsultBeginTimeModel(e){
        this.formValidate.nextConsultBeginTime=e;
      },
      nextConsultEndTimeModel(e){
        this.formValidate.nextConsultEndTime=e;
      },
      findFollowUpRecordList(id){
        var params = new URLSearchParams();
        params.append('id', id);
        this.$axios.post('/api/followUpRecord/findFollowUpRecordList', params, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          console.log(res.data)
          if (res.data.code == "200") {
            this.processData=res.data.data
          }
        })
      },
      saveFollowUpRecord(){
        this.$axios.post('/api/followUpRecord/saveFollowUpRecord', this.addRecordFormValidate, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          console.log(res.data)
          if (res.data.code == "200") {
            this.$Message.info('跟进记录添加成功');
            this.findFollowUpRecordList(this.applyOrderId);
            this.addRecordFormValidate.followUpPlan=''
            this.addRecordFormValidate.followUpProcess=''
          }
        })
      },
      updateFollowUpRecord(param){
        param.append('applyOrderId',this.applyOrderId)
        this.$axios.post('/api/followUpRecord/updateFollowUpRecord', param, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          console.log(res.data)
          if (res.data.code == "200") {
            findFollowUpRecordList(param.applyOrderId)
            this.$Message.info('跟进记录修改成功');
          }
        })
      },
      deleteFollowUpRecord(param){
        console.log(param)
        var params = new URLSearchParams();
        params.append('id', param.id);
        console.log(params.id)
        this.$axios.post('/api/followUpRecord/deleteFollowUpRecord', params, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          console.log(res.data)
          if (res.data.code == "200") {
            this.findFollowUpRecordList(param.applyOrderId)
          }
        })
      }

    }
  }
</script>
