import Vue from 'vue'
import Router from 'vue-router'

import PostList from '../components/PostList'
import articleComponent from '../components/articleComponent'
import UserInfo from '../components/userInfo'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name:'index',
            component: PostList
        },
        {
            path: '/article/:userId',
            name: 'article',
            component: articleComponent
        },
        {
            path: '/userInfo/:name',
            name: 'userInfo',
            component: UserInfo
        }
    ]
})