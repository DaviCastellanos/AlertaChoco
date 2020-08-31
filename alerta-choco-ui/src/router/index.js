import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard.vue';
import UserPanel from '@/components/UserPanel.vue';
import UsersTable from '@/components/UsersTable.vue';

import FollowUpCreate from '@/components/FollowUps/FollowUpCreate.vue';
import FollowUpDetail from '@/components/FollowUps/FollowUpDetail.vue';
import FollowUpEdit from '@/components/FollowUps/FollowUpEdit.vue';
import FollowUpDelete from '@/components/FollowUps/FollowUpDelete.vue';

import DDHHReportEdit from '@/components/DDHH/DDHHReportEdit.vue';
import DDHHReportsTable from '@/components/DDHH/DDHHReportsTable.vue';
import DDHHReport from '@/components/DDHH/DDHHReport.vue';
import DDHHReportDelete from '@/components/DDHH/DDHHReportDelete.vue';
import DDHHReportCreate from '@/components/DDHH/DDHHReportCreate.vue';

import PATRReportsTable from '@/components/PATR/PATRReportsTable.vue';
import PATRReportDelete from '@/components/PATR/PATRReportDelete.vue';
import PATRReportCreate from '@/components/PATR/PATRReportCreate.vue';
import PATRReport from '@/components/PATR/PATRReport.vue';
import PATRReportEdit from '@/components/PATR/PATRReportEdit.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/userpanel',
      name: 'UserPanel',
      component: UserPanel
    },
    {
      path: '/userstable',
      name: 'UsersTable',
      component: UsersTable
    },
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
      name: 'DDHHReportEdit',
      component: DDHHReportEdit
    },
    {
      path: '/editpatrreport/:id',
      name: 'PATRReportEdit',
      component: PATRReportEdit
    },
    {
      path: '/followup/:id',
      name: 'FollowUpCreate',
      component: FollowUpCreate
    },
    {
      path: '/deletefollowup/:id',
      name: 'FollowUpDelete',
      component: FollowUpDelete
    },
    {
      path: '/seefollowup/:id',
      name: 'FollowUpDetail',
      component: FollowUpDetail
    },
    {
      path: '/editfollowup/:id',
      name: 'FollowUpEdit',
      component: FollowUpEdit
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
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
