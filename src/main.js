import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./components/Home.vue') },
  { path: '/dragonKing', component: () => import('./components/DragonRank.vue'), name: '龙王榜' },
  { path: '/tietieKing', component: () => import('./components/TieTieRank.vue'), name: '贴贴榜' },
  { path: '/bellKing', component: () => import('./components/BellRank.vue'), name: '铃铛榜' },
  { path: '/atKing', component: () => import('./components/AtRank.vue'), name: '艾特榜' },
  // { path: '/historyFeed/:uid', component: () => import('./components/HistFeed.vue'), name: '历史犇犇' },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
