<template>
  <div class="profile-container">
    <n-card class="profile-card" :bordered="false">
      <template #header>
        <h2 class="profile-card__title">个人中心</h2>
      </template>

      <div class="profile-info">
        <div class="profile-info__avatar">
          <n-avatar :size="80" round>
            {{ getInitials(authStore.phoneNumber || '') }}
          </n-avatar>
        </div>

        <div class="profile-info__details">
          <div class="detail-item">
            <span class="detail-item__label">手机号:</span>
            <span class="detail-item__value">{{ authStore.phoneNumber }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item__label">账户状态:</span>
            <n-tag type="success" size="small">已激活</n-tag>
          </div>
          <div class="detail-item">
            <span class="detail-item__label">加入时间:</span>
            <span class="detail-item__value">{{ formatDate(new Date()) }}</span>
          </div>
        </div>
      </div>

      <n-divider />

      <div class="profile-actions">
        <n-button
          @click="showChangePasswordModal = true"
          class="action-btn"
          secondary
        >
          修改密码
        </n-button>

        <n-button
          @click="showSettingsModal = true"
          class="action-btn"
          secondary
        >
          设置
        </n-button>

        <n-button
          @click="handleLogout"
          class="action-btn"
          type="error"
          secondary
        >
          退出登录
        </n-button>
      </div>
    </n-card>

    <!-- Change Password Modal -->
    <n-modal v-model:show="showChangePasswordModal" preset="card" title="修改密码" class="modal">
      <n-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef">
        <n-form-item label="原密码" path="oldPassword">
          <n-input
            v-model:value="passwordForm.oldPassword"
            type="password"
            show-password-toggle
          />
        </n-form-item>

        <n-form-item label="新密码" path="newPassword">
          <n-input
            v-model:value="passwordForm.newPassword"
            type="password"
            show-password-toggle
          />
        </n-form-item>

        <n-form-item label="确认新密码" path="confirmNewPassword">
          <n-input
            v-model:value="passwordForm.confirmNewPassword"
            type="password"
            show-password-toggle
          />
        </n-form-item>
      </n-form>

      <template #footer>
        <div class="modal__footer">
          <n-button @click="showChangePasswordModal = false" secondary>
            取消
          </n-button>
          <n-button @click="handleChangePassword" type="primary">
            确定
          </n-button>
        </div>
      </template>
    </n-modal>

    <!-- Settings Modal -->
    <n-modal v-model:show="showSettingsModal" preset="card" title="设置" class="modal">
      <n-form :model="settingsForm">
        <n-form-item label="主题模式">
          <n-switch
            :value="themeStore.isDark"
            @update:value="themeStore.toggleTheme"
            :rail-style="themeRailStyle"
          >
            <template #checked>深色</template>
            <template #unchecked>浅色</template>
          </n-switch>
        </n-form-item>

        <n-form-item label="通知设置">
          <n-switch v-model:value="settingsForm.notifications" />
        </n-form-item>

        <n-form-item label="语言">
          <n-select
            v-model:value="settingsForm.language"
            :options="languageOptions"
          />
        </n-form-item>
      </n-form>

      <template #footer>
        <div class="modal__footer">
          <n-button @click="showSettingsModal = false" secondary>
            关闭
          </n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { FormInst, useMessage } from 'naive-ui'

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const message = useMessage()

const showChangePasswordModal = ref(false)
const showSettingsModal = ref(false)
const passwordFormRef = ref<FormInst | null>(null)

interface PasswordForm {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

const passwordForm = reactive<PasswordForm>({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: ''
})

interface SettingsForm {
  notifications: boolean
  language: string
}

const settingsForm = reactive<SettingsForm>({
  notifications: true,
  language: 'zh-CN'
})

const languageOptions = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' }
]

const passwordRules = {
  oldPassword: {
    required: true,
    message: '请输入原密码',
    trigger: 'blur'
  },
  newPassword: {
    required: true,
    message: '请输入新密码',
    trigger: 'blur',
    validator: (_: any, value: string) => {
      return value.length >= 6
    },
    message: '密码长度至少为6位'
  },
  confirmNewPassword: {
    required: true,
    message: '请确认新密码',
    trigger: 'blur',
    validator: (_: any, value: string) => {
      return value === passwordForm.newPassword
    },
    message: '两次输入的密码不一致'
  }
}

const getInitials = (phoneNumber: string) => {
  if (!phoneNumber) return '?'
  return phoneNumber.slice(-4)
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

const handleChangePassword = async () => {
  // Validate form
  await passwordFormRef.value?.validate((errors) => {
    if (!errors) {
      // In a real app, this would make an API call to change the password
      message.success('密码修改成功')
      showChangePasswordModal.value = false

      // Reset form
      passwordForm.oldPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmNewPassword = ''
    }
  })
}

const handleLogout = () => {
  authStore.logout()
  message.success('已退出登录')
  router.push('/login')
}

const themeRailStyle = ({ focused, checked }: { focused: boolean; checked: boolean }) => {
  const style = {} as CSSStyleDeclaration
  if (checked) {
    style.background = '#d03050'
    if (focused) {
      style.boxShadow = '0 0 0 2px #d0305040'
    }
  } else {
    style.background = '#2080f0'
    if (focused) {
      style.boxShadow = '0 0 0 2px #2080f040'
    }
  }
  return style
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.profile-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;

  .profile-card {
    &__title {
      margin: 0;
      font-size: $font-size-xl;
      font-weight: 600;
      color: $text-color;
    }
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;

    &__avatar {
      margin-bottom: 20px;

      :deep(.n-avatar) {
        background-color: $primary-color;
        color: white;
        font-weight: bold;
        font-size: $font-size-lg;
      }
    }

    &__details {
      width: 100%;

      .detail-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #f0f0f0;

        &:last-child {
          border-bottom: none;
        }

        &__label {
          color: $text-color-secondary;
          font-weight: 500;
        }

        &__value {
          color: $text-color;
        }
      }
    }
  }

  .profile-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .action-btn {
      width: 100%;
      justify-content: flex-start;
    }
  }
}

.modal {
  width: 90%;
  max-width: 500px;

  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
}

// Responsive adjustments
@include media-breakpoint-down(md) {
  .profile-container {
    padding: 10px;
  }

  .profile-info__details {
    .detail-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
    }
  }
}
</style>