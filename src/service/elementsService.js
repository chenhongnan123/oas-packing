import Service from '../plugins/axios';

const reqConfig = { timeout: 45000 };

export default {
  getElement(serverIp, elementName, customerId, userId, queryParams) {
    try {
      const query = queryParams || '';
      const url = `http://${serverIp}/server/elements/${elementName}/records?customerid=${customerId}&userid=${userId}${query}`;
      return Service.get(url, reqConfig);
    } catch (e) {
      throw new Error(e);
    }
  },

  postElement(serverIp, elementName, customerId, userId, postData) {
    try {
      const url = `http://${serverIp}/server/elements/${elementName}/records?customerid=${customerId}&userid=${userId}`;
      return Service.post(url, postData, reqConfig);
    } catch (e) {
      throw new Error(e);
    }
  },
};
