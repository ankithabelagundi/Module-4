const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/allorders", (req, res) => {
  const data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  res.json({ count: data.orders.length, orders: data.orders });
});


router.get("/cancelled-orders", (req, res) => {
  const data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const cancelled = data.orders.filter(o => o.status === "cancelled");
  res.json({ count: cancelled.length, orders: cancelled });
});

router.get("/shipped", (req, res) => {
  const data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const shipped = data.orders.filter(o => o.status === "shipped");
  res.json({ count: shipped.length, orders: shipped });
});


router.get("/total-revenue/:productId", (req, res) => {
  const productId = Number(req.params.productId);
  const data = JSON.parse(fs.readFileSync("db.json", "utf-8"));

  const revenue = data.orders
    .filter(o => o.productId === productId && o.status !== "cancelled")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  res.json({ productId, revenue });
});

router.get("/alltotalrevenue", (req, res) => {
  const data = JSON.parse(fs.readFileSync("db.json", "utf-8"));

  const totalRevenue = data.orders
    .filter(o => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  res.json({ totalRevenue });
});

module.exports = router;
