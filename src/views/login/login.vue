<!-- author: LJ -->
<!-- date: 2022-04-25 11:39:15 -->
<!-- description:  -->
<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import LoginPanel from './cpns/login-panel.vue'
export default defineComponent({
  name: 'login',
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/back.jpg') no-repeat;
  background-size: 100% 100%;
}
</style>
