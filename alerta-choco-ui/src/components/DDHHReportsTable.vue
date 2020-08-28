<template>
  <div id="table">
    <b-table responsive sticky-header="700px" striped hover light selectable :items="this.getItems()" :fields="this.getFields()" @row-selected="onRowSelected"> </b-table>
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue';
import froze from '../mixins/frozen.js';

export default {
  mixins: [froze],
  components: {
    BTable
  },
  data() {
    return {
      selectedAlert: Number
    };
  },
  methods: {
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
        { key: 'subcategoriaEventoEnum', tdClass: 'w-5', label: 'Subcategoría' }
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
        idAlerta: feature.idAlerta
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
  padding: 0;
  margin: 2px;
  width: 100%;
  height: 100%;
}
</style>
