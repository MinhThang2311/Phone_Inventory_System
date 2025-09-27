const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

// Import database connection
const db = require("./config/database");

// Import routes
const productsRoutes = require("./routes/products");
const warehouseRoutes = require("./routes/warehouse");
const customersRoutes = require("./routes/customers");
const employeesRoutes = require("./routes/employees");
const suppliersRoutes = require("./routes/suppliers");
const accountsRoutes = require("./routes/accounts");
const lookupsRoutes = require("./routes/lookups");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/sanpham", productsRoutes);
app.use("/api/warehouse", warehouseRoutes);
app.use("/api/khachhang", customersRoutes);
app.use("/api/nhanvien", employeesRoutes);
app.use("/api/nhacungcap", suppliersRoutes);
app.use("/api/auth", accountsRoutes);
app.use("/api/lookups", lookupsRoutes);

// Legacy routes for backward compatibility
// These will map old endpoints to new route structure

// Product routes compatibility
app.get("/sanpham", (req, res) => req.url = "/api/sanpham" && productsRoutes(req, res));
app.get("/sanpham/:id", (req, res) => {
  req.url = `/${req.params.id}`;
  productsRoutes(req, res);
});
app.get("/phienbansanpham/:masp", (req, res) => {
  req.url = `/phienban/${req.params.masp}`;
  productsRoutes(req, res);
});
app.post("/themsanphamvoiphienban", (req, res) => {
  req.url = "/themsanphamvoiphienban";
  productsRoutes(req, res);
});
app.put("/capnhatsanpham/:id", (req, res) => {
  req.url = `/capnhat/${req.params.id}`;
  productsRoutes(req, res);
});
app.delete("/sanpham/:id", (req, res) => {
  req.url = `/${req.params.id}`;
  productsRoutes(req, res);
});
app.get("/sanphamcount", (req, res) => {
  req.url = "/count/total";
  productsRoutes(req, res);
});
app.get("/sanphamtheokhuvuc", (req, res) => {
  const khuvuc = req.query.khuvuc;
  req.url = `/theo-khu-vuc/${khuvuc}`;
  productsRoutes(req, res);
});

// Warehouse routes compatibility  
app.get("/khuvuckho", (req, res) => {
  req.url = "/khuvuckho";
  warehouseRoutes(req, res);
});
app.get("/khuvuckho/:id", (req, res) => {
  req.url = `/khuvuckho/${req.params.id}`;
  warehouseRoutes(req, res);
});
app.get("/timkiemkhuvuckho", (req, res) => {
  req.url = "/khuvuckho/timkiem";
  warehouseRoutes(req, res);
});
app.post("/themkhuvuckho", (req, res) => {
  req.url = "/khuvuckho";
  warehouseRoutes(req, res);
});
app.put("/khuvuckho/:id", (req, res) => {
  req.url = `/khuvuckho/${req.params.id}`;
  warehouseRoutes(req, res);
});
app.delete("/xoakhuvuckho/:id", (req, res) => {
  req.url = `/khuvuckho/${req.params.id}`;
  warehouseRoutes(req, res);
});
app.get("/phieunhap", (req, res) => {
  req.url = "/phieunhap";
  warehouseRoutes(req, res);
});
app.get("/phieuxuat", (req, res) => {
  req.url = "/phieuxuat";
  warehouseRoutes(req, res);
});
app.get("/tonkho/sanpham-thang", (req, res) => {
  req.url = "/tonkho/sanpham-thang";
  warehouseRoutes(req, res);
});
app.get("/tonkho/phieunhap-thang", (req, res) => {
  req.url = "/tonkho/phieunhap-thang";
  warehouseRoutes(req, res);
});
app.get("/tonkho/phieuxuat-ky", (req, res) => {
  req.url = "/tonkho/phieuxuat-ky";
  warehouseRoutes(req, res);
});
app.get("/tonkho/sanpham-con-trong-kho", (req, res) => {
  req.url = "/tonkho/sanpham-con-trong-kho";
  warehouseRoutes(req, res);
});
app.get("/tonkho", (req, res) => {
  req.url = "/tonkho";
  warehouseRoutes(req, res);
});

// Customer routes compatibility
app.get("/khachhang", (req, res) => {
  req.url = "/";
  customersRoutes(req, res);
});
app.get("/khachhang/:makh", (req, res) => {
  req.url = `/${req.params.makh}`;
  customersRoutes(req, res);
});
app.post("/addkhachhang", (req, res) => {
  req.url = "/";
  customersRoutes(req, res);
});
app.put("/khachhang/:makh", (req, res) => {
  req.url = `/${req.params.makh}`;
  customersRoutes(req, res);
});
app.delete("/xoakhachhang/:makh", (req, res) => {
  req.url = `/${req.params.makh}`;
  customersRoutes(req, res);
});
app.get("/khachhangcount", (req, res) => {
  req.url = "/count/total";
  customersRoutes(req, res);
});
app.get("/khachhangdata", (req, res) => {
  req.url = "/data/statistics";
  customersRoutes(req, res);
});

// Employee routes compatibility
app.get("/nhanvien", (req, res) => {
  req.url = "/";
  employeesRoutes(req, res);
});
app.get("/nhanvien/:manv", (req, res) => {
  req.url = `/${req.params.manv}`;
  employeesRoutes(req, res);
});
app.get("/nhanvienId/:manv", (req, res) => {
  req.url = `/info/${req.params.manv}`;
  employeesRoutes(req, res);
});
app.put("/nhanvien/:manv", (req, res) => {
  req.url = `/${req.params.manv}`;
  employeesRoutes(req, res);
});
app.get("/nhanviencount", (req, res) => {
  req.url = "/count/total";
  employeesRoutes(req, res);
});

// Supplier routes compatibility
app.get("/nhacungcap", (req, res) => {
  req.url = "/";
  suppliersRoutes(req, res);
});
app.get("/nhacungcapdata", (req, res) => {
  req.url = "/data/statistics";
  suppliersRoutes(req, res);
});

// Account routes compatibility
app.get("/taikhoan", (req, res) => {
  req.url = "/taikhoan";
  accountsRoutes(req, res);
});
app.get("/taikhoanTheoMaNV/:manv", (req, res) => {
  req.url = `/taikhoan/${req.params.manv}`;
  accountsRoutes(req, res);
});
app.get("/nhomquyen", (req, res) => {
  req.url = "/nhomquyen";
  accountsRoutes(req, res);
});
app.post("/taikhoan", (req, res) => {
  req.url = "/taikhoan/login";
  accountsRoutes(req, res);
});
app.post("/themTaiKhoan", (req, res) => {
  req.url = "/taikhoan";
  accountsRoutes(req, res);
});
app.put("/Edittaikhoan/:manv", (req, res) => {
  req.url = `/taikhoan/${req.params.manv}`;
  accountsRoutes(req, res);
});

// Lookup routes compatibility
app.get("/ram", (req, res) => {
  req.url = "/ram";
  lookupsRoutes(req, res);
});
app.get("/rom", (req, res) => {
  req.url = "/rom";
  lookupsRoutes(req, res);
});
app.get("/mausac", (req, res) => {
  req.url = "/mausac";
  lookupsRoutes(req, res);
});
app.get("/hedieuhanh", (req, res) => {
  req.url = "/hedieuhanh";
  lookupsRoutes(req, res);
});
app.get("/thuonghieu", (req, res) => {
  req.url = "/thuonghieu";
  lookupsRoutes(req, res);
});
app.get("/xuatxu", (req, res) => {
  req.url = "/xuatxu";
  lookupsRoutes(req, res);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;