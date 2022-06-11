<template>
  <div class="user">
    <cc-form v-bind="searchFormConfig" v-model="formData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CcForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'user',
  components: {
    CcForm
  },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      sport: '',
      createTime: ''
    })
    return {
      searchFormConfig,
      formData
    }
  }
})
</script>

<style scoped></style>
