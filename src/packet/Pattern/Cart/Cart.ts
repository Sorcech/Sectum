// 购物车商品接口
export interface CartItem {
  id: number
  productId: number
  name: string
  price: number
  quantity: number
  image?: string
}

