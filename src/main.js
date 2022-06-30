import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import store from './router/verified'
// import Navbar from './views/layouts/Navbar.vue'
import Navbar from './components/Navbar.vue'

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min'

const app = createApp(App);
const index = createApp(App);


app.use(router);
app.mount('#app');
