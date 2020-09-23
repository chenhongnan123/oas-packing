import moment from 'moment';
import { set } from '../../utils/helper';
import ServiceFactory from '../../service/ServiceFactory';

const V2Service = ServiceFactory.get('v2');
const ElementService = ServiceFactory.get('elements');

export default {
  state: {
    userId: localStorage.getItem('userId') || null,
    serverIp: localStorage.getItem('serverIp') || null,
    customerId: localStorage.getItem('customerId') || null,
    customerName: localStorage.getItem('customerName') || null,
    stationName: localStorage.getItem('stationName') || null,
    workNumber: null,
    workName: null,
    settingsDialog: null,
    worknumberDialog: true,
    historyDialog: null,
    firstUpdate: null,
    isConnected: true,
    servertime: null,
    employeeList: [],
    employeeId: null,
  },
  mutations: {
    SET_USER_ID: set('userId'),
    SET_SERVER_IP: set('serverIp'),
    SET_CUSTOMER_ID: set('customerId'),
    SET_CUSTOMER_NAME: set('customerName'),
    SET_STATION_NAME: set('stationName'),
    SET_WORK_NUMBER: set('workNumber'),
    SET_WORK_NAME: set('workName'),
    SET_SETTINGS_DIALOG: set('settingsDialog'),
    SET_WORKNUMBER_DIALOG: set('worknumberDialog'),
    SET_HISTORY_DIALOG: set('historyDialog'),
    SET_FIRST_UPDATE: set('firstUpdate'),
    SET_IS_CONNECTED: set('isConnected'),
    SET_SERVETIME: set('servertime'),
    SET_EMPLOYEELIST: set('employeeList'),
    SET_EMPLOYEEID: set('employeeId'),
  },
  actions: {
    GET_SERVER_TIME: async ({ state, commit }) => {
      const { serverIp, customerId, userId } = state;
      try {
        const response = await V2Service.getElementV2(
          serverIp,
          'servertime',
          customerId,
          userId,
        );
        if (response.status === 200) {
          const { data } = response;
          commit('SET_SERVETIME', data.results);
          commit('SET_IS_CONNECTED', true);
        } else {
          commit('SET_IS_CONNECTED', false);
        }
      } catch (e) {
        commit('SET_IS_CONNECTED', false);
      }
    },
    GET_EMPLOYEELIST: async ({ state }) => {
      try {
        const {
          serverIp, customerId, userId,
        } = state;
        const data = await ElementService.getElement(
          serverIp,
          'employee',
          customerId,
          userId,
          '&query=employeetype==%22Operator%22',
        );
        if (data.data.results.length > 0) {
          const employeeList = data.data.results;
          return employeeList;
        }
        return [];
      } catch (e) {
        console.log(e);
      }
    },
    RECORD_WORK_NUMBER: async ({ state }) => {
      const {
        serverIp, customerId, userId, workNumber, customerName, servertime,
      } = state;
      try {
        const postData = [{
          // date: "21-07-2020:11:06:41",
          date: moment(servertime).format('DD-MM-YYYY:HH:mm:ss'),
          operatorid: workNumber,
          signintime: servertime,
          siteName: customerName,
          timestamp: servertime,
        }];
        V2Service.postBulkRecordsV2(
          serverIp,
          'operator',
          customerId,
          userId,
          postData,
        );
      } catch (e) {
        console.log(e);
      }
    },
  },
};
