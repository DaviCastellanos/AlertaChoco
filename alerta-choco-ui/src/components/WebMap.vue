<template>
  <div>
  <b-button id="municipiosButton" squared :pressed.sync="municipiosVisible" variant="warning"> {{ setButtonText() }}  </b-button>
  <div id="mapDiv">
  </div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader';
import { mapState } from 'vuex'
import { BButton } from 'bootstrap-vue'

export default {
  name: 'web-map',
  components: { BButton },
  data() { return { municipiosVisible: true }},
  computed: mapState(['mapCenter']),
  watch: {
    mapCenter(newValue) {
      //console.log(`WebMap: Updating from ${oldValue[0] + " " + oldValue[1]} to ${newValue[0] + " " + newValue[1]}`);
      this.gotTo(newValue)
    },
    municipiosVisible() {
      this.view.map.findLayerById('municipios').visible = !this.view.map.findLayerById('municipios').visible
    }
  },
  methods: {
      setButtonText() {
        return this.municipiosVisible ? "MOSTRAR MUNICIPIOS PDET" : "OCULTAR MUNICIPIOS PDET" 
      },
      gotTo(pt) {
        var opts = {
          duration: 1000  // Duration of animation will be 1 seconds
        };

        // go to point at LOD 15 with custom duration
        this.view.goTo({
          target: pt,
          zoom: 10
        }, opts);
      },
      drawMap()
      {
            // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer'], { css: true })
        .then(([ArcGISMap, MapView, FeatureLayer]) => {

        const map = new ArcGISMap({
        basemap: 'topo'
        });

        this.view = new MapView({
        container: "mapDiv",
        map: map,
        center: [-76.781506677246, 5.9944065844109957], // longitude, latitude
        zoom: 6
        });

        var municipiosRenderer = {
            type: "simple",
            symbol: {
                    type: "picture-marker",
                    url: "https://image.flaticon.com/icons/png/512/1001/1001022.png",
                    width: "18px",
                    height: "18px"
            }
        }

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
                weight: "normal"
            }
            },
            labelPlacement: "below-center",
            labelExpressionInfo: {
            expression: "$feature.municipio"
            }
        }

        var alertRenderer = {
            type: "simple",
            symbol: {
            type: "picture-marker",
            url: "https://image.flaticon.com/icons/svg/3069/3069254.svg",
            width: "25px",
            height: "25px"
            }
        }
        
        var alertPopup = {
            "title": "{threat}",
            "content": "<b>Ubicación:</b> {location}<br><b>Nivel de Riesgo:</b> {level}<br><b>Fecha:</b> {date}"
        }

        var municipios = new FeatureLayer({
            url: "https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/municipios_subregion_choco/FeatureServer/0",
            renderer: municipiosRenderer,
            labelingInfo: municipiosLabels,
            id: 'municipios'
        });

        map.add(municipios);  

        var alertas= new FeatureLayer({
            url: "https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/alertas_subregion_choco_ejemplo/FeatureServer/0",
            renderer: alertRenderer,
            outFields: ["threat", "location", "level", "date", "OBJECTID"],
            popupTemplate: alertPopup,
            id: 'alertas'
        });

        map.add(alertas); 

        this.view.map.findLayerById('municipios').visible = false;

         /*
         this.view.whenLayerView(alertas).then(function(layerView){
                layerView.watch("updating", function(value){
                    // availableFields will become available
                    // once the layer view finishes updating
                    if (!value) {
                    layerView.queryFeatures({
                        outFields: layerView.availableFields,
                        where: "OBJECTID > 0"
                    })
                    .then(function(results) {
                        //this.features = results.features
                        console.log("features length is " + results.features.length)
                        //var  sortedDescending = results.features.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse(); 
                    })
                    .catch(function(error) {
                        console.log("query failed: ", error);
                    });
                    }
                });
            });
          */
        });       
      }
  },
  mounted() {
    this.drawMap()
    //this.saveAlerts(alerts)
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
  height: 800px;
}
</style>