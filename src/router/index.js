import Vue from 'vue'
import Router from 'vue-router'

import PostList from '../components/PostList'
import articleComponent from '../components/articleComponent'
import userInfo from '../components/userInfo'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: PostList
        },
        {
            path: '/article/:userId',
            name: 'article',
            component: articleComponent
        },
        {
            path: '/user/:name',
            name: 'user',
            component: userInfo
        }
    ]
})