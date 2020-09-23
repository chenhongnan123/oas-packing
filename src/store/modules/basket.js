import i18n from '../../plugins/i18n';
import { remove, set } from '../../utils/helper';
import ServiceFactory from '../../service/ServiceFactory';

const ReportService = ServiceFactory.get('reports');

export default {
  state: {
    items: [],
    error: null,
  },
  mutations: {
    ADD_ITEMS: set('items'),
    REMOVE_ITEM: remove('items'),
    SET_ITEMS_NULL: set('items'),
    SET_ERROR: set('error'),
  },
  actions: {
    CONFIRM_BASKET: async ({ commit, rootState }, barcode) => {
      const { serverIp, customerId, userId } = rootState.helper;
      try {
        const postData = {
          all: true,
          basketnumberval: barcode,
        };
        const { data } = await ReportService.getReport(
          serverIp,
          'basketrecord',
          customerId,
          userId,
          postData,
          '&all=true',
        );
        let { reportData } = data;
        reportData = JSON.parse(reportData);
        if (reportData.reportData.length) {
          const items = reportData.reportData.filter((d) => {
            d.quantityActual = '';
            return d.basketnumber === barcode;
          });
          commit('ADD_ITEMS', items);
          if (items.length === 0) {
            commit('SET_ERROR', i18n.t('basket.errors.invalidInput', { barcode }));
          }
        } else {
          commit('SET_ERROR', i18n.t('basket.errors.invalidInput', { barcode }));
        }
      } catch (e) {
        commit('SET_ERROR', e.message);
      }
    },
  },
  getters: {
    enableButtons: ({ items }) => (items && items.length > 0 && items[0].quantityActual > 0),
  },
};
