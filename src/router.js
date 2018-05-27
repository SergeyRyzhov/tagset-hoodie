import Vue from 'vue'
import VueRouter from 'vue-router'

import Generator from './components/generator/Index.vue'
import SignIn from './components/auth/SignIn.vue'
import {
  TopicList,
  CreateTopic,
  EditTopic,
  ViewTopic
} from './components/topics'
import { TagList, CreateTag, EditTag, ViewTag } from './components/tags'

Vue.use(VueRouter)

const routes = [
  {
    path: '/sign-in',
    // alias: '/sign-in',
    component: SignIn
  },
  {
    path: '/',
    alias: '/home',
    component: Generator,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/topics',
    component: TopicList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'topic-view',
    path: '/topic/:id/details',
    component: ViewTopic,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'topic-edit',
    path: '/topic/:id/edit',
    component: EditTopic,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'topic-create',
    path: '/topic/create',
    component: CreateTopic,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tags',
    component: TagList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'tag-view',
    path: '/tag/:id/details',
    component: ViewTag,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'tag-edit',
    path: '/tag/:id/edit',
    component: EditTag,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'tag-create',
    path: '/tag/create',
    component: CreateTag,
    meta: {
      requiresAuth: true
    }
  }
]

export default new VueRouter({
  routes
})
