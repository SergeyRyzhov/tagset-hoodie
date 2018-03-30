import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Generator from "./components/generator/Index.vue";
import {
  TopicList,
  CreateTopic,
  EditTopic,
  ViewTopic
} from "./components/topics";
import { TagList, CreateTag, EditTag, ViewTag } from "./components/tags";

const routes = [
  {
    path: "/",
    alias: "/home",
    component: Generator
  },
  {
    path: "/topics",
    component: TopicList,
    children: [
      {
        name: "topic-view",
        path: "/topic/:id/details",
        component: ViewTopic
      },
      {
        name: "topic-edit",
        path: "/topic/:id/edit",
        component: EditTopic
      },
      {
        name: "topic-create",
        path: "/topic/create",
        component: CreateTopic
      }
    ]
  },
  {
    path: "/tags",
    component: TagList,
    children: [
      {
        name: "tag-view",
        path: "/tag/:id/details",
        component: ViewTag
      },
      {
        name: "tag-edit",
        path: "/tag/:id/edit",
        component: EditTag
      },
      {
        name: "tag-create",
        path: "/tag/create",
        component: CreateTag
      }
    ]
  }
];

export default new VueRouter({
  routes
});
