import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

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
    component: () => import('./components/HistFeed.vue'),
    name: '用户历史',
  },
  {
    path: '/feed/:feedId(\\d+)',
    component: () => import('./components/SingleFeed.vue'),
    name: '单犇查询',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
