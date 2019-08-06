import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import { Button, Select } from 'element-ui';
import Element from 'element-ui';

Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.use(Button)
Vue.use(Select)
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
