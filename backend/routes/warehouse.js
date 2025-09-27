const express = require("express");
const router = express.Router();
const db = require("../config/database");

// Get all warehouse areas
router.get("/khuvuckho", (req, res) => {
  const query = "SELECT * FROM khuvuckho";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu khu vực kho:", err);
      return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
    console.log("Dữ liệu khu vực kho:", results);
    res.json(results);
  });
});

// Get warehouse area by ID
router.get("/khuvuckho/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM khuvuckho WHERE makhuvuc = ?";
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu khu vực kho:", err);
      return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: "Khu vực kho không tồn tại" });
    }
    
    res.json(results[0]);
  });
});

// Search warehouse area
router.get("/khuvuckho/timkiem", (req, res) => {
  const { keyword, type } = req.query;

  let query = "";
  if (type === "makhuvuc") {
    query = "SELECT * FROM khuvuckho WHERE makhuvuc LIKE ?";
  } else if (type === "tenkhuvuc") {
    query = "SELECT * FROM khuvuckho WHERE tenkhuvuc LIKE ?";
  } else {
    return res.status(400).json({ message: "Invalid search type." });
  }

  db.query(query, [`%${keyword}%`], (err, results) => {
    if (err) {
      console.error("Error searching khuvuckho:", err);
      return res.status(500).json({ message: "Error searching khuvuckho." });
    }
    res.status(200).json(results);
  });
});

// Add new warehouse area
router.post("/khuvuckho", (req, res) => {
  const { tenkhuvuc, ghichu } = req.body;

  // Kiểm tra dữ liệu
  if (!tenkhuvuc) {
    return res.status(400).json({ message: "Tên khu vực là bắt buộc." });
  }

  const query = "INSERT INTO khuvuckho (tenkhuvuc, ghichu) VALUES (?, ?)";
  db.query(query, [tenkhuvuc, ghichu], (err, result) => {
    if (err) {
      console.error("Lỗi khi thêm khu vực kho:", err);
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi thêm khu vực kho." });
    }

    res
      .status(201)
      .json({ message: "Thêm khu vực kho thành công!", id: result.insertId });
  });
});

// Update warehouse area
router.put("/khuvuckho/:id", (req, res) => {
  const { id } = req.params;
  const { tenkhuvuc, ghichu } = req.body;

  // Kiểm tra dữ liệu
  if (!tenkhuvuc) {
    return res.status(400).json({ message: "Tên khu vực là bắt buộc." });
  }

  const query =
    "UPDATE khuvuckho SET tenkhuvuc = ?, ghichu = ? WHERE makhuvuc = ?";
  db.query(query, [tenkhuvuc, ghichu, id], (err, result) => {
    if (err) {
      console.error("Lỗi khi cập nhật khu vực kho:", err);
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi cập nhật khu vực kho." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Khu vực kho không tìm thấy." });
    }

    res.status(200).json({ message: "Cập nhật khu vực kho thành công!" });
  });
});

// Delete warehouse area
router.delete("/khuvuckho/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM khuvuckho WHERE makhuvuc = ?";
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Lỗi khi xóa khu vực kho:", err);
      return res.status(500).json({ message: "Có lỗi xảy ra khi xóa khu vực kho." });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Khu vực kho không tồn tại." });
    }
    
    res.json({ message: "Xóa khu vực kho thành công!" });
  });
});

// Get all import receipts
router.get("/phieunhap", (req, res) => {
  const query = "SELECT * FROM phieunhap";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu phiếu nhập:", err);
      return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
    console.log("Dữ liệu phiếu nhập:", results);
    res.json(results);
  });
});

// Get all export receipts
router.get("/phieuxuat", (req, res) => {
  const query = "SELECT * FROM phieuxuat";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu phiếu xuất:", err);
      return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
    console.log("Dữ liệu phiếu xuất:", results);
    res.json(results);
  });
});

// Get products by warehouse area
router.get("/sanpham-theo-khuvuc/:khuvuc", (req, res) => {
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

// Inventory APIs
// Get inventory by month
router.get("/tonkho/sanpham-thang", (req, res) => {
  const query = `
    SELECT masp, tensp, soluongton
    FROM sanpham
    WHERE trangthai = 1;
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get import receipts by month
router.get("/tonkho/phieunhap-thang", (req, res) => {
  const query = `
    SELECT maphieunhap, SUM(tongtien) AS tongtien
    FROM phieunhap
    WHERE MONTH(thoigian) = MONTH(CURRENT_DATE())
    AND YEAR(thoigian) = YEAR(CURRENT_DATE())
    GROUP BY maphieunhap;
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get export receipts by period
router.get("/tonkho/phieuxuat-ky", (req, res) => {
  const query = `
    SELECT maphieuxuat, SUM(tongtien) AS tongtien
    FROM phieuxuat
    WHERE YEAR(thoigian) = YEAR(CURRENT_DATE())
    GROUP BY maphieuxuat;
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get products remaining in warehouse
router.get("/tonkho/sanpham-con-trong-kho", (req, res) => {
  const query = `
    SELECT masp, tensp, soluongton
    FROM sanpham
    WHERE soluongton > 0
    AND trangthai = 1;
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get detailed inventory data
router.get("/tonkho", (req, res) => {
  const year = req.query.year;
  const period = req.query.period;
  const product = req.query.product;

  let startMonth, endMonth;
  if (period === "dauky") {
    startMonth = 1;
    endMonth = 6;
  } else if (period === "giuaKy") {
    startMonth = 7;
    endMonth = 9;
  } else if (period === "cuoiky") {
    startMonth = 10;
    endMonth = 12;
  }

  const query = `
    SELECT 
      s.masp, 
      s.tensp, 
      GREATEST(0, (s.soluongton + 
          COALESCE(SUM(CASE 
              WHEN MONTH(pn.thoigian) < 1 AND YEAR(pn.thoigian) = ? THEN ctpn.soluong 
              ELSE 0 
          END), 0) - 
          COALESCE(SUM(CASE 
              WHEN MONTH(px.thoigian) < 1 AND YEAR(px.thoigian) = ? THEN ctpx.soluong 
              ELSE 0 
          END), 0)
      )) AS tondauky,
      GREATEST(0, (s.soluongton + 
          COALESCE(SUM(CASE 
              WHEN MONTH(pn.thoigian) BETWEEN 1 AND 6 AND YEAR(pn.thoigian) = ? THEN ctpn.soluong 
              ELSE 0 
          END), 0) - 
          COALESCE(SUM(CASE 
              WHEN MONTH(px.thoigian) BETWEEN 1 AND 6 AND YEAR(px.thoigian) = ? THEN ctpx.soluong 
              ELSE 0 
          END), 0)
      )) AS tongiuaKy,
      GREATEST(0, (s.soluongton + 
          COALESCE(SUM(CASE 
              WHEN MONTH(pn.thoigian) BETWEEN 1 AND 9 AND YEAR(pn.thoigian) = ? THEN ctpn.soluong 
              ELSE 0 
          END), 0) - 
          COALESCE(SUM(CASE 
              WHEN MONTH(px.thoigian) BETWEEN 1 AND 9 AND YEAR(px.thoigian) = ? THEN ctpx.soluong 
              ELSE 0 
          END), 0)
      )) AS toncuoiky,
      COALESCE(SUM(CASE 
          WHEN MONTH(pn.thoigian) BETWEEN ? AND ? AND YEAR(pn.thoigian) = ? THEN ctpn.soluong 
          ELSE 0 
      END), 0) AS nhap_trong_ky,
      COALESCE(SUM(CASE 
          WHEN MONTH(px.thoigian) BETWEEN ? AND ? AND YEAR(px.thoigian) = ? THEN ctpx.soluong 
          ELSE 0 
      END), 0) AS xuat_trong_ky
    FROM 
      sanpham s
    LEFT JOIN 
      phienbansanpham pbsp ON s.masp = pbsp.masp
    LEFT JOIN 
      ctphieunhap ctpn ON pbsp.maphienbansp = ctpn.maphienbansp
    LEFT JOIN 
      phieunhap pn ON ctpn.maphieunhap = pn.maphieunhap
    LEFT JOIN 
      ctphieuxuat ctpx ON pbsp.maphienbansp = ctpx.maphienbansp
    LEFT JOIN 
      phieuxuat px ON ctpx.maphieuxuat = px.maphieuxuat
    WHERE 
      s.trangthai = 1
      AND (? IS NULL OR s.masp = ?)
    GROUP BY 
      s.masp, s.tensp, s.soluongton;
  `;

  db.query(
    query,
    [
      year, year, year, year, year, year,
      startMonth, endMonth, year,
      startMonth, endMonth, year,
      product || null, product || null,
    ],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).send("Server error");
      }
      console.log(results);
      res.json(results);
    }
  );
});

module.exports = router;