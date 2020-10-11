<template>
  <a-modal
    title="新建线索"
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
        <a-form-item label="电话">
          <a-input v-decorator="['phone', {rules: [{ required: true, pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '请输入正确的手机号码' }]}]" />
        </a-form-item>
        <a-form-item label="意向等级">
          <a-radio-group name="radioGroup" :default-value="1">
            <a-radio :value="1">A</a-radio>
            <a-radio :value="2">B</a-radio>
            <a-radio :value="3">C</a-radio>
            <a-radio :value="4">D</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="意向车型">
          <a-input v-decorator="['carType', {rules: [{ min: 3, message: '请输入3个以上的文字'}]}]" />
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
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

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
