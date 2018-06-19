<template>
  <div class="contain">
		<div class="common-title">
			<div>
				<img src="@/assets/images/message.png" alt="">
				<span>设置</span>
				<i class="el-icon-arrow-right"></i>
				<span class="active-title">退换货地址</span>
			</div>
		</div>

		<div style="margin:50px 0">
			<el-form label-width="150px" label-position="right" >
				<el-form-item label="是否开启外卖服务">
					<el-radio v-model="isTakeOutFood " label="yes">是</el-radio>
					<el-radio v-model="isTakeOutFood" label="no">否</el-radio>
				</el-form-item>
			</el-form>
		</div>


		<div class="merchant-info">
			 <el-radio-group v-model="address" style="margin:20px 0">
				<el-radio :label="1">跟门店地址一致</el-radio>
 			  	<el-radio :label="2">自定义</el-radio>
			</el-radio-group>
			<div class="userDefined" v-if="address=='2'">
				<el-form :model="personInfo" label-width="80px" label-position="left" :rules='personInfoRules' ref="personInfo">
					<el-form-item label="收件人" prop='recerver'>
						<el-input size="mini" v-model="personInfo.recerver"></el-input>
					</el-form-item>
					<el-form-item label="电话" prop='phone'>
						<el-input size="mini" v-model="personInfo.phone"></el-input>
					</el-form-item>
					<el-form-item label="地址" prop='address'>
						<el-input size="mini" v-model="personInfo.address"></el-input>
					</el-form-item>
				</el-form>
			</div>
		</div>
		
		<div class="distSet" v-show='isTakeOutFood=="yes"'>
			<h1 class="common-title" style="margin-bottom: 10px">外卖设置</h1>
			<el-form :model="distSetForm" :rules='distSetFormRules' ref="distSetForm" label-width="180px" label-position="left">
				<el-form-item label="配送方式">
					<el-checkbox-group v-model="checkList">
					<el-checkbox label="第三方配送"></el-checkbox>
					<el-checkbox  label="自营配送"></el-checkbox>
				</el-checkbox-group>
				</el-form-item>
				<el-form-item label="接单方式">
					<el-checkbox label="微信公众号"></el-checkbox>
					<el-checkbox label="打印机"></el-checkbox>
				</el-form-item>
				<el-form-item label="是否自动接单">
					<el-radio v-model="isOK" label="yes">是</el-radio>
					<el-radio v-model="isOK" label="no">否</el-radio>
				</el-form-item>
				<el-form-item label="自动接单默认配送方式">
					<el-select v-model="selectValue" size="small">
						<el-option value=''>请选择</el-option>
					</el-select>
					<!--<span>(接单后目前不支持自营改第三方配送)</span>-->
				</el-form-item>
				<el-row style="margin-top:30px">
					<el-col :span="3">
						<el-form-item label="配送时长:" label-width="100" prop='distributionTime' status-icon>
							<el-input type='number' size="small" style="width:100px" v-model="distSetForm.distributionTime"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-form-item label="起步价:" label-width="100" prop='startPrice'>
							<el-input type='number' v-model="distSetForm.startPrice" size="small" style="width:100px;margin-left:15px"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="18"></el-col>
				</el-row>
				<el-row>
					<el-col :span="3">
						<el-form-item label="配送费:" label-width="100" prop='distributionPrice'>
							<el-input type='number' size="small" style="width:100px;margin-left:15px" v-model="distSetForm.distributionPrice"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-form-item label="配送范围:" label-width="100" prop='distributionDistance'>
							<el-input type='number' size="small" style="width:100px;margin-right:10px" v-model="distSetForm.distributionDistance"></el-input>米
						</el-form-item>
					</el-col>
					<el-col :span="18" style="line-height:40px;color:#666"><!--如用户从配送范围内下单将采用默认配送方式--></el-col>
				</el-row>
			</el-form>

			<div id="container" style="height:500px;margin-top:50px;" ></div>
		</div>


		<el-row type="flex" justify="center" align="middle">
			<el-button size="small" @click="checkMessage('distSetForm','personInfo')"  type="primary" style="width:120px;margin:50px 0">保存</el-button>
		</el-row>




  </div>
</template>

<script>


import AMap from 'AMap'


export default {
	data(){
		var vRecerver = (rule, value, callback)=>{
			if(!value){
				callback(new Error("收件人不能为空"));
			}else{
				callback();
			}	
		};
		var vPhone = (rule, value, callback)=>{
			var myReg={
				mobile:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}|(17[0-9]{1})))+\d{8})$/,
			};
			if(!myReg.mobile.test(value)){//手机号码不正确
				callback(new Error("请输入正确的手机格式"));
			}else{
				callback();
			}	
		};
		var vAddress = (rule, value, callback)=>{
			 if(!value){
				callback(new Error("地址不能为空"));
			}else{
				callback();
			}	
		};
		//下方验证
		var vDTime = (rule, value, callback)=>{
			if(value<0){
				callback(new Error("配送时长不能小于零"));
			}else if(value==''){
				callback(new Error("配送时长不能为空"));
			}else{
				callback();
			}	
		};
		var StartPrice = (rule, value, callback)=>{
			if(value<0){
				callback(new Error("起步价长不能小于零"));
			}else if(value==''){
				callback(new Error("起步价长不能为空"));
			}else{
				callback();
			}	
		};
		var vDPrice = (rule, value, callback)=>{
			if(value<0){
				callback(new Error("配送费长不能小于零"));
			}else if(value==''){
				callback(new Error("配送费长不能为空"));
			}else{
				callback();
			}	
		};
		var vDistance = (rule, value, callback)=>{
			if(value<0){
				callback(new Error("配送范围长不能小于零"));
			}else if(value==''){
				callback(new Error("配送范围长不能为空"));
			}else{
				callback();
			}	
		};
		return {
			address:1,//是否跟随门店一致
			geMap:{},
			locationM:113.957765,
			locationO:22.577936,

			isTakeOutFood:'yes',
			//最顶部数据
			personInfo:{
				recerver:'',//收件人
				phone:'',//电话
				address:''//地址
			},
			//下方数据
			distSetForm:{
				distributionTime:'',//配送时长
				startPrice:'',//起步价
				distributionPrice:'',//配送费
				distributionDistance:1000,//配送距离
			},

			//最顶部表单验证规则
			personInfoRules:{
                recerver: [{validator:vRecerver}],
                phone: [{validator:vPhone}],
                address: [{validator:vAddress}],
			},
			//下方数据表单验证规则
			distSetFormRules:{
                distributionTime: [{validator:vDTime}],
                startPrice: [{validator:StartPrice}],
                distributionPrice: [{validator:vDPrice}],
                distributionDistance: [{validator:vDistance}],
			},
			checkList:['第三方配送'],//第三方配送
			isOK:"yes",//是否自动接单
			selectValue:'',//自动接单默认配送方式的选择
		}
	},
	created(){
	},
	methods: {
		mapDw(){//根据IP定位
			var _this=this;
			AMap.plugin('AMap.Geolocation', function() {
				var geolocation = new AMap.Geolocation({
					// 是否使用高精度定位，默认：true
					enableHighAccuracy: true,
					// 设置定位超时时间，默认：无穷大
					timeout: 10000,
					// 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
					buttonOffset: new AMap.Pixel(10, 20),
					//  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
					zoomToAccuracy: true,     
					//  定位按钮的排放位置,  RB表示右下
					buttonPosition: 'RB'
				})

				geolocation.getCurrentPosition()
				AMap.event.addListener(geolocation, 'complete', onComplete)
				AMap.event.addListener(geolocation, 'error', onError)
				
				function onComplete (data) {
					console.log(data);
					_this.locationM=data.position.M
					_this.locationO=data.position.O
					_this.mapInit();
					// data是具体的定位信息
				}

				function onError (data) {
					// 定位出错
				}
			})
		},
		addToJE(){//地址转换成经纬度
			var _this=this;
			AMap.plugin('AMap.Geocoder', function() {
			var geocoder = new AMap.Geocoder({
				// city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
				city: '全国'
			})

			geocoder.getLocation('北京市海淀区苏州街', function(status, result) {
				if (status === 'complete' && result.info === 'OK') {
				// result中对应详细地理坐标信息
				console.log(result);
				}
			})
			})
		},

		jeToAdd(){//经纬度转换成地址
			var _this=this;
			AMap.plugin('AMap.Geocoder', function() {
			var geocoder = new AMap.Geocoder({
				// city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
				city: '全国'
			})
			
			var lnglat = [116.396574, 39.992706]

			geocoder.getAddress(lnglat, function(status, result) {
				if (status === 'complete' && result.info === 'OK') {
					// result为对应的地理位置详细信息
					console.log(result);
				}
			})
			})
		},

		//初始化地图
		mapInit(){
			var map=this.geMap;

			map = new AMap.Map('container', {
				center: [this.locationM, this.locationO],//中心坐标点
				resizeEnable: true,
				zoom: 14,//级别
				// resizeEnable: true
			});
			AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
				map.addControl(new AMap.ToolBar());
				map.addControl(new AMap.Scale())
			});

			//标志点
			var marker = new AMap.Marker({
				position: new AMap.LngLat(this.locationM, this.locationO),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
				// title: '北京'
			});
			// 将创建的点标记添加到已有的地图实例：
			map.add(marker);
			this.addToJE();
			this.jeToAdd();

			

	

			//添加圆心
			var circle = new AMap.Circle({
				center: new AMap.LngLat(this.locationM,this.locationO),// 圆心位置
				radius: this.distSetForm.distributionDistance, //半径

				fillColor: 'red',   // 圆形填充颜色
				strokeColor: '#fff', // 描边颜色
				strokeWeight: 2, // 描边宽度
				//strokeOpacity: 0.2, //线透明度
				fillOpacity: 0.2//填充透明度
			});
			map.add(circle);


			// var lineArr = [
			// 		[116.368904, 39.913423],
			// 		[116.382122, 39.901176],
			// 		[116.387271, 39.912501],
			// 		[116.398258, 39.904600]
			// ];






		},

		checkMessage(formName1,formName2) {
			//开启外卖
			if(this.isTakeOutFood=='yes'){
				var flag=[false,false]
				if(this.address==2){//开启自定义
					console.log('开外卖，开自定义');
					//头部表单验证
					this.$refs[formName2].validate((valid) => {
						if (valid) {
							flag[0]=true;
						} else {
							// alert('error submit!!');
							return false;
						}
					});
					//下方数据表单验证
					this.$refs[formName1].validate((valid) => {
						if (valid) {
							flag[1]=true;
						} else {
							// alert('error submit!!');
							return false;
						}
					});
					if(flag[0]==true && flag[1]==true){
						alert('提交')
					}else{
						alert('请把信息填写完整')
					}
					
				}else{//不开启自定义
					this.$refs[formName1].validate((valid) => {
						if (valid) {
							alert('submit!');
						} else {
							alert('error submit!!');
							return false;
						}
					});

				}
			}
			//不开外卖
			else{
				if(this.address==2){//开启自定义
					//头部表单验证
					this.$refs[formName2].validate((valid) => {
						if (valid) {
							alert('submit!');
						} else {
							alert('error submit!!');
							return false;
						}
					});
				}else{//不开启自定义
					alert('submit!');
				}
			}
      	},
	},
	mounted() {
      this.mapDw()//定位后实例化地图
	},
	watch:{
		['distSetForm.distributionDistance'](){
			this.mapInit();
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
.merchant-info{
  background-color: #fff;
  padding: 0 40px 20px;
  border-radius: 4px;
  .el-input{
    width:300px;
  }
	.btn-item{
		margin: 20px 0;
	}
}
.distSet{
	margin-top: 30px;
	margin-left: 40px;
	h1{
		font-size:16px;
	}
}
</style>
