import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Generator from "./components/generator/Index.vue";
import Topics from "./components/topics/Index.vue";
import Tags from "./components/tags/Index.vue";

const routes = [
  {
    path: "/",
    alias: "/home",
    component: Generator
  },
  {
    path: "/topics",
    component: Topics
  },
  {
    path: "/tags",
    component: Tags
  }
];

export default new VueRouter({
  routes
});
