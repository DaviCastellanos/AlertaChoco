import { AxiosHandler } from './axios-handler'

const alertsHandler = new AxiosHandler()

export default {
  getAlerts () {
    return alertsHandler.postRequest(`https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/alertas_subregion_choco_ejemplo/FeatureServer/0/query?f=json&where=1=1&outSr=4326&outFields=OBJECTID, threat, date, location`)
  }
}