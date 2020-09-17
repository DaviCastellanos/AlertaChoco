<template>
  <div id="table" v-if="userIsAdmin">
    <b-modal id="delete-user" title="Eliminar Usuario" :hideFooter="true">
      <div v-if="!this.showSpinner">
        <h6>¿Seguro deseas eliminar este usuario?</h6>
        <h6>Esta acción no se puede deshacer.</h6>
        <br />
        <b-button size="lg" block type="submit" @click="deleteUser()" variant="danger">Eliminar</b-button>
      </div>
      <div v-if="this.showSpinner" class="text-center">
        <b-spinner variant="secondary"></b-spinner>
      </div>
    </b-modal>
    <b-table responsive striped light :items="this.getItems()" :fields="this.getFields()">
      <template v-slot:cell(deleteUser)="data">
        <b-button size="sm" @click="showDeleteUserModal(data.value)" type="submit" variant="danger">Eliminar usuario</b-button>
      </template>
    </b-table>
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
    <b-button block v-b-modal.create size="lg" type="submit" variant="warning">Crear otro usuario</b-button>
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue';
import helpers from '@/mixins/helpers.js';
import UsersService from '@/services/users-service.js';

export default {
  mixins: [helpers],
  components: {
    BTable
  },
  data() {
    return {
      userToDelete: null,
      showSpinner: false,
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
        { value: 'admin', text: 'Administrador/a' }
      ]
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    }
  },
  methods: {
    async deleteUser() {
      if (!this.userToDelete) return;
      this.showSpinner = true;
      const response = await UsersService.deleteUser(this.userToDelete);
      if (response.deleteResults[0].success) {
        const response = await UsersService.getUsers();

        if (response) {
          this.showSpinner = false;
          this.$bvModal.hide('delete-user');
          this.$store.commit('SET_USERS', response.features);
        }
      }
    },
    showDeleteUserModal(user) {
      this.userToDelete = user;
      this.$bvModal.show('delete-user');
    },
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
        { key: 'tel', tdClass: 'w-5', label: 'Teléfono' },
        { key: 'deleteUser', tdClass: 'w-5', label: '' }
      ];
    },
    getItems() {
      const users = this.users;

      if (!users) return;

      let items = [];
      //console.log('GetItems Users ', this.$store.getters.users.length);

      if (users != undefined && users.length >= 1) {
        for (var i = 0; i < users.length; i++) {
          items.push({
            mail: users[i].attributes.email,
            role: users[i].attributes.role,
            anansiCode: users[i].attributes.anansiCode,
            tel: users[i].attributes.tel,
            deleteUser: { email: users[i].attributes.email, id: users[i].attributes.OBJECTID }
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
