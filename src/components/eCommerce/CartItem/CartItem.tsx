import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customTypes/product";
import { memo, useCallback } from "react";
import ProductInfo from "../ProductInfo/ProductInfo";

const { cartItem, cartItemSelection } = styles;

type TCartItemProps = TProduct & {
  changeQuantity: (id: number, quantity: number) => void;
  deleteItem: (id: number) => void;
};

const CartItem = memo(
  ({
    id,
    title,
    price,
    img,
    quantity,
    max,
    changeQuantity,
    deleteItem,
  }: TCartItemProps) => {
    const numberOfItems = max || 0;
    const limit = numberOfItems <= 3 ? numberOfItems : 3;
    const renderOptions = Array(limit)
      .fill(0)
      .map((_, idx) => {
        const quantity = ++idx;
        return (
          <option value={quantity} key={quantity}>
            {quantity}
          </option>
        );
      });
    const handleChangeQuantity = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const quantity = Number(e.target.value);
        changeQuantity(id!, quantity);
      },
      [id, changeQuantity]
    );

    return (
      <div className={cartItem}>
        <ProductInfo title={title} img={img} price={price} direction="column">
          <Button
            variant="secondary"
            style={{ color: "white" }}
            className="mt-auto"
            onClick={() => deleteItem(id!)}
          >
            Remove
          </Button>
        </ProductInfo>
        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select value={quantity} onChange={handleChangeQuantity}>
            {renderOptions}
          </Form.Select>
        </div>
      </div>
    );
  }
);

export default CartItem;
