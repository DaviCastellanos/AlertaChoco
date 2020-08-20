import _ from 'lodash';

export default {
  data() {
    return {
      municipios: [
        {
          name: 'murindó',
          x: -76.821123322753863,
          y: 6.98096546797432
        },
        {
          name: 'vigía_del_fuerte',
          x: -76.896253322753893,
          y: 6.5886683130826178
        },
        {
          name: 'acandí',
          x: -77.281309153442351,
          y: 8.5111827568363925
        },
        {
          name: 'bojayá',
          x: -76.884709219516921,
          y: 6.5585479708116505
        },
        {
          name: 'carmén_del_darién',
          x: -76.9947995925903,
          y: 7.1330976755747333
        },
        {
          name: 'condoto',
          x: -76.651912100524825,
          y: 5.0913268533070486
        },
        {
          name: 'el_litoral_del_san_juan',
          x: -77.366101253967244,
          y: 4.26254083649973
        },
        {
          name: 'istmina',
          x: -76.685737084655727,
          y: 5.1516697763266253
        },
        {
          name: 'medio_atrato',
          x: -76.781506677246,
          y: 5.9944065844109957
        },
        {
          name: 'medio_san_juan',
          x: -76.694688935852128,
          y: 5.09266745631731
        },
        {
          name: 'novita',
          x: -76.605686677246069,
          y: 4.955085471084602
        },
        {
          name: 'riosucio',
          x: -77.114372915344177,
          y: 7.438497488129733
        },
        {
          name: 'sipí',
          x: -76.4880663558197,
          y: 4.6258364250154509
        },
        {
          name: 'unguía',
          x: -77.092054730224547,
          y: 8.0424244295420149
        }
      ]
    };
  },
  methods: {
    getCoordinates(municipio) {
      let obj = _.find(this.municipios, { name: municipio.toLowerCase().replace(/ /g, '_') });
      //console.log(obj.x);
      if (!obj) obj = { name: 'default', x: -74.063644, y: 4.624335 };

      return obj;
    }
  }
};
