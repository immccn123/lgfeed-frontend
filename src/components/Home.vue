<script setup>
import { NCode, NH3, NText } from 'naive-ui';


</script>

<template>
  <div style="max-width: 500px;">
    <NH3 prefix="bar" type="error">
      <NText type="error">
        <b>免责声明</b>
      </NText>
    </NH3>
    <p>
      <NText type="error">
        本犇犇保存站的数据从洛谷全网犇犇爬取，并在其基础上进行处理，承诺中途不进行任何改动。如遇数据错误，请自行到原网站查看原始消息并自行判断真假，我们不对数据真实性和完整性做任何保证。
      </NText>
    </p>
    <p>
      <NText type="error">
        <b>部分犇犇有重复。已知问题，不知道怎么解决。为了保护其它部分数据完整性，目前 Won't Fix. 有些是时间相同重复，有些是时间相差恰好 8 小时的重复。请自行辨别。</b>
      </NText>
    </p>
    <p style="max-width: 500px;">本站是由 Imken 和 Rickyxrc 自主研发的一款全新<del>开放世界</del>犇犇保存站！由于后端服务器在大陆之外，部分地区访问有困难或卡顿，敬请谅解 qwq
    </p>
    <p>因为代码太丑了（而且 commit history 里有敏感信息），所以短时间内不会开放源代码 qwq</p>
    <p>有 bug 请直接联系 me[at]imken.moe ，谢谢！</p>
    <p>
      <NText type="info">
        本站运营成本较高，如果可能，您可以考虑<b><a href="https://sponsor.imken.moe">捐赠</a></b>来支持我们的开发，感激不尽！
      </NText>
    </p>
    <p>
      本站已在随时准备跑路的状态下以极其不稳定的方式运行了 {{ ((new Date() - new Date("2023/07/01 13:05")) / (1000 * 60 * 60 * 24)).toFixed() }} 天
      <br>
      <NCode>Frontend & Backend by <a href="https://imken.moe/"><span style="color: rgb(255, 145, 163);">Imken
            Luo</span></a></NCode>
      <br>
      <NCode>Idea & Spider by <a href="https://rickyxrc.cc/"><span style="color: black;">R</span><span
            style="color: red;">ickyxrc</span></a></NCode>
      <br>
    </p>
  </div>
</template>
