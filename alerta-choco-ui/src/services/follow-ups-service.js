import { AxiosHandler } from './axios-handler';
import qs from 'qs';

const followUpHandler = new AxiosHandler();
const tokenHandler = new AxiosHandler();

export default {
  async getFollowUpIds(token) {
    let req = 'https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/seguimientos/FeatureServer/0/query?f=json&where=1=1&outSr=4326&outFields=OBJECTID, idAlerta';

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };

    const data2 = qs.stringify({
      token: token
    });
    //console.log('access is ' + access);

    const followUps = await followUpHandler.postRequest(req, data2, headers);

    //console.log('FollowUp ids reponse is ', followUps.features);

    return followUps;
  },
  async getAllFollowUps(token, userAccess) {
    let fields = process.env.VUE_APP_FOLLOWUP_PUBLIC_INFO;

    if (userAccess === 'private') fields = process.env.VUE_APP_FOLLOWUP_PRIVATE_INFO;

    if (userAccess === 'sensitive') fields = process.env.VUE_APP_FOLLOWUP_SENSITIVE_INFO;

    let req = 'https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/seguimientos/FeatureServer/0/query';

    const tokenData = qs.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.VUE_APP_ARCGIS_CLIENT_ID,
      client_secret: process.env.VUE_APP_ARCGIS_CLIENT_SECRET
    });

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };

    const response = await tokenHandler.postRequest(`https://www.arcgis.com/sharing/rest/oauth2/token`, tokenData, header);

    const data = qs.stringify({
      f: 'json',
      where: '1=1',
      token: response.access_token,
      outFields: fields
    });

    const followUps = await followUpHandler.postRequest(req, data, header);

    //console.log('FollowUps reponse is ', followUps.features[0].attributes);

    return followUps.features;
  },
  async getFollowUpInfo(token, OBJECTID, userAccess) {
    let fields = process.env.VUE_APP_FOLLOWUP_PUBLIC_INFO;

    if (userAccess === 'private') fields = process.env.VUE_APP_FOLLOWUP_PRIVATE_INFO;

    if (userAccess === 'sensitive') fields = process.env.VUE_APP_FOLLOWUP_SENSITIVE_INFO;

    let req = 'https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/seguimientos/FeatureServer/0/query';

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };

    const data = qs.stringify({
      f: 'json',
      token: token,
      where: `OBJECTID=${OBJECTID}`,
      outSr: '4326',
      outFields: fields
    });

    const followUps = await followUpHandler.postRequest(req, data, headers);

    //console.log('FollowUps reponse is ', followUps.features[0].attributes);

    return followUps.features[0].attributes;
  },
  async update(followUp) {
    const tokenData = qs.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.VUE_APP_ARCGIS_CLIENT_ID,
      client_secret: process.env.VUE_APP_ARCGIS_CLIENT_SECRET
    });

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };

    const response = await tokenHandler.postRequest(`https://www.arcgis.com/sharing/rest/oauth2/token`, tokenData, header);

    const updateData = qs.stringify({
      f: 'json',
      token: response.access_token,
      updates: followUp
    });

    const updateResponse = await followUpHandler.postRequest(`https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/seguimientos/FeatureServer/0/applyEdits`, updateData, header);
    //console.log("alerts is " + alerts.features);

    return updateResponse;
  },
  async deleteFollowUp(OBJECTID) {
    const tokenData = qs.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.VUE_APP_ARCGIS_CLIENT_ID,
      client_secret: process.env.VUE_APP_ARCGIS_CLIENT_SECRET
    });

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };

    const response = await tokenHandler.postRequest(`https://www.arcgis.com/sharing/rest/oauth2/token`, tokenData, header);

    const deleteData = qs.stringify({
      f: 'json',
      token: response.access_token,
      deletes: '[' + OBJECTID + ']'
    });

    const deleteResponse = await followUpHandler.postRequest(`https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/seguimientos/FeatureServer/0/applyEdits`, deleteData, header);

    return deleteResponse;
  },
  async save(followUp) {
    const tokenData = qs.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.VUE_APP_ARCGIS_CLIENT_ID,
      client_secret: process.env.VUE_APP_ARCGIS_CLIENT_SECRET
    });

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };

    const response = await tokenHandler.postRequest(`https://www.arcgis.com/sharing/rest/oauth2/token`, tokenData, header);

    const updateData = qs.stringify({
      f: 'json',
      token: response.access_token,
      adds: followUp
    });

    const updateResponse = await followUpHandler.postRequest(`https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/seguimientos/FeatureServer/0/applyEdits`, updateData, header);
    //console.log("alerts is " + alerts.features);

    return updateResponse;
  }
};
