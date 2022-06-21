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

      <template v-for="propItem in propList" :key="propItem.prop">
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
          v-model:currentPage="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'cc-table',
  props: {
    title: {
      type: String,
      default: ''
    },
    listData: {
      type: Array,
      default: () => [],
      required: true
    },
    propList: {
      type: Array,
      default: () => [],
      required: true
    },
    showSelect: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const currentPage1 = ref(5)
    const currentPage2 = ref(5)
    const currentPage3 = ref(5)
    const currentPage4 = ref(4)
    const pageSize2 = ref(100)
    const pageSize3 = ref(100)
    const pageSize4 = ref(100)
    const small = ref(false)
    const background = ref(false)
    const disabled = ref(false)

    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
    }
    return {
      currentPage1,
      currentPage2,
      currentPage3,
      currentPage4,
      pageSize2,
      pageSize3,
      pageSize4,
      small,
      background,
      disabled,
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
