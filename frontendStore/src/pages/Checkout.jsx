/* eslint-disable no-unused-vars */
import MainLayout from "../layout/MainLayout";
import { useCart } from "../context/CartContext";
import { TextField, Button } from "@mui/material";
import { Link, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const Checkout = () => {
  const { cartProducts, setCartProducts } = useCart([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalAmount = cartProducts.reduce(
    (sum, product) => sum + (product.price * product.quantity),
    0
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    Address: "",
    city: "",
    cartProducts,
    totalAmount,
  });

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOrderClick = () => {
    setCartProducts([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the order data object to send in the request
    const orderData = {
      name: formData.name,
      phone: formData.phone,
      city: formData.city,
      Address: formData.Address,
      totalAmount:formData.totalAmount,
      ordersitems:formData.cartProducts
    };
    
    // Send the orderData to your server or API
    fetch("http://localhost:3000/api/v1/saveorders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order created successfully:", data);
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };
  
  
  return (
    <MainLayout>
      {isSubmitted && (
        // Success Message
        <div className="w-full p-8 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            شكراً لطلبك!
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            تم استلام طلبك بنجاح. سنقوم بمعالجته في أقرب وقت ممكن.
          </p>
          <p className="text-md text-gray-500">
            الإجمالي: <strong>{totalAmount} MAD</strong>
          </p>
        </div>
      )}

      <div
        className="flex mt-48 gap-3 flex-col items-center justify-center min-h-screen bg-gray-100 p-6 md:flex-row md:space-x-6 lg:space-x-12 lg:w-3/4 lg:mx-auto"
        dir="rtl"
      >
        {/* Order Summary Section */}
        <div className="w-full md:w-1/2 lg:w-5/12 p-6 bg-white rounded-lg shadow-lg mb-8 md:mb-0">
          <div className="text-4xl font-bold text-purple-600 mb-6">
            {Number(totalAmount).toFixed(2) + "MAD"}
          </div>

          {cartProducts.length > 0 ? (
            <div className="space-y-4">
              {cartProducts.map((product, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-gray-700">
                    <span>{product.name}</span>
                    <span>{product.price * product.quantity } MAD</span>
                  </div>
                  <div className="text-sm text-gray-500 ml-2">
                    المقاس: {product.size} &nbsp; اللون: {product.color}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">لا توجد منتجات</p>
          )}

          <hr className="my-4 border-gray-300" />

          <div className="flex justify-between text-gray-700 font-semibold text-lg">
            <span>الإجمالي</span>
            <span>{Number(totalAmount).toFixed(2) + "MAD"} </span>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 lg:w-7/12 p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            اكمل طلبك
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="الاسم الكامل"
              variant="outlined"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="رقم الهاتف"
              variant="outlined"
              type="tel"
              required
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="العنوان"
              variant="outlined"
              required
              name="Address"
              value={formData.Address}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="المدينة"
              variant="outlined"
              required
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <Button
              onClick={handleOrderClick}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="mt-4 py-3 text-lg font-semibold"
            >
              أرسل طلبك
            </Button>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Order Submitted</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  تم إرسال طلبك بنجاح. شكرًا لتسوقك معنا!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
