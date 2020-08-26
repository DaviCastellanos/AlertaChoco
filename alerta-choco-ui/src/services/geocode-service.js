import { AxiosHandler } from './axios-handler';
import qs from 'qs';

const geoCodeHandler = new AxiosHandler();

export default {
  async getCoordinates(token, municipio) {
    const updateData = qs.stringify({
      f: 'json',
      token: token,
      addresses: `{"records":[{"attributes":{"OBJECTID": 1, "Subregion": "${municipio}}", "Country": "COL"}}]}`
    });

    const saveResponse = await geoCodeHandler.postRequest(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/geocodeAddresses?`, updateData);
    //console.log("alerts is " + alerts.features);

    return saveResponse;
  }
};
