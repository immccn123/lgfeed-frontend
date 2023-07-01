<script setup>
import { ref } from 'vue'
import { api } from '../utils'
import { NAvatar, NButton, NList, NListItem, NSpace } from 'naive-ui';

var lastUpdate = ref('Loading...')
var bePingedList = []

api.get('/rank/bePinged')
  .then((response) => {
    let data = response.data
    lastUpdate.value = new Date(data.cached_at * 1000).toLocaleString()
    bePingedList = data.content
  })

</script>

<template>
  <NList bordered hoverable clickable style="min-width: 500px;">
    <template #header>
      <h2>30 日犇犇铃铛榜</h2>
    </template>
    <template #footer>
      上次更新：{{ lastUpdate }}
    </template>
    <NListItem v-for="bePinged, i in bePingedList">
      <template #prefix>
        #{{ i + 1 }}
      </template>
      <RouterLink style="display: block;" :to="'/historyFeed/' + bePinged.uid">
        <NSpace style="display: flex; align-items: center;">
          <NAvatar style="display: inline-block;" round size="small"
            :src="'https://cdn.luogu.com.cn/upload/usericon/' + bePinged.uid + '.png'" />
          <NButton text>{{ bePinged.name }}</NButton>
        </NSpace>
      </RouterLink>
      <template #suffix>
        {{ bePinged.count }}
      </template>
    </NListItem>
  </NList>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
