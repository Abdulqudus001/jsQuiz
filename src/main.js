import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import 'prismjs/themes/prism.css';

const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROjECT_ID,
});

Vue.config.productionTip = false;
Vue.prototype.$firebase = firebase.firestore();

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
