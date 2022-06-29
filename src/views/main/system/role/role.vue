<template>
  <div class="role">
    <div class="search">
      <page-search
        :searchFormConfig="searchFormConfig"
        @queryBtnClick="queryBtnClick"
        @resetBtnClick="resetBtnClick"
      >
      </page-search>
    </div>

    <div class="content">
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        pageName="role"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      ></page-content>
    </div>

    <page-modal
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      :otherInfo="otherInfo"
      ref="pageModalRef"
      pageName="role"
    >
      <template #role>
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </template>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search/src/page-search.vue'
import pageContent from '@/components/page-content/src/pageContent.vue'
import pageModal from '@/components/page-modal/src/page-modal.vue'

import { searchFormConfig } from './config/config/search.config'
import { contentTableConfig } from './config/config/content.config'
import { modalConfig } from './config/config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { menuMapLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'
export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    pageContent,
    pageModal
  },
  setup() {
    const [pageContentRef, resetBtnClick, queryBtnClick] = usePageSearch()

    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)
    const otherInfo = ref({})

    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
      // console.log('otherInfo', otherInfo.value)
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallback)

    return {
      contentTableConfig,
      searchFormConfig,
      pageContentRef,
      resetBtnClick,
      queryBtnClick,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      modalConfig,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
