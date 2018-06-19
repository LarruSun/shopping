<template>
<div class="contain">
	<div class="merchant-info">
	<div class="common-title">
	  <div>
	    <img src="@/assets/images/message.png" alt="">
	    <span>设置</span>
	    <i class="el-icon-arrow-right"></i>
	    <span class="active-title">出品打印机</span>
	  </div>
	</div>
	<div class="form-contain">
	<el-form :model="formData" :rules="rules" ref="ruleForm" label-position="left" label-width="120px">
		<el-form-item label="厂商 :">{{formData.factury}}</el-form-item>
		<el-form-item label="编号(SN) :">{{formData.SNcode}}</el-form-item>
		<el-form-item label="密钥(KEY) :"></el-form-item>
		<el-form-item label="打印机名称 :" prop="printName">
			<el-input v-model="formData.printName"></el-input>
		</el-form-item>
		<el-form-item label="打印类型 :" prop="printType">
			<el-radio v-model="formData.printType" label="订单打印">订单打印</el-radio>
		</el-form-item>
		<el-form-item label="打印份数 :" prop="printNum">
			<el-radio v-model="formData.printNum" label="1">1份</el-radio>
			<el-radio v-model="formData.printNum" label="2">2份</el-radio>
			<el-radio v-model="formData.printNum" label="3">3份</el-radio>
		</el-form-item>
		<el-form-item>
			<el-button @click="submitForm('ruleForm')" style="margin-right:50px">确定</el-button>
			<el-button @click="$router.back()">返回</el-button>
		</el-form-item>
	</el-form>
	</div>
	</div>
 </div>
</template>

<script>
	export default{
		data(){
			return {
				formData:{printNum:"1",printType:'订单打印'},
				radio:1,
				rules:{//表单验证规则
		          printName: [
		            { type: 'string',required: true, message: '请输入打印机名称', trigger: 'blur' }
		          ],
		          printType: [
		            { type: 'string',required: true, message: '请选择打印类型', trigger: 'change' },
		          ],
		          printNum: [
		            { type: 'string',required: true, message: '请选择打印份数', trigger: 'change' }
		          ]
		      }
			}
		},
		created(){
    		this.$observer.$on('pass-tableData',(data)=>{
    			Object.assign(this.formData,data)
    		})
		},
		methods:{
			submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            console.log(this.formData)
		            //做请求处理
		          } else {
		            return false;
		          }
		        })
	   		 }
		}
	}
</script>

<style>
	.contain{
	  border-radius: 4px;
	  box-sizing: border-box;
	}
	.merchant-info{
	  background-color: #fff;
	  border-radius: 4px;
	}
	.el-input{
	    width:300px;
	  }
    .form-contain{
	  padding: 20px 30%;
	}
    .el-form-item{
		margin-top: 25px;
	}
</style>