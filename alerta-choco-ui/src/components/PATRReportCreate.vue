<template>
  <b-container fluid id="form">

    <div class="mt-3">
    <h4>General</h4>
    </div>
    <b-row>
      <b-col>

        <div class="mt-3">
          <h6>Tipo de reporte: </h6>
          <b-form-select
            v-model="tipoReporte"
            :options="this.opcionesReporte"
            :state="lengthState(tipoReporte)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Subregion: </h6>
          <b-form-select
            v-model="subregion"
            :options="this.opcionesSubregion"
            :state="lengthState(subregion)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Pilar: </h6>
          <b-form-select
            v-model="pilar"
            :options="this.opcionesPilar"
            :state="lengthState(pilar)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Municipio: </h6>
          <b-form-select
            v-model="municipio"
            :options="this.opcionesMunicipios"
            :state="lengthState(municipio)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otro municipio? ¿cuál?:</h6>
          <b-form-input
            v-model="municipioOtro"
            aria-describedby="input-live-feedback"
            trim
            placeholder='Opcional'
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Fecha en la que ocurre el evento a reportar:</h6>
          <b-form-datepicker
            id="datepicker"
            v-model="fechaOcurrencia"
            :state="lengthState(this.fechaOcurrencia)"
            :placeholder="FormatAsDate(this.fechaOcurrencia)"
          ></b-form-datepicker>
        </div>

      </b-col>
    </b-row>

    <b-row>
      <b-col>
          <div class="mt-3">
            <h6>Iniciativa: </h6>
            <b-form-select
              v-model="codigoIniciativa"
              :options="this.opcionesIniciativas"
              :state="lengthState(codigoIniciativa)"
            ></b-form-select>
          </div>

          <div class="mt-3">
            <h6>¿Otra iniciativa? ¿cuál?:</h6>
            <b-form-input
              v-model="iniciativaOtra"
              aria-describedby="input-live-feedback"
              trim
              placeholder='Opcional'
            ></b-form-input>
          </div>
        </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
    <h4>Acción de incidencia:</h4>
    </div>
    <b-row>
      <b-col>

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
          <h6>Ante cuál/es entidad/es se realiza la acción: </h6>
          <b-form-select
            v-model="entidadesEstadoEnum1"
            :options="this.opcionesInstituciones"
            :state="lengthState(entidadesEstadoEnum1)"
            multiple
            :select-size="10"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otra entidad? ¿cuál?:</h6>
          <b-form-input
            v-model="otraEntidad1"
            aria-describedby="input-live-feedback"
            trim
            placeholder="Opcional"
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Dependencia, división o similar de la entidad:</h6>
          <b-form-input
            v-model="dependenciaIncidencia"
            :state="lengthState(dependenciaIncidencia)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Cuál es el resultado esperado?</h6>
          <b-form-input
            v-model="resultadoIncidencia"
            :state="lengthState(resultadoIncidencia)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>
       <b-row>
      <b-col>  
        <div class="mt-3">
          <h6>Tiempo de respuesta esperado:</h6>
          <b-form-input
            v-model="tiempoIncidencia"
            :state="lengthState(tiempoIncidencia)"
            aria-describedby="input-live-feedback"
            trim
            type="number"
            min="0"
          ></b-form-input>
        </div>
        <div class="mt-3">
          <h6>Unidad de tiempo de espera: </h6>
          <b-form-select
            v-model="tiempoUnidad"
            :options="this.opcionesUnidadTiempo"
            :state="lengthState(tiempoUnidad)"
          ></b-form-select>
        </div>
      </b-col>
      </b-row>

        <div class="mt-3">
          <h6>Quién presenta la acción:</h6>
          <b-form-input
            v-model="incidenciaQuien"
            :state="lengthState(incidenciaQuien)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Persona de contacto:</h6>
          <b-form-input
            v-model="incidenciaContacto"
            :state="lengthState(incidenciaContacto)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Teléfono de la persona de contacto:</h6>
          <b-form-input
            v-model="incidenciaTelefono"
            aria-describedby="input-live-feedback"
            trim
            placeholder='Opcional'
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Correo de la persona de contacto:</h6>
          <b-form-input
            v-model="incidenciaCorreo"
            aria-describedby="input-live-feedback"
            trim
            placeholder='Opcional'
          ></b-form-input>
        </div>

      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
    <h4>Implementación de Política Pública</h4>
    </div>
    <b-row>
      <b-col>

        <div class="mt-3">
          <h6>Tipo de implementación: </h6>
          <b-form-select
            v-model="tipoImplementacion"
            :options="this.opcionesImplementacion"
            :state="lengthState(tipoImplementacion)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otra implementación? ¿cuál?:</h6>
          <b-form-input
            v-model="otraImplementacion"
            aria-describedby="input-live-feedback"
            trim
            placeholder='Opcional'
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Entidad/es que realiza/n la acción o participa/n en la implementación: </h6>
          <b-form-select
            v-model="entidadesEstadoEnum2"
            :options="this.opcionesInstituciones"
            :select-size="10"
            :state="lengthState(entidadesEstadoEnum2)"
            multiple
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otra entidad? ¿cuál?:</h6>
          <b-form-input
            v-model="entidadesOtra2"
            aria-describedby="input-live-feedback"
            trim
            placeholder='Opcional'
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Dependencia división o similar de la entidad:</h6>
          <b-form-input
            v-model="dependenciaImplementacion"
            :state="lengthState(dependenciaImplementacion)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

         <div class="mt-3">
          <h6>Describa la implementación que reporta:</h6>
          <b-form-input
            v-model="describaImplementacion"
            :state="lengthState(describaImplementacion)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Con esta acción se completa el proyecto aprobado?</h6>
          <b-form-select
            v-model="completado1"
            :options="this.opcionesSiNo"
            :state="lengthState(completado1)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Con esta acción se avanza efectivamente en el proyecto aprobado?</h6>
          <b-form-select
            v-model="avanza1"
            :options="this.opcionesSiNo"
            :state="lengthState(avanza1)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Esta acción retrasa la implementación efectiva del proyecto aprobado?</h6>
          <b-form-select
            v-model="retrasa1"
            :options="this.opcionesSiNo"
            :state="lengthState(retrasa1)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿De 1 a 5 que tan necesaria es esta acción para la implementación del proyecto? Valor: {{this.accionNecesaria}}</h6>
          <b-form-input
            v-model="accionNecesaria"
            :state="lengthState(accionNecesaria)"
            aria-describedby="input-live-feedback"
            trim
            type="range" 
            min="1" 
            max="5"
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Persona de contacto en la institución:</h6>
          <b-form-input
            v-model="implementacionContacto"
            aria-describedby="input-live-feedback"
            trim
            placeholder='Opcional'
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Teléfono de la persona de contacto en la institución:</h6>
          <b-form-input
            v-model="implementacionTelefono"
            aria-describedby="input-live-feedback"
            trim
            placeholder='Opcional'
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Correo electrónico de la persona de contacto en la institución:</h6>
          <b-form-input
            v-model="implementacionCorreo"
            aria-describedby="input-live-feedback"
            trim
            placeholder='Opcional'
          ></b-form-input>
        </div>
        
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
    <h4>Implementación autónoma:</h4>
    </div>

    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Tipo de implementación: </h6>
          <b-form-select
            v-model="tipoImplementacion2"
            :options="this.opcionesImplementacion"
            :state="lengthState(tipoImplementacion2)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otra implementación? ¿cuál?</h6>
          <b-form-input
            v-model="tipoImplementacionOtra2"
            aria-describedby="input-live-feedback"
            trim
            placeholder='Opcional'
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Organización que implementa la acción o participa de la implementación:</h6>
          <b-form-input
            v-model="organizacion"
            :state="lengthState(organizacion)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Agencia de cooperación u organismo intergubernamental que financia la implementación:</h6>
          <b-form-input
            v-model="agencia"
            :state="lengthState(agencia)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Entidad del gobierno que participa o acompaña la implementación: </h6>
          <b-form-select
            v-model="entidadesEstado"
            :options="this.opcionesInstituciones"
            :select-size="10"
            :state="lengthState(entidadesEstado)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Describa la implementación que reporta:</h6>
          <b-form-input
            v-model="describaImplementacion2"
            :state="lengthState(describaImplementacion2)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Con esta acción se completa el proyecto aprobado?</h6>
          <b-form-select
            v-model="completado2"
            :options="this.opcionesSiNo"
            :state="lengthState(completado2)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Con esta acción se avanza efectivamente en el proyecto aprobado?</h6>
          <b-form-select
            v-model="avanza2"
            :options="this.opcionesSiNo"
            :state="lengthState(avanza2)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Esta acción retrasa la implementación efectiva del proyecto aprobado?</h6>
          <b-form-select
            v-model="retrasa2"
            :options="this.opcionesSiNo"
            :state="lengthState(retrasa2)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿De 1 a 5 que tan necesaria es esta acción para la implementación del proyecto? Valor: {{this.accionNecesaria2}}</h6>
          <b-form-input
            v-model="accionNecesaria2"
            :state="lengthState(accionNecesaria2)"
            aria-describedby="input-live-feedback"
            trim
            type="range" 
            min="1" 
            max="5"
          ></b-form-input>
        </div>

      </b-col>
    </b-row>  

    <hr />

    <div class="mt-3">
    <h4>Bloqueo institucional</h4>
    </div>

    <b-row>
      <b-col>

          <div class="mt-3">
            <h6>Tipo de bloqueo:</h6>
            <b-form-select
              v-model="tipoBloqueo"
              :options="this.opcionesBloqueo"
              :select-size="5"
              :state="lengthState(tipoBloqueo)"
            ></b-form-select>
          </div>

         <div class="mt-3">
          <h6>Institucion/es en la/s que se identifica el bloqueo</h6>
          <b-form-select
            v-model="entidadesEstadoEnum3"
            :options="this.opcionesInstituciones"
            multiple
            :select-size="10"
            :state="lengthState(entidadesEstadoEnum3)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otra institución? ¿cuál?</h6>
          <b-form-input
            v-model="entidadOtra3"
            aria-describedby="input-live-feedback"
            trim
            placeholder="Opcional"
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿El bloqueo ocurre en alguna dependencia o dirección?</h6>
          <b-form-input
            v-model="dependenciaBloqueo"
            :state="lengthState(dependenciaBloqueo)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Describa el bloqueo:</h6>
          <b-form-input
            v-model="descripcionBloqueo"
            :state="lengthState(descripcionBloqueo)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Cuál es el principal efecto del bloqueo?</h6>
          <b-form-input
            v-model="efectoBloqueo"
            :state="lengthState(efectoBloqueo)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Cuál es el impacto previsto del bloqueo?</h6>
          <b-form-input
            v-model="impactoBloqueo"
            :state="lengthState(impactoBloqueo)"
            aria-describedby="input-live-feedback"
            trim
          ></b-form-input>
        </div>

         <div class="mt-3">
          <h6>¿Se han interpuesto acciones de incidencia para superar el bloqueo? </h6>
          <b-form-select
            v-model="accionesBloqueo"
            :options="this.opcionesSiNo"
            :state="lengthState(accionesBloqueo)"
          ></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Las instituciones han tomado acciones para superar el bloqueo? </h6>
          <b-form-select
            v-model="institucionesBloqueo"
            :options="this.opcionesSiNo"
            :state="lengthState(institucionesBloqueo)"
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
          block
          :disabled="requiredFieldsCompleted()"
          >Crear reporte PATR</b-button
        >
  </b-container>
</template>
<script>
import  PolicyService  from "@/services/policy-service.js";
import PublicPolicyOptions from "@/mixins/public-policy-options.js"

export default {
  mixins: [PublicPolicyOptions],
  data() {
    return {
      tipoReporte: "",      
      subregion: "",
      pilar: "",
      municipio: "",
      iniciativa: "",
      codigoIniciativa: "",
      fechaOcurrencia: "",
      descripcionAccion: "",
      entidadesEstadoEnum1: [],
      otraEntidad1: "",
      dependenciaIncidencia: "",
      resultadoIncidencia: "",
      tiempoIncidencia: "",
      incidenciaQuien: "",
      incidenciaContacto: "",
      incidenciaTelefono: "",
      incidenciaCorreo: "",
      tipoImplementacion: "",
      otraImplementacion: "",
      entidadesEstadoEnum2: [],
      entidadesOtra2: "",
      dependenciaImplementacion: "",
      describaImplementacion: "",
      completado1: "",
      avanza1: "",
      retrasa1: "",
      accionNecesaria: "",
      implementacionContacto: "",
      implementacionTelefono: "",
      implementacionCorreo: "",
      tipoImplementacion2: "",
      tipoImplementacionOtra2: "",
      organizacion: "",
      agencia: "",
      entidadesEstado: "",
      describaImplementacion2: "",
      completado2: "",
      avanza2: "",
      retrasa2: "",
      accionNecesaria2: "",
      tipoBloqueo: "",
      entidadesEstadoEnum3: [],
      entidadOtra3: "",
      dependenciaBloqueo: "",
      descripcionBloqueo: "",
      efectoBloqueo: "",
      impactoBloqueo: "",
      accionesBloqueo: "",
      institucionesBloqueo: "",
      municipioOtro: "",
      iniciativaOtra: "",
      tiempoUnidad:""
    };
  },
  methods: {
    requiredFieldsCompleted() {
      if(!this.tipoReporte ||      
      !this.subregion ||
      !this.pilar ||
      !this.municipio ||
      !this.codigoIniciativa ||
      !this.fechaOcurrencia ||
      !this.descripcionAccion ||
      !this.entidadesEstadoEnum1 ||
      !this.dependenciaIncidencia ||
      !this.resultadoIncidencia ||
      !this.tiempoIncidencia ||
      !this.incidenciaQuien ||
      !this.tipoImplementacion ||
      !this.entidadesEstadoEnum2 ||
      !this.dependenciaImplementacion ||
      !this.describaImplementacion ||
      !this.completado1 ||
      !this.avanza1 ||
      !this.retrasa1 ||
      !this.accionNecesaria ||
      !this.tipoImplementacion2 ||
      !this.organizacion ||
      !this.agencia ||
      !this.entidadesEstado ||
      !this.describaImplementacion2 ||
      !this.completado2 ||
      !this.avanza2 ||
      !this.retrasa2 ||
      !this.accionNecesaria2 ||
      !this.tipoBloqueo ||
      !this.entidadesEstadoEnum3 ||  
      !this.dependenciaBloqueo ||
      !this.descripcionBloqueo ||
      !this.efectoBloqueo ||
      !this.impactoBloqueo ||
      !this.accionesBloqueo ||
      !this.institucionesBloqueo ||
      !this.tiempoUnidad)
      return true;

      return false;
    },
    validateData(data, obj) {
      if(obj)
      {
        if(!data)return []
        return data.split(',');
      }

      if(!data)
        return'';   

      return this.FormatForm(data);  
    },
    lengthState(str) {

      if (str.length > 256) return false;

      if (str.length <= 0) return false;

      return true;
    },
    wrapPolicy() {
      let alert = `[{ "geometry" : {"x": 1,"y": -1,"spatialReference": {"wkid": 4326}},"attributes" : {`;
      alert += '"tipoReporte":"' + this.FormatForDB(this.tipoReporte) + '",';
      alert += '"subregion":"' + this.FormatForDB(this.subregion) + '",';
      alert += '"pilar":"' + this.FormatForDB(this.pilar) + '",';
      alert += '"municipio":"' + this.FormatForDB(this.municipio) + '",';
      alert += '"iniciativa":"' + this.FormatForDB(this.iniciativa) + '",';
      alert += '"codigoIniciativa":"' + this.FormatForDB(this.codigoIniciativa) + '",';
      alert += '"fechaOcurrencia":"' + this.FormatDateForDB(this.fechaOcurrencia) + '",';
      alert += '"descripcionAccion":"' + this.FormatForDB(this.descripcionAccion) + '",';      
      alert += '"entidadesEstadoEnum1":"' + this.FormatForDB(this.entidadesEstadoEnum1) + '",';     
      alert += '"otraEntidad1":"' + this.FormatForDB(this.otraEntidad1) + '",';
      alert += '"dependenciaIncidencia":"' + this.FormatForDB(this.dependenciaIncidencia) + '",';
      alert += '"resultadoIncidencia":"' + this.FormatForDB(this.resultadoIncidencia) + '",';
      alert += '"tiempoIncidencia":"' + this.FormatForDB(this.tiempoIncidencia) + '",';
      alert += '"incidenciaQuien":"' + this.FormatForDB(this.incidenciaQuien) + '",';
      alert += '"incidenciaContacto":"' + this.FormatForDB(this.incidenciaContacto) + '",';
      alert += '"incidenciaTelefono":"' + this.FormatForDB(this.incidenciaTelefono) + '",';
      alert += '"incidenciaCorreo":"' + this.FormatForDB(this.incidenciaCorreo) + '",';
      alert += '"tipoImplementacion":"' + this.FormatForDB(this.tipoImplementacion) + '",';
      alert += '"otraImplementacion":"' + this.FormatForDB(this.otraImplementacion) + '",';
      alert += '"entidadesEstadoEnum2":"' + this.FormatForDB(this.entidadesEstadoEnum2) + '",';
      alert += '"entidadesOtra2":"' + this.FormatForDB(this.entidadesOtra2) + '",';
      alert += '"dependenciaImplementacion":"' + this.FormatForDB(this.dependenciaImplementacion) + '",';
      alert += '"describaImplementacion":"' + this.FormatForDB(this.describaImplementacion) + '",';
      alert += '"completado1":"' + this.FormatForDB(this.completado1) + '",';
      alert += '"avanza1":"' + this.FormatForDB(this.avanza1) + '",';
      alert += '"retrasa1":"' + this.FormatForDB(this.retrasa1) + '",';
      alert += '"accionNecesaria":"' + this.FormatForDB(this.accionNecesaria) + '",';
      alert += '"implementacionContacto":"' + this.FormatForDB(this.implementacionContacto) + '",';
      alert += '"implementacionTelefono":"' + this.FormatForDB(this.implementacionTelefono) + '",';
      alert += '"implementacionCorreo":"' + this.FormatForDB(this.implementacionCorreo) + '",';
      alert += '"tipoImplementacion2":"' + this.FormatForDB(this.tipoImplementacion2) +'",';
      alert += '"tipoImplementacionOtra2":"' + this.FormatForDB(this.tipoImplementacionOtra2) + '",';
      alert += '"organizacion":"' + this.FormatForDB(this.organizacion) + '",';
      alert += '"agencia":"' + this.FormatForDB(this.agencia) + '",';
      alert += '"entidadesEstado":"' + this.FormatForDB(this.entidadesEstado) + '",';
      alert += '"describaImplementacion2":"' + this.FormatForDB(this.describaImplementacion2) + '",';
      alert += '"completado2":"' + this.FormatForDB(this.completado2) + '",';
      alert += '"avanza2":"' + this.FormatForDB(this.avanza2) + '",';
      alert += '"retrasa2":"' + this.FormatForDB(this.retrasa2) +  '",';
      alert += '"accionNecesaria2":"' + this.FormatForDB(this.accionNecesaria2) + '",';
      alert += '"tipoBloqueo":"' + this.FormatForDB(this.tipoBloqueo) + '",';
      alert += '"entidadesEstadoEnum3":"' + this.FormatForDB(this.entidadesEstadoEnum3) + '",';
      alert += '"entidadOtra3":"' + this.FormatForDB(this.entidadOtra3) + '",';
      alert += '"dependenciaBloqueo":"' + this.FormatForDB(this.dependenciaBloqueo) + '",';
      alert += '"descripcionBloqueo":"' + this.FormatForDB(this.descripcionBloqueo) + '",';
      alert += '"efectoBloqueo":"' + this.FormatForDB(this.efectoBloqueo) + '",';
      alert += '"impactoBloqueo":"' + this.FormatForDB(this.impactoBloqueo) + '",';
      alert += '"accionesBloqueo":"' + this.FormatForDB(this.accionesBloqueo) + '",';
      alert += '"institucionesBloqueo":"' + this.FormatForDB(this.institucionesBloqueo) + '",';
      alert += '"municipioOtro":"' + this.FormatForDB(this.municipioOtro) + '",';
      alert += '"iniciativaOtra":"' + this.FormatForDB(this.iniciativaOtra) + '",';
      alert += '"tiempoUnidad":"' + this.FormatForDB(this.tiempoUnidad)+ '"';
      alert += "}}]";

      //console.log(alert);
      return alert;
    },
    async save() {
      const response = await PolicyService.savePolicy(this.wrapPolicy());
      //console.log(response);
      if(response.addResults[0].success) {
        this.$router.push({name:'Home'})
      }
      else{
        this.$store.commit('SET_APP_ERROR', response.addResults[0].error.description)
      } 
    },
  },
    computed: {
      opcionesMunicipios() {
        if(this.subregion == 'Chocó') return this.opcionesMunicipiosChoco

        return [{ value: '', text: 'Selecciona una' }, { value: 'Otro', text: 'Otro' }]
      }, 
      opcionesIniciativas() {
        //console.log('texto es ' + this.getPolicyTexts(this.opcionesIniciativas, this.codigoIniciativa))
        if(this.subregion != 'Chocó') return [{ value: '', text: 'Selecciona una' }, { value: 'Otro', text: 'Otro' }];
        
        if(this.municipio == 'Acandí') return this.opcionesIniciativasAcandi;
        if(this.municipio == 'Bojayá') return this.opcionesIniciativasBojaya;
        if(this.municipio == 'Carmen del Darien') return this.opcionesIniciativasCarmenDelDarien;
        if(this.municipio == 'Condoto') return this.opcionesIniciativasCondoto;
        if(this.municipio == 'El Litoral del San Juan') return this.opcionesIniciativasElLitoralDelSanJuan;
        if(this.municipio == 'Istmina') return this.opcionesIniciativasIstmina;
        if(this.municipio == 'Medio Atrato') return this.opcionesIniciativasMedioAtrato;
        if(this.municipio == 'Medio San Juan') return this.opcionesIniciativasMedioSanJuan;
        if(this.municipio == 'Murindó') return this.opcionesIniciativasMurindo;
        if(this.municipio == 'Novitá') return this.opcionesIniciativasNovita;
        if(this.municipio == 'Riosucio') return this.opcionesIniciativasRiosucio;
        if(this.municipio == 'Sipí') return this.opcionesIniciativasSipi;
        if(this.municipio == 'Unguía') return this.opcionesIniciativasUnguia;
        if(this.municipio == 'Vigía del Fuerte') return this.opcionesIniciativasVigiaDelFuerte;

        return this.opcionesIniciativasSubregion;
      }
    }
};
</script>

<style>
#form {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
<style>
