export default {
  data() {
    return {
      opcionesCategoria: [
        { value: '', text: 'Selecciona una' },
        { value: 'Agresion directa', text: 'Agresión directa' },
        { value: 'Violencia armada', text: 'Violencia armada' },
        { value: 'Situacion sospechosa', text: 'Situación sospechosa' }
      ],
      opcionesTipo: [
        { value: '', text: 'Selecciona una' },
        { value: 'Individual', text: 'Individual' },
        { value: 'Colectivo', text: 'Colectivo' }
      ],
      opcionesEvolucionSituacion: [
        { value: '', text: 'Selecciona una' },
        { value: 'Escalamiento de la situación', text: 'Escalamiento de la situación' },
        { value: 'Desescalamiento de la situacion', text: 'Desescalamiento de la situacion' },
        { value: 'Continuidad de la situación', text: 'Continuidad de la situación' }
      ],
      opcionesEntorno: [
        { value: '', text: 'Selecciona una' },
        { value: 'Rural', text: 'Rural' },
        { value: 'Cabecera municipal', text: 'Cabecera municipal' },
        { value: 'Centro poblado', text: 'Centro poblado' }
      ],
      opcionesTipoRespuesta: [
        { value: '', text: 'Selecciona una' },
        { value: 'Gestión', text: 'Gestión' },
        { value: 'Consulta al titular del derecho', text: 'Consulta al titular del derecho' },
        { value: 'Implementación de alguna medida', text: 'Implementación de alguna medida' },
        { value: 'Otra', text: 'Otra' }
      ],
      opcionesTrato: [
        { value: '', text: 'Selecciona una' },
        { value: 'Muy bien', text: 'Muy bien' },
        { value: 'Bien', text: 'Bien' },
        { value: 'Mal', text: 'Mal' },
        { value: 'Muy mal', text: 'Muy mal' }
      ],
      opcionesEtnia: [
        { value: '', text: 'Selecciona una' },
        {
          value: 'Afrocolombiano, negro o palenquero',
          text: 'Afrocolombiano, negro o palenquero'
        },
        { value: 'Indigena', text: 'Indígena' },
        { value: 'Raizal', text: 'Raizal' },
        { value: 'Rom', text: 'Rom' },
        { value: 'Mestizo', text: 'Mestizo' },
        { value: 'Blanco', text: 'Blanco' },
        {
          value: 'Ninguna de las anteriores',
          text: 'Ninguna de las anteriores'
        }
      ],
      opcionesAccion: [
        { value: '', text: 'Selecciona una' },
        { value: 'Diálogo con las instituciones', text: 'Diálogo con las instituciones' },
        { value: 'Acciones administrativas', text: 'Acciones administrativas' },
        { value: 'Acciones judiciales', text: 'Acciones judiciales' },
        { value: 'Acciones pacíficas de hecho', text: 'Acciones pacíficas de hecho' },
        { value: 'Otra', text: 'Otra' }
      ],
      opcionesSexo: [
        { value: '', text: 'Selecciona una' },
        { value: 'Mujer', text: 'Mujer' },
        { value: 'Hombre', text: 'Hombre' },
        { value: 'Intersexual', text: 'Intersexual' }
      ],
      opcionesIdentidad: [
        { value: '', text: 'Selecciona una' },
        { value: 'Si', text: 'Sí' },
        { value: 'No', text: 'No' },
        { value: 'Sin informacion', text: 'Sin información' }
      ],
      opcionesVictimas: [
        { value: '', text: 'Selecciona una' },
        { value: 'Si', text: 'Sí' },
        { value: 'No', text: 'No' }
      ],
      opcionesMedidas: [
        { value: '', text: 'Selecciona una' },
        { value: 'Sin informacion', text: 'Sin información' },
        { value: 'Solicitada: en tramite', text: 'Solicitada: en trámite' },
        { value: 'Solicitada: negada', text: 'Solicitada: negada' },
        { value: 'Solicitada: otorgada', text: 'Solicitada: otorgada' },
        { value: 'Levantada', text: 'Levantada' },
        { value: 'Vigente', text: 'Vigente' }
      ],
      opcionesSubcategoria: [
        { value: '', text: 'Selecciona varias (Usa cmd o ctrl)' },
        { value: '0', text: 'Abuso sexual' },
        { value: '1', text: 'Accidente o incidente con minas antipersona o municiones sin explotar' },
        { value: '2', text: 'Actos contra los derechos reproductivos' },
        { value: '3', text: 'Actos contra los derechos sexuales' },
        { value: '4', text: 'Amenazas' },
        { value: '5', text: 'Ataque a bienes civiles' },
        { value: '6', text: 'Ataque indiscriminado' },
        { value: '7', text: 'Bloqueo de vías' },
        { value: '8', text: 'Bombardeo' },
        { value: '9', text: 'Confinamiento' },
        { value: '10', text: 'Confrontación armada o combates' },
        { value: '11', text: 'Control social' },
        { value: '12', text: 'Desaparición forzada' },
        { value: '13', text: 'Desnudez forzada' },
        { value: '14', text: 'Desplazamiento forzado' },
        { value: '15', text: 'Despojo de tierras y territorios' },
        { value: '16', text: 'Detención arbitraria' },
        { value: '17', text: 'Utilización emocional (enamoramiento)' },
        { value: '18', text: 'Estigmatización' },
        { value: '19', text: 'Explotación sexual' },
        { value: '20', text: 'Extorsión' },
        { value: '21', text: 'Homicidio' },
        { value: '22', text: 'Feminicidio' },
        { value: '23', text: 'Hostigamientos' },
        { value: '24', text: 'Incursión de grupos armados' },
        { value: '25', text: 'Lesiones' },
        { value: '26', text: 'Ocupación de bienes civiles' },
        { value: '27', text: 'Paro armado' },
        { value: '28', text: 'Reclutamiento forzado' },
        { value: '29', text: 'Secuestro' },
        { value: '30', text: 'Tortura' },
        { value: '31', text: 'Trata de personas' },
        { value: '32', text: 'Uso o vinculación de niños, niñas y adolescentes' },
        { value: '33', text: 'Violación' },
        { value: '34', text: 'Violencia de pareja o intrafamilar' },
        { value: '35', text: 'Otra' }
      ],
      opcionesEtniaAfectados: [
        { value: '', text: 'Selecciona varias (Usa cmd o ctrl)' },
        { value: '0', text: 'Afrocolombiano, negro o palenquero' },
        { value: '1', text: 'Indígena' },
        { value: '2', text: 'Raizal' },
        { value: '3', text: 'Rom' },
        { value: '4', text: 'Mestizo' },
        { value: '5', text: 'Blanco' },
        { value: '6', text: 'Ninguna de las anteriores' }
      ],
      opcionesRol: [
        { value: '', text: 'Selecciona varias (Usa cmd o ctrl)' },
        { value: '0', text: 'Autoridad espiritual / sabedor tradicional' },
        { value: '1', text: 'Líder / esa organizativo' },
        { value: '2', text: 'Familiar defensor / a' },
        { value: '3', text: 'Líder / esa cultural' },
        { value: '4', text: 'Etnoeducador' },
        { value: '5', text: 'Partera' },
        { value: '6', text: 'Otro' }
      ],
      opcionesDiscapacidad: [
        { value: '', text: 'Selecciona varias (Usa cmd o ctrl)' },
        { value: '0', text: 'Ninguna' },
        { value: '1', text: 'Emocional (no puede relacionarse con otros)  ' },
        { value: '2', text: 'Motora (no puede moverse con facilidad)' },
        { value: '3', text: 'Cognitiva (no puede aprender, razonar, pensar, hablar, facilmente)' },
        { value: '4', text: 'Visual (no puede ver)' },
        { value: '5', text: 'Auditiva (no puede oir)' }
      ],
      opcionesAfectados: [
        { value: '', text: 'Selecciona varias (Usa cmd o ctrl)' },
        { value: '0', text: 'Familia' },
        { value: '1', text: 'Comunidad' },
        { value: '2', text: 'Territorio' },
        { value: '3', text: 'Organización' }
      ],
      opcionesDerechos: [
        { value: '', text: 'Selecciona varias (Usa cmd o ctrl)' },
        { value: '0', text: 'Gestionar la protección de otras personas o la propia' },
        { value: '1', text: 'Asociarse u organizarse para la defensa de los derechos humanos' },
        { value: '2', text: 'Reunirse o manifestarse pacíficamente' },
        { value: '3', text: 'Recabar, obtener, recibir y poseer información sobre derechos humanos' },
        { value: '4', text: 'Promover debates y principios nuevos sobre derechos humanos' },
        { value: '5', text: 'Presentar ante insituciones públicas críticas o propuestas de mejora' },
        { value: '6', text: 'Denunciar las políticas y acciones oficiales y a que se examinen estas denuncias' },
        { value: '7', text: 'Ofrecer y prestar asistencia para defender los derechos humanos' },
        { value: '8', text: 'Asistir a las audiencias, reuniones con insituciones, procedimientos y juicios públicos' },
        { value: '9', text: 'Dirigirse sin barreras a las ONG y a comunicarse con ellas' },
        { value: '10', text: 'Contar con recursos eficaces para la protección y defensa de los derechos humanos' },
        { value: '11', text: 'Ejercer legitimamente la ocupación o profesión de defensor de derechos humanos' },
        {
          value: '12',
          text: 'Obtener protección eficaz de las leyes nacionales al reaccionar u oponerse, por medios pacíficos, a actividades y actos, con inclusión de las omisiones, imputables a los Estados que causen violaciones de los derechos humanos'
        },
        { value: '13', text: 'Solicitar, recibir y utilizar recursos con el objeto de proteger los derechos humanos' }
      ],
      opcionesResponsables: [
        { value: '', text: 'Selecciona varias (Usa cmd o ctrl)' },
        { value: '0', text: 'Fuerza pública' },
        { value: '1', text: 'Grupo guerrillero' },
        { value: '2', text: 'Grupo heredero del paramilitarismo' },
        { value: '3', text: 'Grupo disidente de guerrillas' },
        { value: '4', text: 'Grupo de seguridad privada' },
        { value: '5', text: 'Desconocido' }
      ],
      opcionesTipoSeguimiento: [
        { value: '', text: 'Selecciona una' },
        { value: '0', text: 'Evolución de la situación' },
        { value: '1', text: 'Acción de seguimiento' },
        { value: '2', text: 'Respuesta Institucional' }
      ],
      opcionesInstituciones: [
        { value: '', text: 'Selecciona varias (Usa cmd o ctrl)' },
        { value: '0', text: 'Policía' },
        { value: '1', text: 'Ejército' },
        { value: '2', text: 'Otras fuerzas militares' },
        { value: '3', text: 'Defensoría del Pueblo' },
        { value: '4', text: 'Unidad Nacional de Protección' },
        { value: '5', text: 'Personería' },
        { value: '6', text: 'Alcaldía (secretarías)' },
        { value: '7', text: 'Comisaría o Inspección de Policia' },
        { value: '8', text: 'Otra' }
      ],
      opcionesEntidades: [
        { value: '', text: 'Selecciona varias (Usa cmd o ctrl)' },
        { value: '0', text: 'Alcaldía (secretarías)' },
        { value: '1', text: 'Comisarías o inspección de policía' },
        { value: '2', text: 'Comisión Interamericana de Derechos Humanos' },
        { value: '3', text: 'Corte Constitucional' },
        { value: '4', text: 'Juzgado' },
        { value: '5', text: 'Procuraduría' },
        { value: '6', text: 'Defensoría del Pueblo' },
        { value: '7', text: 'Ejército' },
        { value: '4', text: 'Otras fuerzas militares' },
        { value: '5', text: 'Personería' },
        { value: '6', text: 'Policía' },
        { value: '7', text: 'Unidad Nacional de Protección' },
        { value: '8', text: 'Otra' }
      ]
    };
  },
  methods: {
    getObjectTexts(object, values) {
      if (!values) return 'N/A';
      values = values.split(',');
      let obj = undefined;

      if (object === 'opcionesSubcategoria') obj = this.opcionesSubcategoria;
      if (object === 'opcionesEtniaAfectados') obj = this.opcionesEtniaAfectados;
      if (object === 'opcionesRol') obj = this.opcionesRol;
      if (object === 'opcionesDiscapacidad') obj = this.opcionesDiscapacidad;
      if (object === 'opcionesAfectados') obj = this.opcionesAfectados;
      if (object === 'opcionesDerechos') obj = this.opcionesDerechos;
      if (object === 'opcionesResponsables') obj = this.opcionesResponsables;
      if (object === 'opcionesInstituciones') obj = this.opcionesInstituciones;
      if (object === 'opcionesTipoSeguimiento') obj = this.opcionesTipoSeguimiento;
      if (object === 'opcionesEvolucionSituacion') obj = this.opcionesEvolucionSituacion;
      if (object === 'opcionesEntidades') obj = this.opcionesEntidades;
      if (object === 'opcionesTrato') obj = this.opcionesTrato;
      if (object === 'opcionesTipoRespuesta') obj = this.opcionesTipoRespuesta;

      if (!obj) {
        console.error(object + ' is undefined');
        return;
      }
      let str = '';
      for (var i = 0; i < values.length; i++) {
        str += obj[parseInt(values[i]) + 1].text;
        if (i < values.length - 1) str += ' - ';
      }
      return str;
    }
  }
};
