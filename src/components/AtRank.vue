<script setup>
import { ref } from 'vue';
import { api } from '../utils';
import {
  NAvatar,
  NButton,
  NList,
  NListItem,
  NSpace,
  NStatistic,
  NNumberAnimation,
} from 'naive-ui';

var lastUpdate = ref('Loading...');
var pingOthersList = [];

api.get('/rank/pingOthers').then((response) => {
  const { data } = response;
  lastUpdate.value = new Date(data.cached_at * 1000).toLocaleString();
  pingOthersList = data.content;
});
</script>

<template>
  <NList bordered hoverable clickable style="min-width: 500px">
    <template #header>
      <h2>30 日犇犇艾特榜</h2>
    </template>
    <template #footer> 上次更新：{{ lastUpdate }} </template>
    <NListItem v-for="(pingOthers, i) in pingOthersList" :key="i">
      <template #prefix> #{{ i + 1 }} </template>
      <RouterLink style="display: block" :to="'/historyFeed/' + pingOthers.uid">
        <NSpace style="display: flex; align-items: center">
          <NAvatar
            style="display: inline-block"
            round
            size="small"
            :src="
              'https://cdn.luogu.com.cn/upload/usericon/' +
              pingOthers.uid +
              '.png'
            "
          />
          <NButton text>{{ pingOthers.name }}</NButton>
        </NSpace>
      </RouterLink>
      <template #suffix>
        <NStatistic tabular-nums>
          <NNumberAnimation v-if="i < 10" :from="0" :to="pingOthers.count" />
          <span v-else>{{ pingOthers.count }}</span>
        </NStatistic>
      </template>
    </NListItem>
  </NList>
</template>
