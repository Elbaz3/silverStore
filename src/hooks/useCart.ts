import { actGetProductsByItems, changeQuantity, cleanCartProductFullInfo, deleteItem } from "@store/cart/cartSlice"
import { resetOrderState } from "@store/placeOrder/placeOrderSlice"
import { useAppDispatch, useAppSelector } from "@store/hook"
import { useEffect } from "react"

const useCart = () => {
  const dispatch = useAppDispatch()
  const { items, loading, error, fullProductInfo, totalPrice } = useAppSelector(state => state.cart)

  const userAccessToken = useAppSelector(state => state.auth.accessToken)

  const orderLoadingStatus = useAppSelector((state) => state.placeOrder.loading)

  useEffect(() => {
    const promise = dispatch(actGetProductsByItems())

    return () => {
      dispatch(cleanCartProductFullInfo())
      promise.abort()
      dispatch(resetOrderState())
    }
  }, [dispatch])

  const products = fullProductInfo.map((el) => ({
    ...el,
    quantity: items[el.id || 0]
  }))


  const handleChangeQuantity = (id: number, quantity: number) => {
    dispatch(changeQuantity({ id, quantity }))
  }
  const handleRemoveItem = (id: number) => {
    dispatch(deleteItem(id))
  }

   return { loading, error, userAccessToken, totalPrice, products, orderLoadingStatus, handleChangeQuantity, handleRemoveItem }
}

export default useCart;