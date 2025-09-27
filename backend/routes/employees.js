const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/database");

// Get all employees
router.get("/", (req, res) => {
  const query = "SELECT * FROM nhanvien";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu nhân viên:", err);
      return res
        .status(500)
        .json({ success: false, message: "Lỗi khi lấy dữ liệu" });
    }
    console.log("Dữ liệu nhân viên:", results);
    res.json({ success: true, data: results });
  });
});

// Get employee by ID with account info
router.get("/:manv", (req, res) => {
  const { manv } = req.params;
  const query = `
    SELECT n.hoten, n.email, n.sdt, t.matkhau
    FROM nhanvien n
    JOIN taikhoan t ON n.manv = t.manv
    WHERE n.manv = ?
  `;

  db.query(query, [manv], (err, results) => {
    if (err) {
      return res
        .status(500)
        .send({ success: false, message: "Database error" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    res.send({ success: true, data: results[0] });
  });
});

// Get employee basic info by ID
router.get("/info/:manv", (req, res) => {
  const manv = req.params.manv;
  const query = "SELECT * FROM nhanvien WHERE manv = ?";

  db.query(query, [manv], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .send({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Nhân viên không tồn tại" });
    }

    res.send({ success: true, data: results[0] });
  });
});

// Update employee information
router.put("/:manv", (req, res) => {
  const { manv } = req.params;
  const { email, sdt, password, currentPassword } = req.body;

  if (!currentPassword || !password) {
    return res
      .status(400)
      .send({ success: false, message: "Vui lòng nhập đủ thông tin mật khẩu" });
  }

  const getPasswordQuery = `SELECT matkhau FROM taikhoan WHERE manv = ?`;

  db.query(getPasswordQuery, [manv], (err, results) => {
    if (err || results.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Tài khoản không tồn tại" });
    }

    const hashedPassword = results[0].matkhau;

    bcrypt.compare(currentPassword, hashedPassword, (err, isMatch) => {
      if (err || !isMatch) {
        return res
          .status(400)
          .send({ success: false, message: "Mật khẩu hiện tại không đúng" });
      }

      bcrypt.hash(password, 12, (err, hashedNewPassword) => {
        if (err) {
          return res
            .status(500)
            .send({ success: false, message: "Error hashing new password" });
        }

        const updateNhanVienQuery = `
          UPDATE nhanvien SET email = ?, sdt = ? WHERE manv = ?
        `;
        const updateTaiKhoanQuery = `
          UPDATE taikhoan SET matkhau = ? WHERE manv = ?
        `;

        db.query(updateNhanVienQuery, [email, sdt, manv], (err, result) => {
          if (err) {
            return res
              .status(500)
              .send({ success: false, message: "Error updating nhanvien" });
          }

          db.query(
            updateTaiKhoanQuery,
            [hashedNewPassword, manv],
            (err, result) => {
              if (err) {
                return res
                  .status(500)
                  .send({ success: false, message: "Error updating taikhoan" });
              }

              res.send({ success: true, message: "Cập nhật thành công" });
            }
          );
        });
      });
    });
  });
});

// Get employee count
router.get("/count/total", (req, res) => {
  const query = "SELECT COUNT(*) AS soluongnhanvien FROM nhanvien";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy số lượng nhân viên:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.json(results[0]);
  });
});

module.exports = router;