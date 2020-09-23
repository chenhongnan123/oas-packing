import ElementsService from './elementsService';
import ReportsService from './reportsService';
import V2Service from './v2Service';

const services = {
  elements: ElementsService,
  reports: ReportsService,
  v2: V2Service,
};

const ServiceFactory = {
  get: name => services[name],
};

export default ServiceFactory;
