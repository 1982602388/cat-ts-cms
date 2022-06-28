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
      <template #createUser>
        <el-button v-if="isCreate" type="primary" @click="handleNewClick">
          新建用户
        </el-button>
      </template>
      <template #status="scoped">
        <el-button plain :type="scoped.row.enable ? 'success' : 'danger'">
          {{ scoped.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>

      <template #createAt="scoped">
        <span>{{ proxy.$filters.formatTime(scoped.row.createAt) }}</span>
      </template>

      <template #updateAt="scoped">
        <span>{{ proxy.$filters.formatTime(scoped.row.updateAt) }}</span>
      </template>
      <template #handler="scoped">
        <div class="delete-btn">
          <el-button type="text" @click="handleEditClick(scoped.row)"
            ><el-icon><Edit /></el-icon>编辑</el-button
          >
          <el-button type="text" @click="handlerDeleteClick(scoped.row)"
            ><el-icon><DeleteFilled /></el-icon>删除</el-button
          >
        </div>
      </template>
      <template
        v-for="item in otherSlotName"
        :key="item.props"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </cc-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, getCurrentInstance } from 'vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'

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
  emits: ['newBtnClick', 'editBtnClick'],

  setup(props, { emit }) {
    const store = useStore()

    // 0.获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')
    // 分页的
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    //获取数据
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 拿到vuex中对应数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )

    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )
    // 拿到剩余插槽名称
    const otherSlotName = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )
    //删除数据操作
    const handlerDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    //解决全局注册方法的类型报错 any
    const { proxy } = getCurrentInstance() as any
    return {
      dataList,
      dataCount,
      pageInfo,
      getPageData,
      proxy,
      otherSlotName,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      handlerDeleteClick,
      handleNewClick,
      handleEditClick
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
