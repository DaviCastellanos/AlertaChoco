import { AxiosHandler } from './axios-handler';
import qs from 'qs';

const alertsHandler = new AxiosHandler();
const tokenHandler = new AxiosHandler();

export default {
  async getArcgisToken() {
    const data = qs.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.VUE_APP_ARCGIS_CLIENT_ID,
      client_secret: process.env.VUE_APP_ARCGIS_CLIENT_SECRET
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };

    const response = await tokenHandler.postRequest(`https://www.arcgis.com/sharing/rest/oauth2/token`, data, headers);
    //console.log("token is " + response.access_token);
    return response.access_token;
  },
  async getAlerts(token, userAccess) {
    let access = process.env.VUE_APP_ALERT_PUBLIC_INFO;

    if (userAccess === 'private') access = process.env.VUE_APP_ALERT_PRIVATE_INFO;

    if (userAccess === 'sensitive') access = process.env.VUE_APP_ALERT_PUBLIC_INFO;

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };

    const data2 = qs.stringify({
      token: token
    });
    //console.log('access is ' + access);

    const alerts = await alertsHandler.postRequest(access, data2, headers);

    //console.log('Alerts reponse is ', alerts.features[0]);

    return alerts;
  },
  async verifyAlert(alert) {
    const tokenData = qs.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.VUE_APP_ARCGIS_CLIENT_ID,
      client_secret: process.env.VUE_APP_ARCGIS_CLIENT_SECRET
    });

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };

    const response = await tokenHandler.postRequest(
      `https://www.arcgis.com/sharing/rest/oauth2/token`,
      tokenData,
      header
    );

    const updateData = qs.stringify({
      f: 'json',
      token: response.access_token,
      updates: alert
    });

    const updateResponse = await alertsHandler.postRequest(
      `https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/alertas/FeatureServer/0/applyEdits`,
      updateData,
      header
    );
    //console.log("alerts is " + alerts.features);

    return updateResponse;
  }
};
