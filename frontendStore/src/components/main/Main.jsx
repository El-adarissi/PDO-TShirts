/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import DialogOneProducts from "../../errorpages/DialogOneProducts.jsx";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import AddShoppingCartOutlined from "@mui/icons-material/AddShoppingCartOutlined";

const Main = () => {
  const location = useLocation();
  const theme = useTheme();
  const { cartProducts, setCartProducts } = useCart();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/products")
      .then((response) => setProducts(response.data))
      .catch((error) =>
        console.error("There was an error fetching the products!", error)
      );
  }, []);

  const handleAddToCart = (product) => {
    setCartProducts((prevCart) => {
      const isProductInCart = prevCart.some(
        (cartProduct) => cartProduct.id === product.id
      );
      if (isProductInCart) {
        setIsDialogOpen(true);
        return prevCart;
      }
      return [...prevCart, product];
    });
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "Hoodies") {
      return product.Category === "Hoodies";
    } else if (selectedCategory === "TShirts") {
      return product.Category === "TShirts";
    } else if (selectedCategory === "Caps") {
      return product.Category === "Caps";
    }
    return true;
  });

  return (
    <Container sx={{ py: 9, bgcolor: "white", mt: 16 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        gap={3}
      >
        <Box>
          <Typography variant="h6"   color="black">
            Selected Products
          </Typography>
          <Typography color="black" fontWeight={300} variant="body1">
            All our new arrivals in an exclusive brand selection
          </Typography>
        </Box>
        
        <ToggleButtonGroup
          color="error"
          value={selectedCategory}
          exclusive
          onChange={handleCategoryChange}
          aria-label="product category"
          sx={{
            ".Mui-selected": {
              border: "1px solid rgba(233, 69, 96, 0.5) !important",
              color: "#e94560",
              backgroundColor: "initial",
              
            },
          }}
        >
          <ToggleButton value="All" sx={{ mx: 1 }}aria-label="all">
            All
          </ToggleButton>
          <ToggleButton value="Hoodies" sx={{ mx: 1 }} aria-label="hoodies">
            Hoodies
          </ToggleButton>
          <ToggleButton
            // sx={{ mx: "12px !important" }}
            sx={{ mx: 1 }}
            value="TShirts"
            aria-label="TShirts"
           
          >
            TShirts
          </ToggleButton>

          <ToggleButton
            // sx={{ mx: "16px !important" }}
            sx={{ mx: 1 }}
            value="Caps"
            aria-label="caps"
          >
            Caps
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        gap={3}
      >
        <AnimatePresence>
          {filteredProducts.map((item) => (
            <Card
              component={motion.section}
              layout
              initial={{ transform: "scale(0)" }}
              animate={{ transform: "scale(1)" }}
              transition={{ duration: 1.6, type: "spring", stiffness: 50 }}
              key={item.id}
              sx={{
                maxWidth: 300,
                mt: 6,
                ":hover .MuiCardMedia-root ": {
                  rotate: "1deg",
                  scale: "1.1",
                  transition: "0.35s",
                },
              }}
            >
              <Link
                state={{ product: item }}
                to={`/product/${item.name}`} // Updated the link to use `item.name`
                className="product-card-link"
              >
                <CardMedia sx={{ height: 277 }} image={item.image} />
              </Link>
              <CardContent>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography gutterBottom variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle1" component="p">
                    {item.price} MAD
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.primary">
                  {item.description || "Product description goes here"}
                  <Typography variant="subtitle1" sx={{ color: "#4a4a4a",textDecoration: 'line-through' }} component="p">
                  {item.oldprice} MAD
                  </Typography>
                </Typography>
                
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between" }}>
                <Button
                  onClick={() => handleAddToCart(item)}
                  sx={{ textTransform: "capitalize" }}
                  size="small"
                >
                  <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
                  Add to cart
                </Button>
                <Rating
                  precision={0.1}
                  name="read-only"
                  value={item.rating}
                  readOnly
                />
              </CardActions>
            </Card>
          ))}
        </AnimatePresence>
      </Stack>

      {isDialogOpen && (
        <DialogOneProducts
          message="هذا المنتج موجود بالفعل في السلة. يمكنك إضافة الكمية واختيار اللون والمقاس في صفحة المنتج."
          onClose={closeDialog}
        />
      )}
    </Container>
  );
};

export default Main;

