<!-- author: LJ -->
<!-- date: 2022-06-20 00:14:56 -->
<!-- description:  -->
<template>
  <div class="pageContent">
    <cc-table :listData="dataList" v-bind="contentTableConfig">
      <template #status="scoped">
        <el-button
          plain
          size="mini"
          :type="scoped.dataRow.enable ? 'success' : 'danger'"
        >
          {{ scoped.dataRow.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scoped">
        <span>{{ $filters.formatTime(scoped.dataRow.createAt) }}</span>
      </template>

      <template #updateAt="scoped">
        <span>{{ $filters.formatTime(scoped.dataRow.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="delete-btn">
          <el-button type="text" size="mini"
            ><el-icon><Edit /></el-icon>编辑</el-button
          >
          <el-button type="text" size="mini"
            ><el-icon><DeleteFilled /></el-icon>删除</el-button
          >
        </div>
      </template>
    </cc-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import ccTable from '@/base-ui/table/src/table.vue'
export default defineComponent({
  name: 'pageContent',
  components: {
    ccTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )

    // const userCount = computed(() => store.state.system.usersCount)
    return {
      dataList
    }
  }
})
</script>

<style scoped lang="less">
.delete-btn {
  display: flex;
  justify-content: center;
}
</style>
