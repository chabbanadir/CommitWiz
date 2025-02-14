import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login/Login.vue';
import Dashboard from '../components/User/Dashboard.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
