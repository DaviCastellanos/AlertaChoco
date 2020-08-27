<template>
  <div id="table">
    <b-modal id="deletion-modal" title="Eliminar Reporte" ok-title="Eliminar" cancel-title="Cancelar" ok-variant="danger" @ok="deleteAlert()">
      <h6>¿Seguro deseas eliminar el reporte?</h6>
      <h6>Esta informacion no se puede recuperar.</h6>
    </b-modal>

    <b-table responsive sticky-header="700px" striped hover light selectable :items="this.getItems()" :fields="this.getFields()" @row-selected="onRowSelected"> </b-table>
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue';
import froze from '../mixins/frozen.js';
import { AlertsService } from '@/services';

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
        { key: 'fechaReporte', tdClass: 'w-5', label: 'Ingresó al sistema', sortable: true },
        { key: 'verificado', tdClass: 'w-5', label: 'Verificado por analista', sortable: true },
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
    },
    ShowDeleteModal(id) {
      this.selectedAlert = id;
      this.$bvModal.show('deletion-modal');
    },
    async deleteAlert() {
      const response = await AlertsService.deleteAlert(this.selectedAlert);
      console.log(response);
      if (!response.deleteResults[0].success) {
        this.$store.commit('SET_APP_ERROR', response.deleteResults[0].error.description);
      } else {
        const newAlerts = this.$store.getters.alerts.filter(el => {
          if (el.attributes.OBJECTID != this.selectedAlert) return true;
          return false;
        });
        this.$store.commit('SET_ALERTS', newAlerts);
      }
    }
  },
  computed: {
    alerts() {
      return this.$store.getters.alerts;
    },
    userCanVerify() {
      if (this.userAccess == 'private') return true;

      return false;
    },
    userAccess() {
      if (!this.$store.getters.user || !this.$store.getters.user.role) return 'public';
      const role = this.$store.getters.user.role;
      if (role === 'admin' || role === 'analista') return 'private';
      if (role === 'defensor') return 'sensitive';
      return null;
    },
    userIsAdmin() {
      if (!this.$store.getters.user) return false;

      return this.$store.getters.user.role == 'admin';
    },
    userIsAuthenticated() {
      if (!this.$store.getters.user) return false;

      return true;
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
