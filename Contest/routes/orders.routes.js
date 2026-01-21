const express = require("express");
const fs = require("fs");
const router = express.Router();

const calculateRevenue = (price, quantity) => price * quantity;

router.post("/", (req, res) => {
  const { productId, quantity } = req.body;
  const data = JSON.parse(fs.readFileSync("db.json", "utf-8"));

  const product = data.products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.stock === 0 || quantity > product.stock) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  const order = {
    id: data.orders.length + 1,
    productId,
    quantity,
    totalAmount: calculateRevenue(product.price, quantity),
    status: "placed",
    createdAt: new Date().toISOString().split("T")[0]
  };

  product.stock -= quantity;
  data.orders.push(order);
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));

  res.status(201).json(order);
});


router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  res.status(200).json(data.orders);
});

router.delete("/:orderId", (req, res) => {
  const data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const orderId = Number(req.params.orderId);

  const order = data.orders.find(o => o.id === orderId);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.status === "cancelled") {
    return res.status(400).json({ message: "Order already cancelled" });
  }

  const today = new Date().toISOString().split("T")[0];
  if (order.createdAt !== today) {
    return res.status(400).json({ message: "Cancellation not allowed" });
  }

  const product = data.products.find(p => p.id === order.productId);
  if (product) {
    product.stock += order.quantity;
  }

  order.status = "cancelled";
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.status(200).json(order);
});

router.patch("/change-status/:orderId", (req, res) => {
  const { status } = req.body;
  const data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const order = data.orders.find(o => o.id == req.params.orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.status === "cancelled" || order.status === "delivered") {
    return res.status(400).json({ message: "Status change not allowed" });
  }

  const flow = { placed: "shipped", shipped: "delivered" };
  if (flow[order.status] !== status) {
    return res.status(400).json({ message: "Invalid status flow" });
  }

  order.status = status;
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.status(200).json(order);
});

module.exports = router;
