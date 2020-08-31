<template>
  <div id="navBar">
    <b-navbar toggleable="lg" type="light" style="background-color: #FFFFFF;" fixed="top">
      <b-navbar-brand> <img src="@/images/logo-codhes.png" height="30" /> <img src="@/images/logo-fisch.png" height="40" /> Anansi: red de protección y monitoreo</b-navbar-brand>

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
