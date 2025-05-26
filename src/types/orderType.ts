import { TProduct } from "./product"

export type TOrder = {
   id: number,
   userId: number,
   subtotal: number,
   items: TProduct[]
}