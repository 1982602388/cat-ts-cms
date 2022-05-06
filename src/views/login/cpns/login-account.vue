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
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
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
import { useStore } from 'vuex'

export default defineComponent({
  name: 'login-account',
  setup() {
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    //账号本地缓存
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAccount = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          //1.判断是否需要记住密码
          if (isKeepPassword) {
            //本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
        }

        //2.开始进行登录验证
        store.dispatch('login/accountLoginAction', { ...account })
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
