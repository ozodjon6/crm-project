import Vue from 'vue'
import App from './App.vue'
import {Vuelidate} from "vuelidate";
import './registerServiceWorker'
import router from './router'
import Paginate from 'vuejs-paginate'
import VueRouter from "vue-router";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import messagePlugin from '@/utils/message.plugn'
import tooltipDirective from '@/directives/tooltip.directive'
import store from './store'
import Loader from "@/components/app/Loader";
import 'materialize-css/dist/js/materialize.min'

import firebase from "firebase/compat";
import 'firebase/auth'
import 'firebase/database'

firebase.initializeApp({
  apiKey: "AIzaSyD9dhBJ17Q7Ac-DVQWcIVzCC6jCbL4Qbc0",
  authDomain: "crm-project-1971c.firebaseapp.com",
  projectId: "crm-project-1971c",
  storageBucket: "crm-project-1971c.appspot.com",
  messagingSenderId: "42681397952",
  appId: "1:42681397952:web:c35a732d28f6eb04c0b325",
  measurementId: "G-HMP7NR0XFN"
})

Vue.config.productionTip = false

Vue.component('Loader', Loader);

Vue.use(messagePlugin)
Vue.use(Vuelidate);
Vue.use(VueRouter)

Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Paginate', Paginate)

let app;

firebase.auth().onAuthStateChanged( () => {
  if (!app) {
   app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

