<!-- author: LJ -->
<!-- date: 2022-04-28 15:27:13 -->
<!-- description:  -->
<template>
  <div class="login-account">
    <el-form :model="account" :rules="rules" ref="formRef">
      <!-- 账号登录 -->
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" placeholder=""></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="pass">
        <el-input
          v-model="account.pass"
          placeholder=""
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'
import localCache from '../../../utils/cache'
export default defineComponent({
  name: 'login-account',
  setup() {
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      pass: localCache.getCache('password') ?? ''
    })

    //账号本地缓存
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAccount = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.pass)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
        }
      })
    }

    return {
      account,
      loginAccount,
      formRef,
      rules
    }
  }
})
</script>

<style scoped lang="less"></style>
