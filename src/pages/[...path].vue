<template>
  <p>Not Found</p>
</template>
<route lang="yaml">
meta:
  layout: 404
</route>

<script lang="ts" setup>
definePage({
  meta: {
    title: 'pages.404',
    hidden: true,
  }
})
</script>