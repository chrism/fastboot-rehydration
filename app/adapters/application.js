import DS from 'ember-data';
import ENV from 'fastboot-rehydration/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: ENV.rootURL,
  namespace: '/api'
});
