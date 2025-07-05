<template>
  <!-- form -->
  <div class="self-center lg:self-end py-4 px-8 bg-white lg:xl2:shadow rounded">
    <LoginForm :loginItems="loginItems" @submit="onSubmit" @register="onRegister" @click-icon="handleThirdLogin">
    </LoginForm>
  </div>
</template>

<script setup lang="tsx">
import type { LoginItem } from '@/components/Form/types'

definePage({
  meta: {
    title: 'pages.login.login',
    hideMenu: true,
    layout: 'single-page',
    backgroundImage: 'https://cdn.pixabay.com/photo/2025/05/14/16/21/city-9599967_960_720.jpg',
    position: 'center'
  }
})

const loginItems = [
  {
    icon: 'cib:tencent-qq',
    url: 'https://www.baidu.com',
  },
  {
    icon: 'ic:baseline-wechat',
    url: 'https://www.baidu.com',
  },
  {
    icon: 'bi:sina-weibo',
    url: 'https://www.baidu.com',
  },
  {
    icon: 'mdi:github',
    url: 'https://www.baidu.com'
  }
]

const onSubmit = (form: any) => {
  console.log(form)
}

const onRegister = () => {

}

const handleThirdLogin = (item: LoginItem) => {
  console.log(item)
}

</script>

<style scoped></style>