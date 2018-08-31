<template>
<div>
  <div class="loading" v-if="isLoading">
    <img src="../assets/loading.gif" alt="">
  </div>
  <div class="post-item">
    <div class="header">
      <div v-if="articleData.top === true" class="tab top">置顶</div>
      <div v-else-if="articleData.good === true" class="tab top">精华</div>
      <div v-else-if="articleData.tab === 'share'" class="tab">分享</div>
      <div v-else-if="articleData.tab === 'ask'" class="tab">问答</div>
      <div v-else-if="articleData.tab === 'job'" class="tab">招聘</div>
      <h2>{{articleData.title}}</h2>
    </div>
    <div class="message">
      <ul>
        <li>&nbsp;• 发布与 {{articleData.create_at | timeFilter}}</li>
        <li>&nbsp;• 作者 {{authorName}}</li>
        <li>&nbsp;• {{articleData.visit_count}} 次浏览</li>
        <li>&nbsp;• 来自 {{tabName}}</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name : 'articleConponent',
  data() {
    return {
      isLoading: true,
      articleData: {}
    }
  },
  beforeMount() {
    this.isLoading = true
    this.getArticleData()
  },
  components: {

  },
  computed: {
    tabName() {
      if (this.articleData.tab === 'share') {
        return '分享'
      } else if (this.articleData.tab === 'aks') {
        return '问答'
      } else if (this.articleData.tab === 'job') {
        return '招聘'
      }
    },
    authorName() {
      if (this.articleData.author) {
        return this.articleData.author.loginname
      } else {
        return ''        
      }
    }
  },
  methods: {
    getArticleData() {
      this.$axios.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.userId}`)
      .then( res => {
        if (res.data.success === true) {
          this.articleData = res.data.data
          this.isLoading = false
          console.log(this.articleData)
          //console.log(this.articleData.author.loginname)
        }
      })
      .catch( err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.post-item{width: 84%; margin: 0 auto; background: white; padding-top: 20px; margin-top: 15px;}
.header{display: flex; align-items: flex-end;}
.header .tab{display: inline-block; white-space: nowrap; margin: 0 10px; font-size: 12px; padding: 0 5px; border-radius: 3px; 
  line-height: 1.5em; height: 1.5em; background: #ccc; color: white;}
.header .tab.top{background: #80BD01;}
.header h2{font-size: 20px; font-weight: bold;}
.message{padding-bottom: 15px; border-bottom: 1px solid #838383;}
.message ul{display: flex; flex-direction: row; margin-top: 20px;}
.message ul li{font-size: 12px; color: #838383;}
</style>
