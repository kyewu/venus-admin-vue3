<template>
  <Notification :value="2" :scale="0.8"></Notification>
  <Notice :value="2" :scale="1" v-bind="noticeInfo"></Notice>
</template>

<script setup lang="ts">
import type { NoticeMessageListProps } from '@/components/Notice/types';

definePage({
  meta: {
    title: 'Notice',
    icon: 'ep:bell',
  }
})

const noticeInfo = ref<NoticeMessageListProps>({
  lists: [
    { title: '通知', contents: [{ title: '通知1' }, { title: '通知2' }] },
    { title: '消息' },
    { title: '待办' }
  ],
  actions: [
    {
      title: '全部已读',
      click: () => {
        console.log('全部已读')
      }
    },
    {
      title: '设置',
      click: () => {
        console.log('设置')
      }
    }
  ]
})
</script>

<style scoped></style>