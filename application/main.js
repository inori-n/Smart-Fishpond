
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import echarts from '@/components/echarts/echarts.vue';
import * as echarts from 'echarts' // 引入ECharts库
import {CanvasRenderer} from 'echarts/renderers'; // 引入 Canvas 渲染器，没有这个Echart不显示
import uView from 'uview-ui'
Vue.use(uView)


const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif