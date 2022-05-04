<!-- author: LJ -->
<!-- date: 2022-04-28 12:42:57 -->
<!-- description:  -->
<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统登录</h2>

    <el-tabs type="border-card" class="demo-tabs" stretch>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><avatar /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>

    <div class="check">
      <el-checkbox v-model="isKeepPassword" ref="text">记住密码</el-checkbox>
      <el-link>忘记密码</el-link>
    </div>
    <div class="commit">
      <el-button type="primary" class="commitbtn" @click="handleClick()"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  name: 'login-panel',
  components: {
    LoginAccount,
    LoginPhone
  },

  setup() {
    const isKeepPassword = ref<boolean>(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const handleClick = () => {
      accountRef.value?.loginAccount(isKeepPassword.value)
    }

    return {
      isKeepPassword,
      handleClick,
      accountRef
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  .title {
    text-align: center;
    color: #fa6129;
  }
  .el-icon {
    vertical-align: middle;
    margin-right: 0.1333rem;
  }
  .check {
    display: flex;
    justify-content: space-between;
  }
  .commit {
    width: 100%;
    height: 20px;
    .commitbtn {
      width: 100%;
    }
  }
}
</style>
