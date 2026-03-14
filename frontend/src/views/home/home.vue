<template>
  <div class="home-container">
    <n-layout class="layout">
      <n-layout-header class="header" bordered>
        <div class="header__content">
          <h1 class="header__title">交付智能体</h1>
          <div class="header__actions">
            <n-button v-if="!authStore.isAuthenticated" @click="goToLogin" quaternary>
              登录
            </n-button>
            <n-dropdown v-else :options="profileOptions" @select="handleProfileSelect">
              <n-button quaternary>
                {{ authStore.phoneNumber }}
              </n-button>
            </n-dropdown>
          </div>
        </div>
      </n-layout-header>

      <n-layout has-sider class="main-layout">
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          show-trigger
          class="sidebar"
        >
          <n-menu
            :options="menuOptions"
            :value="activeMenuKey"
            @update:value="handleMenuSelect"
          />
        </n-layout-sider>

        <n-layout-content class="content">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </n-layout-content>
      </n-layout>

      <n-layout-footer class="footer" bordered>
        <div class="footer__content">
          <span>© 2024 交付智能体系统</span>
        </div>
      </n-layout-footer>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, h, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  HomeOutline as HomeIcon,
  ChatbubblesOutline as ChatIcon,
  TimeOutline as HistoryIcon,
  PersonCircleOutline as ProfileIcon,
  LogOutOutline as LogoutIcon
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

const router = useRouter()
const authStore = useAuthStore()

const activeMenuKey = computed(() => {
  return router.currentRoute.value.name as string || 'home'
})

const menuOptions = [
  {
    label: '首页',
    key: 'home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: '对话',
    key: 'chat',
    icon: renderIcon(ChatIcon)
  },
  {
    label: '历史记录',
    key: 'history',
    icon: renderIcon(HistoryIcon)
  },
  {
    label: '个人中心',
    key: 'profile',
    icon: renderIcon(ProfileIcon)
  }
]

const profileOptions = [
  {
    label: '个人中心',
    key: 'profile'
  },
  {
    label: '退出登录',
    key: 'logout'
  }
]

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

function goToLogin() {
  router.push('/login')
}

function handleMenuSelect(key: string) {
  router.push({ name: key })
}

function handleProfileSelect(key: string) {
  if (key === 'profile') {
    router.push('/profile')
  } else if (key === 'logout') {
    authStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.home-container {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .layout {
    height: 100%;
  }

  .header {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 20px;

    &__content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .header__title {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
      }
    }
  }

  .main-layout {
    flex: 1;
    overflow: hidden;

    .sidebar {
      min-height: calc(100vh - 120px);
    }

    .content {
      padding: 20px;
      overflow-y: auto;
    }
  }

  .footer {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;

    &__content {
      width: 100%;
      text-align: center;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>