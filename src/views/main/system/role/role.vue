<template>
  <div class="role">
    <div class="search">
      <page-search :searchFormConfig="searchFormConfig"></page-search>
    </div>

    <div class="content">
      <page-content
        :contentTableConfig="contentTableConfig"
        pageName="role"
      ></page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search/src/page-search.vue'
import pageContent from '@/components/page-content/src/pageContent.vue'
import { searchFormConfig } from './config/config/search.config'
import { contentTableConfig } from './config/config/content.config'
export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    pageContent
  },
  setup() {
    return {
      contentTableConfig,
      searchFormConfig
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
