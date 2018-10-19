<template>
    <div class="user-info">
        <div class="loading" v-if="isLoading">
            <img src="../assets/loading.gif" >
        </div>
        <div class="userInfomation" v-else>
            <section>
                <img class="userAvatar" :src="userData.avatar_url">
                <span class="name">{{userData.loginname}}</span>
                <p class="integral">
                    {{userData.score}}积分
                </p>
                <p class="gitName">@{{userData.githubUsername}}</p>
                <p class="createTime">
                    注册时间：{{userData.create_at | timeFilter}}
                </p>
            </section>
            <div class="replies">
                <p>回复的主题</p>
                <ul>
                    <li v-for="(topic, index) in userData.recent_topics" v-show="index<5" :key="index">
                        <img :src="topic.author.avatar_url" alt="">
                        <router-link :to="{name:'article',params:{userId:topic.id}}">{{topic.title}}</router-link>
                        <span>{{topic.last_reply_at | timeFilter}}</span>
                    </li>
                </ul>
            </div>
            <div class="topics">
                <p>创建的主题</p>
                <ul>
                    <li v-for="(reply, index) in userData.recent_replies" v-show="index<5" :key="index">
                        <img :src="reply.author.avatar_url" alt="">
                        <router-link :to="{name:'article',params:{userId:reply.id}}">{{reply.title}}</router-link>
                        <span>{{reply.last_reply_at | timeFilter}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    data() {
        return {
            isLoading: true,
            userData: {}
        }
    },
    beforeMount() {
        this.isLoading = true
        this.getUserInfo()
    },
    methods:{
        getUserInfo() {
            this.$axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
            .then( res => {
                if (res.data.success === true) {
                    this.userData = res.data.data
                    this.isLoading = false
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
.userInfomation {
    background: white;
    width: 75%;
    margin: 10px auto;
}
.userInfomation section {
    padding: 12px;
}
.userInfomation img {
    width: 30px;
}
.userInfomation li {
    list-style:none;
}
.userInfomation .replies,
.userInfomation .topics {
    font-size: 0.72rem;
    border-top: 10px #DDDDDD solid;
}
.userInfomation > div > p {
    padding: 12px 0 12px 12px;
    background-color: rgba(212, 205, 205, 0.17);
    font-size: 0.75rem;
    margin: 0;
}
.userInfomation > div >ul > li {
    padding: 10px 0 10px 12px;
    white-space: nowrap;
    font-size: 0.72rem;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 30px;
    vertical-align: middle;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
}
.userInfomation > div >ul > li > a {
    color: #08c;
    text-decoration: none;
    line-height: 30px;
    font-size: 16px;
    flex-grow: 1;
}
.userInfomation > div >ul > li > a:hover{
    text-decoration: underline;
}
.userInfomation .userAvatar{
    margin-right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 3px;
}
.userInfomation .name{
    vertical-align: top;
    color: #778087;
    font-size: 14px;
    margin-top: 6px;
    display: inline-block;
}
.userInfomation .integral{
    font-size: 14px;
    margin-top: 8px;
}
.userInfomation .createTime{
    font-size: 14px;
    color: #ababab;
    margin-top: 20px;
}
.userInfomation .gitName{
    font-size: 14px;
    color: #778087;
    margin-top: 6px;
}
.userInfomation ul>li img{
    border-radius: 3px;
    margin-right: 60px;
}
.userInfomation ul>li span{
    display: inline-block;
    margin-right: 10px;
    color: #777;
}
</style>
