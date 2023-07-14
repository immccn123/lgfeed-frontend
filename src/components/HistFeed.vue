<script setup>
import {
  NAvatar,
  NButton,
  NDescriptions,
  NDescriptionsItem,
  NEmpty,
  NH3,
  NInput,
  NInputGroup,
  NList,
  NListItem,
  NPagination,
  NText,
  NThing,
} from 'naive-ui';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '../utils';
import MarkdownIt from 'markdown-it';

const route = useRoute();
const router = useRouter();
const md = new MarkdownIt();

const onlyAllowNumber = (value) => !value || /^\d+$/.test(value);

const feedList = ref([]);
const usernameList = ref([]);
const username = ref('');

const showRawCode = ref({});

const isFeedQueried = ref(false),
  isFeedLoading = ref(false),
  isUsernameLoading = ref(true);

const page = ref(1);
const uid = ref(route.params.uid);
const inputUid = ref(route.params.uid);
const replaceR = /@\[(\S[^\[\]]+)\]\(\/user\/(\d+)\)/g; // eslint-disable-line

const noData = ref(false);

const queryFeed = () => {
  showRawCode.value = {};
  feedList.value = [];
  isFeedLoading.value = true;
  api
    .get(`/blackHistory/feed/${uid.value}?page=${page.value}`)
    .then((response) => {
      const { data } = response;
      feedList.value = data.content.feeds;
      isFeedLoading.value = false;
      isFeedQueried.value = true;
    });
};

const queryUsername = () => {
  isUsernameLoading.value = true;
  usernameList.value = [];
  api.get(`/blackHistory/usernames/${uid.value}`).then((response) => {
    const { data } = response;
    usernameList.value = data.content;
    isUsernameLoading.value = false;
    if (data.content.length == 0) {
      noData.value = true;
    } else {
      noData.value = false;
      username.value = data.content[0];
    }
  });
};

const query = () => {
  queryUsername();
  queryFeed();
};

const redirect = () => {
  uid.value = inputUid.value;
  router.push(`/user/${uid.value}`);
  page.value = 1;
  query();
};

watch(page, queryFeed);

if (uid.value != '') query();
</script>

<template>
  <h1>用户历史查询</h1>
  <NInputGroup>
    <NInput
      type="text"
      :allow-input="onlyAllowNumber"
      placeholder="UID"
      v-model:value="inputUid"
      :loading="isFeedLoading"
    >
    </NInput>
    <NButton type="primary" :onclick="redirect" :disabled="isFeedLoading"
      >Go</NButton
    >
  </NInputGroup>
  <div v-if="!noData || isUsernameLoading">
    <h2 v-if="!isUsernameLoading">
      <a
        id="lghome"
        v-if="uid != ''"
        target="_blank"
        :href="'https://www.luogu.com.cn/user/' + uid"
        >{{ username }}</a
      >
      的用户历史
    </h2>

    <div v-if="usernameList.length > 1">
      <NH3 prefix="bar">曾用名</NH3>
      <NDescriptions style="max-width: 500px">
        <NDescriptionsItem v-for="name in usernameList" :key="name">
          {{ name }}
        </NDescriptionsItem>
      </NDescriptions>
    </div>

    <NList v-if="!isFeedLoading && isFeedQueried" style="max-width: 500px">
      <template #header>
        <NH3 prefix="bar">历史犇犇</NH3>
        <span style="display: block; margin-bottom: 20px"
          >本页共 {{ feedList.length }} 条犇犇</span
        >
        <NPagination
          v-model:page="page"
          :page-count="100"
          v-bind:on-update="query"
        ></NPagination>
      </template>

      <NListItem v-for="(feed, i) in feedList" :key="i">
        <NThing :title="feed.name">
          <template #avatar>
            <NAvatar
              round
              size="medium"
              :src="`https://cdn.luogu.com.cn/upload/usericon/${uid}.png`"
            />
          </template>
          <template #description>
            <RouterLink :to="`/feed/${feed.id}`" style="text-decoration: gray underline;">
            <span style="color: gray; font-size: 0.7em"
              >{{ new Date(feed.time).toLocaleString() }} | 于
              {{ new Date(feed.grab_time).toLocaleString() }} 抓取</span
            ></RouterLink>
          </template>
          <template #header-extra>
            <NButton
              :on-click="
                () => {
                  showRawCode[i] = !showRawCode[i];
                }
              "
              >{{ showRawCode[i] ? '收起' : '展示' }}源码</NButton
            >
          </template>
          <div
            v-html="
              md.render(feed.content.replaceAll(replaceR, '@[$1#$2](/user/$2)'))
            "
            class="feed-content"
          ></div>
          <div
            :hidden="!showRawCode[i]"
            style="overflow-x: scroll; max-width: 500px"
          >
            <NText type="info">
              <pre>{{ feed.content }}</pre>
            </NText>
          </div>
        </NThing>
      </NListItem>

      <template #footer v-if="!isFeedLoading">
        <NPagination
          v-model:page="page"
          :page-count="100"
          v-bind:on-update="query"
        ></NPagination>
      </template>
    </NList>
  </div>
  <div v-else style="padding-top: 50px">
    <NEmpty description="Imken 的服务器娘找不到这个用户的相关数据 TAT"></NEmpty>
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
