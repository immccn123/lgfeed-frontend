<script setup>
import { ref } from 'vue'
import { api } from '../utils'
import { NAvatar, NButton, NList, NListItem, NSpace } from 'naive-ui';

var lastUpdate = ref('Loading...')
var tietieList = []

api.get('/rank/tietie')
  .then((response) => {
    let data = response.data
    lastUpdate.value = new Date(data.cached_at * 1000).toLocaleString()
    tietieList = data.content
  })

</script>

<template>
  <NList bordered hoverable clickable style="min-width: 500px;">
    <template #header>
      <h2>30 日犇犇贴贴榜</h2>
    </template>
    <template #footer>
      上次更新：{{ lastUpdate }}
    </template>
    <NListItem v-for="tietie, i in tietieList">
      <template #prefix>
        #{{ i + 1 }}
      </template>
      <RouterLink style="display: block;" :to="'/historyFeed/' + tietie.uid">
        <NSpace style="display: flex; align-items: center;">
          <NAvatar style="display: inline-block;" round size="small"
            :src="'https://cdn.luogu.com.cn/upload/usericon/' + tietie.uid + '.png'" />
          <NButton text>{{ tietie.name }}</NButton>
        </NSpace>
      </RouterLink>
      <template #suffix>
        {{ tietie.count }}
      </template>
    </NListItem>
  </NList>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
