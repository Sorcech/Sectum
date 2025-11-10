import type { CartItem } from './Cart'

// 获取初始购物车商品列表
export function getInitialCartItems(): CartItem[] {
  return [
    {
      id: 1,
      productId: 1,
      name: '智能手机 Pro',
      price: 5999,
      quantity: 1,
      image: ''
    },
    {
      id: 2,
      productId: 6,
      name: '无线蓝牙耳机',
      price: 299,
      quantity: 2,
      image: ''
    }
  ]
}

