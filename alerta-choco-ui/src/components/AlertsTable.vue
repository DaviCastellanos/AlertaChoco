<template>
  <div id="table">
    <b-table
      responsive
      sticky-header="750px"
      striped
      hover
      light
      :items="this.alertItems"
      :fields="fields"
    >
      <template v-slot:cell(que)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(quien)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(como)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(cuando)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(donde)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(situacionActual)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(primerMensaje)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(recibeLlamada)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(botonVerificar)="data">
        <b-button size="sm" :to="data.value" class="mr-2" variant="warning"
          >Verificar</b-button
        >
      </template>
    </b-table>
    <verification-modal
      v-if="this.selectedAlert.attributes != null"
      id="verification-modal"
      :alert="this.selectedAlert"
    />
  </div>
</template>

<script>
import { BTable } from "bootstrap-vue";
import VerificationModal from "@/components/VerificationModal.vue";

export default {
  components: {
    BTable,
    VerificationModal,
  },
  data() {
    return {
      fields: [
        { tdClass: "w-5", key: "primerMensaje", label: "Primer mensaje" },
        { key: "que", tdClass: "w-5", label: "Qué pasó" },
        { key: "quien", tdClass: "w-5", label: "Quién es la víctima" },
        { key: "como", tdClass: "w-5", label: "Cómo paso" },
        { key: "cuando", tdClass: "w-3", label: "Cuándo pasó" },
        { key: "donde", tdClass: "w-3", label: "Dónde pasó" },
        { key: "situacionActual", tdClass: "w-5", label: "Situación actual" },
        {
          key: "recibeLlamada",
          tdClass: "w-1",
          sortable: true,
          label: "Recibe llamada",
        },
        {
          key: "verificado",
          tdClass: "w-1",
          sortable: true,
          label: "Verificado",
        },
        {
          key: "completado",
          tdClass: "w-1",
          sortable: true,
          label: "Completado",
        },
        {
          key: "fechaReporte",
          tdClass: "w-1",
          sortable: true,
          label: "Fecha reporte",
        },
        {
          key: "puedeReportar",
          tdClass: "w-1",
          sortable: true,
          label: "Puede reportar",
        },
        { key: "botonVerificar", tdClass: "w-1", label: "" },
      ],
      selectedAlert: {},
    };
  },
  methods: {
    ShowModal(id) {
      this.selectedAlert = this.GetAlertById(id);
      this.$bvModal.show("verification-modal");
    },
    GetAlertById(id) {
      return this.$store.getters.alerts
        .filter((obj) => {
          return obj.attributes.idAlerta === id;
        })
        .pop();
    },
  },
  computed: {
    alertItems() {
      const features = this.$store.getters.alerts;
      const items = [];
      if (features != undefined && features.length > 1) {
        for (var i = 0; i < features.length; i++) {
          const date = new Date(features[i].attributes.fechaReporte);
          items.push({
            primerMensaje: this.FormatForHuman(
              features[i].attributes.primerMensaje
            ),
            fechaReporte: this.FormatForHuman(
              date.getDate() +
                "/" +
                (date.getMonth() + 1) +
                "/" +
                date.getFullYear()
            ),
            puedeReportar: this.FormatForHuman(
              features[i].attributes.puedeReportar
            ),
            que: this.FormatForHuman(features[i].attributes.relatoQue),
            quien: this.FormatForHuman(features[i].attributes.relatoQuien),
            como: this.FormatForHuman(features[i].attributes.relatoComo),
            cuando: this.FormatForHuman(features[i].attributes.relatoCuando),
            donde: this.FormatForHuman(features[i].attributes.relatoDonde),
            situacionActual: this.FormatForHuman(
              features[i].attributes.situacionActual
            ),
            recibeLlamada: this.FormatForHuman(
              features[i].attributes.recibeLlamada
            ),
            verificado: this.FormatForHuman(features[i].attributes.verificado),
            completado: this.FormatForHuman(features[i].attributes.completado),
            botonVerificar: "/verify/" + features[i].attributes.idAlerta,
          });
        }
      }

      return items;
    },
  },
};
</script>

<style scoped>
#table {
  padding: 0;
  margin: 2px;
  width: 100%;
  height: 100%;
}
</style>
