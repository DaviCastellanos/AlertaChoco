<template>
  <b-container fluid id="form" v-if="this.alert">
    <div class="mt-3">
      <h4>Alerta</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3" v-if="this.alert.attributes.idAlerta">
          <span class="font-weight-bold">Id Alerta: </span> <span>{{ FormatForHuman(this.alert.attributes.idAlerta) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.codigoAnansi">
          <span class="font-weight-bold">Código Anansi: </span> <span>{{ FormatForHuman(this.alert.attributes.codigoAnansi) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.telefono">
          <span class="font-weight-bold">Teléfono: </span> <span>{{ FormatForHuman(this.alert.attributes.telefono) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.relatoQue"><span class="font-weight-bold">Qué pasó: </span> <span v-html="FormatForHuman(this.alert.attributes.relatoQue)"></span></div>

        <div class="mt-3" v-if="this.alert.attributes.primerMensaje"><span class="font-weight-bold">Primer mensaje: </span> <span v-html="FormatForHuman(this.alert.attributes.primerMensaje)"></span></div>

        <div class="mt-3" v-if="this.alert.attributes.relatoComo"><span class="font-weight-bold">Cómo pasó: </span> <span v-html="FormatForHuman(this.alert.attributes.relatoComo)"></span></div>

        <div class="mt-3" v-if="this.alert.attributes.relatoCuando"><span class="font-weight-bold">Cuándo pasó: </span> <span v-html="FormatForHuman(this.alert.attributes.relatoCuando)"></span></div>

        <div class="mt-3" v-if="this.alert.attributes.relatoDonde"><span class="font-weight-bold">Dónde pasó: </span> <span v-html="FormatForHuman(this.alert.attributes.relatoDonde)"></span></div>

        <div class="mt-3" v-if="this.alert.attributes.relatoQuien"><span class="font-weight-bold">A quién le pasó: </span> <span v-html="FormatForHuman(this.alert.attributes.relatoQuien)"></span></div>

        <div class="mt-3" v-if="this.alert.attributes.situacionActual"><span class="font-weight-bold">Situación actual: </span> <span v-html="FormatForHuman(this.alert.attributes.situacionActual)"></span></div>

        <div class="mt-3" v-if="this.alert.attributes.recibeLlamada"><span class="font-weight-bold">Recibe llamada: </span> <span v-html="FormatForHuman(this.alert.attributes.recibeLlamada)"></span></div>

        <div class="mt-3" v-if="this.alert.attributes.puedeReportar">
          <span class="font-weight-bold">Puede reportar: </span> <span>{{ FormatForHuman(this.alert.attributes.puedeReportar) }}</span>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Tiempo</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Fecha reporte:</h6>
          <p>{{ FormatAsDate(this.alert.attributes.fechaReporte) }}</p>
        </div>

        <div class="mt-3 mb-3">
          <h6>Fecha de validacion:</h6>
          <b-form-datepicker id="datepicker" v-model="fechaValidacion" :state="lengthState(FormatAsDate(fechaValidacion))" :placeholder="FormatAsDate(this.fechaValidacion)"></b-form-datepicker>
        </div>

        <div class="mt-3">
          <h6>Fecha de ocurrencia:</h6>
          <b-form-datepicker id="datepicker" v-model="fechaOcurrencia" :state="lengthState(this.fechaOcurrencia)" :placeholder="FormatAsDate(this.fechaOcurrencia)"></b-form-datepicker>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Lugar</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Departamento ocurrencia:</h6>
          <b-form-input v-model="departamentoOcurrencia" :state="lengthState(departamentoOcurrencia)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Municipio ocurrencia:</h6>
          <b-form-input type="text" v-model="municipioOcurrencia" :state="lengthState(municipioOcurrencia)" aria-describedby="input-live-feedback" trim lazy></b-form-input>
        </div>

        <div class="mt-2 ml-2" v-if="this.arcgisAddress">
          <span class="font-italic">{{ this.arcgisAddress.address }}.</span> ¿Sobreescribir coordenadas? <input class="lg" type="checkbox" v-model="overrideCoordinates" />
        </div>

        <div class="mt-3">
          <h6>Entorno de ocurrencia: {{ FormatForm(this.entornoOcurrencia) }}</h6>
          <b-form-select v-model="entornoOcurrencia" :options="this.opcionesEntorno" :state="lengthState(entornoOcurrencia)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Territorio colectivo:</h6>
          <b-form-input v-model="territorioColectivo" :state="lengthState(territorioColectivo)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Barrio:</h6>
          <b-form-input v-model="barrio" :state="lengthState(barrio)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Evento</h4>
    </div>

    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Subcategoría:</h6>
          <b-form-select v-model="subcategoriaEventoEnum" :options="this.opcionesSubcategoria" multiple :select-size="10" :state="lengthState(subcategoriaEventoEnum)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otra subcategoría? ¿cuál?:</h6>
          <b-form-input v-model="subcategoriaEventoOtra" aria-describedby="input-live-feedback" placeholder="opcional" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Categoría: {{ FormatForm(this.categoriaEvento) }}</h6>
          <b-form-select v-model="categoriaEvento" :options="this.opcionesCategoria" :state="lengthState(categoriaEvento)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Tipo de evento: {{ FormatForm(this.tipoEvento) }}</h6>
          <b-form-select v-model="tipoEvento" :options="this.opcionesTipo" :state="lengthState(tipoEvento)" :placeholder="this.tipoEvento"></b-form-select>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Víctimas</h4>
    </div>

    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Nombre Víctima:</h6>
          <b-form-input v-model="nombreVictima" :state="lengthState(nombreVictima)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Edad Víctima:</h6>
          <b-form-input type="number" v-model="edadVictima" :state="lengthState(edadVictima)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Tiene discapacidad?:</h6>
          <b-form-select v-model="discapacidadEnum" :options="this.opcionesDiscapacidad" multiple :select-size="3" :state="lengthState(discapacidadEnum)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Sexo: {{ FormatForm(this.sexo) }}</h6>
          <b-form-select v-model="sexo" :options="this.opcionesSexo" :state="lengthState(sexo)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Perfil de la víctima:</h6>
          <b-form-input v-model="perfilVictima" :state="lengthState(perfilVictima)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Otras víctimas: {{ FormatForm(this.otrasVictimas) }}</h6>
          <b-form-select v-model="otrasVictimas" :options="this.opcionesVictimas" :state="lengthState(otrasVictimas)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Relación con la víctima:</h6>
          <b-form-input v-model="relacionVictima" :state="lengthState(relacionVictima)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Pertenencia étnica: {{ FormatForm(this.etniaVictima) }}</h6>
          <b-form-select v-model="etniaVictima" :options="this.opcionesEtnia" :state="lengthState(etniaVictima)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Rol de víctima:</h6>
          <b-form-select v-model="rolVictimaEnum" :options="this.opcionesRol" multiple :select-size="3" :state="lengthState(rolVictimaEnum)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otro rol? ¿cuál?:</h6>
          <b-form-input v-model="rolVictimaOtro" placeholder="Opcional" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Identidad de género: {{ FormatForm(this.identidadGenero) }}</h6>
          <b-form-select v-model="identidadGenero" :options="this.opcionesIdentidad" :state="lengthState(identidadGenero)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Medidas de protección existentes: {{ FormatForm(this.medidasProteccionExistentes) }}</h6>
          <b-form-select v-model="medidasProteccionExistentes" :options="this.opcionesMedidas" :state="lengthState(medidasProteccionExistentes)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Total víctimas:</h6>
          <b-form-input type="number" v-model="totalVictimas" :state="lengthState(totalVictimas)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Nombres de otras víctimas:</h6>
          <b-form-input v-model="otrasVictimasNombres" :state="lengthState(otrasVictimasNombres)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Afectación</h4>
    </div>

    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Tipo de sujeto afectado:</h6>
          <b-form-select v-model="afectadosEnum" :options="this.opcionesAfectados" multiple :select-size="3" :state="lengthState(afectadosEnum)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>No. de familias afectadas:</h6>
          <b-form-input type="number" v-model="familias" :state="lengthState(familias)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Pertenencia étnica de afectados:</h6>
          <b-form-select v-model="etniaAfectadosEnum" :options="this.opcionesEtniaAfectados" multiple :select-size="3" :state="lengthState(etniaAfectadosEnum)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>No. de personas afectadas:</h6>
          <b-form-input type="number" v-model="numeroPersonas" :state="lengthState(numeroPersonas)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <div class="m-3">
        <h6>Derechos límitados:</h6>
        <b-form-select v-model="derechosDDHEnum" :options="this.opcionesDerechos" multiple :select-size="10" :state="lengthState(derechosDDHEnum)"></b-form-select>
      </div>
    </b-row>
    <hr />

    <div class="mt-3">
      <h4>Agresión</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Tipo de presunto responsable:</h6>
          <b-form-select v-model="tipoResponsableEnum" :options="this.opcionesResponsables" multiple :select-size="5" :state="lengthState(tipoResponsableEnum)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Presunto responsable:</h6>
          <b-form-input v-model="presuntoResponsable" :state="lengthState(presuntoResponsable)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Situación asociada:</h6>
          <b-form-input v-model="situacionAsociada" :state="lengthState(situacionAsociada)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>
      </b-col>
    </b-row>
    <hr />

    <div class="mt-3">
      <h4>Capacidad</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Instituciones Informadas:</h6>
          <b-form-select v-model="institucionesEnum" :options="this.opcionesInstituciones" multiple :select-size="10" :state="lengthState(institucionesEnum)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otra institución? ¿cuál?</h6>
          <b-form-input v-model="institucionOtra" aria-describedby="input-live-feedback" placeholder="Opcional" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Acciones de mitigación:</h6>
          <b-form-input v-model="accionesMitigacion" :state="lengthState(accionesMitigacion)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Riesgo percibido:</h6>
          <b-form-input v-model="riesgoPercibido" :state="lengthState(riesgoPercibido)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <!-- This will only be shown if the preceding input has an invalid state -->
        <b-form-invalid-feedback id="input-live-feedback">
          Máximo 256 carácteres
        </b-form-invalid-feedback>
      </b-col>
    </b-row>
    <b-button @click="this.validate" size="lg" class="text-light mt-5 mb-3" variant="warning" block>{{ buttonText }}</b-button>
  </b-container>
</template>
<script>
import { AlertsService } from '@/services';
import GeocodeService from '@/services/geocode-service.js';
import frozen from '@/mixins/frozen.js';
import coordinates from '@/mixins/coordinates.js';

export default {
  mixins: [frozen, coordinates],
  data() {
    return {
      geocodeBusy: false,
      alert: null,
      fechaOcurrencia: '',
      fechaValidacion: '',
      departamentoOcurrencia: '',
      municipioOcurrencia: '',
      entornoOcurrencia: '',
      territorioColectivo: '',
      barrio: '',
      tipoEvento: '',
      categoriaEvento: '',
      subcategoriaEventoEnum: [],
      subcategoriaEventoOtra: '',
      nombreVictima: '',
      edadVictima: '',
      etniaVictima: '',
      rolVictimaEnum: [],
      rolVictimaOtro: '',
      discapacidadEnum: [],
      sexo: '',
      identidadGenero: '',
      perfilVictima: '',
      medidasProteccionExistentes: '',
      otrasVictimas: '',
      totalVictimas: '',
      otrasVictimasNombres: '',
      relacionVictima: '',
      afectadosEnum: [],
      familias: '',
      numeroPersonas: '',
      etniaAfectadosEnum: [],
      derechosDDHEnum: [],
      tipoResponsableEnum: [],
      presuntoResponsable: '',
      situacionAsociada: '',
      accionesMitigacion: '',
      riesgoPercibido: '',
      institucionesEnum: [],
      institucionOtra: '',
      arcgisAddress: '',
      overrideCoordinates: false,
      hasInited: false
    };
  },
  watch: {
    municipioOcurrencia: function(val) {
      if (this.hasInited) this.lookForCoordinates(val);
      this.hasInited = true;
    },
    userAccess() {
      this.init();
    }
  },
  methods: {
    async lookForCoordinates(mun) {
      //console.log('LookForCoordinates of ' + mun);
      if (this.geocodeBusy) return;

      this.geocodeBusy = true;
      const response = await GeocodeService.getCoordinates(this.$store.getters.arcgisToken, mun);
      //console.log('Coordinates ', response);

      if (response && response.locations[0] && response.locations[0].address) {
        this.arcgisAddress = { address: response.locations[0].address, x: response.locations[0].location.x, y: response.locations[0].location.y };
      }

      this.geocodeBusy = false;
    },
    fillForm() {
      (this.fechaOcurrencia = this.validateData(this.alert.attributes.fechaOcurrencia)),
        (this.fechaValidacion = this.validateData(this.alert.attributes.fechaValidacion)),
        (this.departamentoOcurrencia = this.validateData(this.alert.attributes.departamentoOcurrencia)),
        (this.municipioOcurrencia = this.validateData(this.alert.attributes.municipioOcurrencia)),
        (this.entornoOcurrencia = this.validateData(this.alert.attributes.entornoOcurrencia)),
        (this.territorioColectivo = this.validateData(this.alert.attributes.territorioColectivo)),
        (this.barrio = this.validateData(this.alert.attributes.barrio)),
        (this.tipoEvento = this.validateData(this.alert.attributes.tipoEvento)),
        (this.categoriaEvento = this.validateData(this.alert.attributes.categoriaEvento)),
        (this.subcategoriaEventoEnum = this.validateData(this.alert.attributes.subcategoriaEventoEnum, true)),
        (this.subcategoriaEventoOtra = this.validateData(this.alert.attributes.subcategoriaEventoOtra)),
        (this.nombreVictima = this.validateData(this.alert.attributes.nombreVictima)),
        (this.edadVictima = this.validateData(this.alert.attributes.edadVictima)),
        (this.etniaVictima = this.validateData(this.alert.attributes.etniaVictima)),
        (this.rolVictimaEnum = this.validateData(this.alert.attributes.rolVictimaEnum, true)),
        (this.rolVictimaOtro = this.validateData(this.alert.attributes.rolVictimaOtro)),
        (this.discapacidadEnum = this.validateData(this.alert.attributes.discapacidadEnum, true)),
        (this.sexo = this.validateData(this.alert.attributes.sexo)),
        (this.identidadGenero = this.validateData(this.alert.attributes.identidadGenero)),
        (this.perfilVictima = this.validateData(this.alert.attributes.perfilVictima)),
        (this.medidasProteccionExistentes = this.validateData(this.alert.attributes.medidasProteccionExistentes)),
        (this.otrasVictimas = this.validateData(this.alert.attributes.otrasVictimas)),
        (this.totalVictimas = this.validateData(this.alert.attributes.totalVictimas)),
        (this.otrasVictimasNombres = this.validateData(this.alert.attributes.otrasVictimasNombres)),
        (this.relacionVictima = this.validateData(this.alert.attributes.relacionVictima)),
        (this.afectadosEnum = this.validateData(this.alert.attributes.afectadosEnum, true)),
        (this.familias = this.validateData(this.alert.attributes.familias)),
        (this.numeroPersonas = this.validateData(this.alert.attributes.numeroPersonas)),
        (this.etniaAfectadosEnum = this.validateData(this.alert.attributes.etniaAfectadosEnum, true)),
        (this.derechosDDHEnum = this.validateData(this.alert.attributes.derechosDDHEnum, true)),
        (this.tipoResponsableEnum = this.validateData(this.alert.attributes.tipoResponsableEnum, true)),
        (this.presuntoResponsable = this.validateData(this.alert.attributes.presuntoResponsable)),
        (this.situacionAsociada = this.validateData(this.alert.attributes.situacionAsociada)),
        (this.accionesMitigacion = this.validateData(this.alert.attributes.accionesMitigacion)),
        (this.riesgoPercibido = this.validateData(this.alert.attributes.riesgoPercibido)),
        (this.institucionesEnum = this.validateData(this.alert.attributes.institucionesEnum, true)),
        (this.institucionOtra = this.validateData(this.alert.attributes.institucionOtra));
    },
    validateData(data, obj) {
      if (obj) {
        if (!data) return [];
        return data.split(',');
      }

      if (!data) return '';

      if (typeof data === 'number') data = data.toString();

      return this.FormatForm(data);
    },
    lengthState(str) {
      if (!str) return true;

      if (str.length > 256) return false;

      if (str.length <= 0) return false;

      return true;
    },
    wrapAlert() {
      let alert = '[{';

      if (this.overrideCoordinates) {
        alert += `"geometry" : {"x": ${this.arcgisAddress.x},"y": ${this.arcgisAddress.y},"spatialReference": {"wkid": 4326}},`;
      }

      alert += '"attributes" : {"OBJECTID":"' + this.alert.attributes.OBJECTID + '",';
      alert += '"verificado":"True",';
      alert += '"fechaOcurrencia":"' + this.FormatDateForDB(this.fechaOcurrencia) + '",';
      alert += '"fechaValidacion":"' + this.FormatDateForDB(this.fechaValidacion) + '",';
      alert += '"departamentoOcurrencia":"' + this.FormatForDB(this.departamentoOcurrencia) + '",';
      alert += '"municipioOcurrencia":"' + this.FormatForDB(this.municipioOcurrencia) + '",';
      alert += '"entornoOcurrencia":"' + this.FormatForDB(this.entornoOcurrencia) + '",';
      alert += '"territorioColectivo":"' + this.FormatForDB(this.territorioColectivo) + '",';
      alert += '"barrio":"' + this.FormatForDB(this.barrio) + '",';
      alert += '"tipoEvento":"' + this.FormatForDB(this.tipoEvento) + '",';
      alert += '"categoriaEvento":"' + this.FormatForDB(this.categoriaEvento) + '",';
      alert += '"subcategoriaEventoEnum":"' + this.FormatForDB(this.subcategoriaEventoEnum) + '",';
      alert += '"subcategoriaEventoOtra":"' + this.FormatForDB(this.subcategoriaEventoOtra) + '",';
      alert += '"nombreVictima":"' + this.FormatForDB(this.nombreVictima) + '",';
      alert += '"edadVictima":"' + this.FormatForDB(this.edadVictima) + '",';
      alert += '"etniaVictima":"' + this.FormatForDB(this.etniaVictima) + '",';
      alert += '"rolVictimaEnum":"' + this.FormatForDB(this.rolVictimaEnum) + '",';
      alert += '"rolVictimaOtro":"' + this.FormatForDB(this.rolVictimaOtro) + '",';
      alert += '"discapacidadEnum":"' + this.FormatForDB(this.discapacidadEnum) + '",';
      alert += '"sexo":"' + this.FormatForDB(this.sexo) + '",';
      alert += '"identidadGenero":"' + this.FormatForDB(this.identidadGenero) + '",';
      alert += '"perfilVictima":"' + this.FormatForDB(this.perfilVictima) + '",';
      alert += '"medidasProteccionExistentes":"' + this.FormatForDB(this.medidasProteccionExistentes) + '",';
      alert += '"otrasVictimas":"' + this.FormatForDB(this.otrasVictimas) + '",';
      alert += '"totalVictimas":"' + this.FormatForDB(this.totalVictimas) + '",';
      alert += '"otrasVictimasNombres":"' + this.FormatForDB(this.otrasVictimasNombres) + '",';
      alert += '"relacionVictima":"' + this.FormatForDB(this.relacionVictima) + '",';
      alert += '"afectadosEnum":"' + this.FormatForDB(this.afectadosEnum) + '",';
      alert += '"familias":"' + this.FormatForDB(this.familias) + '",';
      alert += '"numeroPersonas":"' + this.FormatForDB(this.numeroPersonas) + '",';
      alert += '"etniaAfectadosEnum":"' + this.FormatForDB(this.etniaAfectadosEnum) + '",';
      alert += '"derechosDDHEnum":"' + this.FormatForDB(this.derechosDDHEnum) + '",';
      alert += '"tipoResponsableEnum":"' + this.FormatForDB(this.tipoResponsableEnum) + '",';
      alert += '"presuntoResponsable":"' + this.FormatForDB(this.presuntoResponsable) + '",';
      alert += '"situacionAsociada":"' + this.FormatForDB(this.situacionAsociada) + '",';
      alert += '"accionesMitigacion":"' + this.FormatForDB(this.accionesMitigacion) + '",';
      alert += '"riesgoPercibido":"' + this.FormatForDB(this.riesgoPercibido) + '",';
      alert += '"institucionesEnum":"' + this.FormatForDB(this.institucionesEnum) + '",';
      alert += '"institucionOtra":"' + this.FormatForDB(this.institucionOtra) + '"';
      alert += '}}]';

      //console.log(alert);
      return alert;
    },
    async validate() {
      //console.log('Wrapping alert. Override coordenates is ' + this.overrideCoordinates, this.wrapAlert());
      const response = await AlertsService.verifyAlert(this.wrapAlert());
      //console.log(response);
      if (response.updateResults[0].success) {
        this.$store.commit('SET_UPDATE_NEEDED', true);
        this.$router.push({ path: '/' });
      } else {
        this.$store.commit('SET_APP_ERROR', response.updateResults[0].error.description);
      }
    },
    async init() {
      if (this.$store.getters.alerts.length == 1) {
        const token = await AlertsService.getArcgisToken();

        if (!token) {
          console.error('Arcgis token is null');
          return;
        }

        this.$store.commit('SET_ARCGIS_TOKEN', token);

        const response = await AlertsService.getAlerts(this.$store.getters.arcgisToken, this.userAccess);

        if (!response) {
          console.error('Alerts response is null');
          return;
        }

        this.$store.commit('SET_ALERTS', response.features);
      }

      this.alert = this.$store.getters.alertById(this.$route.params.id);
      //console.log('this alert is ', this.alert);
      this.fillForm();
    }
  },
  computed: {
    buttonText() {
      if (this.alert.attributes.verificado == 'True') return 'Guardar';
      return 'Validar';
    },
    userAccess() {
      if (!this.$store.getters.user || !this.$store.getters.user.role) return 'public';
      const role = this.$store.getters.user.role;
      if (role === 'admin' || role === 'analista') return 'private';
      if (role === 'defensor') return 'sensitive';
      return null;
    }
  },
  mounted() {
    this.init();
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
</style>
