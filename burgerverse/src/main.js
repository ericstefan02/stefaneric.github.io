import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from '../store'
import { loadFonts } from './plugins/webfontloader'
import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from './components/HomeComponent.vue'
import FoodComponent from './components/FoodComponent.vue'
import CartComponent from './components/CartComponent.vue'
import LoginComponent from './components/LoginComponent.vue'
import RegisterComponent from './components/RegisterComponent.vue'
import AdminComponent from './components/AdminComponent.vue'
import ContactComponent from './components/ContactComponent.vue'

const routes = [
  { path:"/", component: HomeComponent},
  { path:"/food", component: FoodComponent },
  { path:"/cart", component: CartComponent },
  { path:"/login", component: LoginComponent },
  { path:"/register", component: RegisterComponent },
  { path: "/admin", component: AdminComponent},
  { path: "/contact", component: ContactComponent}
]
  
const router = new createRouter({
  history:createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)
  .mount('#app')
