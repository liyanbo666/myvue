<template>
  <div>
    <div id="dateSelect" style="margin-top: 10px;">
      <i-form v-ref:form-validate :model="dealOrderFormValidate" :label-width="120">

        <Row>
          <i-col span="8">
            <Form-item label="报名时间">
              <i-col span="11">
                <Form-item prop="createBeginTime">
                  <Date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择起始日期"
                               @on-change="beginCreateTimeModel"  :value="dealOrderFormValidate.createBeginTime"></Date-picker>
                </Form-item>
              </i-col>
              <i-col span="1" style="text-align: center">-</i-col>
              <i-col span="11">
                <Form-item prop="createEndTime">
                  <Date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束日期"
                               @on-change="endCreateTimeModel" :value="dealOrderFormValidate.createEndTime"></Date-picker>
                </Form-item>
              </i-col>
            </Form-item>
          </i-col>
          <i-col span="8">
            <Form-item label="上课日期">
              <i-col span="11">
                <Form-item prop="workBeginDate">
                  <Date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择起始日期"
                               @on-change="beginWordDateModel" :value="dealOrderFormValidate.workBeginDate"></Date-picker>
                </Form-item>
              </i-col>
              <i-col span="2" style="text-align: center">-</i-col>
              <i-col span="11">
                <Form-item prop="workEndDate">
                  <Date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束日期"
                               @on-change="endWordDateModel" :value="dealOrderFormValidate.workEndDate"></Date-picker>
                </Form-item>
              </i-col>
            </Form-item>
          </i-col>
        </Row>
        <Row style="text-align: center">
          <i-col span="8">
            <Form-item span="5" label="身份证号" prop="name">
              <i-input v-model="dealOrderFormValidate.idCard" placeholder="请输入身份证号"></i-input>
            </Form-item>
          </i-col>
          <i-col span="8">
            <Form-item label="报名班次" prop="courseId">
              <i-select v-model="dealOrderFormValidate.courseId" @click.native="findCourseSelectList('1')"
                        placeholder="请选择课程">
                <i-option v-for="item in courseList" :key="item.id" :value="item.id">{{ item.label }}</i-option>
              </i-select>
            </Form-item>
          </i-col>
          <i-col span="8">
            <i-button type="primary" shape="circle" @click.native="getDealOrderList()" icon="ios-search">搜索</i-button>
          </i-col>
        </Row>
      </i-form>
    </div>
    <i-table id="dealOrderTable" style="text-align: center" width="100%" border :columns="dealOrderColumns"
             :data="dealOrderData"></i-table>

    <div id="deal0rder">
      <Modal width="1200"
             v-model="dealOrderModel"
             title="普通的Modal对话框标题"
             @on-ok="ok"
             @on-cancel="cancel">
        <div style="margin:0 auto;">
          <i-form v-ref:form-validate :model="dealOrderModelFormValidate" :label-width="120">

            <Row>
              <i-col span="8">
                <Form-item label="报名班次" prop="courseId">
                  <i-select v-model="dealOrderModelFormValidate.courseId" @click.native="findCourseSelectList('2')"
                            placeholder="请选择课程">
                    <i-option v-for="item in newCourseList" :key="item.id" :value="item.id">{{ item.label }}</i-option>
                  </i-select>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="协议状态" prop="agreementStatus">
                  <i-input v-model="dealOrderModelFormValidate.agreementStatus" placeholder="请输入协议状态"></i-input>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="报名时间">
                  <Form-item prop="createTime">
                    <Date-picker type="datetime" :value="dealOrderModelFormValidate.createTime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"
                                 @on-change="createTimeModel"></Date-picker>
                  </Form-item>
                </Form-item>
              </i-col>


            </Row>

            <Row>
              <i-col span="8">
                <Form-item label="支付方式" prop="payType">
                  <i-input v-model="dealOrderModelFormValidate.payType" placeholder="请输入支付方式"></i-input>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="支付金额" prop="amount">
                  <i-input v-model="dealOrderModelFormValidate.amount" placeholder="请输入支付金额"></i-input>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="上课日期">
                  <Form-item prop="workDate">
                    <Date-picker type="datetime" :value="dealOrderModelFormValidate.workDate" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"
                                 @on-change="wordDateModel"></Date-picker>
                  </Form-item>
                </Form-item>
              </i-col>
            </Row>
            <Row>
              <i-col span="8">
                <Form-item label="业绩归属人" prop="dealBelonger">
                  <i-input v-model="dealOrderModelFormValidate.dealBelonger" placeholder="请输入业绩归属人"></i-input>
                </Form-item>
              </i-col>
              <i-col span="8">
                <Form-item label="业绩归属校区" prop="dealSchool">
                  <i-input v-model="dealOrderModelFormValidate.dealSchool" placeholder="请输入业绩归属校区"></i-input>
                </Form-item>
              </i-col>
            </Row>
            <Row>
              <i-col span="24">
                <Form-item label="成单记录" prop="dealOrderProcess">
                  <i-input v-model="dealOrderModelFormValidate.dealOrderProcess" type="textarea" :rows="4"
                           placeholder="请输入跟进过程"></i-input>
                </Form-item>
              </i-col>
            </Row>
            <Row>
              <i-col span="24">
                <Form-item label="其他" prop="other">
                  <i-input v-model="dealOrderModelFormValidate.other" type="textarea" :rows="4"
                           placeholder="请输入..."></i-input>
                </Form-item>
              </i-col>
            </Row>
          </i-form>
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
        dealOrderModel:false,
        courseList: [],
        newCourseList: [],
        dealOrderFormValidate: {
          createBeginTime: '',
          createEndTime: '',
          workBeginDate: '',
          workEndDate: '',
          idCard: '',
          courseId: ''
        },
        dealOrderModelFormValidate: {
          other: '',
          courseId: '',
          payType: '',
          amount: '',
          agreementStatus: '',
          dealOrderProcess: '',
          workDate:'',
          createTime:'',
          dealBelonger:'',
          dealSchool:''
        },
        workDate: '',
        createTime: '',
        dealOrderColumns: [
          {
            title: '姓名',
            key: 'name',
            align: "center",
            fixed: 'left',
            width: 200,

          },
          {
            title: '电话',
            align: "center",
            key: 'phone',
            width: 200,
          },
          {
            title: '微信号',
            align: "center",
            key: 'customerWX',
            width: 200,
          },
          {
            title: '身份证号',
            align: "center",
            key: 'idCard',
            width: 200,
          },
          {
            title: '是否已加微信',
            align: "center",
            key: 'existWX',
            width: 200,
          },
          {
            title: '咨询/推荐课程',
            align: "center",
            key: 'course',
            width: 200,
          },
          {
            title: '跟进日期',
            align: "center",
            key: 'consultTime',
            width: 200,
          },

          {
            title: '下一步跟进日期',
            align: "center",
            key: 'nextConsultTime',
            width: 200,
          },
          {
            title: '备注',
            align: "center",
            key: 'remark',
            width: 200,
          },
          {
            title: '报名时间',
            align: "center",
            key: 'createTime',
            width: 200,
          },
          {
            title: '报名班次',
            align: "center",
            key: 'workCourse',
            width: 200,
          },
          {
            title: '上课日期',
            align: "center",
            key: 'workDate',
            width: 200,
          },
          {
            title: '成单过程',
            align: "center",
            key: 'dealOrderProcess',
            width: 200,
          },
          {
            title: '支付方式',
            align: "center",
            key: 'payType',
            width: 200,
          },
          {
            title: '支付金额',
            align: "center",
            key: 'amount',
            width: 200,
          },
          {
            title: '协议状态',
            align: "center",
            key: 'agreementStatus',
            width: 200,
          },
          {
            title: '业绩归属人',
            align: "center",
            key: 'dealBelonger',
            width: 200,
          },
          {
            title: '业绩归属校区',
            align: "center",
            key: 'dealSchool',
            width: 200,
          },

          {
            title: '操作',
            align: "center",
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
                      this.findDealOrderDetail(params.row.id)
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
                      this.deleteDealOrder(params.row.id)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        dealOrderData: []
      }
    },
    mounted() {
      this.getDealOrderList();
    },
    methods: {
      findCourseSelectList(from) {
        this.$axios.post('/api/system/findCourseSelectList', {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          if (from == '1') {
            this.courseList = res.data.data
          } else {
            this.newCourseList = res.data.data
          }
        })
      },
      getDealOrderList() {
        this.$axios.post('/api/dealOrder/getDealOrderList', this.dealOrderFormValidate, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          console.log(res.data)
          if (res.data.code == "200") {
            this.dealOrderData = res.data.data
          }
        })
      },
      findDealOrderDetail(id) {
        console.log(id)
        this.dealOrderModel = true
        this.getDealOrderListById(id)
      },
      deleteDealOrder(id){
        var params = new URLSearchParams();
        params.append('id', id);
        console.log(params.id)
        this.$axios.post('/api/dealOrder/deleteDealOrder', params, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          console.log(res.data)
          if (res.data.code == "200") {
            this.getDealOrderList()
          }
        })
      },
      getDealOrderListById(id) {
        var params = new URLSearchParams();
        params.append('id', id);
        this.$axios.post('/api/dealOrder/getDealOrderListById', params, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          console.log(res.data)
          if (res.data.code == "200") {
            this.findCourseSelectList(2);
            this.createTime = res.data.data.createTime;
            this.workDate = res.data.data.workDate
            this.dealOrderModelFormValidate = res.data.data
          }
        })
      },
      wordDateModel(e) {
        this.dealOrderModelFormValidate.workDate = e;
      },
      createTimeModel(e) {
        this.dealOrderModelFormValidate.createTime = e;
      },
      beginWordDateModel(e) {
        this.dealOrderFormValidate.workBeginDate = e;
      },
      endWordDateModel(e) {
        this.dealOrderFormValidate.workEndDate = e;
      },
      beginCreateTimeModel(e) {
        this.dealOrderFormValidate.createBeginTime = e;
      },
      endCreateTimeModel(e) {
        this.dealOrderFormValidate.createEndTime = e;
      },
      ok() {
        this.$Message.info('点击了确定');
        console.log(this.dealOrderModelFormValidate)
        this.$axios.post('/api/dealOrder/updateDealOrder', this.dealOrderModelFormValidate, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          console.log(res.data)
          if (res.data.code == "200") {
            this.getDealOrderList()
          }
        })
      },
      cancel() {
        this.$Message.info('点击了取消');
      },
    }

  }
</script>

<style scoped>

</style>
