<template>
  <div id="navBar">
    <b-navbar toggleable="lg" type="dark" style="background-color: #00473B;" fixed="top">
      <b-navbar-brand>RED ANANSI</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-navbar-nav>
          <b-nav-item to="/" @click="changeView('map')">Mapa</b-nav-item>
          <b-nav-item to="/" @click="changeView('table')">Tabla</b-nav-item>
          <b-nav-item to="/" @click="changeView('statistics')">Estadísticas</b-nav-item>
          <b-nav-item v-if="userIsAdmin" to="/" @click="changeView('users')">Users</b-nav-item>
        </b-navbar-nav>
        <b-button
          v-if="!isUserAuthenticated"
          v-b-modal.login
          size="sm"
          class="text-light my-2 my-sm-0"
          type="submit"
          variant="warning"
          >Entrar</b-button
        >
        <b-dropdown class="text-light" variant="warning" right v-if="isUserAuthenticated">
          <b-dropdown-item disabled>{{ userName }}</b-dropdown-item>
          <b-dropdown-item
            v-if="isUserAuthenticated"
            @click="csvExport()"
            size="sm"
            class="text-light my-2 my-sm-0"
            type="submit"
            >Exportar datos</b-dropdown-item
          >

          <b-dropdown-item
            v-if="userIsAdmin"
            v-b-modal.create
            size="sm"
            class="text-light my-2 my-sm-0 mr-2"
            type="submit"
            >Crear otro usuario</b-dropdown-item
          >

          <b-dropdown-item
            v-if="isUserAuthenticated"
            @click="onSignOut()"
            size="sm"
            class="text-light my-2 my-sm-0"
            type="submit"
            >Salir</b-dropdown-item
          >

          <b-dropdown-item
            v-if="isUserAuthenticated"
            @click="showDeleteUserModal()"
            size="sm"
            class="text-light my-2 my-sm-0"
            type="submit"
            >Eliminar usuario</b-dropdown-item
          >
        </b-dropdown>
      </b-navbar-nav>
    </b-navbar>

    <b-modal
      id="delete-user"
      title="Eliminar Usuario"
      ok-title="Eliminar"
      cancel-title="Cancelar"
      ok-variant="danger"
      @ok="deleteUser()"
    >
      <h6>¿Seguro deseas eliminar este usuario?</h6>
      <h6>Esta acción no se puede deshacer.</h6>
    </b-modal>

    <b-modal
      ref="error-modal"
      title="Error"
      ok-only
      header-bg-variant="danger"
      body-bg-variant="danger"
      header-text-variant="light"
      body-text-variant="light"
      :hide-footer="true"
    >
      <p>{{ appError }}</p>
    </b-modal>

    <b-modal
      id="login"
      title="AUTENTICACIÓN"
      ok-only
      ok-title="ENTRAR"
      @ok="onSignIn()"
      @close="cleanInput()"
      @hide="cleanInput()"
    >
      <b-form-input :type="'email'" placeholder="email" v-model="email"> </b-form-input>
      <b-form-input :type="'password'" placeholder="contraseña" v-model="password" class="mt-2"> </b-form-input>
    </b-modal>

    <b-modal
      id="create"
      title="CREAR USUARIO"
      ok-only
      ok-title="CREAR"
      :hide-footer="!(this.passwordLength() && this.passwordMatch())"
      @ok="onSignUp()"
      @close="cleanInput()"
      @hide="cleanInput()"
    >
      <b-form-input :type="'text'" placeholder="nombre" v-model="displayName" class="mt-2"> </b-form-input>

      <b-form-select v-model="role" :options="opcionesRol" class="mt-2"></b-form-select>

      <b-form-input :type="'email'" placeholder="email" v-model="email" class="mt-2"> </b-form-input>
      <b-form-input
        :type="'password'"
        placeholder="contraseña"
        v-model="password"
        class="mt-2"
        :state="passwordLength()"
      >
      </b-form-input>
      <b-form-input
        :type="'password'"
        placeholder="validar contraseña"
        v-model="validatePassword"
        class="mt-2"
        :state="passwordMatch()"
      >
      </b-form-input>
    </b-modal>
  </div>
</template>

<script>
import { BNavbar, BModal, BFormInput } from 'bootstrap-vue';
import froze from '../mixins/frozen.js';

export default {
  mixins: [froze],
  data() {
    return {
      email: null,
      password: null,
      validatePassword: null,
      displayName: null,
      role: null,
      opcionesRol: [
        { value: '', text: 'Selecciona una' },
        { value: 'defensor', text: 'Defensor/a' },
        { value: 'analista', text: 'Analista' },
        { value: 'admin', text: 'Administrador' }
      ]
    };
  },
  components: {
    BNavbar,
    BModal,
    BFormInput
  },
  methods: {
    onSignUp() {
      this.$store.dispatch('signUserUp', {
        email: this.email,
        password: this.password,
        displayName: this.displayName,
        role: this.role
      });
      this.cleanInput();
    },
    onSignIn() {
      this.$store.dispatch('signUserIn', {
        email: this.email,
        password: this.password
      });
      this.cleanInput();
    },
    onSignOut() {
      this.$store.dispatch('signUserOut');
    },
    showDeleteUserModal() {
      this.$bvModal.show('delete-user');
    },
    deleteUser() {
      this.$store.dispatch('deleteAccount');
    },
    cleanInput() {
      this.email = null;
      this.password = null;
      this.validatePassword = null;
      this.role = null;
      this.displayName = null;
    },
    changeView(val) {
      this.$store.commit('SET_CURRENT_VIEW', val);
    },
    passwordLength() {
      return this.password && this.password.length > 6;
    },
    passwordMatch() {
      return this.validatePassword && this.password === this.validatePassword;
    },
    csvExport() {
      const arrData = this.alertsItems();
      let csvContent = 'data:text/csv;charset=utf-8,';
      csvContent += [Object.keys(arrData[0]).join(';'), ...arrData.map(item => Object.values(item).join(';'))]
        .join('\n')
        .replace(/(^\[)|(\]$)/gm, '');

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

        if (el.attributes.fechaOcurrencia)
          el.attributes.fechaOcurrencia = this.FormatAsDate(el.attributes.fechaOcurrencia);
        if (el.attributes.fechaValidacion)
          el.attributes.fechaValidacion = this.FormatAsDate(el.attributes.fechaValidacion);
        if (el.attributes.subcategoriaEventoEnum)
          el.attributes.subcategoriaEventoEnum = this.getObjectTexts(
            'opcionesSubcategoria',
            el.attributes.subcategoriaEventoEnum
          );

        if (el.attributes.rolVictimaEnum)
          el.attributes.rolVictimaEnum = this.getObjectTexts('opcionesRol', el.attributes.rolVictimaEnum);

        if (el.attributes.discapacidadEnum)
          el.attributes.discapacidadEnum = this.getObjectTexts('opcionesDiscapacidad', el.attributes.discapacidadEnum);

        if (el.attributes.tipoResponsableEnum)
          el.attributes.tipoResponsableEnum = this.getObjectTexts(
            'opcionesResponsables',
            el.attributes.tipoResponsableEnum
          );

        if (el.attributes.afectadosEnum)
          el.attributes.afectadosEnum = this.getObjectTexts('opcionesAfectados', el.attributes.afectadosEnum);

        if (el.attributes.etniaAfectadosEnum)
          el.attributes.etniaAfectadosEnum = this.getObjectTexts(
            'opcionesEtniaAfectados',
            el.attributes.etniaAfectadosEnum
          );

        if (el.attributes.derechosDDHEnum)
          el.attributes.derechosDDHEnum = this.getObjectTexts('opcionesDerechos', el.attributes.derechosDDHEnum);

        if (el.attributes.institucionesEnum)
          el.attributes.institucionesEnum = this.getObjectTexts(
            'opcionesInstituciones',
            el.attributes.institucionesEnum
          );

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
    isUserAuthenticated() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
    },
    userIsAdmin() {
      return this.isUserAuthenticated && this.$store.getters.user.role === 'admin';
    },
    userName() {
      if (this.$store.getters.user) return this.$store.getters.user.email;
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
