<template>
<div class="contains">
 	 <yy-table :titleData="dataTitle" :data="tableData" :pageSize='pageCount' :height="tableHeight" :pageState="false" 
    	:button="{delete: true,test :true,set :true,stop :true}" 
    	@delete="handleDel" @test="handleTest" @set="handleSet" @stop="handleStop"></yy-table>
</div>
</template>

<script>
export default{
	data(){
		return {
			dataTitle:[{label:'商品',prop:'goods'},{label:'单价/数量',prop:'perPrice'},{label:'买家',prop:'buyer'},
  				{label:'支付/配送',prop:'pay'},{label:'价格',prop:'price'},{label:'下单时间',prop:'orderTime'},{label:'状态',prop:'status'}],
			tableData:[],
			tableHeight: window.innerHeight - 280,
			pageCount:20,
			params:{
				page:1,
				pageSize:20
			}
		}
	}
}
</script>

<style scoped>
.contains{
  background-color: #fff;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>