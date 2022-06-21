<!-- author: LJ -->
<!-- date: 2022-06-11 23:43:01 -->
<!-- description:  -->
<template>
  <div class="page-search">
    <cc-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <div class="header">
          <h1>高级检索</h1>
        </div>
      </template>
      <template #footer>
        <div class="search-btn">
          <el-button @click="handleResetClick">
            <el-icon><Refresh /></el-icon>重置</el-button
          >

          <el-button type="primary">
            <el-icon><Search /></el-icon>搜索</el-button
          >
        </div>
      </template>
    </cc-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CcForm from '@/base-ui/form'
export default defineComponent({
  name: 'page-search',
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    CcForm
  },
  setup(props) {
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    const handleResetClick = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]

        console.log(formData.value[`${key}`])
        // console.log(formOriginData[key])
      }
    }
    return {
      formData,
      handleResetClick
    }
  }
})
</script>

<style scoped>
.header {
  color: rgb(237, 113, 5);
}
.search-btn {
  text-align: right;
  padding: 0 25px 20px 0;
}
</style>
