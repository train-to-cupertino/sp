import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import getStore from './store.js'
//import $ from 'jquery'

Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(Vuex)
Vue.use(Vuetify)
Vue.config.devtools = true

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

const store = getStore();

var vueInstance = new Vue({
    el: '#app',
    components: { App },
    render: function(h) {
        return h('App');
    },
    store                   // Vuex-хранилище
});