<script setup>
import {
  NAvatar,
  NButton,
  NSkeleton,
  NText,
  NThing,
} from 'naive-ui';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '../utils';
import MarkdownIt from 'markdown-it';

const route = useRoute();
const feedId = ref(route.params.feedId);
const md = new MarkdownIt();

const feed = ref({})
const isLoading = ref(true);
const showRawCode = ref(false)

api.get(`/tools/getFeed/${feedId.value}`).then((response) => {
  feed.value = response.data.content;
  isLoading.value = false;
});

const replaceR = /@\[(\S[^\[\]]+)\]\(\/user\/(\d+)\)/g; // eslint-disable-line
</script>

<template>
  <div>
    <NSkeleton v-if="isLoading"></NSkeleton>
    <NThing v-else style="max-width: 500px">
      <template #header>
        <RouterLink :to="`/user/${feed.uid}`" id="lghome">{{ feed.name }}</RouterLink>
      </template>
      <template #avatar>
        <NAvatar round size="medium" :src="`https://cdn.luogu.com.cn/upload/usericon/${feed.uid}.png`" />
      </template>
      <template #description>
        <RouterLink :to="`/feed/${feed.id}`" style="text-decoration: gray underline;">
          <span style="color: gray; font-size: 0.7em">{{ new Date(feed.time).toLocaleString() }} | 于
            {{ new Date(feed.grab_time).toLocaleString() }} 抓取</span>
        </RouterLink>
      </template>
      <template #header-extra>
        <NButton :on-click="() => {
          showRawCode = !showRawCode;
        }
          ">{{ showRawCode ? '收起' : '展示' }}源码</NButton>
      </template>
      <div v-html="md.render(feed.content.replaceAll(replaceR, '@[$1#$2](/user/$2)'))
        " class="feed-content"></div>
      <div v-if="showRawCode" style="overflow-x: scroll; max-width: 500px">
        <NText type="info">
          <pre>{{ feed.content }}</pre>
        </NText>
      </div>
    </NThing>
  </div>
</template>

<style>
.feed-content img {
  max-width: 80%;
}

.feed-content * a,
#lghome {
  color: rgb(63, 181, 181);
  text-decoration: none;
  transition: 0.1s;
}

.feed-content * a:hover,
#lghome:hover {
  color: rgb(41, 117, 117);
  transition: 0.1s;
}

.feed-content * a:focus,
#lghome:focus {
  color: rgb(28, 80, 80);
  transition: 0.1s;
}
</style>
