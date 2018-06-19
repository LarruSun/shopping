<template>
  <div class="contain">
    <div class="common-title">
      <div>
        <img src="@/assets/images/marketing.png" alt="">
        <span @click="$router.go(-1)">订单</span>
        <i class="el-icon-arrow-right"></i>
        <span class="active-title">所有订单</span>
      </div>
    </div>
    <!--选择订单状态-->
    <div class="orderStatus">
    	<el-form :model="formData" label-width="120">
    		<el-row type="flex" justify="center" align="middle">
    			<el-col :span="4"><el-form-item label="手机号"><el-input size="mini"></el-input></el-form-item></el-col>
    			<el-col :span="4"><el-form-item label="订单号"><el-input size="mini"></el-input></el-form-item></el-col>
    			<el-col :span="16"></el-col>
    		</el-row>
    	</el-form>
      <el-radio-group v-model="status" style="padding: 20px;">
        <el-radio-button label="allOrders">全部订单</el-radio-button>
        <el-radio-button label="beforePay">待付款</el-radio-button>
        <el-radio-button label="boforeSend">待发货</el-radio-button>
        <el-radio-button label="beforeReceive">待收货</el-radio-button>
        <el-radio-button label="complete">交易完成</el-radio-button>
        <el-radio-button label="closed">已关闭</el-radio-button>
      </el-radio-group>
    </div>
    <!--子组件展示订单状态-->
    <allOrders v-if="status=='allOrders'"></allOrders>
    <beforePay v-if="status=='beforePay'"></beforePay>
    <beforeSend v-if="status=='boforeSend'"></beforeSend>
    <beforeReceive v-if="status=='beforeReceive'"></beforeReceive>
    <complete v-if="status=='complete'"></complete>
    <closed v-if="status=='closed'"></closed>
    <!--<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :width="mark == 'detail'? '40%' : '50%'" :close-on-click-modal="true">
    </el-dialog>-->
  </div>
</template>

<script>
import mixin from '@/utils/mixin'
import filters from '@/utils/filters'
export default {
  mixins: [mixin],
  filters: filters,
  data(){
  	return {
  		formData:{},
  		status:'allOrders'
  	}
  },
  components:{//引入子组件
   allOrders:resolve=>require(['@/views/order/orderStatus/allOrders.vue'], resolve),
   beforePay:resolve=>require(['@/views/order/orderStatus/beforePay.vue'], resolve),
   beforeSend:resolve=>require(['@/views/order/orderStatus/beforeSend.vue'], resolve),
   beforeReceive:resolve=>require(['@/views/order/orderStatus/beforeReceive.vue'], resolve),
   complete:resolve=>require(['@/views/order/orderStatus/complete.vue'], resolve),
   closed:resolve=>require(['@/views/order/orderStatus/closed.vue'], resolve)
  },
  created(){
    this.getList()
  },
  methods: {
  	getList(){
  		
  	}
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/css/common';
.contain{
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 3px rgba(26,26,26,.1);
  box-sizing: border-box;
}
.el-input, .el-select{
    width: 150px;
 }
.orderStatus{
	margin-top: 20px;
	.el-form{
		margin-left: 20px;
	}
}
.margin0{
  margin-top: 0 !important;
}
</style>
