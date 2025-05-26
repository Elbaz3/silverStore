import { useAppDispatch, useAppSelector } from '@store/hook'
import { actGetWishItems, wishListCleanup } from '@store/wishList/wishListSlice'
import { useEffect } from 'react'

const useWishList = () => {
  const dispatch = useAppDispatch()
  const { productsFullInfo, isLoading, error } = useAppSelector((state) => state.wishList)
  const { accessToken, user } = useAppSelector((state) => state.auth)
  
  useEffect(() => {
    if (!accessToken) return
    const promise = dispatch(actGetWishItems('ProductsFullInfo'))
    return () => {
      dispatch(wishListCleanup())
      promise.abort()
    }
  }, [dispatch, accessToken])
  const records = productsFullInfo.map((el) => ({
    ...el,
    isLiked: true,
    isAuthenticated: true,
  }))

   return { records, isLoading, error, user }
}

export default useWishList;