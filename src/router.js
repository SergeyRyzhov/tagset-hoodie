import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Generator from "./components/generator/Index.vue";
import {
  TopicList,
  CreateTopic,
  EditTopic,
  ViewTopic
} from "./components/topics/index.js";
import Tags from "./components/tags/Index.vue";

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
    component: Tags
  }
];

export default new VueRouter({
  routes
});
