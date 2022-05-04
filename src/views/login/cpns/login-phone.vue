<!-- author: LJ -->
<!-- date: 2022-04-28 15:27:38 -->
<!-- description:  -->
<template>
  <div class="login-phone">
    <el-form :model="form" label-width="80px">
      <el-form-item label="手机号码">
        <el-input v-model="model"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="form" label-width="80px">
      <el-form-item label="验证码">
        <div class="get-code">
          <el-input v-model="model"></el-input>
          <el-button type="primary" class="elBtn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'login-phone',
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
  .elBtn {
    margin-left: 10px;
  }
}
</style>
