<template>
  <div id="alert">
    {{ this.formatTime(feature.attributes.date) }} {{ feature.attributes.threat }}
    <button v-on:click="seeOnMap(feature.geometry.x, feature.geometry.y)">Ver</button>
  </div>
</template>

<script>

export default {
  props: {
    feature: {
        type: Object,
        required: true
    }
  },
  methods:{
      formatTime(epoch) {
          var options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

          return new Date(epoch).toLocaleDateString("es-LA", options)
      }, 
      seeOnMap(x,y)
      {
          this.$store.commit('CHANGE_MAP_CENTER', { lat: x, lon: y }) 
      }
  }
}

</script>

<style scoped>
#alert {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background: grey;
  text-align: center;
  font-size: 1em;
}
</style>