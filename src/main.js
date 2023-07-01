import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HistFeed from './components/HistFeed.vue'

const routes = [
  { path: '/', component: () => import('./components/Home.vue') },
  { path: '/dragonKing', component: () => import('./components/DragonRank.vue'), name: '龙王榜' },
  { path: '/tietieKing', component: () => import('./components/TieTieRank.vue'), name: '贴贴榜' },
  { path: '/bellKing', component: () => import('./components/BellRank.vue'), name: '铃铛榜' },
  { path: '/atKing', component: () => import('./components/AtRank.vue'), name: '艾特榜' },
  { path: '/historyFeed/:uid(\\d+)?', component: HistFeed, name: '历史犇犇' },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
