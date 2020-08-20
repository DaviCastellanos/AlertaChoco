import { AxiosHandler } from './axios-handler';
import qs from 'qs';

const usersHandler = new AxiosHandler();
const tokenHandler = new AxiosHandler();

export default {
  async getUsers(token) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };

    const data2 = qs.stringify({
      token: token
    });
    //console.log('access is ' + access);

    const users = await usersHandler.postRequest(
      'https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/users/FeatureServer/0/query?f=json&where=1=1&outSr=4326&outFields=email, role, OBJECTID',
      data2,
      headers
    );

    //console.log('users reponse is ', users.features[0]);

    return users;
  },
  async saveUser(mail, role) {
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
      adds: `[{"geometry" : {"x": 1-, "y": 1,"spatialReference": {"wkid": 4326}},"attributes" : {"email" :"${mail}", "role" :"${role}"}}]`
    });

    const updateResponse = await usersHandler.postRequest(
      `https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/users/FeatureServer/0/applyEdits`,
      updateData,
      header
    );

    //console.log('Save User response ', updateResponse);

    return updateResponse;
  },
  async deleteUser(id) {
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

    const deleteData = qs.stringify({
      f: 'json',
      token: response.access_token,
      deletes: '[' + id + ']'
    });

    const deleteResponse = await usersHandler.postRequest(
      `https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/users/FeatureServer/0/applyEdits`,
      deleteData,
      header
    );

    return deleteResponse;
  }
};
