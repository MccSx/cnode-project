import Vue from 'vue'
import Router from 'vue-router'

import PostList from '../components/PostList'
import articleComponent from '../components/articleComponent'

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
        }
    ]
})