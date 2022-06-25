<!-- author: LJ -->
<!-- date: 2022-06-20 00:14:56 -->
<!-- description:  -->
<template>
  <div class="pageContent">
    <cc-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <template #status="scoped">
        <el-button plain :type="scoped.dataRow.enable ? 'success' : 'danger'">
          {{ scoped.dataRow.enable ? '启用' : '禁用' }}
        </el-button>
      </template>

      <template #createAt="scoped">
        <span>{{ proxy?.$filters.formatTime(scoped.dataRow.createAt) }}</span>
      </template>

      <template #updateAt="scoped">
        <span>{{ proxy?.$filters.formatTime(scoped.dataRow.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="delete-btn">
          <el-button type="text"
            ><el-icon><Edit /></el-icon>编辑</el-button
          >
          <el-button type="text"
            ><el-icon><DeleteFilled /></el-icon>删除</el-button
          >
        </div>
      </template>
    </cc-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, getCurrentInstance } from 'vue'
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

    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    watch(pageInfo, () => getPageData())
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )

    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )
    const { proxy } = getCurrentInstance() as any
    return {
      dataList,
      dataCount,
      pageInfo,
      getPageData,
      proxy
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
