import { useAppSelector } from "@store/hook";
import CartItem from "../CartItem/CartItem";
import { TProduct } from "@customTypes/product";
import { Link } from "react-router-dom";
import { LottieHandler } from "@components/feedback";

type CartItemListProps = {
    products:TProduct[],
    changeQuantity: (id:number, quantity:number) => void,
    deleteItem: (id:number) => void
};

const CartItemList = ({
  products,
  changeQuantity,
  deleteItem
}: CartItemListProps) => {
    const { totalQuantity } = useAppSelector(state => state.cart)
  
  const renderList = products.map((el) => (
    <CartItem
      key={el.id}
      {...el}
      changeQuantity={changeQuantity}
      deleteItem = {deleteItem}
    />
  ));
  return (  
  <div>
    {!totalQuantity && <><LottieHandler type="empty" message="Your Cart Is Empty" /> <Link to='/categories'>keep shopping</Link></>}
    {renderList}
  </div>
  )
};

export default CartItemList;