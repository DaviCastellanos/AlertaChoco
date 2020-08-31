<template>
  <div id="Buttons">
    <div>
      <b-button v-if="userIsAuthenticated" block @click="onSignOut()" size="lg" type="submit" variant="outline-warning">Salir</b-button>
    </div>

    <div>
      <b-button v-if="userIsAuthenticated" block @click="showDeleteUserModal()" size="lg" type="submit" variant="outline-warning">Eliminar este usuario</b-button>
    </div>

    <div>
      <b-button v-if="userIsAuthenticated" block v-b-modal.change-password size="lg" type="submit" variant="outline-warning">Cambiar contraseña</b-button>
    </div>

    <b-modal id="delete-user" title="Eliminar Usuario" ok-title="Eliminar" cancel-title="Cancelar" ok-variant="danger" @ok="deleteUser()">
      <h6>¿Seguro deseas eliminar este usuario?</h6>
      <h6>Esta acción no se puede deshacer.</h6>
    </b-modal>

    <b-modal id="change-password" title="CAMBIAR CONTRASEÑA" ok-only ok-title="GUARDAR NUEVA CONTRASEÑA" :hide-footer="!(this.passwordLength() && this.passwordMatch())" @ok="onChangePassword()" @close="cleanInput()" @hide="cleanInput()">
      <b-form-input :type="'email'" placeholder="email" v-model="email" class="mt-2"> </b-form-input>
      <b-form-input :type="'password'" placeholder="contraseña actual" v-model="oldPassword" class="mt-2" :state="passwordLength()"> </b-form-input>
      <br />
      <b-form-input :type="'password'" placeholder="nueva contraseña" v-model="password" class="mt-2" :state="passwordLength()"> </b-form-input>
      <b-form-input :type="'password'" placeholder="validar contraseña" v-model="validatePassword" class="mt-2" :state="passwordMatch()"> </b-form-input>
    </b-modal>
  </div>
</template>

<script>
import helpers from '@/mixins/helpers.js';

export default {
  mixins: [helpers],
  data() {
    return {
      email: null,
      password: null,
      validatePassword: null,
      oldPassword: null
    };
  },
  methods: {
    onChangePassword() {
      this.$store.dispatch('changeUserPassword', {
        password: this.password,
        oldPassword: this.oldPassword,
        email: this.email
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
      this.oldPassword = null;
      this.validatePassword = null;
    },
    changeView(val) {
      this.$store.commit('SET_CURRENT_VIEW', val);
    },
    passwordLength() {
      return this.password && this.password.length > 6;
    },
    passwordMatch() {
      return this.validatePassword && this.password === this.validatePassword;
    }
  }
};
</script>

<style scoped>
#Buttons {
  margin-top: 5%;
  margin-bottom: 5%;
}
</style>
