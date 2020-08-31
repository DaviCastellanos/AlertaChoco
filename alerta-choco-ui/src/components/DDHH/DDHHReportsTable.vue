<template>
  <div id="table">
    <h4>REPORTES DE DDHH</h4>
    <br />
    <b-table responsive sticky-header="700px" striped hover light selectable :items="this.getItems()" :fields="this.getFields()" @row-selected="onRowSelected"> </b-table>
    <b-button-group>
      <div class="mt-2">
        <b-button @click="getAllFollowUps()">Descargar seguimientos a reportes de DDHH</b-button>
      </div>
      <excel-helper tableType="DDHH" title="Descargar reportes DDHH" />
    </b-button-group>

    <b-modal ref="follow-ups-download" title="DESCARGA DE SEGUIMIENTOS" :hide-footer="true">
      <excel-helper tableType="FOLLOWUPS" title="Descargar seguimientos a reportes DDHH" />
    </b-modal>
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue';
import froze from '@/mixins/frozen.js';
import ExcelHelper from '@/components/ExcelHelper.vue';
import FollowUpsService from '@/services/follow-ups-service.js';
import helpers from '@/mixins/helpers.js';

export default {
  mixins: [froze, helpers],
  components: {
    BTable,
    ExcelHelper
  },
  data() {
    return {
      selectedAlert: Number
    };
  },
  methods: {
    async getAllFollowUps() {
      const followUps = await FollowUpsService.getAllFollowUps(this.$store.arcgisToken, this.userAccess);

      if (!followUps) {
        console.error('Follow ups are null');
        return;
      }

      this.$store.commit('SET_FOLLOW_UPS', followUps);
      this.$refs['follow-ups-download'].show();
    },
    onRowSelected(items) {
      this.$router.push('/seereport/' + items[0].idAlerta);
    },
    getFields() {
      let headers = [
        { key: 'fechaReporte', tdClass: 'w-5', label: 'Fecha de alerta', sortable: true },
        { key: 'verificado', tdClass: 'w-5', label: 'Validado', sortable: true },
        { key: 'departamentoOcurrencia', tdClass: 'w-5', label: 'Departamento' },
        { key: 'municipioOcurrencia', tdClass: 'w-3', label: 'Municipio' },
        { key: 'categoriaEvento', tdClass: 'w-5', label: 'Categoría' },
        { key: 'subcategoriaEventoEnum', tdClass: 'w-5', label: 'Subcategoría' },
        { key: 'ver', tdClass: 'w-5', label: '' }
      ];
      return headers;
    },
    getItems() {
      const features = this.alerts;
      let items = [];

      if (features != undefined && features.length > 1) {
        for (var i = 0; i < features.length; i++) {
          items.push(this.getPublicItems(features[i].attributes));
        }
      }

      return items;
    },
    getPublicItems(feature) {
      return {
        fechaReporte: this.FormatAsDate(feature.fechaReporte),
        verificado: this.FormatForHuman(feature.verificado),
        departamentoOcurrencia: this.FormatForHuman(feature.departamentoOcurrencia),
        municipioOcurrencia: this.FormatForHuman(feature.municipioOcurrencia),
        categoriaEvento: this.FormatForHuman(feature.categoriaEvento),
        subcategoriaEventoEnum: this.getObjectTexts('opcionesSubcategoria', feature.subcategoriaEventoEnum),
        idAlerta: feature.idAlerta,
        ver: 'Ver'
      };
    }
  },
  computed: {
    alerts() {
      return this.$store.getters.alerts;
    }
  }
};
</script>

<style scoped>
#table {
  padding: 2%;
  margin: 2px;
  width: 100%;
  height: 100%;
}
</style>
