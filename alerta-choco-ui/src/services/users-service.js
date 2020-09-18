import { AxiosHandler } from './axios-handler';
import qs from 'qs';

const usersHandler = new AxiosHandler();
const tokenHandler = new AxiosHandler();

export default {
  async getUsers() {
    const tokenData = qs.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.VUE_APP_ARCGIS_CLIENT_ID,
      client_secret: process.env.VUE_APP_ARCGIS_CLIENT_SECRET
    });

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };

    const response = await tokenHandler.postRequest(`https://www.arcgis.com/sharing/rest/oauth2/token`, tokenData, header);

    const data2 = qs.stringify({
      token: response.access_token
    });
    //console.log('access is ' + access);

    const users = await usersHandler.postRequest('https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/users/FeatureServer/0/query?f=json&where=1=1&outSr=4326&outFields=email, role, tel, anansiCode, displayName, OBJECTID', data2, header);

    //console.log('users reponse is ', users.features[0]);

    return users;
  },
  async saveUser(mail, role, anansiCode, tel, displayName) {
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
      adds: `[{"geometry" : {"x": 1-, "y": 1,"spatialReference": {"wkid": 4326}},"attributes" : {"email" :"${mail}", "role" :"${role}", "anansiCode" :"${anansiCode}", "tel" :"${tel}", "displayName" :"${displayName}"}}]`
    });

    const updateResponse = await usersHandler.postRequest(`https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/users/FeatureServer/0/applyEdits`, updateData, header);

    //console.log('Save User response ', updateResponse);

    const firebaseDelete = qs.stringify({
      action: 'addAnansiCode',
      user: anansiCode
    });

    await usersHandler.postRequest('https://alerta-choco.azurewebsites.net/admin', firebaseDelete, header);

    return updateResponse;
  },
  async deleteUser(obj) {
    const firebaseDelete = qs.stringify({
      action: 'deleteUser',
      user: obj.email
    });

    const robotResponse = await usersHandler.postRequest('https://alerta-choco.azurewebsites.net/admin', firebaseDelete, header);

    if (!robotResponse) console.error('Robot response is null');

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
      deletes: '[' + obj.id + ']'
    });

    const deleteResponse = await usersHandler.postRequest(`https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/users/FeatureServer/0/applyEdits`, deleteData, header);

    return deleteResponse;
  }
};
