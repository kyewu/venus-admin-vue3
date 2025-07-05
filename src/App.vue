<template>
  <el-config-provider :locale="messages[locale]">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { messages, locale } = useI18n()

</script>
