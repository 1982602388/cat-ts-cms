<!-- author: LJ -->
<!-- date: 2022-05-13 16:11:04 -->
<!-- description:  -->
<template>
  <div class="user-info">
    <el-dropdown class="el-dropdown-link">
      <span class="info-name">
        <el-icon><user /></el-icon>
        {{ name }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handlerExitClick">
            退出登录
          </el-dropdown-item>
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
import { useRouter } from 'vue-router'
import LocalCache from '@/utils/cache'
export default defineComponent({
  name: 'user-info',
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)
    const router = useRouter()

    const handlerExitClick = () => {
      LocalCache.deleteCache('token')
      router.push('/main')
    }
    return {
      name,
      handlerExitClick
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
