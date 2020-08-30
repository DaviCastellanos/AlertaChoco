<template>
  <div id="warning">
    <h4>¿Seguro quieres eliminar este seguimiento?</h4>
    <h5>Esta información no se puede recuperar.</h5>
    <br />
    <b-button size="lg" @click="deleteFollowUp" class="text-light my-2 my-sm-0" variant="danger">Eliminar</b-button>
  </div>
</template>

<script>
import FollowUpService from '@/services/follow-ups-service.js';

export default {
  methods: {
    async deleteFollowUp() {
      const response = await FollowUpService.deleteFollowUp(this.$route.params.id);
      //console.log(response);
      if (!response.deleteResults[0].success) {
        this.$store.commit('SET_APP_ERROR', response.deleteResults[0].error.description);
      } else {
        this.$router.push({ path: '/' });
      }
    }
  }
};
</script>

<style scoped>
#warning {
  padding: 10%;
  width: 100%;
  height: 100%;
  align: center;
}
</style>
