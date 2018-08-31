<template>
  <div class="posts">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" alt="">
    </div>
    <div class="post-list">
      <ul>
        <li class="tab"><span class="active">全部</span><span>精华</span><span>分享</span><span>问答</span><span>招聘</span><span>客户端测试</span></li>
        <li v-for="post in posts" :key="post.id">
          <img :src="post.author.avatar_url" alt="">
          <span class="count">
            <span class="reply-count">{{post.reply_count}}</span>/<span class="visit-count">{{post.visit_count}}</span>
          </span>
          <div v-if="post.top === true" class="tab top">置顶</div>
          <div v-else-if="post.good === true" class="tab top">精华</div>
          <div v-else-if="post.tab === 'share'" class="tab">分享</div>
          <div v-else-if="post.tab === 'ask'" class="tab">问答</div>
          <div v-else-if="post.tab === 'job'" class="tab">招聘</div>
          <div class="message">
            <router-link :to="{name: 'article', params: {userId: post.id}}">
              <p>{{post.title}}</p>
            </router-link>
            <span>{{post.last_reply_at | timeFilter}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name : 'PostList',
  data() {
    return {
      isLoading: true,
      posts: []
    }
  },
  methods: {
    getData() {
      this.$axios.get('https://cnodejs.org/api/v1/topics', {
        params: {
          limit: 20,
          page: 1
        }
      })
        .then((res) => {
          this.posts = res.data.data
          this.isLoading = false
        })
        .catch((err) => {console.log(err)})
    }
  },
  beforeMount() {
    this.isLoading = true
    this.getData()
  }
}
</script>

<style scoped>
.posts{width: 84%; margin: 0 auto; background: #FFFFFF;}
.tab{padding-left: 20px;}
.tab>span{margin-right: 26px; font-size: 14px; color: #80BD01;}
.tab>span.active{color: white; background: #80BD01; padding: 2px 4px; border-radius: 4px;}
.post-list ul li{height: 50px; border-bottom: 1px solid #F0F0F0; display: flex; flex-direction: row; align-items: center;}
.post-list ul li img{height: 65%; border-radius: 3px; margin-left: 1%;}
.post-list ul li .count{display: flex; justify-content: center; align-items: center; width: 8%;}
.post-list ul li .tab{display: inline-block; white-space: nowrap; margin: 0 10px; font-size: 12px; padding: 0 5px; border-radius: 3px; 
  line-height: 1.5em; height: 1.5em; background: #ccc; color: white;}
.post-list ul li .tab.top{background: #80BD01;}
.post-list ul li .reply-count{font-size: 14px;}
.post-list ul li .visit-count{font-size: 12px; color: #B8B8B8;}
.post-list ul li .message{width: 100%; display: flex; flex-direction: row; justify-content: space-between;}
.post-list ul li .message p{color: black;}
.post-list ul li .message p:hover{text-decoration: underline;}
.post-list ul li .message>span{font-size: 14px; color: #B8B8B8; margin-right: 10px;}
</style>
