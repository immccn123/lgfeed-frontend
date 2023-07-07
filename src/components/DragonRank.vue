<script setup>
import { ref, watch } from 'vue';
import { api } from '../utils';
import {
  NAvatar,
  NButton,
  NList,
  NListItem,
  NSpace,
  NStatistic,
  NNumberAnimation,
  NSwitch,
} from 'naive-ui';

const lastUpdate = ref('Loading...');
const dailyURL = ref('dragon');
var dragonList = [];

const colorList = [
  'gold',
  '#bfa100',
  '#7d7d00',
  '#cf0000',
  '#af0000',
  '#a50000',
  '#aa0000',
  '#990000',
  '#550000',
  'black',
];

api.get('/rank/dragon').then((response) => {
  const { data } = response;
  lastUpdate.value = new Date(data.cached_at * 1000).toLocaleString();
  dragonList = data.content;
});

watch(dailyURL, () => {
  dragonList = [];
  lastUpdate.value = 'Loading...';
  api.get(`/rank/${dailyURL.value}`).then((response) => {
    const { data } = response;
    lastUpdate.value = new Date(data.cached_at * 1000).toLocaleString();
    dragonList = data.content;
  });
});
</script>

<template>
  <NList bordered hoverable clickable style="min-width: 600px">
    <template #header>
      <h2>
        <NSwitch
          checked-value="dailyDragon"
          unchecked-value="dragon"
          v-model:value="dailyURL"
          :round="false"
        >
          <template #checked> 24 小时 </template>
          <template #unchecked> 30 日 </template> </NSwitch
        >犇犇龙王榜
      </h2>
    </template>
    <template #footer> 上次更新：{{ lastUpdate }} </template>
    <NListItem v-for="(dragon, i) in dragonList" :key="i">
      <template #prefix> #{{ i + 1 }} </template>
      <RouterLink style="display: block" :to="'/user/' + dragon.uid">
        <NSpace style="display: flex; align-items: center">
          <NAvatar
            style="display: inline-block"
            round
            size="small"
            :src="
              'https://cdn.luogu.com.cn/upload/usericon/' + dragon.uid + '.png'
            "
          />
          <NButton text>{{ dragon.name }}</NButton>
        </NSpace>
      </RouterLink>
      <template #suffix>
        <NStatistic tabular-nums>
          <span v-if="i < 10" :style="{ color: colorList[i] }">
            <NNumberAnimation v-if="i < 10" :from="0" :to="dragon.count" />
          </span>
          <span v-else>{{ dragon.count }}</span>
        </NStatistic>
      </template>
    </NListItem>
  </NList>
</template>
