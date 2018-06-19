<!--二次封装表格自定义组件-->
<template>
  <div class="yyTable">
    <el-table :ref="type" :height="height" :resizable="editSize" border :data="tableData" tooltip-effect="dark" style="box-sizing: border-box;" 
    	@selection-change="tableChk" class="table">
      <el-table-column type="selection" width="55" v-if="checkbox"></el-table-column>
      <el-table-column width="70" :label="tableIndex" type="index" header-align="center" align="center" v-if="tableIndex"></el-table-column>
      <el-table-column v-for="item in tableTitleChk" :key="item.label" :label="item.label"  :width='item.width' :prop="item.prop" align='center'>
        <template slot-scope="scope">
          <span>{{filterText(scope.row[item.prop], item.prop)}}</span>
        </template>
      </el-table-column>
      <!--创建操作栏按钮-->
      <el-table-column label="操作" :render-header="renderHeader" :width="width"  align="center" v-if="editColumn && editState">
        <template slot-scope="scope">
          <el-button size="small" :type="item.type === undefined ? 'info' : item.type"  :plain="item.plain === undefined ? false : item.plain" :round="item.round === undefined ? false : item.round" :icon="item.icon === undefined ? '' : item.icon" @click="btnClick(item.btnType, scope.row)" :disabled="item.disabled === undefined ? false : item.disabled" v-for="(item,index) in btnCustom" :key="index">{{item.text === undefined ? '编辑' : item.text}}</el-button>
          <el-button size="small" type="warning" @click="test(scope.row)" v-if="button.test">{{buttonText.test}}</el-button>
          <el-button size="small" type="primary" @click="add(scope.row)" v-if="button.add">{{buttonText.add}}</el-button>
          <el-button size="small" type="warning" @click="edit(scope.row)" v-if="button.edit">{{buttonText.edit}}</el-button>
          <el-button size="small" type="danger" @click="del(scope.row)" v-if="button.delete">{{buttonText.delete}}</el-button>
          <el-button size="small" type="primary" @click="set(scope.row)" v-if="button.set">{{buttonText.set}}</el-button>
          <el-button size="small" type="danger" @click="stop(scope.row)" v-if="button.stop">{{buttonText.stop}}</el-button>
          <el-button size="small" type="danger" @click="send(scope.row)" v-if="button.send">{{buttonText.send}}</el-button>
          <el-button size="small" type="danger" @click="gain(scope.row)" v-if="button.gain">{{buttonText.gain}}</el-button>
          <el-button size="small" type="text" @click="isBtn(scope.row)" v-if="button.isBtn && scope.row[buttonText.prop] == buttonText.state">{{buttonText.isBtn}}</el-button>
          <el-button size="small" type="text" v-if="button.isBtnNone && scope.row[buttonText.prop] != buttonText.state" disabled>{{buttonText.isBtnNone}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: left;height: 60px;padding-top: 12px;box-sizing: border-box;" v-if="pageState">
      <el-pagination
        @current-change="loadMore"
        :current-page.sync="page.index"
        :pager-count="7"
        :small="pageSmall"
        :page-size="page.size"
        :layout="page.layout"
        :total="page.total">
      </el-pagination>
      </div>
  </div>
</template>
<script>
/*
  传入 button 对象类型参数有 {delete: true, add: true, edit: true, test: true} 必传
  传入 buttonText 对象类型参数有 {delete: '删除', add: '增加', edit: '编辑', test: '查看'} 可选
  传入 titleData 对象类型参数有 表头对象数组 必传
  传入 data 表格data数据 必传
  传入 filter 表格过滤数据 可选 务必对象类型
  传入 tableIndex 表格索引序号 可选默认不显示 传入String索引的表头名称
  传入 operation 表格操作列的宽度 可选默认120
  传入 editSize 表格边框可拖动宽度 可选  默认无
  传入 type 表格ref类型 可选  默认无
  传入 pageSize 总长度 必穿
  传入 pageIndex 当前页 默认1
  传入 checkbox  是否多选框 默认无
  传入 pageSmall  小分页 默认大
  传入 editColumn  是否支持自定义显示列 默认支持
  事件
  操作按钮事件delete edit test add 接收一个参数 表格行的数据
  表格已经选中的事件 多选框  selectData  接收一个参数  已经选择表格的参数
  每页显示数据多少个改变 limit 接受一个参数
  当前页改变 index 接收一个参数
*/
export default {
  name: 'yyTable',
  props: {
    button: {
      type: [Array, Object],
      default: () => { return {delete: false, add: false, edit: false, test: false, set: false, isBtn: false, isBtnNone: false,send:false,gain:false} }
    },
    btnCustom: {
      type: [Array, Object],
      default: () => { return [] }
    },
    buttonType: {
      type: [Array, Object],
      default: () => { return {} }
    },
    titleData: {
      type: [Array, Object],
      required: true,
      default: () => { return [] }
    },
    data: {
      type: [Array, Object],
      required: true,
      default: () => { return [] }
    },
    buttonText: {
      type: [Array, Object],
      default: () => { return {delete: '删除', add: '增加', edit: '编辑', test: '测试', set: '设置', 
      isBtn: '成立', isBtnNone: '是否成立', stop: '停用', prop: '验证某个对象的值',send:'发货',gain:'确认收货'} }
    },
    filter: {
      type: [Array, Object],
      default: () => { return {} }
    },
    checkbox: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: undefined
    },
    tableIndex: {
      type: [String, Boolean],
      default: false
    },
    operation: {
      type: [Number, String],
      default: 0
    },
    editSize: {
      type: Boolean,
      default: false
    },
    editState: {
      type: Boolean,
      default: true
    },
    editColumn: {
      type: Boolean,
      default: true
    },
    pageSmall: {
      type: Boolean,
      default: false
    },
    pageState: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: ''
    },
    pageSize: {
      type: Number,
      default: 0
    },
    pageIndex: {
      type: Number,
      default: 1
    }
  },
  components: {
  },
  data () {
    return {
      page: {
        total: this.pageSize,
        size: this.$store.getters.size,
        index: this.pageIndex,
        layout: this.$store.state.layout
      },
      tableTitleChk: [],
      tableTitle: [],
      tableData: [],
      width: 160
    }
  },
  computed: {
  },
  created () {
    this.tableTitleChk = this.titleData
    this.tableTitle = this.titleData
    this.tableData = this.data
    this.buttonComp()
  },
  mounted () {
  },
  methods: {
    timeAll (val) {
      if (val !== null && val !== undefined) {
        var date = new Date(val)
        var seperator1 = '-'
        var month = date.getMonth() + 1
        var strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        return currentdate
      } else {
        return ''
      }
    },
    filterText (val, name) {
      if (this.filter[name] === undefined) {
        return val
      } else {
        return this.filter[name](val)
      }
    },
    buttonComp () {
      let num = 0
      if (this.button.edit) num++
      if (this.button.add) num++
      if (this.button.test) num++
      if (this.button.delete) num++
      if (this.button.set) num++
      if (this.button.stop) num++
      if (this.button.send) num++
      if (this.button.gain) num++
      if (this.button.isBtn || this.button.isBtnNone) num++
      num = num + this.btnCustom.length
      num = num * 90
      if (this.operation === 0) {
        this.width = num
      } else {
        this.width = this.operation
      }
    },
     renderHeader (createElement, data) {
      let self = this
      return createElement(
        'pop-btn',
        {
          props: {
            value: self.tableTitleChk,
            data: self.tableTitle,
            title: data.column.label
          },
          on: {
            input: (a) => {
              self.tableTitleChk = a
            }
          }
        }, ''
      )
    },
    set (a) {
      this.$emit('set', a)
    },
    isBtn (a) {
      this.$emit('isBtn', a)
    },
    test (a) {
      this.$emit('test', a)
    },
    add (a) {
      this.$emit('add', a)
    },
    stop (a) {
      this.$emit('stop', a)
    },
    send (a) {
      this.$emit('send', a)
    },
    gain (a) {
      this.$emit('gain', a)
    },
    del (a) {
      // console.log(123);
      this.$confirm('此操作将进行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete', a)
      }).catch(() => {
      })
    },
    edit (a) {
      this.$emit('edit', a)
    },
    tableChk (a) {
      this.$emit('selectData', a)
    },
    btnClick (a, b) {
      this.$emit('btnClick', {type: a, data: b})
    },
    sizeG (a) {
      this.page.size = a
      this.$emit('limit', {limit: a, index: this.page.index})
    },
    loadMore (a) {
      this.$emit('limit', {limit: this.page.size, index: a})
    }
  },
  watch: {
    data () {
      this.tableData = this.data
    },
    titleData () {
      this.tableTitle = this.titleData
    },
    pageSize () {
      this.page.total = this.pageSize
    }
  }
}
</script>

<style>
  .yyTable{
    height: 100%;
    width: 100%;
    position: relative;
    color:#666;
    font-size:14px;
  }
  .el-table th > .cell {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .el-table th{
  	background:#f7f7f7;
  }
</style>