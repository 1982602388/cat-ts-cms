<!-- author: LJ -->
<!-- date: 2022-05-06 20:26:58 -->
<!-- description:  -->
<template>
  <div class="Home">
    <h2>{{ name }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import localCache from '@/utils/cache'
export default defineComponent({
  name: 'Home',
  setup() {
    const name = ref(localCache.getCache('name'))
    return {
      name
    }
  }
})
</script>

<style scoped lang="less"></style>
