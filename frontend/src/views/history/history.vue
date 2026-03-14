<template>
  <div class="history-container">
    <div class="history-header">
      <h2 class="history-header__title">历史对话</h2>
      <div class="history-header__actions">
        <n-button @click="loadMoreConversations" :loading="loading" secondary>
          加载更多
        </n-button>
      </div>
    </div>

    <div class="history-list">
      <n-empty v-if="conversations.length === 0" description="暂无历史对话" />

      <div v-else class="conversations-grid">
        <n-card
          v-for="conversation in conversations"
          :key="conversation.id"
          class="conversation-card"
          hoverable
          @click="viewConversation(conversation.id)"
        >
          <template #header>
            <div class="conversation-card__header">
              <h3 class="conversation-card__title">{{ conversation.title }}</h3>
              <n-tag type="info" size="small">{{ formatDate(conversation.lastUpdated) }}</n-tag>
            </div>
          </template>

          <div class="conversation-card__summary">
            <p>{{ conversation.summary }}</p>
          </div>

          <template #footer>
            <div class="conversation-card__footer">
              <n-button text @click.stop="deleteConversation(conversation.id)">
                删除
              </n-button>
              <n-button text @click.stop="shareConversation(conversation.id)">
                分享
              </n-button>
            </div>
          </template>
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface Conversation {
  id: string
  title: string
  summary: string
  lastUpdated: Date
}

const router = useRouter()
const conversations = ref<Conversation[]>([])
const loading = ref(false)

// Mock data for demonstration
const mockConversations: Conversation[] = [
  {
    id: '1',
    title: '数据同步问题排查',
    summary: '讨论了数据同步失败的原因和解决方案，包括网络检查、API配置确认...',
    lastUpdated: new Date(Date.now() - 3600000)
  },
  {
    id: '2',
    title: 'API配置问题',
    summary: '如何正确配置API密钥和访问权限，解决认证失败问题...',
    lastUpdated: new Date(Date.now() - 86400000)
  },
  {
    id: '3',
    title: '部署环境问题',
    summary: '容器化部署时遇到的端口映射和环境变量配置问题...',
    lastUpdated: new Date(Date.now() - 172800000)
  },
  {
    id: '4',
    title: '性能优化建议',
    summary: '针对大数据量处理的性能优化方法，包括缓存策略和数据库查询优化...',
    lastUpdated: new Date(Date.now() - 259200000)
  },
  {
    id: '5',
    title: '权限管理问题',
    summary: '用户权限分配和角色管理相关问题的解答...',
    lastUpdated: new Date(Date.now() - 345600000)
  }
]

const loadConversations = () => {
  // In a real app, this would fetch from an API
  conversations.value = [...mockConversations]
}

const loadMoreConversations = () => {
  loading.value = true
  // Simulate API call
  setTimeout(() => {
    // In a real app, we would load additional conversations
    loading.value = false
  }, 1000)
}

const viewConversation = (id: string) => {
  // Navigate to the specific conversation
  router.push(`/chat/${id}`)
}

const deleteConversation = (id: string) => {
  // Show confirmation dialog
  // In a real app, this would make an API call to delete the conversation
  conversations.value = conversations.value.filter(conv => conv.id !== id)
}

const shareConversation = (id: string) => {
  // Copy conversation link to clipboard or share via other methods
  navigator.clipboard.writeText(`${window.location.origin}/chat/${id}`)
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

onMounted(() => {
  loadConversations()
})
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.history-container {
  padding: 20px;
  height: 100%;
  overflow-y: auto;

  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    &__title {
      margin: 0;
      font-size: $font-size-xl;
      font-weight: 600;
      color: $text-color;
    }
  }

  .history-list {
    .conversations-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;

      @include media-breakpoint-down(md) {
        grid-template-columns: 1fr;
      }
    }

    .conversation-card {
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: $box-shadow-lg;
      }

      &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        .conversation-card__title {
          margin: 0;
          font-size: $font-size-lg;
          font-weight: 600;
          color: $text-color;
          @include text-truncate;
        }
      }

      &__summary {
        p {
          margin: 0;
          color: $text-color-secondary;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }

      &__footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding-top: 16px;
        border-top: 1px solid #eee;
      }
    }
  }
}
</style>