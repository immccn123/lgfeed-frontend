import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HistFeed from './components/HistFeed.vue';

const routes = [
  { path: '/', component: () => import('./components/HomePage.vue') },
  {
    path: '/dragonKing',
    component: () => import('./components/DragonRank.vue'),
    name: '龙王榜',
  },
  {
    path: '/bellKing',
    component: () => import('./components/BellRank.vue'),
    name: '铃铛榜',
  },
  {
    path: '/atKing',
    component: () => import('./components/AtRank.vue'),
    name: '艾特榜',
  },
  {
    path: '/historyFeed/:uid(\\d+)?',
    redirect: (to) => ({ path: `/user/${to.params.uid}` }),
  },
  {
    path: '/user/:uid(\\d+)?',
    component: HistFeed,
    name: '用户历史',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
