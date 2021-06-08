import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/Login"),
  },

  {
    path: "/channels",
    component: () => import("@/views/ChanelList"),
    name: "channels"
  },

  {
    path: "/chanels/:id",
    component: () => import("@/views/CurrentChanel"),
    name: "CurrentChannel"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
