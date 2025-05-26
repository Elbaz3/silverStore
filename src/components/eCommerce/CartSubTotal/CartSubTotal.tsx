import { actPlaceOrder } from "@store/placeOrder/placeOrderSlice";
import { useState } from "react";
import { TProduct } from "@customTypes/product";
import styles from "./styles.module.css";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useAppDispatch } from "@store/hook";
import { cleanCart } from "@store/cart/cartSlice";

type cartSubTotalPrice = {
  products: TProduct[];
  userAccessToken: string | null;
};

const CartSubtotalPrice = ({
  products,
  userAccessToken,
}: cartSubTotalPrice) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const totalPrice = products.reduce((acc, product) => {
    const price = product.price || 0;
    const quantity = product.quantity || 0;
    return acc + price * quantity;
  }, 0);

  const modalHandler = () => {
    setShowModal(!showModal);
    setError("");
  };

  const placeOrderHandler = () => {
    setLoading(true);
    dispatch(actPlaceOrder(totalPrice))
      .unwrap()
      .then(() => {
        dispatch(cleanCart());
        modalHandler();
      })
      .catch((error) => setError(error))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Modal show={showModal} onHide={modalHandler} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place the order with Subtotal:{" "}
          {totalPrice.toFixed(2)} EGP
          {!loading && error && <p>{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            Close
          </Button>
          <Button variant="primary" onClick={placeOrderHandler}>
            {loading ? (
              <Spinner animation="border" size="sm"></Spinner>
            ) : (
              `Confirm`
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{totalPrice} EGP</span>
      </div>
      {userAccessToken && (
        <div className={styles.container}>
          <span></span>
          <span>
            <Button
              variant="dark"
              style={{ color: "white" }}
              onClick={modalHandler}
              disabled={products.length ? false : true}
            >
              Place Order
            </Button>
          </span>
        </div>
      )}
    </>
  );
};

export default CartSubtotalPrice;
