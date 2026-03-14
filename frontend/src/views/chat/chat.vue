<template>
  <div class="chat-container">
    <div class="chat-header">
      <h2 class="chat-header__title">智能对话助手</h2>
      <div class="chat-header__actions">
        <n-button @click="clearConversation" size="small" secondary>
          清空对话
        </n-button>
      </div>
    </div>

    <div class="chat-messages" ref="messagesContainerRef">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div :class="['message__bubble', `message__bubble--${message.role}`]">
          <div class="message__content" v-if="message.role === 'user'">
            {{ message.content }}
          </div>
          <div class="message__content" v-else>
            <n-spin v-if="message.loading" size="small" />
            <div v-else v-html="formatMessageContent(message.content)" />
          </div>
        </div>
        <div class="message__timestamp">{{ formatDate(message.timestamp) }}</div>
      </div>
    </div>

    <div class="chat-input-area">
      <div class="chat-input__wrapper">
        <n-input
          v-model:value="inputText"
          type="textarea"
          :autosize="{
            minRows: 1,
            maxRows: 4
          }"
          placeholder="请输入您的问题..."
          @keydown.enter="handleSend"
          :disabled="sending"
        />
        <n-button
          type="primary"
          :disabled="!inputText.trim() || sending"
          @click="handleSend"
          class="chat-send-btn"
        >
          <template #icon>
            <n-icon v-if="sending">
              <LoaderOutline />
            </n-icon>
            <n-icon v-else>
              <SendIcon />
            </n-icon>
          </template>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { Send as SendIcon, Reload as LoaderOutline } from '@vicons/ionicons5'
import DOMPurify from 'dompurify'

// Mock data for demonstration
const messages = ref([
  {
    id: 1,
    role: 'assistant',
    content: '您好！我是交付智能体助手，很高兴为您服务。您可以问我关于产品使用、故障排查、配置设置等相关问题。',
    timestamp: new Date(Date.now() - 300000)
  }
])

const inputText = ref('')
const sending = ref(false)
const messagesContainerRef = ref<HTMLDivElement | null>(null)

const formatMessageContent = (content: string) => {
  // Simple formatting for markdown-like content
  let formatted = content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>')

  // Sanitize to prevent XSS
  return DOMPurify.sanitize(formatted)
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainerRef.value) {
    messagesContainerRef.value.scrollTop = messagesContainerRef.value.scrollHeight
  }
}

const handleSend = async () => {
  if (!inputText.value.trim() || sending.value) return

  // Add user message
  const userMessage = {
    id: Date.now(),
    role: 'user',
    content: inputText.value,
    timestamp: new Date()
  }
  messages.value.push(userMessage)
  const userInput = inputText.value
  inputText.value = ''

  // Scroll to bottom
  scrollToBottom()

  // Simulate AI response
  sending.value = true

  // Add a loading message for the assistant
  const loadingMessageIndex = messages.value.length
  messages.value.push({
    id: Date.now() + 1,
    role: 'assistant',
    content: '',
    loading: true,
    timestamp: new Date()
  })

  scrollToBottom()

  // Simulate API delay and response
  setTimeout(() => {
    // Remove loading indicator
    messages.value[loadingMessageIndex].loading = false

    // Add simulated response
    messages.value[loadingMessageIndex].content = simulateAIResponse(userInput)
    messages.value[loadingMessageIndex].timestamp = new Date()

    sending.value = false
    scrollToBottom()
  }, 1500)
}

const simulateAIResponse = (input: string): string => {
  // Simulated responses based on keywords
  if (input.includes('同步') || input.includes('数据')) {
    return '关于数据同步问题，您可以尝试以下步骤：<br><br>1. 检查网络连接是否正常<br>2. 确认API密钥配置正确<br>3. 查看同步日志中的具体错误信息<br><br>如果问题仍然存在，可以提供具体的错误信息以便进一步诊断。'
  } else if (input.includes('配置') || input.includes('设置')) {
    return '配置相关问题通常涉及以下几个方面：<br><br>• 环境变量设置<br>• 权限配置<br>• 依赖项版本<br><br>请描述您遇到的具体配置问题，我可以为您提供更精确的解决方案。'
  } else if (input.includes('错误') || input.includes('失败')) {
    return '为了更好地帮助您解决问题，请提供：<br><br>1. 具体的错误信息<br>2. 操作步骤<br>3. 相关的日志截图<br><br>这样我能更准确地定位问题并提供解决方案。'
  } else {
    return `关于"${input.substring(0, 20)}${input.length > 20 ? '...' : ''}"的问题，我们的知识库中有相关文档。交付智能体正在为您检索最匹配的信息...<br><br>基于检索到的资料，建议您：<br>• 首先确认操作环境满足要求<br>• 检查配置参数是否正确<br>• 参考官方文档的对应章节<br><br>如需更详细的指导，我可以为您提供分步引导。`
  }
}

const clearConversation = () => {
  messages.value = [{
    id: 1,
    role: 'assistant',
    content: '对话已清空。我是交付智能体助手，很高兴为您服务。您可以问我关于产品使用、故障排查、配置设置等相关问题。',
    timestamp: new Date()
  }]
}

onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fafafa;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: $box-shadow;

  .chat-header {
    padding: 16px 20px;
    background-color: $card-bg;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__title {
      margin: 0;
      font-size: $font-size-lg;
      font-weight: 600;
      color: $text-color;
    }
  }

  .chat-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .message {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      &:last-child {
        margin-bottom: 0;
      }

      &__bubble {
        max-width: 80%;
        padding: 12px 16px;
        border-radius: $border-radius-lg;
        position: relative;
        animation: fadeInUp 0.3s ease-out;

        &--user {
          align-self: flex-end;
          background-color: $primary-color;
          color: white;
          border-bottom-right-radius: 4px;
        }

        &--assistant {
          background-color: $card-bg;
          border: 1px solid #e8e8e8;
          border-bottom-left-radius: 4px;
        }
      }

      &__content {
        line-height: 1.5;

        :deep(code) {
          background-color: rgba(0, 0, 0, 0.05);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
        }

        :deep(strong) {
          font-weight: 600;
        }

        :deep(em) {
          font-style: italic;
        }
      }

      &__timestamp {
        font-size: $font-size-sm;
        color: $text-color-muted;
        margin-top: 6px;
        align-self: flex-end;
      }
    }
  }

  .chat-input-area {
    padding: 16px 20px;
    background-color: $card-bg;
    border-top: 1px solid #eee;

    .chat-input__wrapper {
      display: flex;
      gap: 10px;
      align-items: flex-end;

      :deep(.n-input) {
        flex: 1;
      }

      .chat-send-btn {
        height: fit-content;
      }
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Responsive adjustments
@include media-breakpoint-down(md) {
  .chat-container {
    border-radius: 0;
    height: 100vh;
  }

  .chat-messages {
    padding: 12px 15px;
  }

  .message__bubble {
    max-width: 90% !important;
  }
}
</style>