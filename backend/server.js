const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quanlikhohang",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// Fetch all products
app.get("/sanpham", (req, res) => {
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
app.get("/sanpham/:id", (req, res) => {
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
app.get("/phienbansanpham/:masp", (req, res) => {
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
app.get("/phieuxuat", (req, res) => {
  const query = "SELECT * FROM phieuxuat";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu phiếu xuất:", err);
      return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
    console.log("Dữ liệu phiếu xuất:", results); // Xem dữ liệu ở đây
    res.json(results);
  });
});
app.get("/phieunhap", (req, res) => {
  const query = "SELECT * FROM phieunhap";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu phiếu nhập:", err);
      return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
    console.log("Dữ liệu phiếu nhập:", results); // Xem dữ liệu ở đây
    res.json(results);
  });
});
app.get("/khuvuckho", (req, res) => {
  const query = "SELECT * FROM khuvuckho";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu khu vực kho:", err);
      return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
    console.log("Dữ liệu khu vực kho:", results); // Xem dữ liệu ở đây
    res.json(results);
  });
});
app.get("/ram", (req, res) => {
  const query = "SELECT * FROM dungluongram";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu khu vực kho:", err);
      return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
    console.log("Dữ liệu khu vực kho:", results); // Xem dữ liệu ở đây
    res.json(results);
  });
});
app.get("/rom", (req, res) => {
  const query = "SELECT * FROM dungluongrom";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu khu vực kho:", err);
      return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
    console.log("Dữ liệu khu vực kho:", results); // Xem dữ liệu ở đây
    res.json(results);
  });
});
app.get("/mausac", (req, res) => {
  const query = "SELECT * FROM mausac";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu khu vực kho:", err);
      return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
    console.log("Dữ liệu khu vực kho:", results); // Xem dữ liệu ở đây
    res.json(results);
  });
});
//  to search khu vực kho by mã khu vực or tên khu vực
app.get("/timkiemkhuvuckho", (req, res) => {
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

app.get("/nhacungcap", (req, res) => {
  const query = "SELECT * FROM nhacungcap";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu nhà cung cấp:", err);
      return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
    console.log("Dữ liệu nhà cung cấp:", results); // Xem dữ liệu ở đây
    res.json(results);
  });
});
app.get("/nhanvien", (req, res) => {
  const query = "SELECT * FROM nhanvien";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu nhân viên:", err);
      return res
        .status(500)
        .json({ success: false, message: "Lỗi khi lấy dữ liệu" });
    }
    console.log("Dữ liệu nhân viên:", results); // Xem dữ liệu ở đây
    res.json({ success: true, data: results }); // Đảm bảo trả về cấu trúc này
  });
});
// Endpoint to fetch products by khu vực ID (makhuvuc)
app.get("/sanphamtheokhuvuc", (req, res) => {
  const { khuvuc } = req.query;
  if (!khuvuc) {
    return res.status(400).json({ message: "Khu vực kho ID is required." });
  }

  const query = "SELECT * FROM sanpham WHERE khuvuckho = ?";
  db.query(query, [khuvuc], (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ message: "Error fetching products." });
    }
    res.json(results);
  });
});

app.get("/khachhang", (req, res) => {
  const query = "SELECT * FROM khachhang"; // Thay đổi tên bảng nếu cần thiết
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu khách hàng:", err);
      return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
    res.json(results);
  });
});

// Fetch available operating systems
app.get("/hedieuhanh", (req, res) => {
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

// Fetch thuonghieu
app.get("/thuonghieu", (req, res) => {
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

// Fetch khuvuckho
app.get("/khuvuckho", (req, res) => {
  const query = "SELECT * FROM khuvuckho WHERE trangthai = 1";
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

// Fetch product origins
app.get("/xuatxu", (req, res) => {
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
app.get("/taikhoan", (req, res) => {
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
app.get("/taikhoanTheoMaNV/:manv", (req, res) => {
  const { manv } = req.params;
  const query = "SELECT * FROM taikhoan WHERE manv = ?";

  db.query(query, [manv], (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy thông tin tài khoản:", err);
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi lấy thông tin tài khoả." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy khu vực kho." });
    }

    res.status(200).json(results[0]);
  });
});
app.get("/nhomquyen", (req, res) => {
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
app.get("/khuvuckho/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM khuvuckho WHERE makhuvuc = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy thông tin khu vực kho:", err);
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi lấy thông tin khu vực kho." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy khu vực kho." });
    }

    res.status(200).json(results[0]);
  });
});
app.get("/khachhang/:makh", (req, res) => {
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
app.put("/khachhang/:makh", (req, res) => {
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

    // Trả về phản hồi có nội dung xác nhận cập nhật thành công
    res.status(200).json({ message: "Cập nhật thành công" });
  });
});
app.put("/Edittaikhoan/:manv", (req, res) => {
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
        return res.status(404).json({ message: "Không tìm thấy khách hàng" });
      }

      // Trả về phản hồi có nội dung xác nhận cập nhật thành công
      res.status(200).json({ message: "Cập nhật thành công" });
    }
  );
});
app.post("/addkhachhang", (req, res) => {
  const { tenkhachhang, diachi, sdt } = req.body;
  if (!tenkhachhang || !sdt || !diachi) {
    return res.status(400).json({ message: "Thiếu thông tin khách hàng." });
  }
  const trangthai = 1;

  const queryInsert = `INSERT INTO khachhang (tenkhachhang, diachi, sdt) VALUES (?, ?, ?)`;
  db.query(queryInsert, [tenkhachhang, diachi, sdt, trangthai], (err) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .send({ success: false, message: "Database error" });
    }

    res.send({ success: true, message: "Khách hàng đã được thêm thành công" });
  });
});
// DELETE: Xóa khách hàng theo mã khách hàng
app.delete("/xoakhachhang/:makh", (req, res) => {
  const makh = req.params.makh;
  const query = "DELETE FROM khachhang WHERE makh = ?";
  db.query(query, [makh], (error, results) => {
    if (error) {
      res.status(500).send("Lỗi khi xóa khách hàng");
    } else if (results.affectedRows === 0) {
      res.status(404).send("Không tìm thấy khách hàng");
    } else {
      res.status(200).send("Xóa khách hàng thành công");
    }
  });
});
//Ds mã imei sản phẩm
app.get("/truyVanMaImei/:masp", async (req, res) => {
  const { masp } = req.params;
  const query = `
        SELECT 
    c.maimei,
    c.maphieunhap,
    c.maphieuxuat,
    p.maphienbansp,
    p.masp,
    c.tinhtrang,
    p.soluongton,
    dlrom.kichthuocrom AS rom_kichthuoc, 
    dlram.kichthuocram AS ram_kichthuoc, 
    p.mausac, 
    CONCAT(dlrom.kichthuocrom ,'-', dlram.kichthuocram ,'-', ms.tenmau) AS cauhinh
FROM 
    ctsanpham c
JOIN 
    phienbansanpham p ON c.maphienbansp = p.maphienbansp
    LEFT JOIN dungluongram dlram ON p.ram = dlram.madlram
    LEFT JOIN dungluongrom dlrom ON p.rom = dlrom.madlrom
    LEFT JOIN mausac ms ON p.mausac = ms.mamau
JOIN 
    sanpham s ON p.masp = s.masp
WHERE 
    s.masp = ?; -- 
    `;
  try {
    db.query(query, [masp], (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Có lỗi xảy ra khi truy vấn dữ liệu." });
      }
      res.status(200).json({ success: true, data: results });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Có lỗi xảy ra." });
  }
});
app.post("/themsanphamvoiphienban", upload.single("hinhanh"), (req, res) => {
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
app.post("/themkhuvuckho", (req, res) => {
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
app.put("/khuvuckho/:id", (req, res) => {
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

app.put(
  "/chinhsuasanphamvaphienban/:masp",
  upload.single("hinhanh"),
  (req, res) => {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);
    const { masp } = req.params;
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
    const hinhanh = req.file ? req.file.filename : null; // Đặt hinhanh là null nếu không có tệp mới

    // Update product details
    const productQuery = `
  UPDATE sanpham 
  SET tensp = ?, hinhanh = COALESCE(?, hinhanh), xuatxu = ?, chipxuly = ?, dungluongpin = ?, 
      kichthuocman = ?, hedieuhanh = ?, phienbanhdh = ?, camerasau = ?, cameratruoc = ?, 
      thoigianbaohanh = ?, thuonghieu = ?, khuvuckho = ?, soluongton = ?, trangthai = ?
  WHERE masp = ?
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
      masp,
    ];

    db.query(productQuery, productValues, (err) => {
      if (err) {
        console.error("Lỗi khi cập nhật sản phẩm:", err);
        return res.status(500).json({ error: "Lỗi khi cập nhật sản phẩm" });
      }

      // Update versions in phienbansanpham
      const versionQueries = versions.map((version) => {
        const {
          rom,
          ram,
          mausac,
          gianhap,
          giaxuat,
          soluongton,
          trangthai,
          maphienbansp, // Sử dụng maphienbansp
        } = version;

        return new Promise((resolve, reject) => {
          const versionQuery = `
        UPDATE phienbansanpham 
        SET rom = ?, ram = ?, mausac = ?, gianhap = ?, giaxuat = ?, soluongton = ?, trangthai = ? 
        WHERE masp = ? AND maphienbansp = ?
      `;
          const versionValues = [
            rom,
            ram,
            mausac,
            gianhap,
            giaxuat,
            soluongton,
            trangthai,
            masp,
            maphienbansp, // Sử dụng maphienbansp
          ];

          db.query(versionQuery, versionValues, (err) => {
            if (err) {
              console.error("Lỗi khi cập nhật phiên bản:", err);
              return reject(err);
            }
            resolve();
          });
        });
      });

      Promise.all(versionQueries)
        .then(() => {
          res.status(200).json({
            message: "Sản phẩm và phiên bản đã được cập nhật thành công",
          });
        })
        .catch((err) => {
          console.error("Lỗi khi cập nhật phiên bản:", err);
          res.status(500).json({ error: "Lỗi khi cập nhật phiên bản" });
        });
    });
  }
);

app.put("/capnhatsanpham/:id", upload.single("hinhanh"), (req, res) => {
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

// Handle user login
app.post("/taikhoan", (req, res) => {
  const { tendangnhap, matkhau } = req.body;
  const query = `
    SELECT 
      taikhoan.manv, 
      taikhoan.matkhau, 
      taikhoan.manhomquyen, 
      taikhoan.trangthai, 
      nhomquyen.tennhomquyen -- Giả sử bạn muốn lấy tên nhóm quyền
    FROM 
      taikhoan
    JOIN 
      nhomquyen ON taikhoan.manhomquyen = nhomquyen.manhomquyen
    WHERE 
      taikhoan.tendangnhap = ?`;

  db.query(query, [tendangnhap], (err, results) => {
    if (err) {
      return res
        .status(500)
        .send({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res.send({ success: false, message: "Invalid username" });
    }

    const user = results[0];
    if (user.trangthai === 0) {
      return res.send({
        success: false,
        message: "Tài khoản đã bị vô hiệu hóa",
      });
    }
    bcrypt.compare(matkhau, user.matkhau, (err, isMatch) => {
      if (err) {
        return res
          .status(500)
          .send({ success: false, message: "Error comparing passwords" });
      }

      if (isMatch) {
        const nhanVienQuery = "SELECT hoten FROM nhanvien WHERE manv = ?";
        db.query(nhanVienQuery, [user.manv], (err, nhanVienResults) => {
          if (err) {
            return res
              .status(500)
              .send({ success: false, message: "Error fetching user details" });
          }

          if (nhanVienResults.length > 0) {
            res.send({
              success: true,
              message: "Login successful",
              manv: user.manv,
              hoten: nhanVienResults[0].hoten,
              manhomquyen: user.manhomquyen,
              tennhomquyen: user.tennhomquyen,
            });
          } else {
            res.send({
              success: false,
              message: "No matching employee found",
            });
          }
        });
      } else {
        res.send({ success: false, message: "Invalid password" });
      }
    });
  });
});
app.post("/themTaiKhoan", (req, res) => {
  const { tendangnhap, matkhau, manhomquyen, trangthai, manv } = req.body;

  // Kiểm tra xem tên đăng nhập đã tồn tại chưa
  const checkQuery = "SELECT * FROM taikhoan WHERE tendangnhap = ?";
  db.query(checkQuery, [tendangnhap], (err, results) => {
    if (err) {
      return res
        .status(500)
        .send({ success: false, message: "Database error" });
    }

    if (results.length > 0) {
      return res
        .status(400)
        .send({ success: false, message: "Tên đăng nhập đã tồn tại" });
    }

    // Nếu tên đăng nhập chưa tồn tại, tiến hành thêm tài khoản mới
    const hashedPassword = bcrypt.hashSync(matkhau, 10); // Mã hóa mật khẩu
    const insertQuery =
      "INSERT INTO taikhoan (tendangnhap, matkhau, manhomquyen, trangthai, manv) VALUES (?, ?, ?, ?, ?)";

    db.query(
      insertQuery,
      [tendangnhap, hashedPassword, manhomquyen, trangthai, manv],
      (err, results) => {
        if (err) {
          return res
            .status(500)
            .send({ success: false, message: "Database error" });
        }
        res.send({ success: true, message: "Thêm tài khoản thành công!" });
      }
    );
  });
});
app.get("/nhanvien/:manv", (req, res) => {
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

app.put("/nhanvien/:manv", (req, res) => {
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

// delete product
app.delete("/sanpham/:id", (req, res) => {
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
// Endpoint to delete khu vực kho
app.delete("/xoakhuvuckho/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM khuvuckho WHERE makhuvuc = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Lỗi khi xóa khu vực kho:", err);
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi xóa khu vực kho." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Khu vực kho không tìm thấy." });
    }

    res.status(200).json({ message: "Xóa khu vực kho thành công!" });
  });
});
app.get("/binhquan-mathang", (req, res) => {
  const query = `
    SELECT 
      s.masp, 
      s.tensp, 
      SUM(ctpx.soluong) AS tong_soluong,
      SUM(ctpx.soluong * ctpx.dongia) AS tong_doanhthu,
      CASE 
        WHEN SUM(ctpx.soluong) > 0 THEN SUM(ctpx.soluong * ctpx.dongia) / SUM(ctpx.soluong)
        ELSE 0 
      END AS gia_binh_quan
    FROM 
      sanpham s
    LEFT JOIN 
      phienbansanpham pbsp ON s.masp = pbsp.masp
    LEFT JOIN 
      ctphieuxuat ctpx ON pbsp.maphienbansp = ctpx.maphienbansp
    LEFT JOIN 
      phieuxuat px ON ctpx.maphieuxuat = px.maphieuxuat
    WHERE 
      px.thoigian BETWEEN ? AND ?  -- Thay thế bằng khoảng thời gian bạn muốn
    GROUP BY 
      s.masp, s.tensp;
  `;

  // Thay thế bằng khoảng thời gian bạn muốn
  const fromDate = "2024-01-01"; // Ngày bắt đầu
  const toDate = "2024-12-31"; // Ngày kết thúc

  db.query(query, [fromDate, toDate], (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu bình quân mặt hàng:", err);
      return res.status(500).send("Lỗi khi lấy dữ liệu bình quân mặt hàng");
    }
    res.json(results);
  });
});
//ThongKe
app.get("/sanphamcount", (req, res) => {
  const query = "SELECT COUNT(*) AS soluongsanpham FROM sanpham";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy số lượng sản phẩm:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.json(results[0]); // Trả về kết quả
  });
});
app.get("/khachhangcount", (req, res) => {
  const query = "SELECT COUNT(*) AS soluongkhachhang FROM khachhang";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy số lượng khách hàng:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.json(results[0]); // Trả về kết quả
  });
});

app.get("/nhanviencount", (req, res) => {
  const query = "SELECT COUNT(*) AS soluongnhanvien FROM nhanvien";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy số lượng nhân viên:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.json(results[0]); // Trả về kết quả
  });
});
app.get("/khachhangdata", (req, res) => {
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
  `; // Truy vấn để lấy dữ liệu khách hàng

  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu khách hàng:", err);
      return res.status(500).send("Lỗi khi lấy dữ liệu khách hàng");
    }
    res.json(results);
  });
});

// tab nhà cung cấp của thống kê
// Route để lấy dữ liệu nhà cung cấp và phiếu nhập
app.get("/nhacungcapdata", (req, res) => {
  const query = `
    SELECT ncc.manhacungcap, ncc.tennhacungcap, 
           COUNT(pn.maphieunhap) AS soluongphieunhap, 
           SUM(pn.tongtien) AS tongtien
    FROM nhacungcap ncc
    LEFT JOIN phieunhap pn ON ncc.manhacungcap = pn.manhacungcap
    GROUP BY ncc.manhacungcap
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu nhà cung cấp:", err);
      return res.status(500).send("Lỗi khi lấy dữ liệu nhà cung cấp");
    }
    res.json(results);
  });
});

app.get("/tonkho/sanpham-thang", (req, res) => {
  const query = `
    SELECT masp, tensp, soluongton
    FROM sanpham
    WHERE trangthai = 1;  -- Chỉ lấy sản phẩm còn hoạt động
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Lấy phiếu nhập trong tháng
app.get("/tonkho/phieunhap-thang", (req, res) => {
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

// Lấy phiếu xuất trong kỳ
app.get("/tonkho/phieuxuat-ky", (req, res) => {
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

// Lấy sản phẩm còn trong kho
app.get("/tonkho/sanpham-con-trong-kho", (req, res) => {
  const query = `
    SELECT masp, tensp, soluongton
    FROM sanpham
    WHERE soluongton > 0
    AND trangthai = 1;  -- Chỉ lấy sản phẩm còn hoạt động
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
// Tạo endpoint để lấy dữ liệu tồn kho
app.get("/tonkho", (req, res) => {
  const year = req.query.year;
  const period = req.query.period;
  const product = req.query.product; // Lấy mã sản phẩm từ query

  // Xác định tháng bắt đầu và tháng kết thúc dựa trên kỳ
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
      s.trangthai =  1
      AND (? IS NULL OR s.masp = ?)
    GROUP BY 
      s.masp, s.tensp, s.soluongton;
  `;

  // Sử dụng db.query với các tham số đã chuẩn bị
  db.query(
    query,
    [
      year, // Tồn đầu kỳ
      year,
      year, // Tồn giữa kỳ
      year,
      year, // Tồn cuối kỳ
      year,
      startMonth,
      endMonth,
      year, // Nhập trong kỳ
      startMonth,
      endMonth,
      year, // Xuất trong kỳ
      product || null, // Tham số sản phẩm
      product || null, // Tham số sản phẩm
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

app.get("/thongke-8ngay", (req, res) => {
  const query = `
      SELECT 
          DATE(px.thoigian) AS ngay,
          COALESCE(SUM(px.tongtien), 0) AS doanhthu,
          COALESCE(SUM(pn.tongtien), 0) AS von,
          COALESCE(SUM(px.tongtien) - SUM(pn.tongtien), 0) AS loinhuan
      FROM 
          phieuxuat px
      LEFT JOIN 
          phieunhap pn ON DATE(px.thoigian) = DATE(pn.thoigian)
      WHERE 
          px.thoigian >= CURDATE() - INTERVAL 8 DAY
      GROUP BY 
          ngay
      ORDER BY 
          ngay ASC;
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).send("Server error");
    }
    res.json(results);
  });
});

// Thống kê doanh thu theo năm 2022 - 2026
app.get("/doanhthu-nam", async (req, res) => {
  const query = `
    SELECT 
      COALESCE(von.year, doanhthu.year) AS year,
      COALESCE(von.total_von, 0) AS total_von,
      COALESCE(doanhthu.total_doanhthu, 0) AS total_doanhthu,
      GREATEST(COALESCE(doanhthu.total_doanhthu, 0) - COALESCE(von.total_von, 0), 0) AS loi_nhuan
    FROM 
      (SELECT YEAR(pn.thoigian) AS year, 
              SUM(ctpn.soluong * ctpn.dongia) AS total_von
       FROM ctphieunhap AS ctpn
       JOIN phieunhap AS pn ON ctpn.maphieunhap = pn.maphieunhap
       WHERE YEAR(pn.thoigian) BETWEEN 2022 AND 2026
       GROUP BY YEAR(pn.thoigian)) AS von
    RIGHT JOIN 
      (SELECT YEAR(px.thoigian) AS year, 
              SUM(ctpx.soluong * ctpx.dongia) AS total_doanhthu
       FROM ctphieuxuat AS ctpx
       JOIN phieuxuat AS px ON ctpx.maphieuxuat = px.maphieuxuat
       WHERE YEAR(px.thoigian) BETWEEN 2022 AND 2026
       GROUP BY YEAR(px.thoigian)) AS doanhthu
    ON von.year = doanhthu.year;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Database query error" });
    }

    // Trả về kết quả dưới dạng JSON
    res.json(results);
  });
});

// Endpoint lấy dữ liệu vốn, doanh thu, và lợi nhuận cho từng tháng năm 2024
app.get("/doanhthu-thang", (req, res) => {
  const year = req.query.year; // Lấy năm từ query parameters

  // Kiểm tra xem năm có hợp lệ không
  if (!year || isNaN(year)) {
    return res.status(400).json({ error: "Invalid year parameter" });
  }

  const query = `
    SELECT 
      COALESCE(von.month, doanhthu.month) AS month,
      COALESCE(von.total_von, 0) AS total_von,
      COALESCE(doanhthu.total_doanhthu, 0) AS total_doanhthu,
      GREATEST(COALESCE(doanhthu.total_doanhthu, 0) - COALESCE(von.total_von, 0), 0) AS loi_nhuan
    FROM 
      (SELECT MONTH(pn.thoigian) AS month, 
              SUM(ctpn.soluong * ctpn.dongia) AS total_von
       FROM ctphieunhap AS ctpn
       JOIN phieunhap AS pn ON ctpn.maphieunhap = pn.maphieunhap
       WHERE YEAR(pn.thoigian) = ?
       GROUP BY MONTH(pn.thoigian)) AS von
    RIGHT JOIN 
      (SELECT MONTH(px.thoigian) AS month, 
              SUM(ctpx.soluong * ctpx.dongia) AS total_doanhthu
       FROM ctphieuxuat AS ctpx
       JOIN phieuxuat AS px ON ctpx.maphieuxuat = px.maphieuxuat
       WHERE YEAR(px.thoigian) = ?
       GROUP BY MONTH(px.thoigian)) AS doanhthu
    ON von.month = doanhthu.month;
  `;

  // Sử dụng db.query với tham số để tránh SQL injection
  db.query(query, [year, year], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Database query error" });
    }

    // Trả về kết quả dưới dạng JSON
    res.json(results);
  });
});

// Endpoint lấy dữ liệu vốn, doanh thu, và lợi nhuận cho từng từng ngày trong tháng năm 2024
app.get("/doanhthu-ngay", (req, res) => {
  const { year, month } = req.query; // Nhận năm và tháng từ query

  const query = `
      SELECT 
          day,
          GREATEST(SUM(total_cost), 0) AS total_cost,
          GREATEST(SUM(total_revenue), 0) AS total_revenue,
          GREATEST(SUM(total_revenue) - SUM(total_cost), 0) AS total_profit
      FROM (
          -- Tính tổng chi phí từ bảng phieunhap
          SELECT 
              DAY(phieunhap.thoigian) AS day,
              ctphieunhap.soluong * ctphieunhap.dongia AS total_cost,
              0 AS total_revenue
          FROM 
              phieunhap
              LEFT JOIN ctphieunhap ON phieunhap.maphieunhap = ctphieunhap.maphieunhap
          WHERE 
              YEAR(phieunhap.thoigian) = ? AND MONTH(phieunhap.thoigian) = ?
          
          UNION ALL

          -- Tính tổng doanh thu từ bảng phieuxuat
          SELECT 
              DAY(phieuxuat.thoigian) AS day,
              0 AS total_cost,
              ctphieuxuat.soluong * ctphieuxuat.dongia AS total_revenue
          FROM 
              phieuxuat
              LEFT JOIN ctphieuxuat ON phieuxuat.maphieuxuat = ctphieuxuat.maphieuxuat
          WHERE 
              YEAR(phieuxuat.thoigian) = ? AND MONTH(phieuxuat.thoigian) = ?
      ) AS stats
      GROUP BY day
      ORDER BY day;
  `;

  // Cung cấp tham số cho tất cả các điều kiện
  db.query(query, [year, month, year, month], (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn:", err);
      return res
        .status(500)
        .json({ error: "Có lỗi xảy ra trong quá trình truy vấn." });
    }
    res.json(results);
  });
});

app.get("/doanhthu-daytoday", (req, res) => {
  const { from, to } = req.query;

  // Truy vấn SQL
  const query = `
    SELECT 
        SUM(pn.chiphi) AS chiphi,
        SUM(px.doanhthu) AS doanhthu,
        SUM(px.doanhthu - pn.chiphi) AS loinhuan
    FROM (
        -- Tính tổng chi phí
        SELECT 
            ctphieunhap.soluong * phienbansanpham.gianhap AS chiphi
        FROM 
            phieunhap
        JOIN ctphieunhap ON phieunhap.maphieunhap = ctphieunhap.maphieunhap
        JOIN phienbansanpham ON ctphieunhap.maphienbansp = phienbansanpham.maphienbansp
        WHERE phieunhap.thoigian BETWEEN ? AND ?
    ) AS pn,
    (
        -- Tính tổng doanh thu
        SELECT 
            ctphieuxuat.soluong * phienbansanpham.giaxuat AS doanhthu
        FROM 
            phieuxuat
        JOIN ctphieuxuat ON phieuxuat.maphieuxuat = ctphieuxuat.maphieuxuat
        JOIN phienbansanpham ON ctphieuxuat.maphienbansp = phienbansanpham.maphienbansp
        WHERE phieuxuat.thoigian BETWEEN ? AND ?
    ) AS px;
  `;

  // Thực thi truy vấn với tham số từ và đến ngày
  db.query(query, [from, to, from, to], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).send("Server error");
    }

    // Trả về kết quả thống kê
    const statistics = results[0] || { chiphi: 0, doanhthu: 0, loinhuan: 0 };
    res.json({
      chiphi: statistics.chiphi,
      doanhthu: statistics.doanhthu,
      loinhuan: statistics.loinhuan,
    });
  });
});
//NhaCungCap
app.get("/nhacungcap/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM nhacungcap WHERE manhacungcap = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy thông tin khu vực kho:", err);
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi lấy thông tin khu vực kho." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy khu vực kho." });
    }

    res.status(200).json(results[0]);
  });
});
app.post("/themnhacungcap", (req, res) => {
  const { tennhacungcap, email, sdt, diachi } = req.body;

  // Kiểm tra dữ liệu
  if (!tennhacungcap) {
    return res.status(400).json({ message: "Tên nhà cung cấp là bắt buộc." });
  }

  const query =
    "INSERT INTO nhacungcap (tennhacungcap, email,sdt,diachi) VALUES (?, ?, ?, ?)";
  db.query(query, [tennhacungcap, email, sdt, diachi], (err, result) => {
    if (err) {
      console.error("Lỗi khi thêm khu vực kho:", err);
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi thêm khu vực kho." });
    }

    res
      .status(201)
      .json({ message: "Thêm nhà cung cấp thành công!", id: result.insertId });
  });
});
app.put("/nhacungcap/:id", (req, res) => {
  const { id } = req.params;
  const { tennhacungcap, diachi, email, sdt } = req.body;

  // Kiểm tra dữ liệu
  if (!tennhacungcap) {
    return res.status(400).json({ message: "Tên khu vực là bắt buộc." });
  }

  const query =
    "UPDATE nhacungcap SET tennhacungcap = ?, diachi = ?,email = ?,sdt = ? WHERE manhacungcap = ?";
  db.query(query, [tennhacungcap, diachi, email, sdt, id], (err, result) => {
    if (err) {
      console.error("Lỗi khi cập nhật nhà cung cấp:", err);
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi cập nhật nhà cung cấp." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Nhà cung cấp không tìm thấy." });
    }

    res.status(200).json({ message: "Cập nhật nhà cung cấp thành công!" });
  });
});
app.delete("/xoanhacungcap/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM nhacungcap WHERE manhacungcap = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Lỗi khi xóa khu vực kho:", err);
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi xóa khu vực kho." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Khu vực kho không tìm thấy." });
    }

    res.status(200).json({ message: "Xóa khu vực kho thành công!" });
  });
});
/// Phiếu nhập
app.get("/truyvanPagePhieuNhap/:masp", async (req, res) => {
  const { masp } = req.params;
  const query = `
        SELECT 
            sp.masp, 
            sp.tensp, 
            sp.hinhanh, 
            sp.xuatxu, 
            sp.thuonghieu, 
            sp.khuvuckho,
            psp.maphienbansp,
            psp.rom, 
            dlrom.kichthuocrom AS rom_kichthuoc, 
            psp.ram, 
            dlram.kichthuocram AS ram_kichthuoc, 
            psp.mausac, 
            ms.tenmau, 
            CONCAT(dlrom.kichthuocrom ,'-', dlram.kichthuocram ,'-', ms.tenmau) AS cauhinh, -- Format cấu hình
            psp.gianhap, 
            psp.giaxuat, 
            psp.soluongton
        FROM sanpham sp
        LEFT JOIN phienbansanpham psp ON sp.masp = psp.masp
        LEFT JOIN dungluongram dlram ON psp.ram = dlram.madlram
        LEFT JOIN dungluongrom dlrom ON psp.rom = dlrom.madlrom
        LEFT JOIN mausac ms ON psp.mausac = ms.mamau
        WHERE sp.masp = ? AND psp.trangthai = 1;
    `;
  try {
    db.query(query, [masp], (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Có lỗi xảy ra khi truy vấn dữ liệu." });
      }
      res.status(200).json({ success: true, data: results });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Có lỗi xảy ra." });
  }
});
/// Chi tiết Phiếu nhập
app.get("/chiTietPhieuNhap/:maphieunhap", async (req, res) => {
  const { maphieunhap } = req.params;
  const query = `
                 SELECT 
    p.maphieunhap,
    p.thoigian,
    ncc.tennhacungcap,
    ncc.diachi,
    nv.hoten AS nhanvien,
    nv.manv ma_nhanvien,
    p.tongtien,
    ctp.maphienbansp,
    ctp.soluong,
    ctp.dongia,
    sp.masp,
    sp.tensp,
    CONCAT(dlrom.kichthuocrom, '-', dlram.kichthuocram, '-', ms.tenmau) AS cauhinh,
    GROUP_CONCAT(cs.maimei ORDER BY cs.maimei) AS maimei_list -- Lấy danh sách tất cả mã IMEI
FROM 
    phieunhap p
JOIN 
    ctphieunhap ctp ON p.maphieunhap = ctp.maphieunhap
JOIN 
    phienbansanpham pb ON ctp.maphienbansp = pb.maphienbansp
JOIN 
    sanpham sp ON pb.masp = sp.masp
LEFT JOIN 
    dungluongram dlram ON pb.ram = dlram.madlram
LEFT JOIN 
    dungluongrom dlrom ON pb.rom = dlrom.madlrom
LEFT JOIN 
    mausac ms ON pb.mausac = ms.mamau
JOIN 
    nhacungcap ncc ON p.manhacungcap = ncc.manhacungcap
JOIN 
    nhanvien nv ON p.nguoitao = nv.manv
LEFT JOIN 
    ctsanpham cs ON cs.maphienbansp = ctp.maphienbansp AND cs.maphieunhap = p.maphieunhap -- Kết hợp với bảng ctsanpham để lấy tất cả mã IMEI trùng với mã phiếu nhập và mã phiên bản
WHERE 
    p.maphieunhap = ? -- Thay thế bằng mã phiếu nhập cần tìm
GROUP BY 
    p.maphieunhap, 
    p.thoigian, 
    ncc.tennhacungcap, 
    ncc.diachi,
    nv.hoten,
    nv.manv, 
    p.tongtien, 
    ctp.maphienbansp, 
    ctp.soluong, 
    ctp.dongia, 
    sp.masp, 
    sp.tensp, 
    dlrom.kichthuocrom, 
    dlram.kichthuocram, 
    ms.tenmau;
    `;
  try {
    db.query(query, [maphieunhap], (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Có lỗi xảy ra khi truy vấn dữ liệu." });
      }
      res.status(200).json({ success: true, data: results });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Có lỗi xảy ra." });
  }
});
app.post("/themPhieuNhapvsCtPhieuNhap", (req, res) => {
  const { manhacungcap, nguoitao, tongtien, ctPhieuNhap } = req.body;

  const phieunhapQuery = `
        INSERT INTO phieunhap (manhacungcap, nguoitao, tongtien) 
        VALUES (?, ?, ?)
    `;
  const phieuNhapValues = [manhacungcap, nguoitao, tongtien];

  db.query(phieunhapQuery, phieuNhapValues, (err, result) => {
    if (err) {
      console.error("Lỗi khi thêm phiếu nhập:", err.message);
      return res.status(500).json({ error: "Lỗi khi thêm phiếu nhập" });
    }

    // Lấy maphieunhap từ bảng phieunhap
    const getMapPhieuNhapQuery = `
        SELECT maphieunhap FROM phieunhap 
        WHERE manhacungcap = ? AND nguoitao = ? AND tongtien = ? 
        ORDER BY maphieunhap DESC LIMIT 1
    `;
    const getMapPhieuNhapValues = [manhacungcap, nguoitao, tongtien];

    db.query(getMapPhieuNhapQuery, getMapPhieuNhapValues, (err, rows) => {
      if (err) {
        console.error("Lỗi khi lấy maphieunhap:", err.message);
        return res.status(500).json({ error: "Lỗi khi lấy maphieunhap" });
      }

      const maphieunhap = rows[0]?.maphieunhap; // Lấy maphieunhap từ kết quả truy vấn

      // Bây giờ bạn có thể sử dụng maphieunhap để insert vào ctphieunhap
      if (ctPhieuNhap && ctPhieuNhap.length > 0) {
        const versionQueries = ctPhieuNhap.map((detail) => {
          const { maphienbansp, soluong, dongia, imei } = detail;

          return new Promise((resolve, reject) => {
            const versionQuery = `
                            INSERT INTO ctphieunhap (maphieunhap, maphienbansp, soluong, dongia) 
                            VALUES (?, ?, ?, ?)
                        `;
            const versionValues = [
              maphieunhap, // Sử dụng maphieunhap vừa lấy được
              maphienbansp,
              soluong,
              dongia,
            ];

            db.query(versionQuery, versionValues, (err) => {
              if (err) {
                console.error("Lỗi khi thêm chi tiết phiếu nhập:", err);
                return reject(err);
              }

              // Cập nhật số lượng trong bảng phienbansanpham
              const updateQuery = `
                  UPDATE phienbansanpham 
                  SET soluongton = soluongton + ? 
                  WHERE maphienbansp = ?
              `;
              const updateValues = [soluong, maphienbansp];

              db.query(updateQuery, updateValues, (err) => {
                if (err) {
                  console.error("Lỗi khi cập nhật số lượng:", err);
                  return reject(err);
                }
                console.log(
                  `Cập nhật thành công cho maphienbansp: ${maphienbansp}, số lượng: ${soluong}`
                );

                // Cập nhật số lượng tồn kho trong bảng sanpham
                const updateSanPhamQuery = `
                    UPDATE sanpham 
                    SET soluongton = soluongton + ? 
                    WHERE masp = (SELECT masp FROM phienbansanpham WHERE maphienbansp = ?)
                `;
                const updateSanPhamValues = [soluong, maphienbansp];

                db.query(updateSanPhamQuery, updateSanPhamValues, (err) => {
                  if (err) {
                    console.error("Lỗi khi cập nhật số lượng tồn kho:", err);
                    return reject(err);
                  }
                  console.log(
                    `Cập nhật số lượng tồn kho cho sản phẩm : ${maphienbansp}, số lượng: ${soluong}`
                  );

                  // Thêm mã IMEI vào bảng ctsanpham nếu có
                  if (imei) {
                    const imeiBase = imei.slice(0, -1); // Lấy phần mã IMEI mà không có số cuối
                    const imeiNumber = parseInt(imei.slice(-1)); // Lấy số cuối
                    const newImeis = [];

                    for (let i = 0; i < soluong; i++) {
                      newImeis.push(`${imeiBase}${imeiNumber + i}`); // Tạo mã IMEI mới
                    }

                    const imeiInsertQueries = newImeis.map((newImei) => {
                      return new Promise((res, rej) => {
                        const insertImeiQuery = `
                          INSERT INTO ctsanpham (maimei, maphienbansp, maphieunhap, tinhtrang) 
                          VALUES (?, ?, ?, ?)
                        `;
                        const insertImeiValues = [
                          newImei,
                          maphienbansp,
                          maphieunhap,
                          1,
                        ]; // Tình trạng là 1

                        db.query(insertImeiQuery, insertImeiValues, (err) => {
                          if (err) {
                            console.error(
                              "Lỗi khi thêm mã IMEI vào ctsanpham:",
                              err
                            );
                            console.log(
                              `Cập nhật số imei  cho sản phẩm : ${newImei}, mã phiên bản: ${maphienbansp}, mã phiếu nhập: ${maphieunhap}`
                            );
                            return rej(err);
                          }
                          res();
                        });
                      });
                    });

                    // Chờ tất cả các truy vấn chèn mã IMEI hoàn tất
                    Promise.all(imeiInsertQueries)
                      .then(() => {
                        resolve();
                      })
                      .catch((err) => {
                        console.error(
                          "Lỗi khi thêm mã IMEI vào ctsanpham:",
                          err
                        );
                        reject(err);
                      });
                  } else {
                    resolve(); // Nếu không có mã IMEI, chỉ cần resolve
                  }
                });
              });
            });
          });
        });

        // Chờ tất cả các truy vấn insert hoàn tất
        Promise.all(versionQueries)
          .then(() => {
            res.status(201).json({
              message:
                "Phiếu nhập và chi tiết phiếu nhập đã được thêm thành công",
            });
          })
          .catch((err) => {
            console.error("Lỗi khi thêm chi tiết phiếu nhập:", err);
            res.status(500).json({ error: "Lỗi khi thêm chi tiết phiếu nhập" });
          });
      } else {
        res.status(201).json({
          message: "Phiếu nhập đã được thêm thành công, không có chi tiết nào",
        });
      }
    });
  });
});
app.delete("/xoaPhieuNhap/:maphieunhap", (req, res) => {
  const maphieunhap = req.params.maphieunhap;

  // Bước 1: Lấy tất cả các chi tiết phiếu nhập liên quan
  const getDetailsQuery = `
      SELECT maphienbansp, soluong FROM ctphieunhap 
      WHERE maphieunhap = ?
  `;
  db.query(getDetailsQuery, [maphieunhap], (err, details) => {
    if (err) {
      console.error("Lỗi khi lấy chi tiết phiếu nhập:", err.message);
      return res.status(500).json({ error: "Lỗi khi lấy chi tiết phiếu nhập" });
    }

    // Bước 2: Xóa chi tiết phiếu nhập
    const deleteDetailsQuery = `
        DELETE FROM ctphieunhap 
        WHERE maphieunhap = ?
    `;
    db.query(deleteDetailsQuery, [maphieunhap], (err) => {
      if (err) {
        console.error("Lỗi khi xóa chi tiết phiếu nhập:", err.message);
        return res
          .status(500)
          .json({ error: "Lỗi khi xóa chi tiết phiếu nhập" });
      }

      // Bước 3: Cập nhật số lượng tồn kho trong bảng phienbansanpham và sanpham
      const updatePromises = details.map((detail) => {
        const { maphienbansp, soluong } = detail;

        return new Promise((resolve, reject) => {
          // Cập nhật số lượng trong bảng phienbansanpham
          const updatePhienBanQuery = `
              UPDATE phienbansanpham 
              SET soluongton = soluongton - ? 
              WHERE maphienbansp = ?
          `;
          db.query(updatePhienBanQuery, [soluong, maphienbansp], (err) => {
            if (err) {
              console.error(
                "Lỗi khi cập nhật số lượng trong phienbansanpham:",
                err
              );
              return reject(err);
            }

            // Cập nhật số lượng tồn kho trong bảng sanpham
            const updateSanPhamQuery = `
                UPDATE sanpham 
                SET soluongton = soluongton - ? 
                WHERE masp = (SELECT masp FROM phienbansanpham WHERE maphienbansp = ?)
            `;
            db.query(updateSanPhamQuery, [soluong, maphienbansp], (err) => {
              if (err) {
                console.error(
                  "Lỗi khi cập nhật số lượng tồn kho trong sanpham:",
                  err
                );
                return reject(err);
              }
              resolve();
            });
          });
        });
      });

      // Bước 4: Chờ tất cả các cập nhật hoàn tất
      Promise.all(updatePromises)
        .then(() => {
          // Bước 5: Xóa tất cả mã IMEI liên quan đến phiếu nhập
          const deleteImeiQuery = `
              DELETE FROM ctsanpham 
              WHERE maphieunhap = ?
          `;
          db.query(deleteImeiQuery, [maphieunhap], (err) => {
            if (err) {
              console.error("Lỗi khi xóa mã IMEI:", err.message);
              return res.status(500).json({ error: "Lỗi khi xóa mã IMEI" });
            }

            // Bước 6: Xóa phiếu nhập
            const deletePhieuNhapQuery = `
                DELETE FROM phieunhap 
                WHERE maphieunhap = ?
            `;
            db.query(deletePhieuNhapQuery, [maphieunhap], (err) => {
              if (err) {
                console.error("Lỗi khi xóa phiếu nhập:", err.message);
                return res
                  .status(500)
                  .json({ error: "Lỗi khi xóa phiếu nhập" });
              }

              res.status(200).json({
                message: "Phiếu nhập và tất cả chi tiết đã được xóa thành công",
              });
            });
          });
        })
        .catch((err) => {
          console.error("Lỗi khi cập nhật số lượng tồn kho :", err.message);
          res.status(500).json({ error: "Lỗi khi cập nhật số lượng tồn kho" });
        });
    });
  });
});
app.get("/checkImei/:imei", (req, res) => {
  const { imei } = req.params;
  const query = `
    SELECT COUNT(*) AS count FROM ctsanpham WHERE maimei = ?
  `;

  db.query(query, [imei], (error, results) => {
    if (error) {
      console.error("Error checking IMEI:", error);
      return res.status(500).json({ message: "Có lỗi xảy ra." });
    }

    const exists = results[0].count > 0;
    res.status(200).json({ exists });
  });
});

/// Phiếu xuất
app.get("/truyvanPagePhieuXuat/:masp", async (req, res) => {
  const { masp } = req.params;
  const query = `
        SELECT 
            sp.masp, 
            sp.tensp, 
            sp.hinhanh, 
            psp.maphienbansp,
            psp.rom, 
            dlrom.kichthuocrom AS rom_kichthuoc, 
            psp.ram, 
            dlram.kichthuocram AS ram_kichthuoc, 
            psp.mausac, 
            ms.tenmau, 
            CONCAT(dlrom.kichthuocrom ,'-', dlram.kichthuocram ,'-', ms.tenmau) AS cauhinh, -- Format cấu hình
            psp.giaxuat, 
            psp.soluongton
        FROM sanpham sp
        LEFT JOIN phienbansanpham psp ON sp.masp = psp.masp
        LEFT JOIN dungluongram dlram ON psp.ram = dlram.madlram
        LEFT JOIN dungluongrom dlrom ON psp.rom = dlrom.madlrom
        LEFT JOIN mausac ms ON psp.mausac = ms.mamau
        WHERE sp.masp = ? AND psp.trangthai = 1;
    `;
  try {
    db.query(query, [masp], (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Có lỗi xảy ra khi truy vấn dữ liệu." });
      }
      res.status(200).json({ success: true, data: results });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Có lỗi xảy ra." });
  }
});
app.get("/truyvanPagePhieuXuatKho/:masp", async (req, res) => {
  const { masp } = req.params;
  const query = `
        SELECT 
            sp.masp, 
            sp.tensp, 
            kk.tenkhuvuc AS khuvuckho, -- Lấy tên khu vực kho từ bảng khuvuckho
            psp.maphienbansp,
            psp.rom, 
            dlrom.kichthuocrom AS rom_kichthuoc, 
            psp.ram, 
            dlram.kichthuocram AS ram_kichthuoc, 
            psp.mausac, 
            ms.tenmau, 
            CONCAT(dlrom.kichthuocrom ,'-', dlram.kichthuocram ,'-', ms.tenmau) AS cauhinh, -- Format cấu hình
            psp.giaxuat, 
            psp.soluongton
        FROM sanpham sp
        LEFT JOIN phienbansanpham psp ON sp.masp = psp.masp
        LEFT JOIN dungluongram dlram ON psp.ram = dlram.madlram
        LEFT JOIN dungluongrom dlrom ON psp.rom = dlrom.madlrom
        LEFT JOIN mausac ms ON psp.mausac = ms.mamau
        LEFT JOIN khuvuckho kk ON sp.khuvuckho = kk.makhuvuc -- Thêm JOIN với bảng khuvuckho

        WHERE sp.masp = "SP001" AND psp.trangthai = 1;
    `;
  try {
    db.query(query, [masp], (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Có lỗi xảy ra khi truy vấn dữ liệu." });
      }
      res.status(200).json({ success: true, data: results });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Có lỗi xảy ra." });
  }
});
app.get("/getImeiByVersion/:maphienbansp", async (req, res) => {
  const { maphienbansp } = req.params;
  const query = `
        SELECT maimei FROM ctsanpham WHERE maphienbansp = ? AND tinhtrang =1;
    `;
  try {
    db.query(query, [maphienbansp], (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Có lỗi xảy ra khi truy vấn dữ liệu." });
      }
      res.status(200).json({ success: true, data: results });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Có lỗi xảy ra." });
  }
});

app.post("/themPhieuXuat", (req, res) => {
  const { khachhang, nguoitaophieuxuat, tongtien, ctPhieuXuat } = req.body;

  const phieunhapQuery = `
        INSERT INTO phieuxuat (makh, nguoitaophieuxuat, tongtien) 
        VALUES (?, ?, ?)
    `;
  const phieuNhapValues = [khachhang, nguoitaophieuxuat, tongtien];

  db.query(phieunhapQuery, phieuNhapValues, (err, result) => {
    if (err) {
      console.error("Lỗi khi thêm phiếu nhập:", err.message);
      return res.status(500).json({ error: "Lỗi khi thêm phiếu nhập" });
    }

    // Lấy maphieunhap từ bảng phieunhap
    const getMapPhieuNhapQuery = `
        SELECT maphieuxuat FROM phieuxuat 
        WHERE makh = ? AND nguoitaophieuxuat = ? AND tongtien = ? 
        ORDER BY maphieuxuat DESC LIMIT 1
    `;
    const getMapPhieuNhapValues = [khachhang, nguoitaophieuxuat, tongtien];

    db.query(getMapPhieuNhapQuery, getMapPhieuNhapValues, (err, rows) => {
      if (err) {
        console.error("Lỗi khi lấy maphieuxuat:", err.message);
        return res.status(500).json({ error: "Lỗi khi lấy maphieuxuat" });
      }

      const maphieuxuat = rows[0]?.maphieuxuat; // Lấy maphieunhap từ kết quả truy vấn

      // Bây giờ bạn có thể sử dụng maphieunhap để insert vào ctphieunhap
      if (ctPhieuXuat && ctPhieuXuat.length > 0) {
        const versionQueries = ctPhieuXuat.map((detail) => {
          const { maphienbansp, soluong, dongia, imei } = detail;

          return new Promise((resolve, reject) => {
            const versionQuery = `
                            INSERT INTO ctphieuxuat (maphieuxuat, maphienbansp, soluong, dongia) 
                            VALUES (?, ?, ?, ?)
                        `;
            const versionValues = [
              maphieuxuat, // Sử dụng maphieunhap vừa lấy được
              maphienbansp,
              soluong,
              dongia,
            ];

            db.query(versionQuery, versionValues, (err) => {
              if (err) {
                console.error("Lỗi khi thêm chi tiết phiếu nhập:", err);
                return reject(err);
              }

              // Cập nhật số lượng trong bảng phienbansanpham
              const updateQuery = `
                  UPDATE phienbansanpham 
                  SET soluongton = soluongton - ? 
                  WHERE maphienbansp = ?
              `;
              const updateValues = [soluong, maphienbansp];

              db.query(updateQuery, updateValues, (err) => {
                if (err) {
                  console.error("Lỗi khi cập nhật số lượng:", err);
                  return reject(err);
                }
                console.log(
                  `Cập nhật thành công cho maphienbansp: ${maphienbansp}, số lượng: ${soluong}`
                );

                // Cập nhật số lượng tồn kho trong bảng sanpham
                const updateSanPhamQuery = `
                    UPDATE sanpham 
                    SET soluongton = soluongton - ? 
                    WHERE masp = (SELECT masp FROM phienbansanpham WHERE maphienbansp = ?)
                `;
                const updateSanPhamValues = [soluong, maphienbansp];

                db.query(updateSanPhamQuery, updateSanPhamValues, (err) => {
                  if (err) {
                    console.error("Lỗi khi cập nhật số lượng tồn kho:", err);
                    return reject(err);
                  }
                  console.log(
                    `Cập nhật số lượng tồn kho cho sản phẩm : ${maphienbansp}, số lượng: ${soluong}`
                  );

                  // Cập nhật tình trạng và chèn maphieuxuat vào bảng ctsanpham
                  if (imei && Array.isArray(imei)) {
                    const imeiUpdateQueries = imei.map((selectedImei) => {
                      return new Promise((res, rej) => {
                        const updateImeiQuery = `
                          UPDATE ctsanpham 
                          SET maphieuxuat = ?, tinhtrang = 0 
                          WHERE maimei = ?
                        `;
                        const updateImeiValues = [maphieuxuat, selectedImei];

                        db.query(updateImeiQuery, updateImeiValues, (err) => {
                          if (err) {
                            console.error(
                              "Lỗi khi cập nhật mã IMEI trong ctsanpham:",
                              err
                            );
                            return rej(err);
                          }
                          res();
                        });
                      });
                    });

                    // Chờ tất cả các truy vấn cập nhật mã IMEI hoàn tất
                    Promise.all(imeiUpdateQueries)
                      .then(() => {
                        resolve();
                      })
                      .catch((err) => {
                        console.error(
                          "Lỗi khi cập nhật mã IMEI trong ctsanpham:",
                          err
                        );
                        reject(err);
                      });
                  } else {
                    resolve(); // Nếu không có mã IMEI, chỉ cần resolve
                  }
                });
              });
            });
          });
        });
        // Chờ tất cả các truy vấn insert hoàn tất
        Promise.all(versionQueries)
          .then(() => {
            res.status(201).json({
              message:
                "Phiếu xuất và chi tiết phiếu xuất đã được thêm thành công",
            });
          })
          .catch((err) => {
            console.error("Lỗi khi thêm chi tiết phiếu xuất:", err);
            res.status(500).json({ error: "Lỗi khi thêm chi tiết phiếu xuất" });
          });
      } else {
        res.status(201).json({
          message: "Phiếu xuất đã được thêm thành công, không có chi tiết nào",
        });
      }
    });
  });
});
/// Chi tiết Phiếu Xuất
app.get("/chiTietPhieuXuat/:maphieuxuat", async (req, res) => {
  const { maphieuxuat } = req.params;
  const query = `
                  SELECT 
    p.maphieuxuat,
    p.thoigian,
    ncc.tenkhachhang,
    ncc.diachi,
    nv.hoten AS nhanvien,
    nv.manv ma_nhanvien,
    p.tongtien,
    ctp.maphienbansp,
    ctp.soluong,
    ctp.dongia,
    sp.masp,
    sp.tensp,
    CONCAT(dlrom.kichthuocrom, '-', dlram.kichthuocram, '-', ms.tenmau) AS cauhinh,
    GROUP_CONCAT(cs.maimei ORDER BY cs.maimei) AS maimei_list -- Lấy danh sách tất cả mã IMEI
FROM 
    phieuxuat p
JOIN 
    ctphieuxuat ctp ON p.maphieuxuat = ctp.maphieuxuat
JOIN 
    phienbansanpham pb ON ctp.maphienbansp = pb.maphienbansp
JOIN 
    sanpham sp ON pb.masp = sp.masp
LEFT JOIN 
    dungluongram dlram ON pb.ram = dlram.madlram
LEFT JOIN 
    dungluongrom dlrom ON pb.rom = dlrom.madlrom
LEFT JOIN 
    mausac ms ON pb.mausac = ms.mamau
JOIN 
    khachhang ncc ON p.makh = ncc.makh
JOIN 
    nhanvien nv ON p.nguoitaophieuxuat = nv.manv
LEFT JOIN 
    ctsanpham cs ON cs.maphienbansp = ctp.maphienbansp AND cs.maphieuxuat = p.maphieuxuat -- Kết hợp với bảng ctsanpham để lấy tất cả mã IMEI trùng với mã phiếu nhập và mã phiên bản
WHERE 
    p.maphieuxuat = ? -- Thay thế bằng mã phiếu nhập cần tìm
GROUP BY 
    p.maphieuxuat, 
    p.thoigian, 
    ncc.tenkhachhang, 
    ncc.diachi,
    nv.hoten,
    nv.manv, 
    p.tongtien, 
    ctp.maphienbansp, 
    ctp.soluong, 
    ctp.dongia, 
    sp.masp, 
    sp.tensp, 
    dlrom.kichthuocrom, 
    dlram.kichthuocram, 
    ms.tenmau;
    `;
  try {
    db.query(query, [maphieuxuat], (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Có lỗi xảy ra khi truy vấn dữ liệu." });
      }
      res.status(200).json({ success: true, data: results });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Có lỗi xảy ra." });
  }
});
app.delete("/xoaPhieuXuat/:maphieuxuat", (req, res) => {
  const maphieuxuat = req.params.maphieuxuat;

  // Bước 1: Lấy tất cả các chi tiết phiếu nhập liên quan
  const getDetailsQuery = `
      SELECT maphienbansp, soluong FROM ctphieuxuat
      WHERE maphieuxuat = ?
  `;
  db.query(getDetailsQuery, [maphieuxuat], (err, details) => {
    if (err) {
      console.error("Lỗi khi lấy chi tiết phiếu xuất:", err.message);
      return res.status(500).json({ error: "Lỗi khi lấy chi tiết phiếu xuất" });
    }

    // Bước 2: Xóa chi tiết phiếu nhập
    const deleteDetailsQuery = `
        DELETE FROM ctphieuxuat 
        WHERE maphieuxuat = ?
    `;
    db.query(deleteDetailsQuery, [maphieuxuat], (err) => {
      if (err) {
        console.error("Lỗi khi xóa chi tiết phiếu xuất:", err.message);
        return res
          .status(500)
          .json({ error: "Lỗi khi xóa chi tiết phiếu xuất" });
      }

      // Bước 3: Cập nhật số lượng tồn kho trong bảng phienbansanpham và sanpham
      const updatePromises = details.map((detail) => {
        const { maphienbansp, soluong } = detail;

        return new Promise((resolve, reject) => {
          // Cập nhật số lượng trong bảng phienbansanpham
          const updatePhienBanQuery = `
              UPDATE phienbansanpham 
              SET soluongton = soluongton + ? 
              WHERE maphienbansp = ?
          `;
          db.query(updatePhienBanQuery, [soluong, maphienbansp], (err) => {
            if (err) {
              console.error(
                "Lỗi khi cập nhật số lượng trong phienbansanpham:",
                err
              );
              return reject(err);
            }

            // Cập nhật số lượng tồn kho trong bảng sanpham
            const updateSanPhamQuery = `
                UPDATE sanpham 
                SET soluongton = soluongton + ? 
                WHERE masp = (SELECT masp FROM phienbansanpham WHERE maphienbansp = ?)
            `;
            db.query(updateSanPhamQuery, [soluong, maphienbansp], (err) => {
              if (err) {
                console.error(
                  "Lỗi khi cập nhật số lượng tồn kho trong sanpham:",
                  err
                );
                return reject(err);
              }
              resolve();
            });
          });
        });
      });

      // Bước 4: Chờ tất cả các cập nhật hoàn tất
      Promise.all(updatePromises)
        .then(() => {
          // Bước 5: Xóa tất cả mã IMEI liên quan đến phiếu nhập
          const deleteImeiQuery = `
              UPDATE ctsanpham 
              SET maphieuxuat = NULL, tinhtrang = 1 
              WHERE maphieuxuat = ?
          `;
          db.query(deleteImeiQuery, [maphieuxuat], (err) => {
            if (err) {
              console.error("Lỗi khi xóa mã IMEI:", err.message);
              return res.status(500).json({ error: "Lỗi khi xóa mã IMEI" });
            }

            // Bước 6: Xóa phiếu nhập
            const deletePhieuNhapQuery = `
                DELETE FROM phieuxuat 
                WHERE maphieuxuat = ?
            `;
            db.query(deletePhieuNhapQuery, [maphieuxuat], (err) => {
              if (err) {
                console.error("Lỗi khi xóa phiếu nhập:", err.message);
                return res
                  .status(500)
                  .json({ error: "Lỗi khi xóa phiếu nhập" });
              }

              res.status(200).json({
                message: "Phiếu nhập và tất cả chi tiết đã được xóa thành công",
              });
            });
          });
        })
        .catch((err) => {
          console.error("Lỗi khi cập nhật số lượng tồn kho :", err.message);
          res.status(500).json({ error: "Lỗi khi cập nhật số lượng tồn kho" });
        });
    });
  });
});
//Thuộc tính
// API lấy danh sách thuộc tính
app.get("/thuoctinh", (req, res) => {
  const query = 'SELECT * FROM danhmucchucnang WHERE machucnang = "thuoctinh"';
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
});

// Lấy tất cả các thương hiệu
app.get("/thuonghieu-tt", (req, res) => {
  const query = "SELECT * FROM thuonghieu WHERE trangthai = 1";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Có lỗi xảy ra khi lấy dữ liệu" });
    } else {
      res.json(results);
    }
  });
});

//Thuộc tính - Thương hiệu - add
app.post("/thuonghieu-tt", (req, res) => {
  const { tenthuonghieu } = req.body;
  // Tạo mã thương hiệu tự động, có thể dùng một hàm tạo mã tùy chỉnh
  const query =
    "INSERT INTO thuonghieu (tenthuonghieu, trangthai) VALUES (?, 1)";

  db.query(query, [tenthuonghieu], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Có lỗi xảy ra khi thêm thương hiệu" });
    } else {
      // Lấy mã thương hiệu vừa thêm vào từ `LAST_INSERT_ID()`
      const insertId = results.insertId;
      res.status(201).json({
        message: "Thêm thương hiệu thành công",
        id: insertId,
        mathuonghieu: insertId,
      });
    }
  });
});

//Thuộc tính - Thương hiệu - up
app.put("/thuonghieu-tt/:id", (req, res) => {
  const { id } = req.params;
  const { tenthuonghieu } = req.body;
  const query =
    "UPDATE thuonghieu SET tenthuonghieu = ? WHERE mathuonghieu = ?";
  db.query(query, [tenthuonghieu, id], (err) => {
    if (err) {
      res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật thương hiệu" });
    } else {
      res.json({ message: "Cập nhật thương hiệu thành công" });
    }
  });
});

//Thuộc tính - Thương hiệu - del
app.delete("/thuonghieu-tt/:id", (req, res) => {
  const { id } = req.params;
  const query = "UPDATE thuonghieu SET trangthai = 0 WHERE mathuonghieu = ?";
  db.query(query, [id], (err) => {
    if (err) {
      res.status(500).json({ error: "Có lỗi xảy ra khi xóa thương hiệu" });
    } else {
      res.json({ message: "Xóa thương hiệu thành công" });
    }
  });
});

app.get("/xuatxu-tt", (req, res) => {
  const sql = "SELECT * FROM xuatxu WHERE trangthai = 1";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Thêm mới xuất xứ
app.post("/xuatxu-tt", (req, res) => {
  const { tenxuatxu } = req.body;

  // Tạo mã xuất xứ tự động, có thể dùng một hàm tạo mã tùy chỉnh
  const query = "INSERT INTO xuatxu (tenxuatxu, trangthai) VALUES (?, 1)";

  db.query(query, [tenxuatxu], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Có lỗi xảy ra khi thêm xuất xứ" });
    } else {
      // Lấy mã xuất xứ vừa thêm vào từ `LAST_INSERT_ID()`
      const insertId = results.insertId;
      res.status(201).json({
        message: "Thêm xuất xứ thành công",
        id: insertId,
        maxuatxu: insertId,
      });
    }
  });
});

// Cập nhật xuất xứ
app.put("/xuatxu-tt/:maxuatxu", async (req, res) => {
  const { maxuatxu } = req.params;
  const { tenxuatxu, trangthai } = req.body;
  const sql =
    "UPDATE xuatxu SET tenxuatxu = ?, trangthai = ? WHERE maxuatxu = ?";
  db.query(sql, [tenxuatxu, trangthai, maxuatxu], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Cập nhật xuất xứ thành công!" });
  });
});

// Xóa xuất xứ
app.delete("/xuatxu-tt/:maxuatxu", async (req, res) => {
  const { maxuatxu } = req.params;
  const sql = "DELETE FROM xuatxu WHERE maxuatxu = ?";
  db.query(sql, [maxuatxu], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Xóa xuất xứ thành công!" });
  });
});

// Lấy tất cả hệ điều hành
app.get("/hedieuhanh-tt", (req, res) => {
  const sql = "SELECT * FROM hedieuhanh WHERE trangthai = 1";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Thêm hệ điều hành
app.post("/hedieuhanh-tt", (req, res) => {
  const { tenhedieuhanh } = req.body;
  db.query(
    "INSERT INTO hedieuhanh (tenhedieuhanh, trangthai) VALUES (?, 1)",
    [tenhedieuhanh],
    (err, results) => {
      if (err) {
        res.status(500).send({ error: "Có lỗi xảy ra khi thêm hệ điều hành" });
      } else {
        res.json({ id: results.insertId });
      }
    }
  );
});

// Cập nhật hệ điều hành
app.put("/hedieuhanh-tt/:mahedieuhanh", (req, res) => {
  const { mahedieuhanh } = req.params;
  const { tenhedieuhanh } = req.body;
  db.query(
    "UPDATE hedieuhanh SET tenhedieuhanh = ? WHERE mahedieuhanh = ?",
    [tenhedieuhanh, mahedieuhanh],
    (err) => {
      if (err) {
        res
          .status(500)
          .send({ error: "Có lỗi xảy ra khi cập nhật hệ điều hành" });
      } else {
        res.send({ message: "Cập nhật hệ điều hành thành công" });
      }
    }
  );
});

// Xóa hệ điều hành
app.delete("/hedieuhanh-tt/:mahedieuhanh", (req, res) => {
  const { mahedieuhanh } = req.params;
  db.query(
    "DELETE FROM hedieuhanh WHERE mahedieuhanh = ?",
    [mahedieuhanh],
    (err) => {
      if (err) {
        res.status(500).send({ error: "Có lỗi xảy ra khi xóa hệ điều hành" });
      } else {
        res.send({ message: "Xóa hệ điều hành thành công" });
      }
    }
  );
});
// GET tất cả RAM
app.get("/ram-tt", (req, res) => {
  db.query("SELECT * FROM dungluongram WHERE trangthai = 1", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Có lỗi xảy ra" });
    } else {
      res.json(results);
    }
  });
});

// POST thêm RAM
app.post("/ram-tt", (req, res) => {
  const { kichthuocram } = req.body;
  db.query(
    "INSERT INTO dungluongram (kichthuocram, trangthai) VALUES (?, 1)",
    [kichthuocram],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Có lỗi xảy ra" });
      } else {
        res.json({ id: result.insertId });
      }
    }
  );
});

// PUT cập nhật RAM
app.put("/ram-tt/:id", (req, res) => {
  const { id } = req.params;
  const { kichthuocram } = req.body;
  db.query(
    "UPDATE dungluongram SET kichthuocram = ? WHERE madlram = ?",
    [kichthuocram, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: "Có lỗi xảy ra" });
      } else {
        res.json({ success: true });
      }
    }
  );
});

// DELETE xóa RAM
app.delete("/ram-tt/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE dungluongram SET trangthai = 0 WHERE madlram = ?",
    [id],
    (err) => {
      if (err) {
        res.status(500).json({ error: "Có lỗi xảy ra" });
      } else {
        res.json({ success: true });
      }
    }
  );
});

// Lấy danh sách ROM
app.get("/rom-tt", (req, res) => {
  db.query("SELECT * FROM dungluongrom WHERE trangthai = 1", (err, results) => {
    if (err) {
      res.status(500).send({ error: "Có lỗi xảy ra khi lấy dữ liệu ROM" });
    } else {
      res.json(results);
    }
  });
});

// Thêm ROM
app.post("/rom-tt", (req, res) => {
  const { kichthuocrom } = req.body;
  db.query(
    "INSERT INTO dungluongrom (kichthuocrom) VALUES (?)",
    [kichthuocrom],
    (err, results) => {
      if (err) {
        res.status(500).send({ error: "Có lỗi xảy ra khi thêm ROM" });
      } else {
        res.json({ id: results.insertId });
      }
    }
  );
});

// Cập nhật ROM
app.put("/rom-tt/:id", (req, res) => {
  const { id } = req.params;
  const { kichthuocrom } = req.body;
  db.query(
    "UPDATE dungluongrom SET kichthuocrom = ? WHERE madlrom = ?",
    [kichthuocrom, id],
    (err) => {
      if (err) {
        res.status(500).send({ error: "Có lỗi xảy ra khi cập nhật ROM" });
      } else {
        res.send({ message: "Cập nhật ROM thành công" });
      }
    }
  );
});

// Xóa ROM
app.delete("/rom-tt/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM dungluongrom WHERE madlrom = ?", [id], (err) => {
    if (err) {
      res.status(500).send({ error: "Có lỗi xảy ra khi xóa ROM" });
    } else {
      res.send({ message: "Xóa ROM thành công" });
    }
  });
});

// Lấy danh sách màu sắc
app.get("/mausac-tt", (req, res) => {
  db.query("SELECT * FROM mausac WHERE trangthai = 1", (err, results) => {
    if (err) {
      res.status(500).send({ error: "Có lỗi xảy ra khi lấy dữ liệu màu sắc" });
    } else {
      res.json(results);
    }
  });
});

// Thêm màu sắc
app.post("/mausac-tt", (req, res) => {
  const { tenmau } = req.body;
  db.query(
    "INSERT INTO mausac (tenmau) VALUES (?)",
    [tenmau],
    (err, results) => {
      if (err) {
        res.status(500).send({ error: "Có lỗi xảy ra khi thêm màu sắc" });
      } else {
        res.json({ id: results.insertId });
      }
    }
  );
});

// Cập nhật màu sắc
app.put("/mausac-tt/:id", (req, res) => {
  const { id } = req.params;
  const { tenmau } = req.body;
  db.query(
    "UPDATE mausac SET tenmau = ? WHERE mamau = ?",
    [tenmau, id],
    (err) => {
      if (err) {
        res.status(500).send({ error: "Có lỗi xảy ra khi cập nhật màu sắc" });
      } else {
        res.send({ message: "Cập nhật màu sắc thành công" });
      }
    }
  );
});

// Xóa màu sắc
app.delete("/mausac-tt/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM mausac WHERE mamau = ?", [id], (err) => {
    if (err) {
      res.status(500).send({ error: "Có lỗi xảy ra khi xóa màu sắc" });
    } else {
      res.send({ message: "Xóa màu sắc thành công" });
    }
  });
});
//Nhân viên
app.post("/themNhanVien", (req, res) => {
  const { hoten, email, sdt, gioitinh, ngaysinh } = req.body;

  // Kiểm tra dữ liệu
  if (!hoten || !email || !sdt || !gioitinh || !ngaysinh) {
    return res.status(400).json({ message: "Tất cả các trường là bắt buộc." });
  }

  const query =
    "INSERT INTO nhanvien (hoten, email, sdt, gioitinh, ngaysinh,trangthai) VALUES (?, ?, ?, ?, ?,1)";
  db.query(query, [hoten, email, sdt, gioitinh, ngaysinh], (err, result) => {
    if (err) {
      console.error("Lỗi khi thêm nhân viên:", err);
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi thêm nhân viên." });
    }

    res
      .status(201)
      .json({ message: "Thêm nhân viên thành công!", id: result.insertId });
  });
});
app.put("/suaNhanVien/:manv", (req, res) => {
  const manv = req.params.manv;
  const { hoten, email, sdt, gioitinh, ngaysinh } = req.body;

  // Cập nhật thông tin nhân viên trong bảng nhân viên
  const sql = `UPDATE nhanvien SET hoten = ?, email = ?, sdt = ?, gioitinh = ?, ngaysinh = ? WHERE manv = ?`;

  db.query(
    sql,
    [hoten, email, sdt, gioitinh, ngaysinh, manv],
    (error, results) => {
      if (error) {
        console.error("Error updating employee:", error);
        return res
          .status(500)
          .json({ message: "Có lỗi xảy ra khi cập nhật nhân viên", error });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Không tìm thấy nhân viên" });
      }

      // Trả về phản hồi có nội dung xác nhận cập nhật thành công
      res.status(200).json({ message: "Cập nhật thành công" });
    }
  );
});
app.get("/nhanvienId/:manv", (req, res) => {
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
app.delete("/xoaNhanVien/:manv", (req, res) => {
  const manv = req.params.manv;
  const query = "DELETE FROM nhanvien WHERE manv = ?";
  db.query(query, [manv], (error, results) => {
    if (error) {
      res.status(500).send("Lỗi khi xóa nhân viên ");
    } else if (results.affectedRows === 0) {
      res.status(404).send("Không tìm thấy nhân viên");
    } else {
      res.status(200).send("Xóa nhân viên thành công");
    }
  });
});
// app.post("/chuyenkho", async (req, res) => {
//   const { khoCu, khoMoi, products } = req.body;

//   try {
//     for (const product of products) {
//       const { masp, soluong } = product;

//       // Giảm số lượng trong kho cũ
//       await db.query(
//         `UPDATE sanpham SET soluongton = soluongton - ? WHERE masp = ? `,
//         [soluong, masp]
//       );

//       // Tạo bản sao sản phẩm trong kho mới
//       const [existingProduct] = await db.query(
//         `SELECT * FROM sanpham WHERE masp = ?`,
//         [masp]
//       );

//       if (existingProduct.length > 0) {
//         const newProduct = {
//           masp: existingProduct[0].masp, // Giữ nguyên mã sản phẩm
//           tensp: existingProduct[0].tensp,
//           hinhanh: existingProduct[0].hinhanh,
//           xuatxu: existingProduct[0].xuatxu,
//           chipxuly: existingProduct[0].chipxuly,
//           dungluongpin: existingProduct[0].dungluongpin,
//           kichthuocman: existingProduct[0].kichthuocman,
//           hedieuhanh: existingProduct[0].hedieuhanh,
//           phienbanhdh: existingProduct[0].phienbanhdh,
//           camerasau: existingProduct[0].camerasau,
//           cameratruoc: existingProduct[0].cameratruoc,
//           thoigianbaohanh: existingProduct[0].thoigianbaohanh,
//           thuonghieu: existingProduct[0].thuonghieu,
//           khuvuckho: khoMoi, // Cập nhật khu vực kho mới
//           soluongton: soluong, // Số lượng mới
//           trangthai: existingProduct[0].trangthai,
//         };

//         await db.query(
//           `INSERT INTO sanpham (masp, tensp, hinhanh, xuatxu, chipxuly, dungluongpin, kichthuocman, hedieuhanh, phienbanhdh, camerasau, cameratruoc, thoigianbaohanh, thuonghieu, khuvuckho, soluongton, trangthai) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//           [
//             newProduct.masp,
//             newProduct.tensp,
//             newProduct.hinhanh,
//             newProduct.xuatxu,
//             newProduct.chipxuly,
//             newProduct.dungluongpin,
//             newProduct.kichthuocman,
//             newProduct.hedieuhanh,
//             newProduct.phienbanhdh,
//             newProduct.camerasau,
//             newProduct.cameratruoc,
//             newProduct.thoigianbaohanh,
//             newProduct.thuonghieu,
//             newProduct.khuvuckho,
//             newProduct.soluongton,
//             newProduct.trangthai,
//           ]
//         );
//       }
//     }

//     res.status(200).json({ success: true, message: "Chuyển kho thành công" });
//   } catch (error) {
//     console.error("Error during kho transfer:", error);
//     res.status(500).json({ success: false, message: "Có lỗi xảy ra" });
//   }
// });
// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
