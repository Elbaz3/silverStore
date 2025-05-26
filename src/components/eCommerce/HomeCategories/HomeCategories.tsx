import { Col } from "react-bootstrap";
import Product from "../Product/Product";
import { Loading } from "@components/feedback";
import { TLoading } from "@customTypes/shared";
import { TProduct } from "@customTypes/product";

type THomeCategoriesProps = {
  title: string;
  loading: TLoading;
  error: string | null;
  category: TProduct[];
};

const HomeCategories = ({
  title,
  loading,
  error,
  category,
}: THomeCategoriesProps) => {
  return (
    <Col xs={12} md={8} className="products-list">
      <h2>{title}</h2>
      <Loading loading={loading} error={error} type="product">
        {category.length > 0 ? (
          category.map((product) => {
            return <Product key={product.id} {...product} />;
          })
        ) : (
          <p>No {title} available.</p>
        )}
      </Loading>
    </Col>
  );
};

export default HomeCategories;
