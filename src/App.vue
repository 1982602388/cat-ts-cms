<template>
  <div id="nav">
    <h2>{{ $store.state.counter }}</h2>
    <router-link to="/">Login</router-link>
    <router-link to="/home">Home</router-link>
    <el-button type="primary">test</el-button>
    <router-view />
  </div>
</template>
<script lang="ts"></script>

<style lang="less"></style>
