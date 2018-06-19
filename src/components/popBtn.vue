<!--表格内台弹出框自定义组件-->
<template>
  <div class="popBtn">
    <el-button v-popover:popoverTable type="text" style="color: #909399;width: 100%">{{title}}</el-button>
    <!--弹窗,对tableTitle做 显示隐藏操作-->
    <!--<el-popover trigger="click" ref="popoverTable" placement="bottom" v-model="prpState">
      <div style="text-align: center; margin: 0;padding: 0px;">
        <el-checkbox :indeterminate="state" v-model="checkAll" @change="allChange" size="small" class="popBtn-chk" border>全部显示</el-checkbox>
        <el-checkbox-group v-model="tableTitleChk" size="small"  @change="citiesChange">
            <el-checkbox :label="item" :key="item.label" v-for="item in data" class="popBtn-chk" border>{{item.label}}</el-checkbox>
        </el-checkbox-group>
        <el-button type="" @click="chkData" class="popBtn-chk" size="small" plain style="text-align: center">确定</el-button>
      </div>
    </el-popover>-->
  </div>
</template>
<script>
export default {
  name: 'popBtn',
  props: {
    value: Array,
    data: Array,
    title: String
  },
  components: {
  },
  data () {
    return {
      checkAll: false,
      state: false,
      prpState: false,
      tableTitleChk: []
    }
  },
  computed: {
  },
  created () {
    this.tableTitleChk = this.value
  },
  mounted () {
    this.citiesChange(this.tableTitleChk)
  },
  methods: {
    allChange (val) {
      this.tableTitleChk = val ? this.data : []
      this.state = false
    },
    citiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.data.length
      this.state = checkedCount > 0 && checkedCount < this.data.length
    },
    chkData () {
      this.$emit('input', this.tableTitleChk)
      this.prpState = false
    }
  },
  watch: {
    value () {
      this.tableTitleChk = this.value
    }
  }
}
</script>

<style>
  .popBtn{
    vertical-align: middle;
    text-align: center;
    width: 100%;
  }
  /*.popBtn-chk{
    display: block;
    text-align: left;
    vertical-align: middle;
    width: 180px;
    margin: 6px auto !important;
    margin-right: 0px !important;
    font-weight: 200;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }*/
</style>
