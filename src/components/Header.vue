<template>
  <div class="header">
    <img src="../assets/cnodejs_light.svg" alt="">
    <ul>
      <li><a href="#">首页</a></li>
      <li><a href="#">新手入门</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">注册</a></li>
      <li><a href="#">登录</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header{height: 50px; background: #444444; display: flex; flex-direction: row; align-items: center; justify-content: space-between; padding: 0 8%;}
.header img{height: 55%;}
.header ul>li{display: inline-block; padding: 0 10px; font-size: 14px;}
</style>