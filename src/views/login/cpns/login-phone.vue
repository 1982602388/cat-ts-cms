<!-- author: LJ -->
<!-- date: 2022-04-28 15:27:38 -->
<!-- description:  -->
<template>
  <div class="login-phone">
    <el-form label-width="80px">
      <el-form-item label="手机号码" prop="num">
        <el-input v-model="phone.num"></el-input>
      </el-form-item>
    </el-form>
    <el-form label-width="80px">
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code"></el-input>
          <el-button type="primary" class="elBtn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'login-phone',
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })

    return {
      phone
    }
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
