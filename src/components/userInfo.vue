<template>
    <div class="user-info">
        <div class="loading" v-if="isLoading">
            <img src="../assets/loading.gif" >
        </div>
        <div class="userInfomation" v-else>
            <section>
                <img :src="userData.avatar_url">
                <span>{{userData.loginname}}</span>
                <p>
                    {{userData.score}}积分
                </p>
                <p>
                    注册时间：{{userData.create_at | timeFilter}}
                </p>
            </section>
            <div class="replies">
                <p>回复的主题</p>
                <ul>
                    <li v-for="topic in userData.recent_topics" :key="topic.id">
                    <router-link :to="{name:'post_content',params:{id:topic.id}}">
                        {{topic.title}}
                    </router-link>
                    </li>
                </ul>
            </div>
            <div class="topics">
                <p>创建的主题</p>
                <ul>
                    <li v-for="reply in userData.recent_replies" :key="reply.id">
                    <router-link :to="{name:'post_content',params:{id:reply.id}}">
                        {{reply.title}}
                    </router-link>
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
    padding: 4px 0 4px 12px;
    white-space: nowrap;
    font-size: 0.72rem;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 30px;
    vertical-align: middle;
}
.userInfomation > div >ul > li > a {
    color: #094E99;
    text-decoration: none;
}
</style>
