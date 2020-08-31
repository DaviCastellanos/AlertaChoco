<template>
  <div id="warning">
    <h4>¿Seguro quieres eliminar el reporte?</h4>
    <h5>Esta información no se puede recuperar.</h5>
    <br />
    <b-button size="lg" @click="deletePolicy" class="text-light my-2 my-sm-0" variant="danger">Eliminar</b-button>
  </div>
</template>

<script>
import PolicyService from '@/services/policy-service.js';

export default {
  methods: {
    async deletePolicy() {
      const response = await PolicyService.deletePolicy(this.$route.params.id);
      //console.log(response);
      if (!response.deleteResults[0].success) {
        this.$store.commit('SET_APP_ERROR', response.deleteResults[0].error.description);
      } else {
        this.$store.commit('SET_UPDATE_NEEDED', true);
        this.$router.push({ path: '/' });
      }
    }
  }
};
</script>

<style>
#warning {
  padding: 10%;
  width: 100%;
  height: 100%;
}
</style>
