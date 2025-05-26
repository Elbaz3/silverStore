import { useAppDispatch, useAppSelector } from "@store/hook";
import { useEffect } from "react";
import { actGetProducts, productsCleanUp } from "@store/products/productsSlice";
import { useParams } from "react-router-dom";

const useProducts = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const { loading, error, products } = useAppSelector(state => state.products)
  const cartItems = useAppSelector((state) => state.cart.items)
  const { itemsId } = useAppSelector((state) => state.wishList)
  const { accessToken, user } = useAppSelector((state) => state.auth)
  const fullProductsInfo = products.map((product) => ({
    ...product,
    quantity: product.id ? cartItems[product.id] || 0 : 0,
    isLiked: product.id ? itemsId.includes(product.id) : false,
    isAuthenticated: accessToken ? true : false,
    userId: user ? user.id : null
  }))
  useEffect(() => {
      const promise = dispatch(actGetProducts(params.prefix as string))
    
    return () => {
      dispatch(productsCleanUp())
      promise.abort()
    }
  }, [dispatch, params])



   return { loading, error, fullProductsInfo }
}

export default useProducts