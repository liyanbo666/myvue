<style>
  .ivu-table .demo-table-info-row td {
    background-color: #2db7f5;
    color: #fff;
  }

  .ivu-table .demo-table-error-row td {
    background-color: #ff6600;
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
    background-color: #ff6600;
    color: #fff;
  }

  .ivu-table .demo-table-info-cell-address {
    background-color: #187;
    color: #fff;
  }
</style>

<template>
  <div style="margin-top: 10px">
    <i-form v-ref:form-validate :model="customerFormValidate" :label-width="120">
      <Row>
        <i-col span="4">
          <Form-item span="4" label="姓名" prop="name">
            <i-input v-model="customerFormValidate.name" placeholder="请输入姓名"></i-input>
          </Form-item>
        </i-col>
        <i-col span="4">
          <Form-item label="电话" prop="phone">
            <i-input v-model="customerFormValidate.phone" placeholder="请输入电话"></i-input>
          </Form-item>
        </i-col>
        <i-col span="4">
          <Form-item label="微信号" prop="customerWX">
            <i-input v-model="customerFormValidate.customerWXNum" placeholder="请输入微信号"></i-input>
          </Form-item>
        </i-col>
        <i-col span="4">
          <Form-item label="身份证号" prop="idCard">
            <i-input v-model="customerFormValidate.idCard" placeholder="请输入身份证号"></i-input>
          </Form-item>
        </i-col>
        <i-col span="4">
          <Form-item label="客户来源" prop="origin">
            <i-select v-model="customerFormValidate.origin" @click.native="findCustomerSysDict('origin','1')"
                      placeholder="请选择客户来源">
              <i-option v-for="item in customerOriginList" :key="item.id" :value="item.id">{{ item.label }}</i-option>
            </i-select>
          </Form-item>
        </i-col>
        <i-col span="4">
          <i-button type="primary" @click.native="getCustomerList()" shape="circle" icon="ios-search">搜索</i-button>
          <i-button type="success" shape="circle" icon="android-person-add" @click="customerModal = true">新建</i-button>
        </i-col>
      </Row>
    </i-form>
    <div>
      <i-table width="100%" border :columns="customerColumns" :data="customerData"></i-table>
    </div>

    <Modal width="500"
           v-model="customerModal"
           title="普通的Modal对话框标题"
           @on-ok="ok"
           @on-cancel="cancel">
      <div>
        <i-form v-ref:form-validate :model="customerModelFormValidate" :label-width="120">
          <i-col span="22">
            <Form-item span="1" label="姓名" prop="name">
              <i-input v-model="customerModelFormValidate.name" placeholder="请输入姓名"></i-input>
            </Form-item>
            <Form-item label="电话" prop="phone">
              <i-input v-model="customerModelFormValidate.phone" placeholder="请输入电话"></i-input>
            </Form-item>
            <Form-item label="微信号" prop="customerWXNum">
              <i-input v-model="customerModelFormValidate.customerWXNum" placeholder="请输入微信号"></i-input>
            </Form-item>
            <Form-item label="身份证号" prop="idCard">
              <i-input v-model="customerModelFormValidate.idCard" placeholder="请输入微信号"></i-input>
            </Form-item>
            <Form-item label="地址" prop="address">
              <i-input v-model="customerModelFormValidate.address" placeholder="请输入电话"></i-input>
            </Form-item>
            <Form-item label="客户来源" prop="origin">
              <i-select v-model="customerModelFormValidate.origin" @click.native="findCustomerSysDict('origin','2')"
                        placeholder="请选择客户来源">
                <i-option v-for="item in newCustomerOriginList" :key="item.id" :value="item.id">{{ item.label }}
                </i-option>
              </i-select>
            </Form-item>

          </i-col>
        </i-form>
      </div>
    </Modal>
  </div>
</template>

<script>
  import ICol from "iview/src/components/grid/col";

  export default {
    components: {ICol},

    data() {
      return {
        customerModal: false,
        customerOriginList: [],
        newCustomerOriginList: [],
        customerFormValidate: {
          id: '',
          name: '',
          phone: '',
          customerWXNum: '',
          idCard: '',
          address: ''
        },
        customerModelFormValidate: {
          id: '',
          name: '',
          phone: '',
          customerWXNum: '',
          idCard: '',
          address: ''
        },
        defaultForm: {
          id: '',
          name: '',
          phone: '',
          customerWXNum: '',
          idCard: '',
          address: '',
          origin:''
        },
        customerColumns: [

          {
            title: '姓名',
            key: 'name',
            fixed: 'left'
          },
          {
            title: '电话',
            key: 'phone'
          },
          {
            title: '微信号',
            key: 'customerWXNum'
          },
          {
            title: '身份证号',
            key: 'idCard'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '客户来源',
            key: 'originValue'
          },
          {
            title: '操作',
            key: 'operation',
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
                      this.saveOrUpdateOrder(params.row.id)
                    }
                  }
                }, '录单'),
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
                      this.saveOrUpdateOrder(params.row.id)
                    }
                  }
                }, '签到'),
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
                }, '详情'),
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
                      this.deleteCustomer(params.row.id)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        customerData: []
      }
    },
    mounted() {
      this.getCustomerList();
    },
    methods: {
      getCustomerList() {
        this.$axios.post('/api/customer/getCustomerList', this.customerFormValidate, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          console.log(res.data)
          if (res.data.code == "200") {
            this.customerData = res.data.data
          }
        })
      },
      getCustomerById(id) {
        var params = new URLSearchParams();
        params.append('id', id);
        this.$axios.post('/api/customer/getCustomerById', params, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          console.log(res.data)
          if (res.data.code == "200") {
            this.findCustomerSysDict('origin', '2')
            console.log(this.nextConsultTime)
            this.customerModelFormValidate = res.data.data
          }
        })
      },

      findOrderDetail(id) {
        console.log(id)
        this.getCustomerById(id)
        this.customerModal = true
      },
      findCustomerSysDict(type, from) {

        var params = new URLSearchParams();
        params.append('type', type);
        this.$axios.post('/api/system/findSysDict', params, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          if (from == '1') {
            this.customerOriginList = res.data.data
          } else {
            this.newCustomerOriginList = res.data.data
          }
        })
      },
      deleteCustomer(id) {
        {
          var params = new URLSearchParams();
          params.append('id', id);
          this.$axios.post('/api/customer/deleteCustomer', params, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
            console.log(res.data)
            if (res.data.code == "200") {
              this.$Message.info('删除成功');
              this.getCustomerList();
            }
          })
        }
      },
      ok() {
        this.$Message.info('点击了确定');
        console.log(this.newFormValidate)
        this.$axios.post('/api/customer/saveOrUpdateCustomer', this.customerModelFormValidate, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          console.log(res.data)
          if (res.data.code == "200") {
            this.getCustomerList()
            this.customerModelFormValidate=this.defaultForm
            // this.customerModelFormValidate=null;
          }
        })
      },
      cancel() {
        this.$Message.info('点击了取消');
      },

      saveOrUpdateOrder(id){

        var params = new URLSearchParams();
        params.append('customerId', id);
        this.$axios.post('/api/uploadFile/createOrder', params, {'content-type': 'application/x-www-form-urlencoded'}).then((res) => {
          console.log(res.data)
          if (res.data.code == "200") {
            this.$Message.info('录单成功');
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
