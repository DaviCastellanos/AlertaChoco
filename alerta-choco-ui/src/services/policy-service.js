import { AxiosHandler } from './axios-handler';
import qs from 'qs';

const policyHandler = new AxiosHandler();
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
  async savePolicy(policy) {
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
      adds: policy
    });

    const saveResponse = await policyHandler.postRequest(
      `https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/politicas/FeatureServer/0/applyEdits`,
      updateData,
      header
    );
    //console.log("alerts is " + alerts.features);

    return saveResponse;
  }
};
