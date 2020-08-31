<template>
  <div id="table" v-if="userIsAdmin">
    <b-table responsive striped light :items="this.getItems()" :fields="this.getFields()"> </b-table>
    <b-modal id="create" title="CREAR USUARIO" ok-only ok-title="CREAR" :hide-footer="!(this.passwordLength() && this.passwordMatch())" @ok="onSignUp()" @close="cleanInput()" @hide="cleanInput()">
      <b-form-input :type="'text'" placeholder="nombre" v-model="displayName" class="mt-2"> </b-form-input>

      <b-form-select v-model="role" :options="opcionesRol" class="mt-2"></b-form-select>
      <b-form-input :type="'text'" placeholder="código anansi" v-model="anansiCode" class="mt-2"> </b-form-input>
      <b-form-input :type="'text'" placeholder="telefono" v-model="telefono" class="mt-2"> </b-form-input>

      <b-form-input :type="'email'" placeholder="email" v-model="email" class="mt-2"> </b-form-input>
      <b-form-input :type="'password'" placeholder="contraseña" v-model="password" class="mt-2" :state="passwordLength()"> </b-form-input>
      <b-form-input :type="'password'" placeholder="validar contraseña" v-model="validatePassword" class="mt-2" :state="passwordMatch()"> </b-form-input>
    </b-modal>
    <br />
    <b-button v-if="userIsAuthenticated" block v-b-modal.create size="lg" type="submit" variant="warning">Crear otro usuario</b-button>
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue';
import helpers from '@/mixins/helpers.js';

export default {
  mixins: [helpers],
  components: {
    BTable
  },
  data() {
    return {
      email: null,
      password: null,
      validatePassword: null,
      displayName: null,
      role: null,
      anansiCode: null,
      telefono: null,
      opcionesRol: [
        { value: '', text: 'Selecciona una' },
        { value: 'defensor', text: 'Defensor/a' },
        { value: 'analista', text: 'Analista' },
        { value: 'admin', text: 'Administrador' }
      ]
    };
  },
  methods: {
    onSignUp() {
      this.$store.dispatch('signUserUp', {
        email: this.email,
        password: this.password,
        displayName: this.displayName,
        role: this.role,
        anansiCode: this.anansiCode,
        tel: this.telefono
      });
      this.cleanInput();
    },
    cleanInput() {
      this.email = null;
      this.password = null;
      this.validatePassword = null;
      this.role = null;
      this.displayName = null;
      this.oldPassword = null;
      this.anansiCode = null;
      this.telefono = null;
    },
    passwordLength() {
      return this.password && this.password.length > 6;
    },
    passwordMatch() {
      return this.validatePassword && this.password === this.validatePassword;
    },
    getFields() {
      return [
        { key: 'mail', tdClass: 'w-5', label: 'Correo' },
        { key: 'role', tdClass: 'w-5', label: 'Rol' },
        { key: 'anansiCode', tdClass: 'w-5', label: 'Código Anansi' },
        { key: 'tel', tdClass: 'w-5', label: 'Teléfono' }
      ];
    },
    getItems() {
      const users = this.$store.getters.users;

      if (!users) return;

      let items = [];
      //console.log('GetItems Users ', this.$store.getters.users.length);

      if (users != undefined && users.length >= 1) {
        for (var i = 0; i < users.length; i++) {
          items.push({
            mail: users[i].attributes.email,
            role: users[i].attributes.role,
            anansiCode: users[i].attributes.anansiCode,
            tel: users[i].attributes.tel
          });
        }
      }
      return items;
    }
  }
};
</script>

<style scoped>
#table {
  padding: 2%;
  width: 100%;
  height: 100%;
}
</style>
