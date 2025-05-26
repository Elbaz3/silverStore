import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customTypes/product";
import { addToCart } from "@store/cart/cartSlice";
import { useAppDispatch } from "@store/hook";
import { memo, useEffect, useState } from "react";
import { productQuantityUpdate } from "@store/products/productsSlice";
import Like from '@assets/svg/like.svg?react'
import LikeFill from '@assets/svg/like-fill.svg?react'
import { actLikeToggle } from "@store/wishList/wishListSlice";
import ProductInfo from "../ProductInfo/ProductInfo";

const { wishlistBtn } = styles;
const Product = memo(({ id, title, price, img, max, quantity, isLiked, isAuthenticated, userId }: TProduct) => {
  const dispatch = useAppDispatch()
  const [ isBtnDisabled, setIsBtnDisabled ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ showModal, setShowModal ] = useState(false)
  const quantityReachesZero = max === 0 ? true : false
  const realQuantity = quantity || 0
  const limitReached = realQuantity >= 3 ? true : false 
  useEffect(() => {
    if (!isBtnDisabled) return

    setIsBtnDisabled(true)
    const time = setTimeout(() => {
      setIsBtnDisabled(false)
    }, 300)
    return () => {
      clearTimeout(time)
    }
  }, [isBtnDisabled])
  const handleAddToCart = () => {
    if (max === 0) return
    dispatch(addToCart({id, price}))
    dispatch(productQuantityUpdate(id))
    setIsBtnDisabled(true)
  }

  const likeToggleHandler = () => {
    if (typeof id !== 'number') return
    if (!isAuthenticated) {
      setShowModal(true)

    }else {
      if (isLoading) return
      if (!userId) return 
      setIsLoading(true)
      dispatch(actLikeToggle({id, userId}))
      .unwrap()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false))
    }
    }


  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You need to login first to add this item to your wishlist.
        </Modal.Body>
      </Modal>
      <ProductInfo title={title} img={img} price={price} direction="row" >
        <div className={wishlistBtn} onClick={likeToggleHandler}>
          {isLoading ? <Spinner animation="border" size="sm" variant="primary" /> : isLiked ? <LikeFill /> : <Like />}
        </div>

        <p>{quantityReachesZero ? 'no items left' : limitReached ? `you reached limit` : `${max} items left`}</p>
        <Button 
          onClick={handleAddToCart} 
          variant="info" 
          style={{ color: "white", width: '100%' }}
          disabled={isBtnDisabled || quantityReachesZero || limitReached}
        >
          {isBtnDisabled ? <><Spinner animation="border" size="sm" /> Loading...</> : "Add to cart"}
        </Button>
      </ProductInfo>
    </>
  );
});

export default Product;