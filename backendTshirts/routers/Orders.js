const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const OrderProducts = require("../models/OrderProducts");

// Get all orders with product details
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Product, 
          through: {
            model: OrderProducts, 
            attributes: ["quantity", "size", "color"], 
          },
          attributes: ["id", "name", "price", "image"], 
        },
        {
          model: User, 
          attributes: ["id", "name","phone","Address","city"], 
        },
      ],
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

// GET  order by Id
router.get("/orders/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    // Find the order by its ID and include related data
    const order = await Order.findOne({
      where: { orderId: orderId },
      include: [
        {
          model: User,
          attributes: ["id", "name", "phone", "city"],
        },
      ],
    });

    // If no order is found, return a 404 error
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return the order along with user and product details
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Error fetching order", error });
  }
});

// Save Order
router.post("/saveorders", async (req, res) => {
  const { Address, name, city, phone, totalAmount, ordersitems } = req.body;

  // Log incoming data to check values
  console.log("Received order data:", req.body);

  try {
    // Create a user for the order
    const user = await User.create({
      name,
      phone,
      city,
      Address,
    });

    // Create a new order for the user
    const newOrder = await Order.create({
      status: "Pending",
      totalPrice:totalAmount,
      userId: user.id,
      DateOrderd:new Date().toISOString().split('T')[0]
    });

    // Process each item in the orderItems array and create entries in OrderProducts
    const orderProductPromises = ordersitems.map(async (item) => {

      const size = Array.isArray(item.size) ? item.size.join(",") : item.size;
      return await OrderProducts.create({
        orderId: newOrder.orderId,
        productId: item.id,
        color: item.color,
        size:size,
        quantity: item.quantity,
      });
    });
    await Promise.all(orderProductPromises);

    res.status(201).json({ message: "Order created successfully", newOrder });
  } catch (error) {
    console.error("Error creating order and associating products:", error);
    res.status(500).json({ message: "Error creating order", error });
  }
});

module.exports = router;
