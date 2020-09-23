import Service from '../plugins/axios';

const reqConfig = { timeout: 45000 };

export default {
  getReport(serverIp, reportName, customerId, userId, postData, queryParams) {
    try {
      const query = queryParams || '';
      const url = `http://${serverIp}/server/executereport/${reportName}?customerid=${customerId}&userid=${userId}${query}`;
      return Service.post(url, postData, reqConfig);
    } catch (e) {
      throw new Error(e);
    }
  },
};
