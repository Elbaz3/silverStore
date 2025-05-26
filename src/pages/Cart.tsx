import useCart from "@hooks/useCart";
import { CartSubtotalPrice } from "@components/eCommerce";
import CartItemList from "@components/eCommerce/CartItemList/CartitemList";
import { Loading, LottieHandler } from "@components/feedback";
import { Heading } from "@components/common";

const Cart = () => {
  const {
    loading,
    error,
    userAccessToken,
    products,
    orderLoadingStatus,
    handleChangeQuantity,
    handleRemoveItem,
  } = useCart();

  return (
    <Loading loading={loading} error={error} type="cart">
      {" "}
      <Heading title="Cart" />
      {orderLoadingStatus === "succeeded" ? (
        <LottieHandler
          message="Your order has been placed successfully"
          type="success"
        />
      ) : (
        <>
          <CartItemList
            products={products}
            changeQuantity={handleChangeQuantity}
            deleteItem={handleRemoveItem}
          />
          <CartSubtotalPrice
            products={products}
            userAccessToken={userAccessToken}
          />
        </>
      )}
    </Loading>
  );
};

export default Cart;
