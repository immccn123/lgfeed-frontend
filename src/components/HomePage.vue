<script setup>
import { ref } from 'vue';
import {
  NCode,
  NH2,
  NNumberAnimation,
  NSkeleton,
  NStatistic,
  NText,
  NA,
  NGi,
  NGrid,
  NAlert,
} from 'naive-ui';
import { api } from '../utils';

const todayMessage = ref(0);
const total = ref(0);
const totalUser = ref(0);
const todayUser = ref(0);
const loading = ref(true);

api.get('/statistics').then((response) => {
  const { data } = response;
  todayMessage.value = data.content.today;
  todayUser.value = data.content.today_user;
  total.value = data.content.total;
  totalUser.value = data.content.total_user;
  loading.value = false;
});
</script>

<template>
  <div style="max-width: 560px; padding: 5%">
    <NAlert title="一些需要您注意的事情…" type="info">
      交流群
      <NA
        href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=Pp872M4iwavRQJFXyL9IXcire8EiHaAw&authKey=jYi4Z9RSWHPSU%2BE9nuzR9NtjXHgZgDIVdrvly%2BHUKTBjtgb9SyGkJsqs8PgWobTM&noverify=0&group_code=538122849"
        >538122849</NA
      >，欢迎加入 Nya~
    </NAlert>
    <NH2 prefix="bar">统计信息</NH2>
    <p>
      <NGrid :cols="2">
        <NGi>
          <NStatistic label="Imken 的服务器娘一共处理了…">
            <NSkeleton size="medium" v-if="loading" />
            <NNumberAnimation v-if="!loading" :to="total" />
            <template #suffix v-if="!loading"> 条犇犇！ </template>
          </NStatistic>
        </NGi>
        <NGi>
          <NStatistic label="Imken 的服务器娘在 24h 内处理了…">
            <NSkeleton size="medium" v-if="loading" />
            <NNumberAnimation v-if="!loading" :to="todayMessage" />
            <template #suffix v-if="!loading"> 条犇犇！ </template>
          </NStatistic>
        </NGi>
      </NGrid>
      <NSkeleton v-if="loading" text />
      <span v-if="!loading"
        >其中，24h 内有
        <NNumberAnimation v-if="!loading" :to="todayUser" />
        个用户发了犇犇，历史上有
        <NNumberAnimation v-if="!loading" :to="totalUser" />
        个用户发了犇犇。厉害吧！ </span
      ><br />
      <NText type="info">
        本站运营成本较高，如果可以的话，你可以考虑<b>
          <NA href="https://sponsor.imken.moe">捐赠</NA> </b
        >来支持我们的开发，谢谢啦～
      </NText>
    </p>
    <p>
      <NH2 prefix="bar">免责声明</NH2>
      <NText>
        本犇犇保存站的数据从洛谷全网犇犇爬取，并在其基础上进行处理，承诺中途不进行任何改动。如遇数据错误，请自行到原网站查看原始消息并自行判断真假，我们不对数据真实性和完整性做任何保证。
      </NText>
    </p>
    <p>
      <NText type="error">
        <b
          >部分犇犇有重复。已知问题，不知道怎么解决。为了保护其它部分数据完整性，目前
          Won't Fix. 有些是时间相同重复，有些是时间相差恰好 8
          小时的重复。请自行辨别。</b
        >
      </NText>
    </p>
    <p style="max-width: 500px">
      本站是由 Imken 和 Rickyxrc
      自主研发的一款全新<del>开放世界</del>犇犇保存站！<br />由于后端服务器部署在大陆之外，部分地区访问有困难或卡顿，敬请谅解
      qwq
    </p>
    <p>有 bug 请直接联系 me[at]imken.moe ，谢谢！</p>
    <p>
      本站已在随时准备跑路的状态下以极其不稳定的方式运行了
      {{
        (
          (new Date() - new Date('2023/07/01 13:05')) /
          (1000 * 60 * 60 * 24)
        ).toFixed()
      }}
      天
      <br />
      <NCode
        >Frontend & Backend by
        <a href="https://imken.moe/"
          ><span style="color: rgb(255, 145, 163)">Imken Luo</span></a
        >
      </NCode>
      <br />
      <NCode
        >Idea & Spider by
        <a href="https://rickyxrc.cc/"
          ><span style="color: black">R</span
          ><span style="color: red">ickyxrc</span></a
        >
      </NCode>
      <br />
    </p>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
