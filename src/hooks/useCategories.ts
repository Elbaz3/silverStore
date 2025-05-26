import { useAppDispatch, useAppSelector } from "@store/hook";
import { actGetCategories, cleanCategories } from "@store/categories/categoriesSlice";
import { useEffect } from "react";

const useCategories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.categories)

  useEffect(() => {
      const promise = dispatch(actGetCategories())

    return () => {
      dispatch(cleanCategories())
      promise.abort()
    }
  }, [dispatch])
   return{ loading, error, records }
}


export default useCategories;