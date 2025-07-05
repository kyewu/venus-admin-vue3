<template>
  <h1 class=" mb-4 text-3xl font-bold">{{ title }}</h1>
  <el-form class="min-w-[450px]" :model="form" label-width="auto" :rules="rules" ref="formRef">
    <el-form-item :label="$t('pages.login.username')" prop="username">
      <el-input v-model="form.username" :clearable="true" type="text" :placeholder="$t('pages.login.username')"
        :prefix-icon="getIcon('ep:user')" />
    </el-form-item>
    <el-form-item :label="$t('pages.login.password')" prop="password">
      <el-input v-model="form.password" :clearable="true" type="password" :placeholder="$t('pages.login.password')"
        show-password :prefix-icon="getIcon('ep:lock')" />
    </el-form-item>
    <el-form-item :label="$t('pages.login.repassword')" prop="rePassword">
      <el-input v-model="form.rePassword" :clearable="true" type="password" :placeholder="$t('pages.login.repassword')"
        show-password :prefix-icon="getIcon('ep:lock')" />
    </el-form-item>
    <el-form-item>
      <div class="flex items-center justify-between w-full">
        <el-checkbox v-model="form.remember" :label="$t('pages.login.remember')" size="default" />
        <el-link type="primary" @click="onRegister">{{ $t('pages.login.register') }}</el-link>
      </div>
    </el-form-item>
    <el-form-item class="mt-4">
      <el-button class="w-full" type="primary" @click="onSubmit(formRef)">{{ $t('pages.login.login') }}</el-button>
    </el-form-item>
    <!-- third party login -->
    <el-divider class="mt-10" direction="horizontal" content-position="center">
      <span class="text-gray-400">其他登陆方式</span>
    </el-divider>
    <div class="flex flex-row items-center justify-between">
      <Iconify class="text-2xl cursor-pointer text-gray-300 hover:text-[var(--el-color-primary)]"
        v-for="(item, index) in loginItems" :key="index" :icon="item.icon" @click="handleThirdLogin"></Iconify>
    </div>
  </el-form>
</template>

<script setup lang="tsx">
import type { IconifyIcon } from '@iconify/vue';
import Iconify from '../Icon/Iconify.vue'
import type { LoginFormProps, LoginItem } from './types';
import type { FormInstance, FormRules } from 'element-plus';

interface RuleLoginForm {
  position?: string,
  title?: string,
  loginItems?: LoginItem[],
  username: string;
  password: string;
  rePassword: string;
  phone?: string;
  email?: string;
  code?: string;
  remember?: boolean
}

const formRef = ref()
const emits = defineEmits(['submit', 'register', 'clickIcon'])

withDefaults(defineProps<Partial<LoginFormProps>>(), {
  position: 'center',
  title: 'kye Room',
})

const form = reactive({
  position: 'center',
  title: '登录',
  loginItems: [],
  username: '',
  password: '',
  rePassword: '',
  phone: '',
  email: '',
  code: '',
  remember: false
})

const validatePass = useDebounceFn((rule: any, value: any, callback: any) => {
  if (value.trim() === '') {
    callback(new Error('请输入密码'))
  } else if (value !== form.rePassword) {
    callback(new Error("两次输入的密码不一致！"))
  } else {
 if (!formRef.value) return
    formRef.value.validateField('rePassword', () => null)
    callback()
  }
}, 200)

const validateRePass = useDebounceFn((rule: any, value: any, callback: any) => {
  if (value.trim() === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.password) {
    callback(new Error("两次输入的密码不一致！"))
  } else {
    if (!formRef.value) return
    formRef.value.validateField('password', () => null)
    callback()
  }
}, 300)

const rules = reactive<FormRules<RuleLoginForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { min: 9, max: 20, message: '长度在 9 到 20 个字符', trigger: 'change' },
    { asyncValidator: validatePass, trigger: ['change', 'change'] }
  ],
  rePassword: [
    { required: true, message: '请再次输入密码', trigger: 'change' },
    { min: 9, max: 20, message: '长度在 9 到 20 个字符', trigger: 'change' },
    { asyncValidator: validateRePass, trigger: ['change', 'blur'] }
  ]
})

function getIcon(icon: IconifyIcon | string) {
  return () => <Iconify icon={icon} />
}


const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      emits('submit', form)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const onRegister = () => {
  emits('register')
}

const handleThirdLogin = (item: LoginItem) => {
  emits('clickIcon', item)
}
</script>

<style scoped></style>