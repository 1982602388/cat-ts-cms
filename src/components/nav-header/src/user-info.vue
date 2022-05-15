<!-- author: LJ -->
<!-- date: 2022-05-13 16:11:04 -->
<!-- description:  -->
<template>
  <div class="user-info">
    <el-dropdown class="el-dropdown-link">
      <el-icon><user /></el-icon>
      <span class="info-name">
        {{ name }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
          <el-dropdown-item>管理系统</el-dropdown-item>
          <el-dropdown-item>用户信息</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store/index'
export default defineComponent({
  name: 'user-info',
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)
    return {
      name
    }
  }
})
</script>

<style scoped lang="less">
.user-info {
  .el-dropdown-link {
    display: flex;
    cursor: pointer;
    align-items: center;
    .info-name {
      margin-left: 5px;
    }
  }
}
</style>
