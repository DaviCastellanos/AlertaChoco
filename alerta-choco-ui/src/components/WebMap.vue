<template>
  <div id="root">
    <b-button
      id="municipiosButton"
      squared
      block
      :pressed.sync="municipiosVisible"
      variant="warning"
    >
      {{ setButtonText() }}
    </b-button>
    <div id="mapDiv">
      <div class="text-center" v-if="mapLoading">
        <b-spinner variant="secondary"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import { mapState } from "vuex";
import { BButton } from "bootstrap-vue";

export default {
  name: "web-map",
  components: { BButton },
  data() {
    return {
      municipiosVisible: false,
      mapLoading: true,
    };
  },
  computed: mapState(["arcgisToken"]),
  watch: {
    arcgisToken(newValue) {
      this.drawMap(newValue);
    },
    municipiosVisible() {
      this.view.map.findLayerById(
        "municipios"
      ).visible = !this.view.map.findLayerById("municipios").visible;
    },
  },
  methods: {
    setButtonText() {
      return this.municipiosVisible
        ? "MOSTRAR MUNICIPIOS PDET"
        : "OCULTAR MUNICIPIOS PDET";
    },
    gotTo(pt) {
      var opts = {
        duration: 1000, // Duration of animation will be 1 seconds
      };

      // go to point at LOD 15 with custom duration
      this.view.goTo(
        {
          target: pt,
          zoom: 10,
        },
        opts
      );
    },
    async drawMap(token) {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      const [
        ArcGISMap,
        MapView,
        FeatureLayer,
        IdentityManager,
      ] = await loadModules(
        [
          "esri/Map",
          "esri/views/MapView",
          "esri/layers/FeatureLayer",
          "esri/identity/IdentityManager",
        ],
        { css: true }
      );

      IdentityManager.registerToken({
        server:
          "https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/alertas/FeatureServer",
        token: token,
      });

      const map = new ArcGISMap({
        basemap: "gray-vector",
      });

      this.view = new MapView({
        container: "mapDiv",
        map: map,
        center: [-76.781506677246, 5.9944065844109957], // longitude, latitude
        zoom: 6,
      });

      var municipiosRenderer = {
        type: "simple",
        symbol: {
          type: "picture-marker",
          url: "https://image.flaticon.com/icons/svg/2937/2937077.svg",
          width: "18px",
          height: "18px",
        },
      };

      var municipiosLabels = {
        symbol: {
          type: "text",
          color: "#545550",
          haloColor: "#545550",
          haloSize: "0px",
          font: {
            size: "12px",
            family: "Noto Sans",
            style: "italic",
            weight: "normal",
          },
        },
        labelPlacement: "below-center",
        labelExpressionInfo: {
          expression: "$feature.municipio",
        },
      };

      var municipios = new FeatureLayer({
        url:
          "https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/municipios_subregion_choco/FeatureServer/0",
        renderer: municipiosRenderer,
        labelingInfo: municipiosLabels,
        id: "municipios",
      });

      map.add(municipios);

      var alertRenderer = {
        type: "simple",
        symbol: {
          type: "picture-marker",
          url: "https://image.flaticon.com/icons/svg/497/497738.svg",
          width: "25px",
          height: "25px",
        },
      };

      var alertPopup = {
        title: "{tipoEvento}",
        content: "<b>Categoría:</b> {categoria}",
      };

      var alertas = new FeatureLayer({
        url:
          "https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/alertas/FeatureServer",
        renderer: alertRenderer,
        outFields: ["tipoEvento", "categoriaEvento"],
        popupTemplate: alertPopup,
        id: "alertas",
      });

      map.add(alertas);
      this.mapLoading = false;
    },
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  },
};
</script>

<style scoped>
#municipiosButton {
  padding: 0;
  margin: 0;
  margin-top: 2px;
  width: 100%;
  height: 50px;
  font-size: 1.3rem;
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
