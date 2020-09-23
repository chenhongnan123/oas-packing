import { set } from '../../utils/helper';
import ServiceFactory from '../../service/ServiceFactory';

const ElementService = ServiceFactory.get('elements');
const ReportService = ServiceFactory.get('reports');

export default {
  state: {
    recentBarcodes: [],
  },
  mutations: {
    SET_ERROR: set('error'),
    SET_BARCODES: set('recentBarcodes'),
  },
  actions: {
    SET_PACKING_BARCODE: async ({ commit, rootState }, payload ) => {
      const { serverIp, customerId, userId } = rootState.helper;
      try {
        const result = await ElementService.postElement(
          serverIp,
          'package',
          customerId,
          userId,
          payload,
        );
        return result;
      } catch (e) {
        commit('SET_ERROR', e.message);
      }
    },

    GET_PACKING_BARCODES: async ({ commit, rootState }) => {
      const { serverIp, customerId, userId } = rootState.helper;
      const { items } = rootState.basket;
      try {
        const postData = {
          all: true,
          basketnumberval: items[0].basketnumber,
        };
        const { data } = await ReportService.getReport(
          serverIp,
          'packagerecord',
          customerId,
          userId,
          postData,
          '&all=true',
        );
        let { reportData } = data;
        reportData = JSON.parse(reportData);
        if (reportData.reportData.length) {
          commit('SET_BARCODES', reportData.reportData.reverse());
        }
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
