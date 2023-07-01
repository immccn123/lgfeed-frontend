<script setup>
import { ref } from 'vue'
import { api } from '../utils'
import { NAvatar, NButton, NList, NListItem, NSpace } from 'naive-ui';

var lastUpdate = ref('Loading...')
var dragonList = []

api.get('/rank/dragon')
  .then((response) => {
    let data = response.data
    lastUpdate.value = new Date(data.cached_at * 1000).toLocaleString()
    dragonList = data.content
  })

</script>

<template>
  <NList bordered hoverable clickable style="min-width: 500px;">
    <template #header>
      <h2>30 日犇犇龙王榜</h2>
    </template>
    <template #footer>
      上次更新：{{ lastUpdate }}
    </template>
    <NListItem v-for="dragon, i in dragonList">
      <template #prefix>
        #{{ i + 1 }}
      </template>
      <a style="display: block;" :href="'https://www.luogu.com.cn/user/' + dragon.uid">
        <NSpace style="display: flex; align-items: center;">
          <NAvatar style="display: inline-block;" round size="small"
            :src="'https://cdn.luogu.com.cn/upload/usericon/' + dragon.uid + '.png'" />
          <NButton text>{{ dragon.name }}</NButton>
        </NSpace>
      </a>
      <template #suffix>
        {{ dragon.count }}
      </template>
    </NListItem>
  </NList>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
