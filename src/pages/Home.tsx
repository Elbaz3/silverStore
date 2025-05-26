import HomeCategories from "@components/eCommerce/HomeCategories/HomeCategories";
import actGetHomeProducts from "@store/home/actGetHomeProducts";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  const dispatch = useAppDispatch();
  const { loading, error, products } = useAppSelector(
    (state) => state.homeProducts
  );

  const { featured, latest, reviews } = products;
  const cartItems = useAppSelector((state) => state.cart.items);
  const { itemsId } = useAppSelector((state) => state.wishList);
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const fullFeaturedInfo = featured.map((product) => ({
    ...product,
    quantity: product.id ? cartItems[product.id] || 0 : 0,
    isLiked: product.id ? itemsId.includes(product.id) : false,
    isAuthenticated: accessToken ? true : false,
    userId: user ? user.id : null,
  }));
  const fullLatestInfo = latest.map((product) => ({
    ...product,
    quantity: product.id ? cartItems[product.id] || 0 : 0,
    isLiked: product.id ? itemsId.includes(product.id) : false,
    isAuthenticated: accessToken ? true : false,
    userId: user ? user.id : null,
  }));
  const fullReviewsInfo = reviews.map((product) => ({
    ...product,
    quantity: product.id ? cartItems[product.id] || 0 : 0,
    isLiked: product.id ? itemsId.includes(product.id) : false,
    isAuthenticated: accessToken ? true : false,
    userId: user ? user.id : null,
  }));

  useEffect(() => {
    const promise = dispatch(actGetHomeProducts());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8} className="text-center">
          <h1>Welcome to Our Store</h1>
          <p>Discover amazing products and deals!</p>
        </Col>
      </Row>
      <Row xs={1} className="g-4 mt-4 home-products ">
        <HomeCategories
          title="Featured Products"
          loading={loading}
          error={error}
          category={fullFeaturedInfo}
        />
        <HomeCategories
          title="Latest Offers"
          loading={loading}
          error={error}
          category={fullLatestInfo}
        />
        <HomeCategories
          title="Customer Reviews"
          loading={loading}
          error={error}
          category={fullReviewsInfo}
        />
      </Row>
    </Container>
  );
};

export default Home;
