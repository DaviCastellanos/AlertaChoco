<template>
  <div id="report" v-if="this.alert.attributes">
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
        <div class="mt-3" v-if="this.alert.attributes.fechaReporte">
          <span class="font-weight-bold">Fecha reporte: </span> <span>{{ FormatAsDate(this.alert.attributes.fechaReporte) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.fechaValidacion">
          <span class="font-weight-bold">Fecha validacion: </span> <span>{{ FormatAsDate(this.alert.attributes.fechaValidacion) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.fechaOcurrencia">
          <span class="font-weight-bold">Fecha ocurrencia: </span> <span>{{ FormatAsDate(this.alert.attributes.fechaOcurrencia) }}</span>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Lugar</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3" v-if="this.alert.attributes.departamentoOcurrencia">
          <span class="font-weight-bold">Departamento de ocurrencia: </span> <span>{{ FormatForHuman(this.alert.attributes.departamentoOcurrencia) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.municipioOcurrencia">
          <span class="font-weight-bold">Municipio de ocurrencia: </span> <span>{{ FormatForHuman(this.alert.attributes.municipioOcurrencia) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.entornoOcurrencia">
          <span class="font-weight-bold">Entorno de ocurrencia: </span> <span>{{ FormatForHuman(this.alert.attributes.entornoOcurrencia) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.territorioColectivo">
          <span class="font-weight-bold">Territorio colectivo: </span> <span>{{ FormatForHuman(this.alert.attributes.territorioColectivo) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.barrio">
          <span class="font-weight-bold">Barrio: </span> <span>{{ FormatForHuman(this.alert.attributes.barrio) }}</span>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Evento</h4>
    </div>

    <b-row>
      <b-col>
        <div class="mt-3" v-if="this.alert.attributes.subcategoriaEventoEnum">
          <span class="font-weight-bold">Subcategoría: </span> <span>{{ getObjectTexts('opcionesSubcategoria', this.alert.attributes.subcategoriaEventoEnum) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.subcategoriaEventoOtra">
          <span class="font-weight-bold">Otra subcategoría: </span> <span>{{ FormatForHuman(this.alert.attributes.subcategoriaEventoOtra) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.categoriaEvento">
          <span class="font-weight-bold">Categoría: </span> <span>{{ FormatForHuman(this.alert.attributes.categoriaEvento) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.tipoEvento">
          <span class="font-weight-bold">Tipo : </span> <span>{{ FormatForHuman(this.alert.attributes.tipoEvento) }}</span>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Víctimas</h4>
    </div>

    <b-row>
      <b-col>
        <div class="mt-3" v-if="this.alert.attributes.nombreVictima">
          <span class="font-weight-bold">Nombre víctima: </span> <span>{{ FormatForHuman(this.alert.attributes.nombreVictima) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.edadVictima">
          <span class="font-weight-bold">Edad víctima: </span> <span>{{ this.alert.attributes.edadVictima }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.discapacidadEnum">
          <span class="font-weight-bold">Discapacidad: </span> <span>{{ getObjectTexts('opcionesDiscapacidad', this.alert.attributes.discapacidadEnum) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.sexo">
          <span class="font-weight-bold">Sexo: </span> <span>{{ FormatForHuman(this.alert.attributes.sexo) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.perfilVictima">
          <span class="font-weight-bold">Perfil de la víctima: </span> <span>{{ FormatForHuman(this.alert.attributes.perfilVictima) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.otrasVictimas">
          <span class="font-weight-bold">Otras víctimas: </span> <span>{{ FormatForHuman(this.alert.attributes.otrasVictimas) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.relacionVictima">
          <span class="font-weight-bold">Relación con la víctima: </span> <span>{{ FormatForHuman(this.alert.attributes.relacionVictima) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.etniaVictima">
          <span class="font-weight-bold">Pertenencia étnica: </span> <span>{{ FormatForHuman(this.alert.attributes.etniaVictima) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.rolVictimaEnum">
          <span class="font-weight-bold">Rol de víctima: </span> <span>{{ getObjectTexts('opcionesRol', this.alert.attributes.rolVictimaEnum) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.rolVictimaOtro">
          <span class="font-weight-bold">Otro rol: </span> <span>{{ FormatForHuman(this.alert.attributes.rolVictimaOtro) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.identidadGenero">
          <span class="font-weight-bold">Identidad de género: </span> <span>{{ FormatForHuman(this.alert.attributes.identidadGenero) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.medidasProteccionExistentes">
          <span class="font-weight-bold">Medidas de protección existentes: </span> <span>{{ FormatForHuman(this.alert.attributes.medidasProteccionExistentes) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.totalVictimas">
          <span class="font-weight-bold">Total de víctimas: </span> <span>{{ this.alert.attributes.totalVictimas }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.otrasVictimasNombres">
          <span class="font-weight-bold">Nombres de otras víctimas: </span> <span>{{ FormatForHuman(this.alert.attributes.otrasVictimasNombres) }}</span>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Afectación</h4>
    </div>

    <b-row>
      <b-col>
        <div class="mt-3" v-if="this.alert.attributes.afectadosEnum">
          <span class="font-weight-bold">Tipo de sujeto afectado: </span> <span>{{ getObjectTexts('opcionesAfectados', this.alert.attributes.afectadosEnum) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.familias">
          <span class="font-weight-bold">Número de familias afectadas: </span> <span>{{ this.alert.attributes.familias }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.etniaAfectadosEnum">
          <span class="font-weight-bold">Pertenencia étnica de afectados: </span> <span>{{ getObjectTexts('opcionesEtniaAfectados', this.alert.attributes.etniaAfectadosEnum) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.numeroPersonas">
          <span class="font-weight-bold">Número de personas afectadas: </span> <span>{{ this.alert.attributes.numeroPersonas }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.derechosDDHEnum">
          <span class="font-weight-bold">Derechos límitados: </span> <span>{{ getObjectTexts('opcionesDerechos', this.alert.attributes.derechosDDHEnum) }}</span>
        </div>
      </b-col>
    </b-row>
    <hr />

    <div class="mt-3">
      <h4>Agresión</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3" v-if="this.alert.attributes.tipoResponsableEnum">
          <span class="font-weight-bold">Tipo de presunto responsable: </span> <span>{{ getObjectTexts('opcionesResponsables', this.alert.attributes.tipoResponsableEnum) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.presuntoResponsable">
          <span class="font-weight-bold">Presunto responsable: </span> <span>{{ FormatForHuman(this.alert.attributes.presuntoResponsable) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.situacionAsociada">
          <span class="font-weight-bold">Situación asociada: </span> <span>{{ FormatForHuman(this.alert.attributes.situacionAsociada) }}</span>
        </div>
      </b-col>
    </b-row>
    <hr />

    <div class="mt-3">
      <h4>Capacidad</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3" v-if="this.alert.attributes.institucionesEnum">
          <span class="font-weight-bold">Instituciones informadas: </span> <span>{{ getObjectTexts('opcionesInstituciones', this.alert.attributes.institucionesEnum) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.institucionOtra">
          <span class="font-weight-bold">Otra institucion: </span> <span>{{ FormatForHuman(this.alert.attributes.institucionOtra) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.accionesMitigacion">
          <span class="font-weight-bold">Acciones de mitigación: </span> <span>{{ FormatForHuman(this.alert.attributes.accionesMitigacion) }}</span>
        </div>

        <div class="mt-3" v-if="this.alert.attributes.riesgoPercibido">
          <span class="font-weight-bold">Riesgo percibido: </span> <span>{{ FormatForHuman(this.alert.attributes.riesgoPercibido) }}</span>
        </div>
      </b-col>
    </b-row>
    <div v-for="value in followUps" v-bind:key="value.OBJECTID">
      <hr />
      <div class="mt-3">
        <h4>Seguimiento</h4>
      </div>
      <b-row>
        <b-col>
          <div class="mt-3" v-if="value.tipoSeguimientoEnum">
            <span class="font-weight-bold">Tipo: </span> <span>{{ getObjectTexts('opcionesTipoSeguimiento', value.tipoSeguimientoEnum) }}</span>
          </div>

          <div class="mt-3" v-if="value.fechaAccionRespuesta">
            <span class="font-weight-bold">Fecha de acción/respuesta: </span> <span>{{ FormatAsDate(value.fechaAccionRespuesta) }}</span>
          </div>

          <div class="mt-3" v-if="value.institucionesInformadasEnum">
            <span class="font-weight-bold">Instituciones informadas: </span> <span>{{ getObjectTexts('opcionesInstituciones', value.institucionesInformadasEnum) }}</span>
          </div>

          <div class="mt-3">
            <b-button size="sm" class="text-light my-2 my-sm-0" type="submit">Ver seguimiento</b-button>
          </div>
        </b-col>
      </b-row>
    </div>

    <hr />
    <div class="mt-3">
      <b-row>
        <b-col v-if="userAccessIsPrivate">
          <div class="mt-3">
            <b-button size="lg" :to="verifyURL" class="text-light my-2 my-sm-0" variant="warning">{{ this.buttonText }}</b-button>
          </div>
        </b-col>
        <b-col v-if="userIsAuthenticated">
          <div class="mt-3">
            <b-button size="lg" :to="followUpURL" class="text-light my-2 my-sm-0" variant="warning">Seguir</b-button>
          </div>
        </b-col>
        <b-col v-if="userIsAdmin">
          <div class="mt-3">
            <b-button size="lg" :to="deleteURL" class="text-light my-2 my-sm-0" variant="danger">Eliminar</b-button>
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
      alert: Number,
      followUps: null
    };
  },
  methods: {
    async getFollowUps() {
      if (!this.alert || !this.followUpIds) return;
      const alertFollowUps = this.followUpIds.filter(el => {
        if (el.attributes.idAlerta === this.alert.attributes.idAlerta) return true;
        else return false;
      });
      //console.log('ids', followUpIds);

      if (!alertFollowUps) return;

      let followUps = [];
      for (var i = 0; i < alertFollowUps.length; i++) {
        const followUp = await FollowUpsService.getFollowUpInfo(this.$store.getters.arcgisToken, alertFollowUps[i].attributes.OBJECTID);
        //console.log('followUp is ', followUp);
        followUps.push(followUp);
      }

      this.followUps = followUps;
    }
  },
  watch: {
    alerts(alerts) {
      if (!alerts || alerts.length <= 1) return;
      this.alert = this.$store.getters.alertById(this.$route.params.id);
      //console.log('Report alert is ', this.alert);
      if (alert) this.getFollowUps();
    }
  },
  computed: {
    verifyURL() {
      return '/verify/' + this.alert.attributes.idAlerta;
    },
    followUpURL() {
      return '/followup/' + this.alert.attributes.idAlerta;
    },
    deleteURL() {
      return '/deletereport/' + this.alert.attributes.OBJECTID;
    },
    buttonText() {
      if (this.alert.attributes.verificado == 'True') return 'Editar';
      return 'Validar';
    },
    alerts() {
      return this.$store.getters.alerts;
    },
    followUpIds() {
      return this.$store.getters.followUpIds;
    }
  },
  mounted() {
    if (this.alerts.length <= 1) return;
    //console.log('Report alert is ', value);
    this.alert = this.$store.getters.alertById(this.$route.params.id);
    this.getFollowUps();
  }
};
</script>

<style scoped>
#report {
  padding: 50px;
  margin: 2px;
  width: 100%;
  height: 100%;
}
</style>
