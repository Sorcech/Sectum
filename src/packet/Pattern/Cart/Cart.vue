<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Drawer from '../../Section/Drawer/Drawer.vue'
import Toast from '../../Element/Toast/Toast'
import type { CartItem } from './Cart'
import { getInitialCartItems } from './CartData'


// Props 定义
const props = withDefaults(defineProps<{
  buttonClass?: string
  onNoticeClick?: () => void
  cartItems?: CartItem[]
}>(), {
  buttonClass: 'hover:text-primary'
})

const isShowDrawer = ref(false)

// 购物车商品列表（从 props 注入或使用默认数据）
const cartItems = ref<CartItem[]>(
  props.cartItems !== undefined
    ? [...props.cartItems] 
    : getInitialCartItems()
)

// 监听 props 变化，同步更新内部数据
watch(() => props.cartItems, (newItems) => {
  if (newItems !== undefined) {
    cartItems.value = [...newItems]
  }
}, { deep: true })

// 购物车总价
const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

// 购物车商品总数
const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

// 切换 Drawer 显示状态
const toggleDrawer = () => {
  isShowDrawer.value = !isShowDrawer.value
  // 调用父组件传入的回调
  if (isShowDrawer.value) {
    props.onNoticeClick?.()
  }
}

// 更新商品数量
const updateQuantity = (item: CartItem, delta: number) => {
  const newQuantity = item.quantity + delta
  if (newQuantity <= 0) {
    removeItem(item)
  } else {
    item.quantity = newQuantity
  }
}

// 删除商品
const removeItem = (item: CartItem) => {
  const index = cartItems.value.findIndex(i => i.id === item.id)
  if (index > -1) {
    cartItems.value.splice(index, 1)
    Toast({ message: `已移除 ${item.name}`, type: 'success' })
  }
}

// 清空购物车
const clearCart = () => {
  cartItems.value = []
  Toast({ message: '购物车已清空', type: 'success' })
}

// 结算
const checkout = () => {
  if (cartItems.value.length === 0) {
    Toast({ message: '购物车为空', type: 'warning' })
    return
  }
  Toast({ message: '结算功能开发中', type: 'message' })
  // TODO: 实现结算功能
}

</script>
<template>
  <div key="cart-drawer" style="padding: 0; margin: 0;">
    <btn item :class="buttonClass" @click="toggleDrawer" class="relative">
      <icn name="cart-shopping" light lg></icn>
      <span 
        v-if="totalItems > 0" 
        class="absolute -top-1 -right-1 bg-error text-error-content text-xs rounded-full w-5 h-5 flex items-center justify-center"
      >
        {{ totalItems > 99 ? '99+' : totalItems }}
      </span>
    </btn>
    <Drawer :title="`购物车 (${totalItems})`" width="w-96" :isShow="isShowDrawer" @update:isShow="isShowDrawer = $event">
      <div class="flex flex-col h-full p-5">
        <!-- 购物车商品列表 -->
        <div v-if="cartItems.length > 0" class="flex-1 overflow-y-auto space-y-4 pb-4">
          <div 
            v-for="item in cartItems" 
            :key="item.id"
            class="flex items-start gap-3 p-3 bg-base-200 rounded"
          >
            <!-- 商品图片 -->
            <div class="w-16 h-16 bg-base-300 rounded flex items-center justify-center flex-shrink-0">
              <img 
                v-if="item.image" 
                :src="item.image" 
                :alt="item.name" 
                class="w-full h-full object-cover rounded"
              />
              <icn v-else name="image" light sm class="text-base-content/30"></icn>
            </div>
            
            <!-- 商品信息 -->
            <div class="flex-1 min-w-0">
              <h4 class="font-medium text-sm mb-1 truncate">{{ item.name }}</h4>
              <p class="text-primary font-bold mb-2">¥{{ item.price }}</p>
              
              <!-- 数量控制 -->
              <div class="flex items-center gap-2">
                <btn 
                  variant="transparent" 
                  size="xs" 
                  @click="updateQuantity(item, -1)"
                  :disabled="item.quantity <= 1"
                >
                  <icn name="minus" light xs></icn>
                </btn>
                <span class="text-sm font-medium w-8 text-center">{{ item.quantity }}</span>
                <btn 
                  variant="transparent" 
                  size="xs" 
                  @click="updateQuantity(item, 1)"
                >
                  <icn name="plus" light xs></icn>
                </btn>
                <btn 
                  variant="transparent" 
                  size="xs" 
                  class="ml-auto text-error"
                  @click="removeItem(item)"
                >
                  <icn name="trash" light xs></icn>
                </btn>
              </div>
            </div>
          </div>
        </div>

        <!-- 空购物车 -->
        <div v-else class="flex-1 flex flex-col items-center justify-center py-20">
          <icn name="cart-shopping" light xl class="mb-4 text-base-content/30"></icn>
          <p class="text-base-content/60 text-lg">购物车是空的</p>
          <p class="text-base-content/40 text-sm mt-2">快去添加商品吧</p>
        </div>

        <!-- 购物车底部 -->
        <div v-if="cartItems.length > 0" class="border-t border-base-300 pt-4 mt-auto">
          <div class="flex items-center justify-between mb-4">
            <span class="text-base-content/70">总计：</span>
            <span class="text-2xl font-bold text-primary">¥{{ totalPrice }}</span>
          </div>
          <div class="flex gap-2">
            <btn variant="outline" class="flex-1" @click="clearCart">
              <icn name="trash" light sm class="mr-2"></icn>
              清空
            </btn>
            <btn color="primary" class="flex-1" @click="checkout">
              <icn name="credit-card" light sm class="mr-2"></icn>
              结算
            </btn>
          </div>
        </div>
      </div>
    </Drawer>
  </div>
</template>

