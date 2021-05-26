import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueCropper from 'vue-cropper'

Vue.config.productionTip = false

import toast from './components/toast/index'
Vue.use(toast)

Vue.use(VueCropper)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
