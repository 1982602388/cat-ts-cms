<!-- author: LJ -->
<!-- date: 2022-06-13 00:41:23 -->
<!-- description:  -->
<template>
  <div class="table">
    <div class="header">
      <slot name="title">
        <h2>{{ title }}</h2>
      </slot>
      <slot name="createUser">
        <el-button type="primary">新建用户</el-button>
      </slot>
    </div>
    <el-table :data="listData" border style="width: 100%" flexible>
      <!-- 最左边的选框 -->
      <el-table-column v-if="showSelect" type="selection" width="60">
      </el-table-column>
      <!-- 序列号 -->
      <el-table-column
        v-if="showIndex"
        type="index"
        label="序号"
        align="center"
        width="80"
      >
      </el-table-column>

      <template v-for="propItem in (propList as any[])" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <!-- scope.row相当于当前行的数据对象 -->
            <!-- :name="propItem.slotName"动态绑定插槽名 -->
            <slot :name="propItem.slotName" :dataRow="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
          <!-- 38集最后 -->
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          :currentPage="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'cc-table',
  props: {
    title: {
      type: String,
      default: ''
    },
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      required: true
    },
    propList: {
      type: Array,
      default: () => []
    },
    showSelect: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({
        currentPage: 0,
        pageSize: 10
      })
    }
  },
  emits: ['update:page'],
  setup(props, { emit }) {
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    return {
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.table {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
