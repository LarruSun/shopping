<template>
  <div class="contain">
    <div class="common-title">
      <div>
        <img src="@/assets/images/message.png" alt="">
        <span>设置</span>
        <i class="el-icon-arrow-right"></i>
        <span class="active-title">操作员</span>
      </div>
    </div>
   <el-row type="flex" justify="center" align="middle">
   	<el-col :span="4"> <el-button type="primary" icon="el-icon-plus" @click="$router.push('/setting/addPrinter')" style="margin:20px 0">新增</el-button></el-col>
   	<el-col :span="20" style="text-align:right">
   		<el-input placeholder="请输入姓名或手机号"></el-input>
   		<el-button type="primary" icon="el-icon-search">搜索</el-button>
   	</el-col>
   </el-row>
    <yy-table :titleData="dataTitle" :data="tableData" :pageSize='pageCount' :height="tableHeight" :pageState="true" @limit='limit'
    	:button="{delete: true,edit :true,stop :true}" 
    	@delete="handleDel" @edit="handleEdit" @stop="handleStop"></yy-table>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" top="15%" :close-on-click-modal="false">
		  <span>这是一段信息</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
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
      dataTitle:[{label:'操作员',prop:'operator'},{label:'手机号',prop:'phone'},{label:'状态',prop:'status'},
      {label:'微信绑定状态',prop:'wechatStatus'}],
			tableData:[{operator:'林冲',phone:'13928301111',status:'启用',wechatStatus:'未绑定'},{operator:'林冲',phone:'13928301111',status:'启用',wechatStatus:'未绑定'},{operator:'林冲',phone:'13928301111',status:'启用',wechatStatus:'未绑定'}],
			tableHeight: window.innerHeight - 280,
			pageCount:200,
			params:{
				page:1,
				pageSize:20
			},
			tableLoading:true,
			dialogTitle:'',
			dialogVisible:false,
			formData:[]
    }
  },
   created(){
    this.getList();
  },
  methods: {
    handleDel(){
    },
    handleEdit(row){
    	this.dialogVisible=true
    	this.dialogTitle="编辑"
    	this.formData=row
    },
    handleStop(){
    	this.dialogVisible=true
    	this.dialogTitle="停用"
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
    	this.dialogVisible=false
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
}
.el-input{
    width: 200px;
    margin: 0 20px;
 }
 .el-row{
 	padding:0 20px;
 }
</style>