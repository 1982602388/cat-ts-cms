<!-- author: LJ -->
<!-- date: 2022-05-12 10:33:54 -->
<!-- description:  -->
<template>
  <div class="nav-header">
    <span @click="handleIconClick" class="el-fold">
      <el-icon v-if="!isFold" size="30px"><fold /></el-icon>
      <el-icon v-else size="30px"><expand /></el-icon>
    </span>
    <div class="content">
      <!-- 面包屑 -->
      <cc-breadcrumb :breadcrumbs="breadcrumbs" />

      <!-- 用户信息 -->
      <div class="user-info">
        <user-info />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import userInfo from './user-info.vue'
import { useStore } from '@/store/index'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import ccBreadcrumb from '@/base-ui/Breadcrumb'
export default defineComponent({
  name: 'nav-header',
  emits: ['foldChange'],
  components: {
    userInfo,
    ccBreadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleIconClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑的数据: [{name: , path: }]
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenu
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      handleIconClick,
      isFold,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .el-fold {
    display: inline-block;
    height: 30px;
    width: 30px;
  }
  .content {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
