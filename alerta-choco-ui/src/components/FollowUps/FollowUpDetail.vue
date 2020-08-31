<template>
  <div fluid id="Seguimiento" v-if="this.followUp">
    <h4>FICHA DE SEGUIMIENTO</h4>
    <br />

    <div class="mt-3">
      <h4>Tipo</h4>
    </div>
    <div class="mt-3" v-if="this.followUp.fechaAccionRespuesta">
      <span class="font-weight-bold">Fecha en la que ocurre acción o respuesta: </span> <span>{{ FormatAsDate(this.followUp.fechaAccionRespuesta) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.tipoSeguimientoEnum">
      <span class="font-weight-bold">Tipo de seguimiento: </span> <span>{{ getObjectTexts('opcionesTipoSeguimiento', this.followUp.tipoSeguimientoEnum) }}</span>
    </div>

    <hr />

    <div class="mt-3">
      <h4>Evolución</h4>
    </div>

    <div class="mt-3" v-if="this.followUp.descripcionSituacion">
      <span class="font-weight-bold">Describa la situación: </span> <span>{{ FormatForHuman(this.followUp.descripcionSituacion) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.evolucionSituacion">
      <span class="font-weight-bold">Tipo de evolución de la situación: </span> <span>{{ FormatForHuman(this.followUp.evolucionSituacion) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.actoresInvolucrados">
      <span class="font-weight-bold">Actores involucrados: </span> <span>{{ FormatForHuman(this.followUp.actoresInvolucrados) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.accionesMitigacion">
      <span class="font-weight-bold">Acciones de mitigación: </span> <span>{{ FormatForHuman(this.followUp.accionesMitigacion) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.riesgoPercibido">
      <span class="font-weight-bold">Riesgo percibido: </span> <span>{{ FormatForHuman(this.followUp.riesgoPercibido) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.institucionesInformadasEnum">
      <span class="font-weight-bold">Instituciones informadas: </span> <span>{{ getObjectTexts('opcionesInstituciones', this.followUp.institucionesInformadasEnum) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.otraInstitucion">
      <span class="font-weight-bold">Otra institución: </span> <span>{{ FormatForHuman(this.followUp.otraInstitucion) }}</span>
    </div>

    <hr />

    <div class="mt-3">
      <h4>Acción</h4>
    </div>

    <div class="mt-3" v-if="this.followUp.accionSeguimiento">
      <span class="font-weight-bold">Tipo de acción: </span> <span>{{ FormatForHuman(this.followUp.accionSeguimiento) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.otraAccionSeguimiento">
      <span class="font-weight-bold"> Otra acción: </span> <span>{{ FormatForHuman(this.followUp.otraAccionSeguimiento) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.descripcionAccion">
      <span class="font-weight-bold"> Describa la acción: </span> <span>{{ FormatForHuman(this.followUp.descripcionAccion) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.dependenciaEntidad">
      <span class="font-weight-bold"> Dependencia, división o similar de la entidad: </span> <span>{{ FormatForHuman(this.followUp.dependenciaEntidad) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.resultadoEsperado">
      <span class="font-weight-bold"> Resultado esperado: </span> <span>{{ FormatForHuman(this.followUp.resultadoEsperado) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.tiempoEsperado">
      <span class="font-weight-bold"> Tiempo de respuesta esperado: </span> <span>{{ FormatForHuman(this.followUp.tiempoEsperado) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.entidadesAccionEnum">
      <span class="font-weight-bold">Ante cuál/es entidad/es se realiza la acción: </span> <span>{{ getObjectTexts('opcionesEntidades', this.followUp.entidadesAccionEnum) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.otraEntidad">
      <span class="font-weight-bold"> Otra entidad: </span> <span>{{ FormatForHuman(this.followUp.otraEntidad) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.quienPresentaAccion">
      <span class="font-weight-bold"> Quien presenta la acción: </span> <span>{{ FormatForHuman(this.followUp.quienPresentaAccion) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.personaContacto">
      <span class="font-weight-bold"> Persona de contacto: </span> <span>{{ FormatForHuman(this.followUp.personaContacto) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.telefonoContacto">
      <span class="font-weight-bold"> Teléfono de contacto: </span> <span>{{ FormatForHuman(this.followUp.telefonoContacto) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.emailContacto">
      <span class="font-weight-bold"> Correo de contacto: </span> <span>{{ FormatForHuman(this.followUp.emailContacto) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.trato">
      <span class="font-weight-bold"> Cómo se sintió tratada la persona que interpuso la acción: </span> <span>{{ FormatForHuman(this.followUp.trato) }}</span>
    </div>

    <hr />

    <div class="mt-3">
      <h4>Respuesta</h4>
    </div>

    <div class="mt-3" v-if="this.followUp.tipoRespuesta">
      <span class="font-weight-bold"> Tipo de respuesta institucional: </span> <span>{{ FormatForHuman(this.followUp.tipoRespuesta) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.otraRespuesta">
      <span class="font-weight-bold"> Otro tipo: </span> <span>{{ FormatForHuman(this.followUp.otraRespuesta) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.entidadesRespuestaEnum">
      <span class="font-weight-bold"> Entidad que realiza la respuesta: </span> <span>{{ getObjectTexts('opcionesEntidades', this.followUp.entidadesRespuestaEnum) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.otraEntidadRespuesta">
      <span class="font-weight-bold"> Otra entidad: </span> <span>{{ FormatForHuman(this.followUp.otraEntidadRespuesta) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.dependenciaEntidadRespuesta">
      <span class="font-weight-bold"> Dependencia, división, o similar de la entidad: </span> <span>{{ FormatForHuman(this.followUp.dependenciaEntidadRespuesta) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.descripcionRespuesta">
      <span class="font-weight-bold"> Describa la respuesta institucional: </span> <span>{{ FormatForHuman(this.followUp.descripcionRespuesta) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.mitigaRiesgo">
      <span class="font-weight-bold"> Contribuye la respuesta a mitigar el riesgo: </span> <span>{{ FormatForHuman(this.followUp.mitigaRiesgo) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.protegeDefensores">
      <span class="font-weight-bold"> Contribuye la respuesta a proteger defensores y defensoras: </span> <span>{{ FormatForHuman(this.followUp.protegeDefensores) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.esperaOtraRespuesta">
      <span class="font-weight-bold"> Se espera otras respuestas de esta u otras instituciones: </span> <span>{{ FormatForHuman(this.followUp.esperaOtraRespuesta) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.personaContactoInstitucion">
      <span class="font-weight-bold"> Persona de contacto en la institución: </span> <span>{{ FormatForHuman(this.followUp.personaContactoInstitucion) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.telefonoContactoInstitucion">
      <span class="font-weight-bold"> Telefono de contacto de la persona en la institución: </span> <span>{{ FormatForHuman(this.followUp.telefonoContactoInstitucion) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.emailContactoInstitucion">
      <span class="font-weight-bold"> Email de contacto de la persona en la institución: </span> <span>{{ FormatForHuman(this.followUp.emailContactoInstitucion) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.quienRecibeRespuesta">
      <span class="font-weight-bold"> Quién recibe la respuesta institucional: </span> <span>{{ FormatForHuman(this.followUp.quienRecibeRespuesta) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.personaRecibeRespuesta">
      <span class="font-weight-bold"> Persona de contacto que recibe la respuesta: </span> <span>{{ FormatForHuman(this.followUp.personaRecibeRespuesta) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.telefonoContactoRespuesta">
      <span class="font-weight-bold"> Teléfono de la persona de contacto que recibe la respuesta: </span> <span>{{ FormatForHuman(this.followUp.telefonoContactoRespuesta) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.emailContactoRespuesta">
      <span class="font-weight-bold"> Email de la persona de contacto que recibe la respuesta: </span> <span>{{ FormatForHuman(this.followUp.emailContactoRespuesta) }}</span>
    </div>

    <div class="mt-3" v-if="this.followUp.tratoRespuesta">
      <span class="font-weight-bold"> Cómo se sintió tratada la/s persona/s que recibieron la respuesta: </span> <span>{{ FormatForHuman(this.followUp.tratoRespuesta) }}</span>
    </div>

    <hr />
    <div class="mt-3 mb-4">
      <b-row>
        <b-col v-if="userAccessIsPrivate">
          <div class="mt-3">
            <b-button size="lg" :to="editURL" class="text-light my-2 my-sm-0" variant="warning"> Editar seguimiento</b-button>
          </div>
        </b-col>
        <b-col v-if="userIsAdmin">
          <div class="mt-3">
            <b-button size="lg" :to="deleteURL" class="text-light my-2 my-sm-0" variant="danger">Eliminar seguimiento</b-button>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import FollowUpsService from '@/services/follow-ups-service.js';
import frozen from '@/mixins/frozen.js';
import helpers from '@/mixins/helpers.js';

export default {
  mixins: [frozen, helpers],
  data() {
    return {
      followUp: null,
      idAlerta: '',
      tipoSeguimientoEnum: [],
      fechaAccionRespuesta: '',
      descripcionSituacion: '',
      evolucionSituacion: '',
      actoresInvolucrados: '',
      accionesMitigacion: '',
      riesgoPercibido: '',
      institucionesInformadasEnum: [],
      otraInstitucion: '',
      accionSeguimiento: '',
      otraAccionSeguimiento: '',
      descripcionAccion: '',
      entidadesAccionEnum: [],
      otraEntidad: '',
      dependenciaEntidad: '',
      resultadoEsperado: '',
      tiempoEsperado: '',
      quienPresentaAccion: '',
      personaContacto: '',
      telefonoContacto: '',
      emailContacto: '',
      trato: '',
      tipoRespuesta: '',
      otraRespuesta: '',
      entidadesRespuestaEnum: [],
      otraEntidadRespuesta: '',
      dependenciaEntidadRespuesta: '',
      descripcionRespuesta: '',
      mitigaRiesgo: '',
      protegeDefensores: '',
      esperaOtraRespuesta: '',
      personaContactoInstitucion: '',
      telefonoContactoInstitucion: '',
      emailContactoInstitucion: '',
      quienRecibeRespuesta: '',
      personaRecibeRespuesta: '',
      telefonoContactoRespuesta: '',
      emailContactoRespuesta: '',
      tratoRespuesta: ''
    };
  },
  methods: {
    lengthState(str) {
      if (str.length > 256) return false;

      if (str.length <= 0) return false;

      return true;
    },
    wrapFollowUp() {
      let alert = '[{ "geometry" : {"x": 1,"y": -1,"spatialReference": {"wkid": 4326}},"attributes" : {';
      alert += '"idAlerta":"' + this.idAlerta + '",';
      alert += '"tipoSeguimientoEnum":"' + this.FormatForDB(this.tipoSeguimientoEnum) + '",';
      alert += '"fechaAccionRespuesta":"' + this.FormatDateForDB(this.fechaAccionRespuesta) + '",';
      alert += '"descripcionSituacion":"' + this.FormatForDB(this.descripcionSituacion) + '",';
      alert += '"evolucionSituacion":"' + this.FormatForDB(this.evolucionSituacion) + '",';
      alert += '"actoresInvolucrados":"' + this.FormatForDB(this.actoresInvolucrados) + '",';
      alert += '"accionesMitigacion":"' + this.FormatForDB(this.accionesMitigacion) + '",';
      alert += '"riesgoPercibido":"' + this.FormatForDB(this.riesgoPercibido) + '",';
      alert += '"institucionesInformadasEnum":"' + this.FormatForDB(this.institucionesInformadasEnum) + '",';
      alert += '"otraInstitucion":"' + this.FormatForDB(this.otraInstitucion) + '",';
      alert += '"accionSeguimiento":"' + this.FormatForDB(this.accionSeguimiento) + '",';
      alert += '"otraAccionSeguimiento":"' + this.FormatForDB(this.otraAccionSeguimiento) + '",';
      alert += '"descripcionAccion":"' + this.FormatForDB(this.descripcionAccion) + '",';
      alert += '"entidadesAccionEnum":"' + this.FormatForDB(this.entidadesAccionEnum) + '",';
      alert += '"otraEntidad":"' + this.FormatForDB(this.otraEntidad) + '",';
      alert += '"dependenciaEntidad":"' + this.FormatForDB(this.dependenciaEntidad) + '",';
      alert += '"resultadoEsperado":"' + this.FormatForDB(this.resultadoEsperado) + '",';
      alert += '"tiempoEsperado":"' + this.FormatForDB(this.tiempoEsperado) + '",';
      alert += '"quienPresentaAccion":"' + this.FormatForDB(this.quienPresentaAccion) + '",';
      alert += '"personaContacto":"' + this.FormatForDB(this.personaContacto) + '",';
      alert += '"telefonoContacto":"' + this.FormatForDB(this.telefonoContacto) + '",';
      alert += '"emailContacto":"' + this.FormatForDB(this.emailContacto) + '",';
      alert += '"trato":"' + this.FormatForDB(this.trato) + '",';
      alert += '"tipoRespuesta":"' + this.FormatForDB(this.tipoRespuesta) + '",';
      alert += '"otraRespuesta":"' + this.FormatForDB(this.otraRespuesta) + '",';
      alert += '"entidadesRespuestaEnum":"' + this.FormatForDB(this.entidadesRespuestaEnum) + '",';
      alert += '"otraEntidadRespuesta":"' + this.FormatForDB(this.otraEntidadRespuesta) + '",';
      alert += '"dependenciaEntidadRespuesta":"' + this.FormatForDB(this.dependenciaEntidadRespuesta) + '",';
      alert += '"descripcionRespuesta":"' + this.FormatForDB(this.descripcionRespuesta) + '",';
      alert += '"mitigaRiesgo":"' + this.FormatForDB(this.mitigaRiesgo) + '",';
      alert += '"protegeDefensores":"' + this.FormatForDB(this.protegeDefensores) + '",';
      alert += '"esperaOtraRespuesta":"' + this.FormatForDB(this.esperaOtraRespuesta) + '",';
      alert += '"personaContactoInstitucion":"' + this.FormatForDB(this.personaContactoInstitucion) + '",';
      alert += '"telefonoContactoInstitucion":"' + this.FormatForDB(this.telefonoContactoInstitucion) + '",';
      alert += '"emailContactoInstitucion":"' + this.FormatForDB(this.emailContactoInstitucion) + '",';
      alert += '"quienRecibeRespuesta":"' + this.FormatForDB(this.quienRecibeRespuesta) + '",';
      alert += '"personaRecibeRespuesta":"' + this.FormatForDB(this.personaRecibeRespuesta) + '",';
      alert += '"telefonoContactoRespuesta":"' + this.FormatForDB(this.telefonoContactoRespuesta) + '",';
      alert += '"emailContactoRespuesta":"' + this.FormatForDB(this.emailContactoRespuesta) + '",';
      alert += '"tratoRespuesta":"' + this.FormatForDB(this.tratoRespuesta) + '"';
      alert += '}}]';

      //console.log(alert);
      return alert;
    },
    async save() {
      const response = await FollowUpsService.save(this.wrapFollowUp());
      console.log(response);
      if (response.addResults[0].success) {
        this.$router.push({ name: 'Home' });
      } else {
        this.$store.commit('SET_APP_ERROR', response.addResults[0].error.description);
      }
    }
  },
  computed: {
    deleteURL() {
      return '/deletefollowup/' + this.$route.params.id;
    },
    editURL() {
      return '/editfollowup/' + this.$route.params.id;
    },
    requiredFieldsCompleted() {
      if (
        !this.tipoSeguimientoEnum ||
        !this.fechaAccionRespuesta ||
        !this.descripcionSituacion ||
        !this.evolucionSituacion ||
        !this.actoresInvolucrados ||
        !this.accionesMitigacion ||
        !this.riesgoPercibido ||
        !this.institucionesInformadasEnum ||
        !this.accionSeguimiento ||
        !this.descripcionAccion ||
        !this.entidadesAccionEnum ||
        !this.dependenciaEntidad ||
        !this.resultadoEsperado ||
        !this.tiempoEsperado ||
        !this.quienPresentaAccion ||
        !this.trato ||
        !this.tipoRespuesta ||
        !this.entidadesRespuestaEnum ||
        !this.dependenciaEntidadRespuesta ||
        !this.descripcionRespuesta ||
        !this.mitigaRiesgo ||
        !this.protegeDefensores ||
        !this.esperaOtraRespuesta ||
        !this.quienRecibeRespuesta ||
        !this.tratoRespuesta
      )
        return true;

      return false;
    }
  },
  mounted() {
    if (this.$store.getters.followUps) {
      this.followUp = this.$store.getters.followUpById(this.$route.params.id);
      //console.log(this.followUp);
    } else console.log('Service call '); //IMPLEMENT SERVICE
  }
};
</script>

<style>
#Seguimiento {
  padding: 2%;
  margin: 2px;
  width: 100%;
  height: 100%;
}
</style>
