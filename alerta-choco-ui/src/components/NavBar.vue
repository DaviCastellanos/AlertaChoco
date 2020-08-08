<template>
  <div id="navBar">
    <b-navbar
      toggleable="lg"
      type="dark"
      style="background-color: #00473B;"
      fixed="top"
    >
      <b-navbar-brand>RED ANANSI</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-navbar-nav v-if="isUserAuthenticated">
          <b-nav-item to="/" @click="changeView('map')">Mapa</b-nav-item>
          <b-nav-item to="/" @click="changeView('table')">Tabla</b-nav-item>
          <b-nav-item to="/" @click="changeView('statistics')"
            >Estadísticas</b-nav-item
          >
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
        <b-dropdown
          class="text-light"
          variant="warning"
          right
          v-if="isUserAuthenticated"
        >
          <b-dropdown-item disabled>{{ userName }}</b-dropdown-item>
          <b-dropdown-item
            v-if="userIsAdmin"
            v-b-modal.create
            size="sm"
            class="text-light my-2 my-sm-0 mr-2"
            type="submit"
            >Crear usuario</b-dropdown-item
          >
          <b-dropdown-item
            v-if="isUserAuthenticated"
            @click="onSignOut()"
            size="sm"
            class="text-light my-2 my-sm-0"
            type="submit"
            >Salir</b-dropdown-item
          >
        </b-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <b-modal
      id="login"
      title="AUTENTICACIÓN"
      ok-only
      ok-title="ENTRAR"
      @ok="onSignIn()"
      @close="cleanInput()"
      @hide="cleanInput()"
    >
      <b-form-input :type="'email'" placeholder="email" v-model="email">
      </b-form-input>
      <b-form-input
        :type="'password'"
        placeholder="contraseña"
        v-model="password"
        class="mt-2"
      >
      </b-form-input>
    </b-modal>

    <b-modal
      id="create"
      title="CREAR USUARIO"
      ok-only
      ok-title="CREAR"
      @ok="onSignUp()"
      @close="cleanInput()"
      @hide="cleanInput()"
    >
      <b-form-input :type="'email'" placeholder="email" v-model="email">
      </b-form-input>
      <b-form-input
        :type="'password'"
        placeholder="contraseña"
        v-model="password"
        class="mt-2"
      >
      </b-form-input>
    </b-modal>
  </div>
</template>

<script>
import { BNavbar, BModal, BFormInput } from "bootstrap-vue";

export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  components: {
    BNavbar,
    BModal,
    BFormInput,
  },
  methods: {
    onSignUp() {
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password,
      });
      this.cleanInput();
    },
    onSignIn() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password,
      });
      this.cleanInput();
    },
    onSignOut() {
      this.$store.dispatch("signUserOut");
    },
    cleanInput() {
      this.email = null;
      this.password = null;
    },
    changeView(val) {
      this.$store.commit("SET_CURRENT_VIEW", val);
    },
  },
  computed: {
    isUserAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsAdmin() {
      return (
        this.isUserAuthenticated && this.$store.getters.user.role === "admin"
      );
    },
    userName() {
      if (this.$store.getters.user) return this.$store.getters.user.email;
      else return "";
    },
  },
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
