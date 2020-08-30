<template>
  <b-container fluid id="form">

    <div class="mt-3">
    <h4>Tipo</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3 mb-3">
          <h6>Fecha en la que ocurre acción o respuesta:</h6>
          <b-form-datepicker
            id="datepicker"
            :state="lengthState(fechaAccionRespuesta)"
            v-model="fechaAccionRespuesta"
          ></b-form-datepicker>
        </div>
      <div class="mt-3">
          <h6>Tipo de seguimiento: </h6>
          <b-form-select
            v-model="tipoSeguimientoEnum"
            :options="this.opcionesTipoSeguimiento"
            :state="lengthState(tipoSeguimientoEnum)"
            multiple
          ></b-form-select>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
    <h4>Evolución</h4>
    </div>
    <b-row>
      <b-col>

        <div class="mt-3">
          <h6>Describa la situación:</h6>
          <b-form-input
            v-model="descripcionSituacion"
            :state="lengthState(descripcionSituacion)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Tipo de evolucion de la situación: </h6>
          <b-form-select
            v-model="evolucionSituacion"
            :options="this.opcionesEvolucionSituacion"
            :state="lengthState(evolucionSituacion)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Actores involucrados:</h6>
          <b-form-input
            v-model="actoresInvolucrados"
            :state="lengthState(actoresInvolucrados)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Acciones de mitigación:</h6>
          <b-form-input
            v-model="accionesMitigacion"
            :state="lengthState(accionesMitigacion)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Riesgo percibido:</h6>
          <b-form-input
            v-model="riesgoPercibido"
            :state="lengthState(riesgoPercibido)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Instituciones informadas:</h6>
          <b-form-select
            v-model="institucionesInformadasEnum"
            :options="this.opcionesInstituciones"
            multiple
            :select-size="10"
            :state="lengthState(institucionesInformadasEnum)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otra institución? ¿cuál?:</h6>
          <b-form-input
            v-model="otraInstitucion"
            aria-describedby="input-live-feedback"
            trim
            placeholder = 'Opcional'
          ></b-form-input>
        </div>

      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
    <h4>Acción</h4>
    </div>
    <b-row>
      <b-col>

        <div class="mt-3">
          <h6>Tipo de acción de seguimiento:</h6>
          <b-form-select
            v-model="accionSeguimiento"
            :options="this.opcionesAccion"
            :state="lengthState(accionSeguimiento)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otra acción? ¿cuál?:</h6>
          <b-form-input
            v-model="otraAccionSeguimiento"
            aria-describedby="input-live-feedback"
            trim
            placeholder = 'Opcional'
          ></b-form-input>
        </div>
        
        <div class="mt-3">
          <h6>Describa la acción:</h6>
          <b-form-input
            v-model="descripcionAccion"
            :state="lengthState(descripcionAccion)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Dependencia, división o similar de la entidad :</h6>
          <b-form-input
            v-model="dependenciaEntidad"
            :state="lengthState(dependenciaEntidad)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Cuál es el resultado esperado?</h6>
          <b-form-input
            v-model="resultadoEsperado"
            :state="lengthState(resultadoEsperado)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Cuál es el tiempo de respuesta esperado?</h6>
          <b-form-input
            v-model="tiempoEsperado"
            :state="lengthState(tiempoEsperado)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Ante cuáles entidades se realiza la acción?:</h6>
          <b-form-select
            v-model="entidadesAccionEnum"
            :options="this.opcionesEntidades"
            multiple
            :select-size="5"
            :state="lengthState(entidadesAccionEnum)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otra entidad? ¿cuál?:</h6>
          <b-form-input
            v-model="otraEntidad"
            aria-describedby="input-live-feedback"
            trim
            placeholder = 'Opcional'
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Quién presenta la acción?</h6>
          <b-form-input
            v-model="quienPresentaAccion"
            :state="lengthState(quienPresentaAccion)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Persona de contacto: </h6>
          <b-form-input
            v-model="personaContacto"
            aria-describedby="input-live-feedback"
            trim
            placeholder = 'Opcional'
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Teléfono de contacto: </h6>
          <b-form-input
            v-model="telefonoContacto"
            aria-describedby="input-live-feedback"
            trim
            placeholder = 'Opcional'
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Email de contacto: </h6>
          <b-form-input
            v-model="emailContacto"
            aria-describedby="input-live-feedback"
            trim
            placeholder = 'Opcional'
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Cómo se sintió tratada la persona que interpuso la acción?:</h6>
          <b-form-select
            v-model="trato"
            :options="this.opcionesTrato"
            :select-size="3"
            :state="lengthState(trato)"
          ></b-form-select>
        </div>

      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
    <h4>Respuesta</h4>
    </div>

    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Tipo de respuesta institucional: </h6>
          <b-form-select
            v-model="tipoRespuesta"
            :options="this.opcionesTipoRespuesta"
            :select-size="3"
            :state="lengthState(tipoRespuesta)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Otra respuesta: </h6>
          <b-form-input
            v-model="otraRespuesta"
            aria-describedby="input-live-feedback"
            trim
            placeholder = 'Opcional'
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Entidad que realiza la respuesta: </h6>
          <b-form-select
            v-model="entidadesRespuestaEnum"
            :options="this.opcionesEntidades"
            :select-size="3"
            multiple
            :state="lengthState(entidadesRespuestaEnum)"
          ></b-form-select>
        </div>

      <div class="mt-3">
          <h6>¿Otra? ¿cuál?: </h6>
          <b-form-input
            v-model="otraEntidadRespuesta"
            aria-describedby="input-live-feedback"
            trim
            placeholder = 'Opcional'
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Dependencia, división, o similar de la entidad: </h6>
          <b-form-input
            v-model="dependenciaEntidadRespuesta"
            :state="lengthState(dependenciaEntidadRespuesta)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Describa la respuesta institucional: </h6>
          <b-form-input
            v-model="descripcionRespuesta"
            :state="lengthState(descripcionRespuesta)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Contribuye la respuesta a mitigar el riesgo? </h6>
          <b-form-select
            v-model="mitigaRiesgo"
            :options="this.opcionesVictimas"
            :state="lengthState(mitigaRiesgo)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Contribuye la respuesta a proteger defensores y defensoras? </h6>
          <b-form-select
            v-model="protegeDefensores"
            :options="this.opcionesVictimas"
            :state="lengthState(protegeDefensores)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Se espera otras respuestas de esta u otras instituciones? </h6>
          <b-form-select
            v-model="esperaOtraRespuesta"
            :options="this.opcionesVictimas"
            :state="lengthState(esperaOtraRespuesta)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Persona de contacto en la institución: </h6>
          <b-form-input
            v-model="personaContactoInstitucion"
            aria-describedby="input-live-feedback"
            trim
            placeholder = 'Opcional'
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Telefono de contacto de la persona en la institución: </h6>
          <b-form-input
            v-model="telefonoContactoInstitucion"
            aria-describedby="input-live-feedback"
            trim
            placeholder = 'Opcional'
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Email de contacto de la persona en la institución: </h6>
          <b-form-input
            v-model="emailContactoInstitucion"
            aria-describedby="input-live-feedback"
            trim
            placeholder = 'Opcional'
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Quién recibe la respuesta institucional? </h6>
          <b-form-input
            v-model="quienRecibeRespuesta"
            :state="lengthState(quienRecibeRespuesta)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Persona de contacto que recibe la respuesta: </h6>
          <b-form-input
            v-model="personaRecibeRespuesta"
            aria-describedby="input-live-feedback"
            trim
            placeholder = 'Opcional'
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Teléfono de la persona de contacto que recibe la respuesta: </h6>
          <b-form-input
            v-model="telefonoContactoRespuesta"
            aria-describedby="input-live-feedback"
            trim
            placeholder = 'Opcional'
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Email de la persona de contacto que recibe la respuesta: </h6>
          <b-form-input
            v-model="emailContactoRespuesta"
            aria-describedby="input-live-feedback"
            trim
            placeholder = 'Opcional'
          ></b-form-input>
        </div>

         <div class="mt-3">
          <h6>¿Cómo se sintió tratada la/s persona/s que recibieron la respuesta?:</h6>
          <b-form-select
            v-model="tratoRespuesta"
            :options="this.opcionesTrato"
            :state="lengthState(tratoRespuesta)"
          ></b-form-select>
        </div>

        <!-- This will only be shown if the preceding input has an invalid state -->
        <b-form-invalid-feedback id="input-live-feedback">
          Máximo 256 carácteres
        </b-form-invalid-feedback>
      </b-col>
    </b-row>
    <b-button
          @click="this.save"
          size="lg"
          class="text-light mt-5 mb-3"
          variant="warning"
          :disabled="this.requiredFieldsCompleted"
          block
          >Crear seguimiento</b-button
        >
  </b-container>
</template>
<script>
import FollowUpsService  from "@/services/follow-ups-service.js";
import frozen from "@/mixins/frozen.js"

export default {
  mixins: [frozen],
  data() {
    return {
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
      alert +=  '"protegeDefensores":"' + this.FormatForDB(this.protegeDefensores) + '",';
      alert += '"esperaOtraRespuesta":"' + this.FormatForDB(this.esperaOtraRespuesta) + '",';
      alert += '"personaContactoInstitucion":"' + this.FormatForDB(this.personaContactoInstitucion) + '",';
      alert +=  '"telefonoContactoInstitucion":"' + this.FormatForDB(this.telefonoContactoInstitucion) + '",';
      alert += '"emailContactoInstitucion":"' + this.FormatForDB(this.emailContactoInstitucion) + '",';
      alert += '"quienRecibeRespuesta":"' + this.FormatForDB(this.quienRecibeRespuesta) + '",';
      alert += '"personaRecibeRespuesta":"' + this.FormatForDB(this.personaRecibeRespuesta) + '",';
      alert += '"telefonoContactoRespuesta":"' + this.FormatForDB(this.telefonoContactoRespuesta) + '",';
      alert += '"emailContactoRespuesta":"' + this.FormatForDB(this.emailContactoRespuesta) + '",';
      alert += '"tratoRespuesta":"' + this.FormatForDB(this.tratoRespuesta) + '"';
      alert += "}}]";

      //console.log(alert);
      return alert;
    },
    async save() {
      const response = await FollowUpsService.save(this.wrapFollowUp());
      console.log(response);
      if(response.addResults[0].success) {
        this.$router.push({name:'Home'})
      }
      else{
        this.$store.commit('SET_APP_ERROR', response.addResults[0].error.description)
      } 
    },
  },
  computed: {
    requiredFieldsCompleted() {
      if(!this.tipoSeguimientoEnum ||
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
      !this.tratoRespuesta)
      return true;

      return false;
    },
  },
  created () {
      this.idAlerta = this.$route.params.id;
  }
};
</script>

<style>
#form {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}<style>
