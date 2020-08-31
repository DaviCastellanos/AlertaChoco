<template>
  <div id="navBar">
    <b-navbar toggleable="lg" type="light" style="background-color: #FFFFFF;" fixed="top">
      <b-navbar-brand> <img src="@/images/logo-codhes.png" height="30" /> <img src="@/images/logo-fisch.png" height="30" /> Anansi: red de protección y monitoreo</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/">Inicio</b-nav-item>
          <b-nav-item to="/userstable" v-if="userIsAdmin">Usuarios</b-nav-item>

          <b-nav-item-dropdown class="text-light" text="Ver reportes" no-caret right>
            <b-dropdown-item size="sm" class="text-light my-2 my-sm-0" to="/seeddhhreports" type="submit"> DDHH </b-dropdown-item>
            <b-dropdown-item size="sm" class="text-light my-2 my-sm-0" to="/seepatrreports" type="submit"> PATR </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown v-if="userAccessIsPrivate" class="text-light" text="Crear reporte" no-caret right>
            <b-dropdown-item size="sm" class="text-light my-2 my-sm-0" to="/createddhhreport" type="submit"> DDHH </b-dropdown-item>
            <b-dropdown-item size="sm" class="text-light my-2 my-sm-0" to="/createpatrreport" type="submit"> PATR </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-button v-if="!userIsAuthenticated" v-b-modal.login size="sm" class="text-light my-2 my-sm-0" type="submit" variant="warning">Entrar</b-button>
          <b-button v-if="userIsAuthenticated" to="/userpanel" size="sm" class="m-1" type="submit" variant="outline-warning">{{ userName }}</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-modal ref="error-modal" title="Error" ok-only header-bg-variant="danger" body-bg-variant="danger" header-text-variant="light" body-text-variant="light" :hide-footer="true">
      <p>{{ appError }}</p>
    </b-modal>

    <b-modal id="login" title="AUTENTICACIÓN" ok-only ok-title="ENTRAR" @ok="onSignIn()" @close="cleanInput()" @hide="cleanInput()">
      <b-form-input :type="'email'" placeholder="email" v-model="email"> </b-form-input>
      <b-form-input :type="'password'" placeholder="contraseña" v-model="password" class="mt-2"> </b-form-input>
    </b-modal>
  </div>
</template>

<script>
import { BNavbar, BModal, BFormInput } from 'bootstrap-vue';
import froze from '../mixins/frozen.js';
import helpers from '@/mixins/helpers.js';

export default {
  mixins: [froze, helpers],
  data() {
    return {
      email: null,
      password: null
    };
  },
  components: {
    BNavbar,
    BModal,
    BFormInput
  },
  methods: {
    onSignIn() {
      this.$store.dispatch('signUserIn', {
        email: this.email,
        password: this.password
      });
      this.cleanInput();
    },
    cleanInput() {
      this.email = null;
      this.password = null;
      this.validatePassword = null;
      this.role = null;
      this.displayName = null;
    },
    csvExport() {
      const arrData = this.alertsItems();
      let csvContent = 'data:text/csv;charset=utf-8,';
      csvContent += [Object.keys(arrData[0]).join(';'), ...arrData.map(item => Object.values(item).join(';'))].join('\n').replace(/(^\[)|(\]$)/gm, '');

      const data = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', 'ALERTAS_RED_ANANSI.csv');
      link.click();
    },
    alertsItems() {
      let items = [];
      let val = JSON.parse(JSON.stringify(this.$store.getters.alerts));
      val.forEach(el => {
        el.attributes.fechaReporte = this.FormatAsDate(el.attributes.fechaReporte);

        if (el.attributes.fechaOcurrencia) el.attributes.fechaOcurrencia = this.FormatAsDate(el.attributes.fechaOcurrencia);
        if (el.attributes.fechaValidacion) el.attributes.fechaValidacion = this.FormatAsDate(el.attributes.fechaValidacion);
        if (el.attributes.subcategoriaEventoEnum) el.attributes.subcategoriaEventoEnum = this.getObjectTexts('opcionesSubcategoria', el.attributes.subcategoriaEventoEnum);

        if (el.attributes.rolVictimaEnum) el.attributes.rolVictimaEnum = this.getObjectTexts('opcionesRol', el.attributes.rolVictimaEnum);

        if (el.attributes.discapacidadEnum) el.attributes.discapacidadEnum = this.getObjectTexts('opcionesDiscapacidad', el.attributes.discapacidadEnum);

        if (el.attributes.tipoResponsableEnum) el.attributes.tipoResponsableEnum = this.getObjectTexts('opcionesResponsables', el.attributes.tipoResponsableEnum);

        if (el.attributes.afectadosEnum) el.attributes.afectadosEnum = this.getObjectTexts('opcionesAfectados', el.attributes.afectadosEnum);

        if (el.attributes.etniaAfectadosEnum) el.attributes.etniaAfectadosEnum = this.getObjectTexts('opcionesEtniaAfectados', el.attributes.etniaAfectadosEnum);

        if (el.attributes.derechosDDHEnum) el.attributes.derechosDDHEnum = this.getObjectTexts('opcionesDerechos', el.attributes.derechosDDHEnum);

        if (el.attributes.institucionesEnum) el.attributes.institucionesEnum = this.getObjectTexts('opcionesInstituciones', el.attributes.institucionesEnum);

        if (el.attributes.telefono) el.attributes.telefono = el.attributes.telefono.replace('whatsapp:', '');

        items.push(el.attributes);
      });
      console.log('alert items ', items);
      return items;
    }
  },
  watch: {
    appError(val) {
      if (val) this.$refs['error-modal'].show();
      else this.$refs['error-modal'].hide();
    }
  },
  computed: {
    appError() {
      return this.$store.getters.appError;
    },
    userName() {
      if (this.$store.getters.user) return this.$store.getters.user.displayName;
      else return '';
    }
  }
};
</script>

<style scoped>
#navBar {
  padding: 0;
  margin: 0;
  margin-bottom: 6px;
  width: 100%;
  height: 50px;
}
</style>
