<script setup>
import { h } from 'vue';
import { NMenu, NLayout, NLayoutHeader, NLayoutContent, NSpace, NGrid, NGridItem, NDropdown, NButton, NIcon } from 'naive-ui';
import { RouterLink, RouterView } from 'vue-router';
import { MenuOutline } from '@vicons/ionicons5';

const menuOptions = [
  {
    label: () => h(
      RouterLink,
      {
        to: '/'
      },
      { default: () => '首页' },
    ),
    key: 'home',
  },
  {
    label: () => h(
      RouterLink,
      {
        to: '/dragonKing'
      },
      { default: () => '龙王榜' }
    ),
    key: 'dragon-king',
  },
  {
    label: () => h(
      RouterLink,
      {
        to: '/tietieKing'
      },
      { default: () => '贴贴榜' }
    ),
    key: 'tietie-king',
  },
  {
    label: () => h(
      RouterLink,
      {
        to: '/bellKing'
      },
      { default: () => '铃铛榜' }
    ),
    key: 'bell-king',
  },
  {
    label: () => h(
      RouterLink,
      {
        to: '/atKing'
      },
      { default: () => '艾特榜' }
    ),
    key: 'at-king',
  },
  {
    label: () => h(
      RouterLink,
      {
        to: '/historyFeed'
      },
      { default: () => '历史犇犇查询' }
    ),
    // <RouterLink to='/historyFeed' default = '/历史犇犇查询'>
    key: 'histfeed',
  },
];


const menuOptionsMobile = [
  {
    label: () => h(
      NDropdown,
      { trigger: 'hover', options: menuOptions },
      [
        h(
          NButton,
          [],
          [
            h(
              NIcon,
              {},
              h(MenuOutline)
            )
          ]
        )
      ]
    ),
    key: 'histfeed',
  },
];
</script>

<template>
    <NLayout>
        <NLayoutHeader>
            <n-grid cols="12" item-responsive responsive="screen">
                <n-grid-item span="0 m:12">
                    <NSpace justify="center">
                        <NMenu mode="horizontal" :options="menuOptions" />
                    </NSpace>
                </n-grid-item>
                <n-grid-item span="12 m:0">
                    <n-menu mode="horizontal" :options="menuOptionsMobile" />
                </n-grid-item>
            </n-grid>
        </NLayoutHeader>
        <NLayoutContent>
            <NSpace justify="center">
                <RouterView></RouterView>
            </NSpace>
        </NLayoutContent>
    </NLayout>
    <!-- <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"> -->
    <!-- </svg> -->
</template>
