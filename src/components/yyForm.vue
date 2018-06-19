<!--二次封装表单自定义组件-->
<template>
  <div class="yyForm"  v-bind:style="{ width: formWidth, margin :formMarrgin}">
    <el-form :model="formData" ref="formData" status-icon :inline="inline" :inline-message="inline" :rules="yxyz" :size="size" :label-position="labelPosition" :label-width="labelWidth" class="demo-dynamic">
      <el-row :gutter="gutter">
        <el-col :span="12" v-if="col == 2">
          <pop-form v-for="(item, index) in formTitleData" :item="item" :key="index"
                    v-if="formData[item.name] !== undefined && index % 2 === 0" :value="formData[item.name]"  @input="(val,key) => { formData[item.name] = val; handleInput(val,key)}"></pop-form>
        </el-col>
        <el-col :span="12" v-if="col == 2">
          <pop-form v-for="(item, index) in formTitleData" :item="item" :key="index" v-if="formData[item.name] !== undefined && index % 2 !== 0" :value="formData[item.name]"  @input="(val,key) => { formData[item.name] = val; handleInput(val,key)}"></pop-form>
        </el-col>
        <el-col :span="24" v-if="col == 1">
          <pop-form v-for="(item, index) in formTitleData" :item="item" :key="index" v-if="formData[item.name] !== undefined" :value="formData[item.name]" @input="(val,key) => { formData[item.name] = val; handleInput(val,key)}"></pop-form>
        </el-col>
      </el-row>
      <div v-bind:style="{ textAlign: buttonAlign}">
        <el-button v-bind:style="{ width: buttonWidth}" v-if="button.confirm"  :type="buttonProperty.confirm.type" :icon="buttonProperty.confirm.icon" :round="buttonProperty.confirm.round" :plain="buttonProperty.confirm.plain" :circle="buttonProperty.confirm.circle" @click="submitForm()">{{buttonProperty.confirm.text}}</el-button>
        <el-button v-bind:style="{ width: buttonWidth}" v-if="button.add" :type="buttonProperty.add.type" :icon="buttonProperty.add.icon" :round="buttonProperty.add.round" :plain="buttonProperty.add.plain" :circle="buttonProperty.add.circle" @click="clickAdd()">{{buttonProperty.add.text}}</el-button>
        <el-button v-bind:style="{ width: buttonWidth}" v-if="button.edit" :type="buttonProperty.edit.type" :icon="buttonProperty.edit.icon" :round="buttonProperty.edit.round" :plain="buttonProperty.edit.plain" :circle="buttonProperty.edit.circle" @click="clickEdit()">{{buttonProperty.edit.text}}</el-button>
        <el-button v-bind:style="{ width: buttonWidth}" v-if="button.close" :type="buttonProperty.close.type" :icon="buttonProperty.close.icon" :round="buttonProperty.close.round" :plain="buttonProperty.close.plain" :circle="buttonProperty.close.circle" @click="clickClose()">{{buttonProperty.close.text}}</el-button>
        <el-button v-bind:style="{ width: buttonWidth}" v-if="button.rest" :type="buttonProperty.rest.type" :icon="buttonProperty.rest.icon" :round="buttonProperty.rest.round" :plain="buttonProperty.rest.plain" :circle="buttonProperty.rest.circle" @click="restForm()">{{buttonProperty.rest.text}}</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
/*
  v-model绑定的是表单的data 必穿
  :formTitle 定义表单数据必穿
  :button 定义表单按钮必传 {confirm: true, add: true, edit: true, close: true, rest: true}
  :buttonProperty 表单按钮自定义选填 {confirm: {type: 'primary', icon: '', round: false, circle: false, plain: false, txet: '确定'}, add: {type: 'primary', icon: '', round: false, circle: false, plain: false, text: '确定'}, edit: {type: 'primary', icon: '', round: false, circle: false, plain: false, text: '确定'}, close: {type: 'primary', icon: '', round: false, circle: false, plain: false, text: '确定'}, rest: {type: '', icon: '', round: false, circle: false, plain: false, text: '重置'}}
  :rules 验证规则  element ui相同写法
  @confirm  @edit @add @close @rest对应每个按钮事件 ， 其中 confirm 是确定按钮返回值为一个对象{state: 布尔值, data: 和v-model相同} ，rest会重置表单并且会返回v-model相同的值给调用的方法
  labelPosition 传入String类型 label对其方式  center  left  right
  labelWidth  传入String类型   label宽度
  size 表单大小类型 传入String
  col 传入1或者2 1列或者2列
  inline element ui的 传入布尔值 石否为块级显示
  gutter 左右布局的间距 默认20
  formWidth 表单宽度 默认100%
  buttonWidth 按钮宽度默认auto
  formMarrgin 表单marggin原生属性默认 auto
*/
// import rulesMain from '../validationRules/main'
export default {
  name: 'yyForm',
  props: {
    value: {
      type: [Array, Object],
      required: true,
      default: () => { return {} }
    },
    formTitle: {
      type: [Array, Object],
      required: true,
      default: () => { return {} }
    },
    button: {
      type: [Array, Object],
      required: true,
      default: () => { return {confirm: false, add: false, edit: false, close: false, rest: false} }
    },
    buttonProperty: {
      type: [Array, Object],
      default: () => { return {confirm: {type: 'primary', icon: '', round: false, circle: false, plain: false, text: '提交'}, add: {type: 'primary', icon: '', round: false, circle: false, plain: false, text: '提交'}, edit: {type: 'primary', icon: '', round: false, circle: false, plain: false, text: '编辑'}, close: {type: 'primary', icon: '', round: false, circle: false, plain: false, text: '关闭'}, rest: {type: '', icon: '', round: false, circle: false, plain: false, text: '重置'}} }
    },
    rules: {
      type: [Array, Object],
      default: () => { return {} }
    },
    labelPosition: {
      type: String,
      default: 'left'
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    size: {
      type: String,
      default: 'small'
    },
    col: {
      type: [String, Number],
      default: 1
    },
    gutter: {
      type: Number,
      default: 20
    },
    inline: {
      type: Boolean,
      default: false
    },
    formWidth: {
      type: String,
      default: '100%'
    },
    buttonWidth: {
      type: String,
      default: 'auto'
    },
    buttonAlign: {
      type: String,
      default: 'center'
    },
    formMarrgin: {
      type: String,
      default: 'auto'
    }
  },
  components: {
  },
  data () {
    return {
      yxyz: this.rules,
      formData: {},
      formTitleData: []
    }
  },
  computed: {
  },
  created () {
    this.formTitleData = this.formTitle
    this.getValue()
  },
  mounted () {
  },
  methods: {
    handleInput (val, key) {
      this.setValue({ ...this.formData, [key]: val })
    },
    submitForm () {
      let formName = 'formData'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submit', {state: true, data: this.formData})
        } else {
          this.$emit('submit', {state: false, data: this.formData})
          return false
        }
      })
    },
    restForm () {
      this.$refs['formData'].resetFields()
      this.$emit('rest', this.formData)
    },
    setValue (val) {
      this.$emit('input', val)
    },
    getValue () {
      Object.assign(this.formData, this.value)
    },
    clickConfirm () { this.$emit('confirm', this.formData) },
    clickEdit () { this.$emit('edit', this.formData) },
    clickAdd () {
      let formName = 'formData'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('add', {state: true, data: this.formData})
        } else {
          this.$emit('add', {state: false, data: this.formData})
          return false
        }
      })
    },
    clickClose () { this.$emit('close', this.formData) }
  },
  watch: {
    watch: {
      value: {
        handler (cval, oval) {
          this.getValue()
        },
        deep: true
      }
    }
  }
}
</script>

<style>
  .yyForm{
    height: 100%;
    width: 100%;
    /*background: #fff;*/
  }
</style>
