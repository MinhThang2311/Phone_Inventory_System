const express = require("express");
const router = express.Router();
const db = require("../config/database");

// Get all customers
router.get("/", (req, res) => {
  const query = "SELECT * FROM khachhang";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu khách hàng:", err);
      return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
    res.json(results);
  });
});

// Get customer by ID
router.get("/:makh", (req, res) => {
  const { makh } = req.params;
  const query = "SELECT * FROM khachhang WHERE makh = ?";

  db.query(query, [makh], (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy thông tin khách hàng:", err);
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi lấy thông tin khách hàng." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng." });
    }

    res.status(200).json(results[0]);
  });
});

// Add new customer
router.post("/", (req, res) => {
  const { tenkhachhang, diachi, sdt } = req.body;
  if (!tenkhachhang || !sdt || !diachi) {
    return res.status(400).json({ message: "Thiếu thông tin khách hàng." });
  }

  const queryInsert = `INSERT INTO khachhang (tenkhachhang, diachi, sdt) VALUES (?, ?, ?)`;
  db.query(queryInsert, [tenkhachhang, diachi, sdt], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .send({ success: false, message: "Database error" });
    }

    res.send({ 
      success: true, 
      message: "Khách hàng đã được thêm thành công",
      id: result.insertId 
    });
  });
});

// Update customer
router.put("/:makh", (req, res) => {
  const makh = req.params.makh;
  const { tenkhachhang, diachi, sdt } = req.body;

  const sql = `UPDATE khachhang SET tenkhachhang = ?, diachi = ?, sdt = ? WHERE makh = ?`;

  db.query(sql, [tenkhachhang, diachi, sdt, makh], (error, results) => {
    if (error) {
      console.error("Error updating customer:", error);
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi cập nhật khách hàng", error });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }

    res.status(200).json({ message: "Cập nhật thành công" });
  });
});

// Delete customer
router.delete("/:makh", (req, res) => {
  const makh = req.params.makh;
  const query = "DELETE FROM khachhang WHERE makh = ?";
  
  db.query(query, [makh], (error, results) => {
    if (error) {
      console.error("Error deleting customer:", error);
      return res.status(500).json({ message: "Lỗi khi xóa khách hàng" });
    } 
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }
    
    res.status(200).json({ message: "Xóa khách hàng thành công" });
  });
});

// Get customer count
router.get("/count/total", (req, res) => {
  const query = "SELECT COUNT(*) AS soluongkhachhang FROM khachhang";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy số lượng khách hàng:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.json(results[0]);
  });
});

// Get customer data with statistics
router.get("/data/statistics", (req, res) => {
  const query = `
    SELECT 
      khachhang.makh, 
      khachhang.tenkhachhang, 
      COUNT(phieuxuat.maphieuxuat) AS soluongphieuxuat, 
      SUM(phieuxuat.tongtien) AS tongtien 
    FROM 
      khachhang 
    LEFT JOIN 
      phieuxuat ON khachhang.makh = phieuxuat.makh 
    GROUP BY 
      khachhang.makh
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu khách hàng:", err);
      return res.status(500).send("Lỗi khi lấy dữ liệu khách hàng");
    }
    res.json(results);
  });
});

module.exports = router;