import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard.vue';
import Verification from '@/components/Verification.vue';
import FollowUp from '@/components/FollowUp.vue';
import DDHHReportsTable from '@/components/DDHHReportsTable.vue';
import DDHHReport from '@/components/DDHHReport.vue';
import DDHHReportDelete from '@/components/DDHHReportDelete.vue';
import HREventCreation from '@/components/HREventCreation.vue';
import PPEventCreation from '@/components/PPEventCreation.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/deletereport/:id',
      name: 'DDHHReportDelete',
      component: DDHHReportDelete
    },
    {
      path: '/seereport/:id',
      name: 'DDHHReport',
      component: DDHHReport
    },
    {
      path: '/seeddhhreports',
      name: 'DDHHReportsTable',
      component: DDHHReportsTable
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
    },
    {
      path: '/createhrevent/',
      name: 'CreateHREvent',
      component: HREventCreation
    },
    {
      path: '/createppevent/',
      name: 'CreatePPEvent',
      component: PPEventCreation
    }
  ]
});
