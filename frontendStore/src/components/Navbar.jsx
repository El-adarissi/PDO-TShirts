/* eslint-disable no-undef */
import { ShoppingCartOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/icons/logo3.png";
import { Link } from "react-router-dom";
import navItems from "../constants";
import { Box } from "@mui/material";
import { Badge, styled } from "@mui/material";
import ProToCart from "./main/ProToCart";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartProducts, setCartProducts } = useCart();

  if (!cartProducts) {
    console.error("Cart context is undefined.");
    return null;
  }
  const handleRemove = (productId) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const toggleSubmenu = (index) => {
    setSubmenuOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const closeMobileMenu = () => {
    setMobileDrawerOpen(false);
    setSubmenuOpen({});
  };
  // eslint-disable-next-line no-unused-vars
  const handleCartClose = () => {
    setOpenCart(false);
  };
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="w-full text-white bg-gray-800 font-serif shadow-md fixed top-0 z-50">
      <div className="bg-orange-600 text-slate-950 font-serif text-center py-2 font-bold">
        التوصيل بالمجان، جميع المدن المغربية و الدفع عند الاستلام، اسرع واطلب
        الآن
      </div>

      <nav className="container mx-auto flex justify-between items-center py-4 px-6 lg:px-8">
        {/* Icons on the left for desktop */}
        <div className="hidden lg:flex space-x-4  mr-auto">
          <button onClick={toggleCart}>
            <StyledBadge badgeContent={cartProducts.length} color="secondary">
              <ShoppingCartOutlined />
            </StyledBadge>
          </button>
        </div>

        {/* Centered nav items for desktop */}
        <ul className="hidden lg:flex space-x-8 items-center mx-auto">
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link
                to={item.href}
                className="text-lg text-white hover:text-yellow-500"
              >
                {item.label}
              </Link>

              {/* Submenu for "المنتجات" */}
              {item.submenu && (
                <ul className="absolute hidden group-hover:block bg-gray-800 shadow-lg mt-2 space-y-2 p-4 rounded-md">
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex} className="text-center">
                      <Link
                        className="block px-4 py-2 hover:text-yellow-500"
                        to={subItem.href}
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Logo on the right for desktop */}
        <div className="sticky items-center space-x-2 ml-auto hidden lg:flex">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12 w-16" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-between items-center w-full px-4">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Hamburger Menu on the left */}
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? (
                <X className="h-8 w-8 text-white" />
              ) : (
                <Menu className="h-8 w-8 text-white" />
              )}
            </button>

            {/* Shopping Bag Icon on the right */}
            <button onClick={toggleCart}>
              <StyledBadge badgeContent={cartProducts.length} color="secondary">
                <ShoppingCartOutlined />
              </StyledBadge>
            </button>
          </Box>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="lg:hidden bg-gray-800 w-full fixed top-0 left-0 right-0 bottom-0 p-8 z-40">
          <button onClick={closeMobileMenu} className="text-white mb-4">
            <X className="h-8 w-8" />
          </button>
          <ul className="space-y-4 text-center">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.href}
                  className="text-lg block font-medium text-white hover:text-yellow-500"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>

                {item.submenu && (
                  <button
                    className="text-white text-sm mt-2 hover:text-yellow-500 w-full text-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSubmenu(index);
                    }}
                  >
                    {submenuOpen[index] ? "إخفاء الفئات" : "عرض الفئات"}
                  </button>
                )}
                {submenuOpen[index] && item.submenu && (
                  <ul className="ml-4 mt-2 space-y-2 text-center">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.href}
                          className="block hover:text-yellow-500"
                          onClick={closeMobileMenu}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isCartOpen && (
        <ProToCart
          products={cartProducts}
          onClose={toggleCart}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
};

export default Navbar;
