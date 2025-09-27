const express = require("express");
const router = express.Router();
const db = require("../config/database");

// Get all suppliers
router.get("/", (req, res) => {
  const query = "SELECT * FROM nhacungcap";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu nhà cung cấp:", err);
      return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
    console.log("Dữ liệu nhà cung cấp:", results);
    res.json(results);
  });
});

// Get supplier statistics data
router.get("/data/statistics", (req, res) => {
  const query = `
    SELECT 
      nhacungcap.mancc, 
      nhacungcap.tenncc, 
      COUNT(phieunhap.maphieunhap) AS soluongphieunhap, 
      SUM(phieunhap.tongtien) AS tongtien 
    FROM 
      nhacungcap 
    LEFT JOIN 
      phieunhap ON nhacungcap.mancc = phieunhap.mancc 
    GROUP BY 
      nhacungcap.mancc
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu nhà cung cấp:", err);
      return res.status(500).send("Lỗi khi lấy dữ liệu nhà cung cấp");
    }
    res.json(results);
  });
});

module.exports = router;