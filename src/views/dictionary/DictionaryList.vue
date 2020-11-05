<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
      <a-popconfirm title="确定删除吗?" @confirm="handleDelete">
        <a-button v-if="selectedRowKeys.length > 0" type="delete" icon="minus">删除</a-button>
      </a-popconfirm>

    </div>
    <s-table
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :rowSelection="rowSelection"
      :showPagination="false"
    >
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)"><a-icon type="edit" /> 修改</a>
        </template>
      </span>
    </s-table>

    <dictionary-form
      ref="createModal"
      :visible="visible"
      :loading="confirmLoading"
      :model="mdl"
      @cancel="handleCancel"
      @ok="handleOk"
    />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getDictionaryList, addDictionaryType, updateDictionaryType, deleteDictionaryType } from '@/api/manage'
import DictionaryForm from './modules/DictionaryForm'

export default {
  name: 'DictionaryList',
  components: {
    STable,
    DictionaryForm
  },
  data () {
    const columns = [
      {
        title: '字典编号',
        dataIndex: 'code'
      },
      {
        title: '字典名称',
        dataIndex: 'name'
      },
      {
        title: '描述',
        dataIndex: 'description'
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '150px',
        scopedSlots: { customRender: 'action' }
      }
    ]
    return {
      columns,
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        return getDictionaryList(requestParameters)
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    handleAdd () {
      this.mdl = null
      this.visible = true
    },
    handleEdit (record) {
      this.visible = true
      this.mdl = { ...record }
    },
    handleDelete () {
      let ids = ''
      for (const idKey of this.selectedRowKeys) {
        ids += idKey + ','
      }
      deleteDictionaryType({ ids: ids }).then(res => {
        this.selectedRowKeys = []
        this.$refs.table.refresh()
        this.$message.info(res.message)
      })
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          if (values.id > 0) {
            // 修改
            updateDictionaryType(values).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info(res.message)
            })
          } else {
            // 新增
            values.id = 0
            addDictionaryType(values).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info(res.message)
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
