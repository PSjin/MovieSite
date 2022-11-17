import { createApp } from 'vue'
import App from './App.vue'
// import router from './routes/index.js'  //특정폴더의  index는 파일 생략가능
import router from './routes'  //특정폴더의  index는 파일 생략가능
import store from './store/index.js'
import loadImage from './plugins/loadImage'

createApp(App)
  .use(store) //$store
  .use(router)  //$route, $router
  .use(loadImage) //$loadI mage
  .mount('#app')