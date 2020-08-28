import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard.vue';
import Verification from '@/components/Verification.vue';
import FollowUp from '@/components/FollowUp.vue';
import DDHHReportsTable from '@/components/DDHHReportsTable.vue';
import PATRReportsTable from '@/components/PATRReportsTable.vue';
import DDHHReport from '@/components/DDHHReport.vue';
import DDHHReportDelete from '@/components/DDHHReportDelete.vue';
import PATRReportDelete from '@/components/PATRReportDelete.vue';
import DDHHReportCreate from '@/components/DDHHReportCreate.vue';
import PATRReportCreate from '@/components/PATRReportCreate.vue';
import PATRReport from '@/components/PATRReport.vue';
import PATRReportEdit from '@/components/PATRReportEdit.vue';

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
      path: '/deletepatrreport/:id',
      name: 'PATRReportDelete',
      component: PATRReportDelete
    },
    {
      path: '/seereport/:id',
      name: 'DDHHReport',
      component: DDHHReport
    },
    {
      path: '/seepatrreport/:id',
      name: 'PATRReport',
      component: PATRReport
    },
    {
      path: '/seeddhhreports',
      name: 'DDHHReportsTable',
      component: DDHHReportsTable
    },
    {
      path: '/seepatrreports',
      name: 'PATRReportsTable',
      component: PATRReportsTable
    },
    {
      path: '/verify/:id',
      name: 'Verification',
      component: Verification
    },
    {
      path: '/editpatrreport/:id',
      name: 'PATRReportEdit',
      component: PATRReportEdit
    },
    {
      path: '/followup/:id',
      name: 'FollowUp',
      component: FollowUp
    },
    {
      path: '/createddhhreport',
      name: 'DDHHReportCreate',
      component: DDHHReportCreate
    },
    {
      path: '/createpatrreport',
      name: 'PATRReportCreate',
      component: PATRReportCreate
    }
  ]
});
