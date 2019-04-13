import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import getStore from './store.js'
//import $ from 'jquery'

Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(Vuex)
Vue.config.devtools = true

const store = getStore();

var vueInstance = new Vue({
    el: '#app',
    components: { App },
    render: function(h) {
        return h('App');
    },
    store                   // Vuex-хранилище
});