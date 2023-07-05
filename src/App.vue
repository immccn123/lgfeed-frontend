<script setup>
import { h } from 'vue';
import {
  NMenu,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NSpace,
} from 'naive-ui';
import { RouterLink, RouterView } from 'vue-router';

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/',
        },
        { default: () => '首页' }
      ),
    key: 'home',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/dragonKing',
        },
        { default: () => '龙王榜' }
      ),
    key: 'dragon-king',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/tietieKing',
        },
        { default: () => '贴贴榜' }
      ),
    key: 'tietie-king',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/bellKing',
        },
        { default: () => '铃铛榜' }
      ),
    key: 'bell-king',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/atKing',
        },
        { default: () => '艾特榜' }
      ),
    key: 'at-king',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/historyFeed',
        },
        { default: () => '历史犇犇查询' }
      ),
    key: 'histfeed',
  },
];
</script>

<template>
  <NLayout>
    <NLayoutHeader>
      <NSpace justify="center">
        <NMenu mode="horizontal" :options="menuOptions" />
      </NSpace>
    </NLayoutHeader>
    <NLayoutContent>
      <NSpace justify="center">
        <RouterView></RouterView>
      </NSpace>
    </NLayoutContent>
  </NLayout>
</template>
