<template>
  <div id="alert">
  <Alert 
      v-for="(feature, $featureIndex) of this.features"
      :key="$featureIndex"
      :feature="feature"
       />
  </div>
</template>

<script>
import { AlertsService } from '@/services';
import Alert from '@/components/Alert.vue'

export default {
    components:{
        Alert
    },
  data() {
      return {
          features: []
      }
  },
  methods: {
    async Request () {
        const response = await AlertsService.getAlerts();
        if(response)
        this.features = this.OrderByDate(response.features).reverse()
    },
    OrderByDate (array) 
    {
        return array.sort(function(a, b) {
            var dateA = new Date(a.date), dateB = new Date(b.date);
            return dateA - dateB;
            })
    }
  },
  mounted() {
    this.Request()
  }
}

</script>

<style scoped>
#alert {
  padding: 0;
  margin: 1px   ;
  width: 100%;
  height: 50px;
}
</style>