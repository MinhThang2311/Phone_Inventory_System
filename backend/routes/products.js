const express = require("express");
const router = express.Router();
const db = require("../config/database");
const upload = require("../middleware/upload");

// Fetch all products
router.get("/", (req, res) => {
  const query = "SELECT * FROM sanpham";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .send({ success: false, message: "Database error" });
    }
    console.log("Results:", results);
    res.send({ success: true, data: results });
  });
});

// Fetch product by ID
router.get("/:id", (req, res) => {
  const masp = req.params.id;
  const query = "SELECT * FROM sanpham WHERE masp = ?";

  db.query(query, [masp], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .send({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Sản phẩm không tồn tại" });
    }

    res.send({ success: true, data: results[0] });
  });
});

// Get product versions
router.get("/phienban/:masp", (req, res) => {
  const masp = req.params.masp;
  const query = "SELECT * FROM phienbansanpham WHERE masp = ?";

  db.query(query, [masp], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .send({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Sản phẩm không tồn tại" });
    }

    res.send({ success: true, data: results });
  });
});

// Add new product with versions
router.post("/themsanphamvoiphienban", upload.single("hinhanh"), (req, res) => {
  const {
    tensp,
    xuatxu,
    chipxuly,
    dungluongpin,
    kichthuocman,
    hedieuhanh,
    phienbanhdh,
    camerasau,
    cameratruoc,
    thoigianbaohanh,
    thuonghieu,
    khuvuckho,
    soluongton,
    trangthai,
  } = req.body;
  const versions = JSON.parse(req.body.versions || "[]");
  const hinhanh = req.file ? req.file.filename : "";

  // Step 1: Insert the product into sanpham
  const productQuery = `
        INSERT INTO sanpham (tensp, hinhanh, xuatxu, chipxuly, dungluongpin, kichthuocman, hedieuhanh, phienbanhdh, camerasau, cameratruoc, thoigianbaohanh, thuonghieu, khuvuckho, soluongton, trangthai) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const productValues = [
    tensp,
    hinhanh,
    xuatxu,
    chipxuly,
    dungluongpin,
    kichthuocman,
    hedieuhanh,
    phienbanhdh,
    camerasau,
    cameratruoc,
    thoigianbaohanh,
    thuonghieu,
    khuvuckho,
    soluongton,
    trangthai,
  ];

  db.query(productQuery, productValues, (err, result) => {
    if (err) {
      console.error("Lỗi khi thêm sản phẩm:", err);
      return res.status(500).json({ error: "Lỗi khi thêm sản phẩm" });
    }

    // Step 2: Fetch the newly generated masp
    const maspQuery = "SELECT masp FROM sanpham ORDER BY masp DESC LIMIT 1";
    db.query(maspQuery, [result.insertId], (err, maspResult) => {
      if (err || maspResult.length === 0) {
        console.error(
          "Lỗi khi lấy masp:",
          err ? err.message : "Không tìm thấy masp"
        );
        return res.status(500).json({
          error: "Lỗi khi lấy masp",
          details: err ? err.message : "Không tìm thấy masp",
        });
      }

      const masp = maspResult[0].masp; // Get the newly generated masp

      // Step 3: Insert versions into phienbansanpham
      if (versions && versions.length > 0) {
        const versionQueries = versions.map((version) => {
          const { rom, ram, mausac, gianhap, giaxuat, soluongton, trangthai } =
            version;

          return new Promise((resolve, reject) => {
            const versionQuery = `
                            INSERT INTO phienbansanpham (masp, rom, ram, mausac, gianhap, giaxuat, soluongton, trangthai) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                        `;
            const versionValues = [
              masp, // Use the fetched masp
              rom || null,
              ram || null,
              mausac || null,
              gianhap || 0,
              giaxuat || 0,
              soluongton || 0,
              trangthai || 1,
            ];

            db.query(versionQuery, versionValues, (err) => {
              if (err) {
                console.error("Lỗi khi thêm phiên bản:", err);
                return reject(err);
              }
              resolve();
            });
          });
        });

        // Wait for all version insertions to complete
        Promise.all(versionQueries)
          .then(() => {
            res.status(201).json({
              message: "Sản phẩm và phiên bản đã được thêm thành công",
            });
          })
          .catch((err) => {
            console.error("Lỗi khi thêm phiên bản:", err);
            res.status(500).json({ error: "Lỗi khi thêm phiên bản" });
          });
      } else {
        res.status(201).json({
          message: "Sản phẩm đã được thêm thành công, không có phiên bản nào",
        });
      }
    });
  });
});

// Update product
router.put("/capnhat/:id", upload.single("hinhanh"), (req, res) => {
  console.log("Request body:", req.body);
  console.log("Uploaded file:", req.file);
  const masp = req.params.id;
  const {
    tensp,
    xuatxu,
    chipxuly,
    dungluongpin,
    kichthuocman,
    camerasau,
    cameratruoc,
    heDieuHanh,
    phienBanHdh,
    thoigianBaohanh,
    thuonghieu,
    khuVucKho,
  } = req.body;

  const hinhanh = req.file ? req.file.filename : null;

  const query = `UPDATE sanpham SET 
    tensp = ?, 
    xuatxu = ?, 
    chipxuly = ?, 
    dungluongpin = ?, 
    kichthuocman = ?, 
    camerasau = ?, 
    cameratruoc = ?, 
    hedieuhanh = ?, 
    phienbanhdh = ?, 
    thoigianbaohanh = ?, 
    thuonghieu = ?, 
    khuvuckho = ? 
    ${hinhanh ? ", hinhanh = ?" : ""} 
    WHERE masp = ?`;

  const params = [
    tensp,
    xuatxu,
    chipxuly,
    dungluongpin,
    kichthuocman,
    camerasau,
    cameratruoc,
    heDieuHanh,
    phienBanHdh,
    thoigianBaohanh,
    thuonghieu,
    khuVucKho,
    ...(hinhanh ? [hinhanh] : []),
    masp,
  ];

  db.query(query, params, (err, result) => {
    if (err) {
      console.error("Error updating product:", err);
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi cập nhật sản phẩm." });
    }

    res.json({ message: "Cập nhật sản phẩm thành công!" });
  });
});

// Delete product
router.delete("/:id", (req, res) => {
  const masp = req.params.id;
  console.log("ID sản phẩm cần xóa:", masp); // Kiểm tra ID

  const query = "DELETE FROM sanpham WHERE masp = ?";
  db.query(query, [masp], (err, result) => {
    if (err) {
      console.error("Error deleting product:", err);
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi xóa sản phẩm." });
    }
    console.log("Kết quả xóa:", result);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại." });
    }

    res.json({ message: "Sản phẩm đã được xóa thành công!" });
  });
});

// Get product count
router.get("/count/total", (req, res) => {
  const query = "SELECT COUNT(*) AS count FROM sanpham";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy số lượng sản phẩm:", err);
      return res.status(500).json({ error: "Lỗi khi lấy số lượng sản phẩm" });
    }
    res.json(results[0]);
  });
});

// Get products by warehouse area
router.get("/theo-khu-vuc/:khuvuc", (req, res) => {
  const khuvuc = req.params.khuvuc;
  const query = `
    SELECT sp.masp, sp.tensp, sp.hinhanh, sp.soluongton, kv.tenkhuvuc
    FROM sanpham sp
    JOIN khuvuckho kv ON sp.khuvuckho = kv.makhuvuc
    WHERE sp.khuvuckho = ?
  `;
  
  db.query(query, [khuvuc], (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy sản phẩm theo khu vực:", err);
      return res.status(500).json({ error: "Lỗi khi lấy sản phẩm theo khu vực" });
    }
    res.json(results);
  });
});

module.exports = router;