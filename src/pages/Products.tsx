import { Container } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList } from "@components/common";
import useProducts from "@hooks/useProducts";

const Products = () => {
  const { loading, error, fullProductsInfo } = useProducts();
  return (
    <Container>
      <Loading loading={loading} error={error} type="product">
        <GridList
          message="no products found"
          records={fullProductsInfo}
          renderItem={(product) => <Product {...product} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
