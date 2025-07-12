<template>
  <div class="px-4 py-4 h-[calc(100vh-50px)]">
    <el-scrollbar :height="'h-full'">
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
definePage({
  meta: {
    title: 'pages.icon',
  },
  redirect: '/components/icon/ep-icon',
})
</script>

<style scoped></style>
