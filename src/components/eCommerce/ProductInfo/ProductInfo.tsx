import styles from "./style.module.css";

type TProductInfoProps = {
  title: string;
  img: string;
  price: number;
  direction?: "row" | "column";
  children?: React.ReactNode;
  style?: React.CSSProperties;
  quantity?: number;
};

const ProductInfo = ({
  title,
  img,
  price,
  direction = "row",
  children,
  style,
  quantity,
}: TProductInfoProps) => {
  return (
    <div className={`${styles[`product-${direction}`]}`} style={style}>
      <div className={`${styles[`productImg-${direction}`]}`}>
        <img src={img} alt="title" />
      </div>
      <div className={`${styles[`productInfo-${direction}`]}`}>
        <h2 title={title}>{title}</h2>
        <h3>{price} EGP</h3>
        {quantity && (
          <>
            <h3>Quantity: {quantity}</h3>
            <hr style={{ margin: "5px 0" }} />
          </>
        )}
        {quantity && <h3>Total Price: {(quantity * price).toFixed(2)} EGP</h3>}
        {children}
      </div>
    </div>
  );
};

export default ProductInfo;
