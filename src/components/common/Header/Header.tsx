import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@store/hook";
import { authLogout } from "@store/auth/authSlice";
import WishListLogo from "@assets/svg/wishlist.svg?react";
import HeaderCounter from "./HeaderCounter/HeaderCounter";
import CartLogo from "@assets/svg/cart.svg?react";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useEffect } from "react";
import { actGetWishItems } from "@store/wishList/wishListSlice";

const { headerContainer, headerLogo, headerLeftBar } = styles;

const Header = () => {
  const dispatch = useAppDispatch();

  const wishTotalQuantity = useAppSelector(
    (state) => state.wishList.itemsId.length
  );
  const cartTotalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const { user, accessToken } = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(actGetWishItems("productsIds"));
  }, [dispatch, accessToken]);
  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Silver</span>{" "}
          <Badge bg=" bg-secondary bg-gradient">Store</Badge>
        </h1>
        <div className={headerLeftBar}>
          <HeaderCounter
            page="/wishlist"
            totalQuantity={wishTotalQuantity}
            svgLogo={<WishListLogo />}
          />
          <HeaderCounter
            page="/cart"
            totalQuantity={cartTotalQuantity}
            svgLogo={<CartLogo />}
          />
        </div>
      </div>

      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="about-us">
                About
              </Nav.Link>
            </Nav>
            <Nav>
              {!accessToken ? (
                <>
                  <Nav.Link as={NavLink} to="login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="signup">
                    Sign Up
                  </Nav.Link>
                </>
              ) : (
                <NavDropdown
                  title={`Welcome ${user?.firstName}`}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={NavLink} to="profile" end>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="profile/orders" end>
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className="text-danger bg-transparent"
                    as={NavLink}
                    to="/"
                    onClick={() => dispatch(authLogout())}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
