import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import Verification from '@/components/Verification.vue';
import FollowUp from '@/components/FollowUp.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/verify/:id',
      name: 'Verification',
      component: Verification
    },
    {
      path: '/followup/:id',
      name: 'FollowUp',
      component: FollowUp
    }
  ]
});
