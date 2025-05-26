import { TProduct } from "@customTypes/product";
import { useAppDispatch, useAppSelector } from "@store/hook";
import {
  actGetPlacedOrder,
  resetOrderState,
} from "@store/placeOrder/placeOrderSlice";
import { useEffect, useState } from "react";

const useOrders = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);

  const { loading, error, orderList } = useAppSelector(
    (state) => state.placeOrder
  );

  const dispatch = useAppDispatch();

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const viewDetailsHandler = (id: number) => {
    const targetOrder = orderList.find((el) => el.id === id);
    const items = targetOrder?.items ?? [];

    setSelectedProduct(() => [...items]);

    setShowModal(true);
  };

  useEffect(() => {
    const promise = dispatch(actGetPlacedOrder());

    return () => {
      promise.abort();
      dispatch(resetOrderState());
    };
  }, [dispatch]);

  return {
    loading,
    error,
    orderList,
    showModal,
    closeModalHandler,
    viewDetailsHandler,
    selectedProduct,
  };
};

export default useOrders;
