<template>
  <div id="table">
    <h4>REPORTES DE DDHH</h4>
    <br />
    <b-table responsive sticky-header="700px" striped hover light selectable :items="this.getItems()" :fields="this.getFields()" @row-selected="onRowSelected"> </b-table>
    <excel-helper tableType="PATR" title="Descargar reportes PATR" />
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue';
import froze from '@/mixins/frozen.js';
import PublicPolicyOptions from '@/mixins/public-policy-options.js';
import ExcelHelper from '@/components/ExcelHelper.vue';

export default {
  mixins: [froze, PublicPolicyOptions],
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
    onRowSelected(items) {
      if (items) this.$router.push('/seepatrreport/' + items[0].OBJECTID);
    },
    getFields() {
      let headers = [
        { key: 'fechaOcurrencia', tdClass: 'w-5', label: 'Fecha reporte', sortable: true },
        { key: 'subregion', tdClass: 'w-5', label: 'Subregion', sortable: true },
        { key: 'municipio', tdClass: 'w-5', label: 'Departamento' },
        { key: 'pilar', tdClass: 'w-3', label: 'Pilar' },
        { key: 'tipoReporte', tdClass: 'w-5', label: 'Tipo de Reporte' },
        { key: 'iniciativa', tdClass: 'w-5', label: 'Iniciativa' },
        { key: 'ver', tdClass: 'w-5', label: '' }
      ];
      return headers;
    },
    getItems() {
      const features = this.policies;
      let items = [];

      if (features != undefined && features.length >= 1) {
        for (var i = 0; i < features.length; i++) {
          items.push(this.getPublicItems(features[i].attributes));
        }
      }
      return items;
    },
    getPublicItems(feature) {
      return {
        fechaOcurrencia: this.FormatAsDate(feature.fechaOcurrencia),
        subregion: this.FormatForHuman(feature.subregion),
        municipio: this.FormatForHuman(feature.municipio),
        pilar: this.FormatForHuman(feature.pilar),
        iniciativa: this.getPolicyTexts(this.getObjectByMunicipio(feature.municipio), feature.codigoIniciativa),
        tipoReporte: this.FormatForHuman(feature.tipoReporte),
        OBJECTID: feature.OBJECTID,
        ver: 'Ver'
      };
    }
  },
  computed: {
    policies() {
      return this.$store.getters.policies;
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
