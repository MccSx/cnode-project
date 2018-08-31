<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import Header from './components/Header'
import PostList from './components/PostList'

export default {
  name: 'App',
  components: {
    Header,
    PostList
  }
}
</script>

<style>
*{margin: 0; padding: 0; box-sizing: border-box;}
*::after{box-sizing: border-box;}
*::before{box-sizing: border-box;}
body{background: #E1E1E1;}
h1,h2,h3,h4,h5,h6{font-weight: normal;}
li{list-style: none;}
a{text-decoration: none; color: #C7C3C7;}

</style>
