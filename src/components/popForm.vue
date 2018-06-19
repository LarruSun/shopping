<!--表格内台弹出框自定义组件-->
<template>
  <el-form-item :label="item.label" :prop="item.prop">
    <el-input v-bind="$attrs" v-on="$listeners" v-if="item.type === 'input'" :placeholder="item.placeholder" :disabled="item.disabled === undefined ? false : item.disabled"></el-input>
    <el-input v-bind="$attrs" v-on="$listeners" v-else-if="item.type === 'textarea'" type="textarea"  :resize="item.resize === undefined ? 'none' : item.resize" :placeholder="item.placeholder" :rows="item.rows === undefined ? 2 : item.rows" :maxlength="item.maxlength === undefined ? 500 : item.maxlength"></el-input>
    <el-checkbox-group v-bind="$attrs" v-on="$listeners" v-if="item.type === 'checkbox'">
      <el-checkbox :label="i[item.dataLabel]" v-for="i in item.data" :key="i[item.dataLabel]" v-if="item.dataLabel !== undefined">{{i[item.dataName]}}</el-checkbox>
      <el-checkbox :label="i" v-for="i in item.data" :key="i[item.dataLabel]" v-if="item.dataLabel === undefined">{{i[item.dataName]}}</el-checkbox>
    </el-checkbox-group>
    <el-radio-group v-bind="$attrs" v-on="$listeners" v-else-if="item.type === 'radio'">
      <el-radio :label="i[item.key === undefined ? 'id' : item.key]" v-for="(i,dataIndex) in item.data" :key="dataIndex">{{i[item.dataLabel]}}</el-radio>
    </el-radio-group>
    <el-select v-bind="$attrs" v-on="$listeners" :placeholder="item.placeholder" :filterable="item.filterable" v-else-if="item.type === 'select' && item.dataLabel !== undefined" style="width: 100%">
      <el-option :label="i[item.dataName]" :value="i[item.dataLabel]" v-for="i in item.data" :key="i[item.dataName]" :clearable="true"></el-option>
    </el-select>
    <el-select v-bind="$attrs" v-on="$listeners" :placeholder="item.placeholder" :filterable="item.filterable" v-else-if="item.type === 'select' && item.dataLabel === undefined" :value-key="item.dataKey"  style="width: 100%">
      <el-option :label="i[item.dataName]" :value="i" v-for="i in item.data" :key="i[item.dataKey]" :clearable="true"></el-option>
    </el-select>
    <el-date-picker v-else-if="item.type === 'dateTime'" v-bind="$attrs" v-on="$listeners" :editable="false" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" align="right"
                    :placeholder="item.placeholder" style="width: 100%">
    </el-date-picker>
    <el-date-picker v-else-if="item.type === 'date'" v-bind="$attrs"  v-on="$listeners" :editable="false" format="yyyy-MM-dd" value-format="yyyy-MM-dd" align="right" type="date"
      :placeholder="item.placeholder"  style="width: 100%">
    </el-date-picker>
  </el-form-item>
</template>
<script>
export default {
  name: 'popForm',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      daterangeOpt: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  }
}
</script>
