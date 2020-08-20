<template>
  <div id="table">
    <b-modal
      id="deletion-modal"
      title="Eliminar Reporte"
      ok-title="Eliminar"
      cancel-title="Cancelar"
      ok-variant="danger"
      @ok="deleteAlert()"
    >
      <h6>¿Seguro deseas eliminar el reporte?</h6>
      <h6>Esta informacion no se puede recuperar.</h6>
    </b-modal>

    <b-table responsive sticky-header="750px" striped hover light :items="this.getItems()" :fields="this.getFields()">
      <template v-slot:cell(relatoQue)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(relatoQuien)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(relatoComo)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(relatoCuando)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(relatoDonde)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(situacionActual)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(primerMensaje)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(recibeLlamada)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(botonVerificar)="data">
        <b-button v-if="userCanVerify" size="sm" :to="data.value" class="mr-2" variant="warning">Verificar</b-button>
      </template>
      <template v-slot:cell(botonSeguir)="data">
        <b-button v-if="userIsAuthenticated" size="sm" :to="data.value" class="mr-2" variant="warning">Seguir</b-button>
      </template>
      <template v-slot:cell(botonEliminar)="data">
        <b-button v-if="userIsAdmin" size="sm" @click="ShowDeleteModal(data.value)" class="mr-2" variant="danger"
          >Eliminar</b-button
        >
      </template>
    </b-table>
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
    getFields() {
      let headers = [
        { key: 'fechaReporte', tdClass: 'w-5', label: 'Ingresó al sistema', sortable: true },
        { key: 'verificado', tdClass: 'w-5', label: 'Verificado por analista', sortable: true },
        { key: 'fechaOcurrencia', tdClass: 'w-5', label: 'Fecha de ocurrencia' },
        { key: 'departamentoOcurrencia', tdClass: 'w-5', label: 'Departamento' },
        { key: 'municipioOcurrencia', tdClass: 'w-3', label: 'Municipio' },
        { key: 'entornoOcurrencia', tdClass: 'w-3', label: 'Entorno' },
        { key: 'tipoEvento', tdClass: 'w-5', label: 'Tipo de evento' },
        { key: 'categoriaEvento', tdClass: 'w-5', label: 'Categoría' },
        { key: 'subcategoriaEventoEnum', tdClass: 'w-5', label: 'Subcategoría' },
        { key: 'etniaVictima', tdClass: 'w-5', label: 'Pertenencia Étnica' },
        { key: 'rolVictimaEnum', tdClass: 'w-5', label: 'Rol' },
        { key: 'discapacidadEnum', tdClass: 'w-5', label: 'Discapacidad' },
        { key: 'sexo', tdClass: 'w-3', label: 'Sexo' },
        { key: 'identidadGenero', tdClass: 'w-3', label: 'Genero' },
        { key: 'edadVictima', tdClass: 'w-5', label: 'Edad' },
        { key: 'medidasProteccionExistentes', tdClass: 'w-5', label: 'Medidas de protección' },
        { key: 'otrasVictimas', tdClass: 'w-5', label: 'Otras victimas' },
        { key: 'totalVictimas', tdClass: 'w-5', label: 'Número total de víctimas' },
        { key: 'otrasVictimasNombres', tdClass: 'w-5', label: 'Nombres otras víctimas' },
        { key: 'relacionVictima', tdClass: 'w-5', label: 'Relación con la víctima principal' },
        { key: 'afectadosEnum', tdClass: 'w-3', label: 'Tipo de sujeto afectado' },
        { key: 'familias', tdClass: 'w-3', label: 'Número de familias' },
        { key: 'numeroPersonas', tdClass: 'w-5', label: 'Número de personas' },
        { key: 'derechosDDHEnum', tdClass: 'w-5', label: 'Derechos límitados' },
        { key: 'tipoResponsableEnum', tdClass: 'w-5', label: 'Tipo de presunto responsable' }
      ];

      if (this.userAccess == 'sensitive' || this.userAccess == 'private') {
        const sensitive = [
          { key: 'primerMensaje', tdClass: 'w-5', label: 'Primer mensaje' },
          { key: 'puedeReportar', tdClass: 'w-5', label: 'Puede reportar' },
          { key: 'relatoQue', tdClass: 'w-5', label: 'Qué' },
          { key: 'relatoQuien', tdClass: 'w-5', label: 'Quién' },
          { key: 'relatoDonde', tdClass: 'w-3', label: 'Dónde' },
          { key: 'relatoCuando', tdClass: 'w-3', label: 'Cuándo' },
          { key: 'relatoComo', tdClass: 'w-5', label: 'Como' },
          { key: 'situacionActual', tdClass: 'w-5', label: 'Situación actual' },
          { key: 'recibeLlamada', tdClass: 'w-5', label: 'Puede recibir llamada' },
          { key: 'fechaValidacion', tdClass: 'w-5', label: 'Fecha de validación' },
          { key: 'territorioColectivo', tdClass: 'w-5', label: 'Territorio colectivo' },
          { key: 'barrio', tdClass: 'w-5', label: 'Barrio' },
          { key: 'presuntoResponsable', tdClass: 'w-5', label: 'Presunto responsable' },
          { key: 'situacionAsociada', tdClass: 'w-5', label: 'Situación asociada' },
          { key: 'accionesMitigacion', tdClass: 'w-5', label: 'Acciones de mitigación' },
          { key: 'riesgoPercibido', tdClass: 'w-5', label: 'Riesgo percibido' },
          { key: 'institucionesEnum', tdClass: 'w-3', label: 'Instituciones informadas' }
        ];
        Array.prototype.push.apply(headers, sensitive);
      }

      if (this.userAccess == 'private') {
        const privateHeaders = [
          { key: 'telefono', tdClass: 'w-5', label: 'Teléfono' },
          { key: 'codigoAnansi', tdClass: 'w-5', label: 'Código ANANSI' },
          { key: 'nombreVictima', tdClass: 'w-5', label: 'Nombre de víctima' },
          { key: 'completado', tdClass: 'w-5', label: 'Alerta completada' }
        ];
        Array.prototype.push.apply(headers, privateHeaders);
      }

      Array.prototype.push.apply(headers, [{ key: 'botonVerificar', tdClass: 'w-5', label: '' }]);
      Array.prototype.push.apply(headers, [{ key: 'botonSeguir', tdClass: 'w-5', label: '' }]);
      Array.prototype.push.apply(headers, [{ key: 'botonEliminar', tdClass: 'w-5', label: '' }]);
      return headers;
    },
    getItems() {
      const features = this.$store.getters.alerts;
      let items = [];

      if (features != undefined && features.length > 1) {
        for (var i = 0; i < features.length; i++) {
          if (this.userAccess == 'private') items.push(this.getPrivateItems(features[i].attributes));
          else if (this.userAccess == 'sensitive') items.push(this.getSensitiveItems(features[i].attributes));
          else items.push(this.getPublicItems(features[i].attributes));
        }
      }
      return items;
    },
    getPublicItems(feature) {
      return {
        fechaReporte: this.FormatAsDate(feature.fechaReporte),
        verificado: this.FormatForHuman(feature.verificado),
        fechaOcurrencia: this.FormatAsDate(feature.fechaOcurrencia),
        departamentoOcurrencia: this.FormatForHuman(feature.departamentoOcurrencia),
        municipioOcurrencia: this.FormatForHuman(feature.municipioOcurrencia),
        entornoOcurrencia: this.FormatForHuman(feature.entornoOcurrencia),
        tipoEvento: this.FormatForHuman(feature.tipoEvento),
        categoriaEvento: this.FormatForHuman(feature.categoriaEvento),
        subcategoriaEventoEnum: this.getObjectTexts('opcionesSubcategoria', feature.subcategoriaEventoEnum),
        etniaVictima: this.FormatForHuman(feature.etniaVictima),
        rolVictimaEnum: this.getObjectTexts('opcionesRol', feature.rolVictimaEnum),
        discapacidadEnum: this.getObjectTexts('opcionesDiscapacidad', feature.discapacidadEnum),
        sexo: this.FormatForHuman(feature.sexo),
        identidadGenero: this.FormatForHuman(feature.identidadGenero),
        edadVictima: feature.edadVictima,
        medidasProteccionExistentes: this.FormatForHuman(feature.medidasProteccionExistentes),
        otrasVictimas: this.FormatForHuman(feature.otrasVictimas),
        totalVictimas: feature.totalVictimas,
        otrasVictimasNombres: this.FormatForHuman(feature.otrasVictimasNombres),
        relacionVictima: this.FormatForHuman(feature.relacionVictima),
        afectadosEnum: this.getObjectTexts('opcionesAfectados', feature.afectadosEnum),
        familias: feature.familias,
        numeroPersonas: feature.numeroPersonas,
        derechosDDHEnum: this.getObjectTexts('opcionesDerechos', feature.derechosDDHEnum),
        tipoResponsableEnum: this.getObjectTexts('opcionesResponsables', feature.tipoResponsableEnum),
        botonVerificar: '/verify/' + feature.idAlerta
      };
    },
    getSensitiveItems(feature) {
      return {
        fechaReporte: this.FormatAsDate(feature.fechaReporte),
        verificado: this.FormatForHuman(feature.verificado),
        fechaOcurrencia: this.FormatAsDate(feature.fechaOcurrencia),
        departamentoOcurrencia: this.FormatForHuman(feature.departamentoOcurrencia),
        municipioOcurrencia: this.FormatForHuman(feature.municipioOcurrencia),
        entornoOcurrencia: this.FormatForHuman(feature.entornoOcurrencia),
        tipoEvento: this.FormatForHuman(feature.tipoEvento),
        categoriaEvento: this.FormatForHuman(feature.categoriaEvento),
        subcategoriaEventoEnum: this.getObjectTexts('opcionesSubcategoria', feature.subcategoriaEventoEnum),
        etniaVictima: this.FormatForHuman(feature.etniaVictima),
        rolVictimaEnum: this.getObjectTexts('opcionesRol', feature.rolVictimaEnum),
        discapacidadEnum: this.getObjectTexts('opcionesDiscapacidad', feature.discapacidadEnum),
        sexo: this.FormatForHuman(feature.sexo),
        identidadGenero: this.FormatForHuman(feature.identidadGenero),
        edadVictima: feature.edadVictima,
        medidasProteccionExistentes: this.FormatForHuman(feature.medidasProteccionExistentes),
        otrasVictimas: this.FormatForHuman(feature.otrasVictimas),
        totalVictimas: feature.totalVictimas,
        otrasVictimasNombres: this.FormatForHuman(feature.otrasVictimasNombres),
        relacionVictima: this.FormatForHuman(feature.relacionVictima),
        afectadosEnum: this.getObjectTexts('opcionesAfectados', feature.afectadosEnum),
        familias: feature.familias,
        numeroPersonas: feature.numeroPersonas,
        derechosDDHEnum: this.getObjectTexts('opcionesDerechos', feature.derechosDDHEnum),
        tipoResponsableEnum: this.getObjectTexts('opcionesResponsables', feature.tipoResponsableEnum),
        botonVerificar: '/verify/' + feature.idAlerta,
        botonSeguir: '/followup/' + feature.idAlerta,
        primerMensaje: this.FormatForHuman(feature.primerMensaje),
        puedeReportar: this.FormatForHuman(feature.puedeReportar),
        relatoQue: this.FormatForHuman(feature.relatoQue),
        relatoQuien: this.FormatForHuman(feature.relatoQuien),
        relatoComo: this.FormatForHuman(feature.relatoComo),
        relatoCuando: this.FormatForHuman(feature.relatoCuando),
        relatoDonde: this.FormatForHuman(feature.relatoDonde),
        situacionActual: this.FormatForHuman(feature.situacionActual),
        recibeLlamada: this.FormatForHuman(feature.recibeLlamada),
        fechaValidacion: this.FormatAsDate(feature.fechaValidacion),
        territorioColectivo: this.FormatForHuman(feature.territorioColectivo),
        barrio: this.FormatForHuman(feature.barrio),
        presuntoResponsable: this.FormatForHuman(feature.presuntoResponsable),
        situacionAsociada: this.FormatForHuman(feature.situacionAsociada),
        accionesMitigacion: this.FormatForHuman(feature.accionesMitigacion),
        riesgoPercibido: this.FormatForHuman(feature.riesgoPercibido),
        institucionesEnum: this.getObjectTexts('opcionesInstituciones', feature.institucionesEnum)
      };
    },
    getPrivateItems(feature) {
      return {
        fechaReporte: this.FormatAsDate(feature.fechaReporte),
        verificado: this.FormatForHuman(feature.verificado),
        fechaOcurrencia: this.FormatAsDate(feature.fechaOcurrencia),
        departamentoOcurrencia: this.FormatForHuman(feature.departamentoOcurrencia),
        municipioOcurrencia: this.FormatForHuman(feature.municipioOcurrencia),
        entornoOcurrencia: this.FormatForHuman(feature.entornoOcurrencia),
        tipoEvento: this.FormatForHuman(feature.tipoEvento),
        categoriaEvento: this.FormatForHuman(feature.categoriaEvento),
        subcategoriaEventoEnum: this.getObjectTexts('opcionesSubcategoria', feature.subcategoriaEventoEnum),
        etniaVictima: this.FormatForHuman(feature.etniaVictima),
        rolVictimaEnum: this.getObjectTexts('opcionesRol', feature.rolVictimaEnum),
        discapacidadEnum: this.getObjectTexts('opcionesDiscapacidad', feature.discapacidadEnum),
        sexo: this.FormatForHuman(feature.sexo),
        identidadGenero: this.FormatForHuman(feature.identidadGenero),
        edadVictima: feature.edadVictima,
        medidasProteccionExistentes: this.FormatForHuman(feature.medidasProteccionExistentes),
        otrasVictimas: this.FormatForHuman(feature.otrasVictimas),
        totalVictimas: feature.totalVictimas,
        otrasVictimasNombres: this.FormatForHuman(feature.otrasVictimasNombres),
        relacionVictima: this.FormatForHuman(feature.relacionVictima),
        afectadosEnum: this.getObjectTexts('opcionesAfectados', feature.afectadosEnum),
        familias: feature.familias,
        numeroPersonas: feature.numeroPersonas,
        derechosDDHEnum: this.getObjectTexts('opcionesDerechos', feature.derechosDDHEnum),
        tipoResponsableEnum: this.getObjectTexts('opcionesResponsables', feature.tipoResponsableEnum),
        botonVerificar: '/verify/' + feature.idAlerta,
        botonSeguir: '/followup/' + feature.idAlerta,
        primerMensaje: this.FormatForHuman(feature.primerMensaje),
        puedeReportar: this.FormatForHuman(feature.puedeReportar),
        relatoQue: this.FormatForHuman(feature.relatoQue),
        relatoQuien: this.FormatForHuman(feature.relatoQuien),
        relatoComo: this.FormatForHuman(feature.relatoComo),
        relatoCuando: this.FormatForHuman(feature.relatoCuando),
        relatoDonde: this.FormatForHuman(feature.relatoDonde),
        situacionActual: this.FormatForHuman(feature.situacionActual),
        recibeLlamada: this.FormatForHuman(feature.recibeLlamada),
        fechaValidacion: this.FormatAsDate(feature.fechaValidacion),
        territorioColectivo: this.FormatForHuman(feature.territorioColectivo),
        barrio: this.FormatForHuman(feature.barrio),
        presuntoResponsable: this.FormatForHuman(feature.presuntoResponsable),
        situacionAsociada: this.FormatForHuman(feature.situacionAsociada),
        accionesMitigacion: this.FormatForHuman(feature.accionesMitigacion),
        riesgoPercibido: this.FormatForHuman(feature.riesgoPercibido),
        institucionesEnum: this.getObjectTexts('opcionesInstituciones', feature.institucionesEnum),
        telefono: this.FormatForHuman(feature.telefono),
        codigoAnansi: this.FormatForHuman(feature.codigoAnansi),
        nombreVictima: this.FormatForHuman(feature.nombreVictima),
        completado: this.FormatForHuman(feature.completado),
        botonEliminar: feature.OBJECTID
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
