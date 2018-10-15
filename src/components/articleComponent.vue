<template>
<div class="article">
  <div class="posts">
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
      <div id="content">
          <div class="post-content" v-html="articleData.content"></div>
      </div>
    </div>
    <div class="reply">
      <div>{{replyNum}}回复</div>
      <ul>
        <li v-for="(reply,index) in articleData.replies" :key="reply.id">
          <div class="reply-l">
            <router-link :to="{name: 'userInfo', params: {name: reply.author.loginname}}">
                <img :src="reply.author.avatar_url" alt="">
            </router-link>
          </div>
          <div class="reply-r">
            <div class="reply-title">
              <span class="reply-name">{{reply.author.loginname}}</span>
              <span class="reply-num">{{index+1}}楼•{{reply.create_at | timeFilter}}</span>
            </div>
            <div class="reply-content" v-html="reply.content"></div>
          </div>
          <div class="reply-up" v-if="reply.ups.length">
            <span>
              <svg class="icon up" aria-hidden="true">
                  <use xlink:href="#icon-dianzan"></use>
              </svg>
            </span>
            {{reply.ups.length}}
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="silde-bar">
    <div class="author">
      <h2>作者</h2>
      <div class="author-message">
        <div class="author-avatar">
          <img :src="avatarUrl" alt="">
          <span class="name">{{authorName}}</span>
        </div>
        <p>
          <span class="score">积分: {{userData.score}}</span>
        </p>
      </div>
    </div>
    <div class="topic1">
      <h2>作者其它问题</h2>
    </div>
    <div class="topic2">
      <h2>无人回复的话题</h2>
    </div>
  </div>
</div>
</template>

<script>
import '../assets/icon.js'
export default {
  name : 'articleConponent',
  data() {
    return {
      isLoading: true,
      articleData: {},
      userData: {}
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
    },
    replyNum() {
      if (this.articleData.replies) {
        return this.articleData.replies.length
      } else {
        return 0        
      }
    },
    avatarUrl() {
      if (this.articleData.author) {
        return this.articleData.author.avatar_url
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
          //console.log(this.articleData.replies.length)
          this.getUserInfo(this.articleData.author.loginname)
        }
      })
      .catch( err => {
        console.log(err)
      })
    },
    getUserInfo(name) {
        this.$axios.get(`https://cnodejs.org/api/v1/user/${name}`)
        .then( res => {
            if (res.data.success === true) {
                this.userData = res.data.data
            }
        })
        .catch( err => {
            console.log(err)
        })
    }
  }
}
</script>

<style>
@import url('../assets/markdown-github.css');
/* @import url('../assets/github-markdown.css'); */
.icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
.up{color: #000;}
.up:hover{color: #666;}
.posts{width: 75%; }
.post-item{margin: 0 auto; background: #ffffff; padding-top: 20px;}
.header{display: flex; align-items: flex-end;}
.header .tab{display: inline-block; white-space: nowrap; margin: 0 10px; font-size: 12px; padding: 0 5px; border-radius: 3px; 
  line-height: 1.5em; height: 1.5em; background: #ccc; color: white;}
.header .tab.top{background: #80BD01;}
.header h2{font-size: 20px; font-weight: bold;}
.article{width: 84%; margin: 0 auto; margin-top: 20px; display: flex;}
.message{padding-bottom: 15px; border-bottom: 1px solid #ccc;}
.message ul{display: flex; flex-direction: row; margin-top: 20px;}
.message ul li{font-size: 12px; color: #838383;}
.reply{margin-top: 15px; background: #ffffff;}
/* .reply ul{width: 84%;} */
.reply ul>li{display: flex; border-bottom: 1px solid #F0F0F0; padding: 15px 10px 30px 10px; position: relative;}
.reply ul>li img{width: 100%;}
.reply ul>li .reply-l img{width: 30px; height: 30px; border-radius: 4px;}
.reply ul>li .reply-r{margin-left: 10px;}
.reply ul>li .reply-r .reply-title .reply-name{font-size: 12px; font-weight: bold;}
.reply ul>li .reply-r .reply-title .reply-num{font-size: 12px; color: #08c; margin-left: 5px;}
.reply ul>li .reply-r .reply-content{margin-top: 5px; padding-left: 10px;}
.reply ul>li .reply-up{position: absolute; right: 10px;}
#content{padding: 10px;}
.post-content{margin: 0 10px;}
.silde-bar{width: 23%; margin-left: 1.2%; border: 1px solid red;}
.silde-bar .author{border-radius: 3px;}
.silde-bar h2{background: #f6f6f6; color: #444; font-size: 13px; padding: 10px;}
.silde-bar .author-message{background: #fff; padding: 10px;}
.silde-bar .author-message .author-avatar img{width: 48px; height: 48px; border-radius: 3px; vertical-align: middle;}
.silde-bar .author-message .author-avatar .name{color: #778087; font-size: 16px; margin-left: 6px;}
.silde-bar .author-message p{margin-top: 10px;}
.silde-bar .author-message .score{font-size: 14px; color: #333; line-height: 2em;}
.silde-bar .topic1,.silde-bar .topic2{margin-top: 10px;}
</style>
