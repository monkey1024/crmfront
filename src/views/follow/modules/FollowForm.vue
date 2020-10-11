<template>
  <a-modal
    title="跟踪记录"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>
        <a-form-item label="客户名">
          <a-input v-decorator="['name', {rules: [{required: true, message: '请输入客户姓名'}]}]" />
        </a-form-item>
        <a-form-item label="跟踪内容">
          <a-textarea v-decorator="['content', {rules: [{required: true, message: '请输入跟踪内容'}]}]" :rows="4" />
        </a-form-item>
        <a-form-item label="跟踪人">
          <a-select
            mode="follow"
            style="width: 100%"
            placeholder="请选择跟踪人">
            <a-select-option>
              张三
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="跟踪日期">
          <a-date-picker :defaultValue="getCurrentData()" style="width: 100%" placeholder="请输入日期"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import moment from 'moment'
// 表单字段
const fields = ['description', 'id']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    getCurrentData () {
      return moment(new Date().toLocaleDateString(), 'yyyy-MM-dd')
    }
  },
  created () {
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  }
}
</script>
