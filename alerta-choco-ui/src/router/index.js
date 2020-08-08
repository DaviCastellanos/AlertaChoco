import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home.vue";
import Verification from "@/components/Verification.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/verify/:id",
      name: "Verification",
      component: Verification,
    },
  ],
});
