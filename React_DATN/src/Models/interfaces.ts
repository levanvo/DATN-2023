
export interface IProduct {
  _id?: string | number
  name: string
  original_price: number
  price: number
  description?: string
  imgUrl: string[]
  categoryId: string
  size_id: string[]
  color_id: string[]
  quantity?: number
  discount_code_id?: string
  poinId?: string
}

export interface ICategory {
  _id?: number | string
  name: string
  imgUrl?: string
}

export interface IUser {
  _id?: number | string
  username: string
  email?: string
  password: string
  confirmPassword: string
}
export interface IColor {
  _id: string
  name: string
  unicode: string
}

export interface ISize {
  _id?: number | string
  name: string
}

export interface ProductItem {
  productId: string;
  quantity: number;
  color: string,
  size: number
}

export interface ISlider {
  _id?: string,
  id?: string,
  titleSlider: string,
  contentSlider: string,
  imgSlider: string,
}
export interface IBlog {
  _id?: number | string,
  title: string,
  imgUrl: string[],
  description: string,
  author: string,
  createdAt: string
}