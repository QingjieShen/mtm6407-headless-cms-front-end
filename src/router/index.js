import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Detail from '../components/Detail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/details/:id',
    name: 'Detail',
    component: Detail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;