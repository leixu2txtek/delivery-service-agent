<template>
  <div class="login-container">
    <n-card class="login-card" :bordered="false">
      <template #header>
        <h2 class="login-card__title">登录</h2>
      </template>

      <n-form
        :model="loginForm"
        :rules="rules"
        ref="formRef"
        @submit.prevent="handleLogin"
      >
        <n-form-item label="手机号" path="phoneNumber">
          <n-input
            v-model:value="loginForm.phoneNumber"
            placeholder="请输入手机号"
            :input-props="{ autocomplete: 'tel' }"
          />
        </n-form-item>

        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="loginForm.password"
            type="password"
            show-password-toggle
            placeholder="请输入密码"
            :input-props="{ autocomplete: 'current-password' }"
          />
        </n-form-item>

        <n-form-item>
          <n-button
            attr-type="submit"
            type="primary"
            :loading="loading"
            :disabled="loading"
            block
          >
            登录
          </n-button>
        </n-form-item>
      </n-form>

      <div class="login-card__footer">
        <n-button text @click="goToRegister">还没有账号？立即注册</n-button>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { FormInst, useMessage } from 'naive-ui'

const router = useRouter()
const authStore = useAuthStore()
const message = useMessage()

const formRef = ref<FormInst | null>(null)

interface LoginForm {
  phoneNumber: string
  password: string
}

const loginForm = reactive<LoginForm>({
  phoneNumber: '',
  password: ''
})

const loading = ref(false)

const rules = {
  phoneNumber: {
    required: true,
    message: '请输入手机号',
    trigger: ['input', 'blur'],
    validator: (_: any, value: string) => {
      const phoneRegex = /^1[3-9]\d{9}$/
      return phoneRegex.test(value)
    },
    message: '请输入正确的手机号格式'
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['input', 'blur']
  }
}

const handleLogin = async () => {
  await formRef.value?.validate(async (errors) => {
    if (!errors) {
      try {
        loading.value = true
        // In a real app, this would be an API call to authenticate
        // For now, we'll simulate a successful login
        setTimeout(() => {
          authStore.setCredentials('mock-token-' + Date.now(), loginForm.phoneNumber)
          message.success('登录成功')
          router.push('/chat')
          loading.value = false
        }, 1000)
      } catch (error) {
        message.error('登录失败，请检查用户名和密码')
        loading.value = false
      }
    }
  })
}

const goToRegister = () => {
  // Registration is not implemented yet
  message.info('注册功能暂未开放')
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

  .login-card {
    width: 100%;
    max-width: 400px;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

    &__title {
      text-align: center;
      margin-bottom: 24px;
      color: #333;
    }

    &__footer {
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>