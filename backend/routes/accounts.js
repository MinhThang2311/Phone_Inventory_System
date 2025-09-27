const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/database");

// Get all accounts
router.get("/taikhoan", (req, res) => {
  const query = "SELECT * FROM taikhoan";
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

// Get account by employee ID
router.get("/taikhoan/:manv", (req, res) => {
  const { manv } = req.params;
  const query = "SELECT * FROM taikhoan WHERE manv = ?";

  db.query(query, [manv], (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy thông tin tài khoản:", err);
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi lấy thông tin tài khoản." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản." });
    }

    res.status(200).json(results[0]);
  });
});

// Get user groups/permissions
router.get("/nhomquyen", (req, res) => {
  const query = "SELECT * FROM nhomquyen WHERE trangthai = 1";
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

// Login (POST /taikhoan - giữ nguyên endpoint gốc)
router.post("/taikhoan", (req, res) => {
  const { tendangnhap, matkhau } = req.body;

  if (!tendangnhap || !matkhau) {
    return res
      .status(400)
      .send({ success: false, message: "Username and password are required" });
  }

  const query = `
    SELECT 
      taikhoan.manv, 
      taikhoan.matkhau, 
      taikhoan.manhomquyen, 
      taikhoan.trangthai, 
      nhomquyen.tennhomquyen,
      nhanvien.hoten
    FROM 
      taikhoan
    JOIN 
      nhomquyen ON taikhoan.manhomquyen = nhomquyen.manhomquyen
    LEFT JOIN 
      nhanvien ON taikhoan.manv = nhanvien.manv
    WHERE 
      taikhoan.tendangnhap = ? AND taikhoan.trangthai = 1
  `;

  db.query(query, [tendangnhap], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .send({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res.send({ success: false, message: "Invalid username" });
    }

    const user = results[0];

    bcrypt.compare(matkhau, user.matkhau, (err, isMatch) => {
      if (err) {
        console.error("Password comparison error:", err);
        return res
          .status(500)
          .send({ success: false, message: "Server error" });
      }

      if (!isMatch) {
        return res.send({ success: false, message: "Invalid password" });
      }

      res.send({
        success: true,
        message: "Login successful",
        user: {
          manv: user.manv,
          manhomquyen: user.manhomquyen,
          tennhomquyen: user.tennhomquyen,
          hoten: user.hoten,
        },
      });
    });
  });
});

// Add new account (POST /themTaiKhoan - giữ nguyên endpoint gốc)
router.post("/themTaiKhoan", (req, res) => {
  const { manv, tendangnhap, matkhau, manhomquyen } = req.body;

  if (!manv || !tendangnhap || !matkhau) {
    return res
      .status(400)
      .send({ success: false, message: "All fields are required" });
  }

  const checkQuery = "SELECT * FROM taikhoan WHERE manv = ?";
  db.query(checkQuery, [manv], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .send({ success: false, message: "Database error" });
    }

    if (results.length > 0) {
      return res
        .status(400)
        .send({ success: false, message: "Account already exists" });
    }

    bcrypt.hash(matkhau, 12, (err, hashedPassword) => {
      if (err) {
        console.error("Password hashing error:", err);
        return res
          .status(500)
          .send({ success: false, message: "Server error" });
      }

      const insertQuery = `
        INSERT INTO taikhoan (manv, tendangnhap, matkhau, manhomquyen, trangthai) 
        VALUES (?, ?, ?, ?, 1)
      `;

      db.query(
        insertQuery,
        [manv, tendangnhap, hashedPassword, manhomquyen],
        (err, result) => {
          if (err) {
            console.error("Database error:", err);
            return res
              .status(500)
              .send({ success: false, message: "Database error" });
          }

          res.send({
            success: true,
            message: "Account created successfully",
            id: result.insertId,
          });
        }
      );
    });
  });
});

// Update account
router.put("/taikhoan/:manv", (req, res) => {
  const manv = req.params.manv;
  const { tendangnhap, manhomquyen, trangthai } = req.body;

  const sql = `UPDATE taikhoan SET tendangnhap = ?, manhomquyen = ?, trangthai = ? WHERE manv = ?`;

  db.query(
    sql,
    [tendangnhap, manhomquyen, trangthai, manv],
    (error, results) => {
      if (error) {
        console.error("Error updating tài khoản:", error);
        return res
          .status(500)
          .json({ message: "Có lỗi xảy ra khi cập nhật tài khoản", error });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Không tìm thấy tài khoản" });
      }

      res.status(200).json({ message: "Cập nhật thành công" });
    }
  );
});

module.exports = router;