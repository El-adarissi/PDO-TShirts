/* eslint-disable no-unused-vars */
import "./SizeSelector.css";
import MainLayout from "../layout/MainLayout";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Typography,
  Rating,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useLocation } from "react-router-dom";

const colorOptions = [
  { value: "Red", color: "#f44336" },
  { value: "Green", color: "#4caf50" },
];
const DetailleProducts = () => {
  const location = useLocation();
  const { product } = location.state;

  const [quantity, setQuantity] = useState(0);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState("S");
  const [showDialog, setShowDialog] = useState(false);


  const handleColorToggle = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleIncrease = () => {
    setQuantity((prev) => (prev < 20 ? prev + 1 : prev));
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const { id } = useParams();
  const { cartProducts, setCartProducts } = useCart();

  if (!cartProducts) {
    console.error("Cart context is undefined.");
    return null;
  }

  const handleAddToCart = () => {
    if (quantity <= 0) {
      setShowDialog(true);
      return;
    }
  
    setCartProducts((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item.id === product.id);
  
      if (productIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[productIndex] = {
          ...updatedCart[productIndex],
          size: selectedSize, 
          quantity: updatedCart[productIndex].quantity + quantity,
          color: selectedColors, 
        };
        return updatedCart;
      } else {
        return [
          ...prevCart,
          { ...product, size: selectedSize, quantity, color:selectedColors },
        ];
      }
    });
  };
  

  return (
    <MainLayout>
      <div className="flex mt-40 pt-9 bg-white flex-col md:flex-row p-4">
        <Box className="w-full md:w-1/2 flex justify-center items-center p-4">
          <div className="relative w-full h-[500px] md:h-[500px] max-w-[600px] overflow-hidden rounded-lg shadow flex justify-center items-center">
            <img
              src={product.image}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>
        </Box>

        {/* Details Section */}
        <Box className="w-full md:w-1/2 p-4 space-y-4">
          <Typography variant="h5" className="font-bold text-black ">
            {product.name}
          </Typography>
          <Rating precision={0.1} value={product.rating} readOnly />
          <Typography variant="h4" className="text-gray-700">
           {product.price} MAD
          </Typography>
          <Typography variant="h6" sx={{ textDecoration: 'line-through' }} className="text-gray-700">
           {product.oldprice} MAD
          </Typography>
          <Typography variant="body1" className="text-black">
            {product.richDescription}
          </Typography>

          {/* Size and Quantity Selection */}
          <Box className="flex flex-col items-start space-y-4 mt-4">
            {/* Size Selection */}
            <Typography variant="h8" className="font-bold text-black ">
              Size
            </Typography>
            <Box className="size-selector">
              <div className="size-options">
                {JSON.parse(product.sizeOptions).map(({ value, size }) => (
                  <button
                    key={value}
                    className={`size-button ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </Box>

            {/* Color Selection */}
            <Typography variant="h8" className="font-bold text-black ">
              {" "}
              Color
            </Typography>
            <Box className="flex items-center space-x-2">
              {JSON.parse(product.colorOptions).map(({ value, color }) => (
                <IconButton
                  key={value}
                  onClick={() => handleColorToggle(value)}
                  style={{
                    backgroundColor: selectedColors.includes(value)
                      ? color
                      : "transparent",
                    border: `2px solid ${color}`,
                    borderRadius: "30%", // Circular buttons
                    position: "relative",
                    width: 40,
                    height: 40,
                  }}
                  aria-label={value}
                >
                  {selectedColors.includes(value) && (
                    <CheckIcon
                      style={{
                        color: "#fff",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)", // Center the icon
                      }}
                    />
                  )}
                </IconButton>
              ))}
            </Box>

            {/* Quantity Selection with Plus/Minus Icons */}
            <Typography variant="h8" className="font-bold text-black ">
              {" "}
              Quantity
            </Typography>
            <Box className="flex items-center space-x-2">
              <IconButton
                style={{ backgroundColor: "red", color: "white" }}
                onClick={handleDecrease}
                disabled={quantity === 0}
                aria-label="decrease"
                color="warning"
                size="small"
              >
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="body1"
                className="w-8 text-black text-center"
              >
                {quantity}
              </Typography>
              <IconButton
                style={{ backgroundColor: "green", color: "white" }}
                onClick={handleIncrease}
                disabled={quantity === 20}
                aria-label="increase"
                size="small"
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
          {quantity > 0 && (
            <Link to="/checkout">
              <button
                onClick={handleAddToCart}
                className="btn checkout-btn hover:bg-red-700"
              >
                Add to Cart
              </button>
            </Link>
          )}
        </Box>
      </div>
    </MainLayout>
  );
};

export default DetailleProducts;
