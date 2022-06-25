<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="resetBtnClick"
      @queryBtnClick="queryBtnClick"
    />
    <div class="content">
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        pageName="users"
      ></page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import PageSearch from '@/components/page-search/src/page-search.vue'
import pageContent from '@/components/page-content/src/pageContent.vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    pageContent
  },
  setup(props) {
    const pageContentRef = ref<InstanceType<typeof pageContent>>()
    const resetBtnClick = () => {
      pageContentRef.value?.getPageData()
    }
    const queryBtnClick = (queryInfo: any) => {
      pageContentRef.value?.getPageData(queryInfo)
    }
    return {
      searchFormConfig,
      contentTableConfig,
      resetBtnClick,
      queryBtnClick,
      pageContentRef
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
