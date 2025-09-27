const express = require("express");
const router = express.Router();
const db = require("../config/database");

// Get RAM options
router.get("/ram", (req, res) => {
  const query = "SELECT * FROM dungluongram";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu RAM:", err);
      return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
    res.json(results);
  });
});

// Get ROM options
router.get("/rom", (req, res) => {
  const query = "SELECT * FROM dungluongrom";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu ROM:", err);
      return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
    res.json(results);
  });
});

// Get color options
router.get("/mausac", (req, res) => {
  const query = "SELECT * FROM mausac";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu màu sắc:", err);
      return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
    res.json(results);
  });
});

// Get operating systems
router.get("/hedieuhanh", (req, res) => {
  const query = "SELECT * FROM hedieuhanh WHERE trangthai = 1";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .send({ success: false, message: "Database error" });
    }
    res.send({ success: true, data: results });
  });
});

// Get brands
router.get("/thuonghieu", (req, res) => {
  const query = "SELECT * FROM thuonghieu WHERE trangthai = 1";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .send({ success: false, message: "Database error" });
    }
    res.send({ success: true, data: results });
  });
});

// Get origins
router.get("/xuatxu", (req, res) => {
  const query = "SELECT * FROM xuatxu WHERE trangthai = 1";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .send({ success: false, message: "Database error" });
    }
    res.send({ success: true, data: results });
  });
});

module.exports = router;