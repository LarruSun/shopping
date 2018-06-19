<template>
  <div class="contain">
    <div class="merchant-info">
      <el-form :model="formData" :rules="rules1" ref="formData" label-position="left" label-width="150px">
      	<el-form-item label="门店设置" style="margin-left:-10px;font-weight: bold;"></el-form-item>
        <el-form-item label="门店名称" prop='fullName'>
          <!-- <el-input v-model="formData.fullName" :disabled="!isSubmit"></el-input> -->
          <el-input v-model="formData.fullName"></el-input>
          <!--<p class="form-content">*只支持中国大陆工商局或市场监督管理局登记的企业。请填写工商营业执照上的企业全称</p>-->
        </el-form-item>
        <el-form-item label="店铺类别"  prop='type'>
        	 <el-select v-model="formData.type" placeholder="水果生鲜">
				    <el-option
				      v-for="item in formData.shopCategory"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value"
				      :disabled="item.disabled">
				    </el-option>
				  </el-select>
        </el-form-item>

        <el-form-item label="门店LOGO" prop='fileList'>
          <!-- <el-upload
					  class="upload-demo"
					  action="http://120.79.35.62:2018/index"
					  :on-change="handleChange"
					  :file-list="formData.fileList">
					  <el-button size="small" type="primary">点击上传</el-button>
					</el-upload> -->


          <el-upload
          action="http://120.79.35.62:2018/index"
          list-type="picture-card"
          :on-preview="lookImg"
          :before-upload="beforeUpload"
          :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>



        <el-form-item label="电话" prop='phone'>
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop='address'>
          <el-input v-model="formData.address"></el-input>
        </el-form-item>
      	<el-form-item label="库存报警" style="margin-left:-10px;font-weight: bold;" prop='radio'>
      		 <el-radio v-model="formData.radio" label="1">开启</el-radio>
 					 <el-radio v-model="formData.radio" label="2">关闭</el-radio>
      	</el-form-item>
      	<el-form-item label="商品低于库存" prop='invertNum'>
      		<el-input type="number" size="mini" style="width:100px;margin:0 20px" v-model="formData.invertNum"></el-input>% 报警
      	</el-form-item>
     
      <el-row type="flex" justify="center" align="middle">
        <el-button size="small" @click="submitForm('formData')"  type="primary" style="width:120px;margin:50px 0">保存</el-button>
      </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import filters from '@/utils/filters'
import inputUpload from '@/components/inputUpload'
import CONFIG from '@/utils/config'
export default {
  filters: filters,
  data(){
  	//自定义手机号验证规则
  	let validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } else if (!CONFIG.myReg.mobile.test(value)) {
          callback(new Error('请输入正确的格式!'));
        } else {
          callback();
        }
    };

    return{
      formData:{
        radio: "1",
        fullName:'',//名称
        type:[],
        phone:'',//电话号码
        address:'',//地址
        invertNum:'',//最低库存
        fileList:[],

      },
      
      dialogImageUrl: '',
      dialogVisible: false,

      rules1:{//表单验证规则
      	fullName: [
            {  type: 'string' ,required: true, message: '请输入门店名称', trigger: 'blur' },
          ],
          type: [
            { type: 'array', message: '请至少选择一个店铺类别', trigger: 'change' }
          ],
          fileList: [
            { type: 'array', required: true, message: '请上传门店LOGO', trigger: 'change' }
          ],
          phone: [
            { validator: validatePhone,required: true, trigger: 'blur' },
          ],
          address: [
            { type: 'string', required: true, message: '请输入地址', trigger: 'blur' }
          ],
          invertNum: [
            { required: true, message: '请输入最低库存量', trigger: 'blur' }
          ]
      }
    }
  },
  computed: {
  },
  created(){
    this.getMerchant();
  },
  // data(){
  //   return{
  //     formData:{},
  //     businessLicenseScanFile: '',
  //     businessLicenseScan: '',
  //     contactCardImgSrcFile: '',
  //     contactCardImgSrc: '',
  //     contactBackCardImgSrcFile: '',
  //     contactBackCardImgSrc: '',
  //     btnLoading: false,
  //     remark: '',

  //     dialogImageUrl: '',
  //     dialogVisible: false

  //   }
  // },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.formData)
            //做请求处理
          } else {
            return false;
          }
        })
    },
    getMerchant(){
    	//获取表单数据
      this.$http.post('web/userData/getUserVerifyInfo').then(res => {
        let data = res.data.data;
      })
    },
    // handleChange(){},
    beforeUpload(file){
      console.log(file);
      // return false;
    },
    handleRemove(file, fileList) {
        console.log(fileList);
    },
    lookImg(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    }
  },
}
</script>

<style scoped lang="scss">
@import '~@/assets/css/common';
.contain{
  border-radius: 4px;
  box-sizing: border-box;
}
.merchant-info{
  background-color: #fff;
  padding: 20px 40px;
  border-radius: 4px;
  .el-input,.el-select{
    width:300px;
  }
}
.title{
  padding-bottom: 15px;
  border-bottom: $el-border2;
}
.form-font{
  font-size: 14px;
  color: #606266;
  margin-bottom: -5px;
  text-align: center;
}
.form-content{
  line-height: initial;
  font-size: 13px;
  color: #666;
  margin-top: 10px;
}
.save-footer{
  margin-top: 20px;
}
.el-form-item{
		margin-top: 25px;
	}
</style>
