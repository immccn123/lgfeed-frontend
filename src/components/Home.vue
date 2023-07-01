<script setup>
import { NCode, NH3, NText } from 'naive-ui';


</script>

<template>
  <NH3 prefix="bar" type="error">
    <NText type="error">
      免责声明
    </NText>
  </NH3>
  <p style="max-width: 500px;">
    <NText type="error">
      本犇犇保存站的数据从洛谷全网犇犇爬取，并在其基础上进行处理，承诺中途不进行任何改动。如遇数据错误，请自行到原网站查看原始消息并自行判断真假，我们不对数据真实性和完整性做任何保证。
    </NText>
  </p>
  <p>
    犇犇保存站
    <br>Copyright &copy; 2023 ~ Now
    <br>
    <NCode>Frontend & Backend by <a href="https://imken.moe/"><span style="color: rgb(255, 145, 163);">Imken
          Luo</span></a></NCode>
    <br>
    <NCode>Idea & Spider by <a href="https://rickyxrc.cc/"><span style="color: black;">R</span><span
          style="color: red;">ickyxrc</span></a></NCode>
    <br><a href="https://sponsor.imken.moe">捐赠</a>
</p></template>
