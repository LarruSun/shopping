<template>
  <div class="contain">
    <div class="common-title">
      <div>
        <img src="@/assets/images/message.png" alt="">
        <span>设置</span>
        <i class="el-icon-arrow-right"></i>
        <span class="active-title">打印机</span>
      </div>
    </div>
    <el-button type="primary" icon="el-icon-plus" @click="$router.push('/setting/addPrinter')" style="margin:20px 0">新增打印机</el-button>
   
    <yy-table :titleData="dataTitle" :data="tableData" :pageSize='pageCount' :pageIndex='5' :checkbox='false' :height="tableHeight" :pageState="true"
    	:button="{delete: true,look :true,lookText :true,is :true}" 
    	@delete="handleDel" @look="handleTest" @lookText="handleSet" @is="handleStop" @selectData='selectData' @limit='limit'>
      
    </yy-table>

  </div>
</template>

<script>
import mixin from '@/utils/mixin'
import filters from '@/utils/filters'
export default {
  mixins: [mixin],
  filters: filters,
  data(){
    return{
      dataTitle:[{label:'打印机名称',prop:'printerName'},{label:'状态',prop:'status'},{label:'厂商',prop:'factury'},
      {label:'编号(SN)',prop:'SNcode'},{label:'打印类型',prop:'printType'},{label:'打印份数',prop:'printNum'}],
      /*{printerName:'',status:'',factury:'',SNcode:'',printType:'',printNum:''}*/
      tableData:[
          {printerName:'下单打印机',status:'在线',factury:'飞蛾',SNcode:'XXXX',printType:'出品打印',printNum:'1'},
          {printerName:'下单打印机',status:'在线',factury:'飞蛾',SNcode:'XXXX',printType:'出品打印',printNum:'1'},
          {printerName:'下单打印机',status:'在线',factury:'飞蛾',SNcode:'XXXX',printType:'出品打印',printNum:'1'},

        ],
			tableHeight: window.innerHeight - 280,
			pageCount:200,
			params:{
				page:1,
				pageSize:5
			},
			dialogTitle:'',
			dialogVisible:false
    }
  },
  created(){
    this.getList();
  },
  methods: {
    handleDel(){
    },
    handleTest(){
    	this.dialogVisible=true
    	this.dialogTitle="测试"
    },
    handleStop(){
    	this.dialogVisible=true
    	this.dialogTitle="停用"
    },
    handleSet(a){
    	this.$observer.$emit('pass-tableData',{...a})
    	this.$router.push('/setting/printerSetting')
    },
    handleClose(){
    },
    getList(){
      /*this.tableLoading = true;
      this.$http.post('web/sms/get/rechargeRecord',this.filterParams(this.params)).then(res => {
        this.pageCount=res.data.data.countAll
        setTimeout(()=>{
          this.tableLoading = false;
        },200);
        console.log(res)
      })*/
    },
    handleDel(){
    	
    },
    handleTest(){},
    handleSet(a){
      // console.log(a);
      // return;
    	this.$observer.$emit('pass-tableData',{...a})
    	this.$router.push('/setting/printerSetting')
    },
    selectData(a){
      console.log(a);
    },
    handleStop(){},
    index(a){
      console.log(123);
      console.log(a);
    },
    limit(a){
      console.log(a);
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
.filter-wrap{
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px;
  font-size: 14px;
  .filter-item{
    margin-right: 30px;
    margin-top: 20px;
    .el-input, .el-select{
      width: 150px;
    }
    >span:first-child{
      margin-right: 20px;
    }
  }
}
.order-header{
  margin: 20px 0 0 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.pay-header{
  margin: 20px 0;
}
.pay-type{
  display: flex;
  margin-bottom: 10px;
  li{
    text-align: center;
    margin-right: 20px;
    color: $el-font3;
    cursor: pointer;
    .icon-wrap{
      width: 140px;
      height: 70px;
      border: $el-border2;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 5px;
      >img{
        width: 40px;
      }
    }
  }
}
.bg-blue{
  background-color: $el-blue;
  border-color: $el-blue !important;
}
.pay-active{
  color: $el-font1;
}
.pay-code{
  margin-bottom: 20px;
  .el-input{
    width: 150px;
    margin: 0 20px;
  }
}
</style>