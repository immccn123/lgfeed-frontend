<script setup>
import { NAvatar, NButton, NInput, NInputGroup, NList, NListItem, NPagination, NText, NThing } from 'naive-ui'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../utils'
import MarkdownIt from 'markdown-it'

const route = useRoute()
const router = useRouter()
const md = new MarkdownIt()

const onlyAllowNumber = (value) => !value || /^\d+$/.test(value)

const feedList = ref([])
const show = ref({})
var isQueried = ref(false), isLoading = ref(false)
const page = ref(1)
const uid = ref(route.params.uid)

const query = () => {
  show.value = {}
  feedList.value = []
  isLoading.value = 1
  api.get('/blackHistory/feed/' + uid.value + '?page=' + page.value).then((response) => {
    let data = response.data
    feedList.value = data.content.feeds
    console.log(feedList)
    isQueried.value = 1
    isLoading.value = 0
  })
}

const redirect = () => {
  router.push('/historyFeed/' + uid.value)
  page.value = 1
  query()
}

watch(page, query)

if (uid.value != '') {
  console.log('empty')
  query()
}
</script>

<template>
  <h2>历史犇犇查询</h2>
  <a v-if="isQueried" :href="'https://www.luogu.com.cn/user/' + uid">前往洛谷个人主页</a>
  <NInputGroup>
    <NInput type="text" :allow-input="onlyAllowNumber" placeholder="UID" v-model:value="uid" :loading="isLoading">
    </NInput>
    <NButton type="primary" :onclick="redirect" :disabled="isLoading">Go</NButton>
  </NInputGroup>
  <NList v-if="isQueried" style="max-width: 500px;">
    <template #header>
      {{ uid }} 的历史犇犇 <span v-if="!isLoading">本页共 {{ feedList.length }} 条犇犇</span>
      <NPagination v-model:page="page" :page-count="100" v-bind:on-update="query"></NPagination>
    </template>
    <NListItem v-for="feed, i in feedList">
      <NThing :title="feed.name">
        <template #avatar>
          <NAvatar round size="medium" :src="'https://cdn.luogu.com.cn/upload/usericon/' + uid + '.png'" />
        </template>
        <template #description>
          <span style="color: gray; font-size: 0.7em;">{{ new Date(feed.time).toLocaleString() }} | 于 {{ new
            Date(feed.grab_time).toLocaleString() }} 抓取</span>
        </template>
        <template #header-extra>
          <NButton :on-click="() => { show[i] = !show[i] }">{{ show[i] ? '收起' : '展示' }}源码</NButton>
        </template>
        <div v-html="md.render(feed.content)" class="feed-content"></div>
        <div :hidden="!show[i]" style="overflow-x: scroll; max-width: 500px;">
          <NText type="info">
            <pre>{{ feed.content }}</pre>
          </NText>
        </div>
      </NThing>
    </NListItem>
    <template #footer v-if="!isLoading">
      <NPagination v-model:page="page" :page-count="100" v-bind:on-update="query"></NPagination>
    </template>
  </NList>
</template>

<style>
.feed-content img {
  max-width: 80%;
}
</style>
