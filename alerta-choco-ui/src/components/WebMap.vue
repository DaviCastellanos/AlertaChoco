<template>
  <div id="root">
    <div id="mapDiv">
      <div class="text-center" v-if="mapLoading">
        <b-spinner variant="secondary"></b-spinner>
      </div>
    </div>
    <div id="conventions">
      <span><img style="width:18px" src="@/images/eventosDDHH.png" /> Evento DDHH </span>
      <span><img style="width:20px" src="@/images/alertasDDHH.png" /> Alerta DDHH </span>
      <span><img style="width:20px" src="@/images/PATR.png" /> PATR </span>
    </div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader';
import { mapState } from 'vuex';

export default {
  name: 'web-map',
  data() {
    return {
      municipiosVisible: false,
      mapLoading: true
    };
  },
  computed: mapState(['arcgisToken']),
  watch: {
    arcgisToken(newValue) {
      this.drawMap(newValue);
    },
    municipiosVisible() {
      this.view.map.findLayerById('municipios').visible = !this.view.map.findLayerById('municipios').visible;
    }
  },
  methods: {
    gotTo(pt) {
      var opts = {
        duration: 1000 // Duration of animation will be 1 seconds
      };

      // go to point at LOD 15 with custom duration
      this.view.goTo(
        {
          target: pt,
          zoom: 10
        },
        opts
      );
    },
    async drawMap(token) {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      const [ArcGISMap, MapView, FeatureLayer, IdentityManager] = await loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/identity/IdentityManager'], { css: true });

      IdentityManager.registerToken({
        server: 'https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/alertas/FeatureServer',
        token: token
      });

      const map = new ArcGISMap({
        basemap: 'gray-vector'
      });

      this.view = new MapView({
        container: 'mapDiv',
        map: map,
        center: [-76.781506677246, 5.9944065844109957], // longitude, latitude
        zoom: 6
      });

      var alertRenderer = {
        type: 'simple',
        symbol: {
          type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
          size: 10,
          color: 'green',
          style: 'triangle',
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 0.5,
            color: 'white'
          }
        }
      };

      var alertPopup = {
        title: '{tipoEvento}',
        content: '<b>Categoría:</b> {categoria}'
      };

      var alertas = new FeatureLayer({
        url: 'https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/alertas/FeatureServer',
        renderer: alertRenderer,
        outFields: ['tipoEvento', 'categoriaEvento'],
        popupTemplate: alertPopup,
        id: 'alertas'
      });

      map.add(alertas);
      this.mapLoading = false;
    }
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }
};
</script>

<style scoped>
#conventions {
  padding: 10px;
  margin: 0;
  width: 100%;
  height: 50px;
  align: center;
}
#mapDiv {
  padding: 0;
  margin: 0;
  margin-top: 2px;
  width: 100%;
  height: 700px;
  align: center;
}
#root {
  width: 100%;
  height: 100%;
}
</style>
