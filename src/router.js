import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Generator from "./components/Generator.vue";
import Themes from "./components/Themes.vue";
import Tags from "./components/Tags.vue";

const routes = [{
        path: "/",
        component: Generator
    },
    {
        path: "/themes",
        component: Themes
    },
    {
        path: "/tags",
        component: Tags
    }
];
export default new VueRouter({
    routes
});