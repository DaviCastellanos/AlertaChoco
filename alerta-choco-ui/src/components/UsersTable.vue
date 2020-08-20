<template>
  <div id="table">
    <b-table responsive striped light :items="this.getItems()" :fields="this.getFields()"> </b-table>
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue';

export default {
  components: {
    BTable
  },
  methods: {
    getFields() {
      return [
        { key: 'mail', tdClass: 'w-5', label: 'Correo' },
        { key: 'role', tdClass: 'w-5', label: 'Rol' }
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
            role: users[i].attributes.role
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
  padding: 0;
  margin: 50px;
  width: 100%;
  height: 100%;
}
</style>
