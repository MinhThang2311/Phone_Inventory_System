const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

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

// Routes - using new structure
app.use("/api/products", productsRoutes);
app.use("/api/warehouse", warehouseRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use("/api/auth", accountsRoutes);
app.use("/api/lookups", lookupsRoutes);

// Legacy routes for backward compatibility
// Product routes
app.use("/sanpham", productsRoutes);
app.use("/phienbansanpham", (req, res, next) => {
  req.url = req.url.replace("/phienbansanpham", "/phienban");
  productsRoutes(req, res, next);
});
app.use("/themsanphamvoiphienban", (req, res, next) => {
  req.method = "POST";
  productsRoutes(req, res, next);
});
app.use("/capnhatsanpham", (req, res, next) => {
  req.url = req.url.replace("/capnhatsanpham", "/capnhat");
  productsRoutes(req, res, next);
});
app.use("/sanphamcount", (req, res, next) => {
  req.url = "/count/total";
  productsRoutes(req, res, next);
});
app.use("/sanphamtheokhuvuc", (req, res, next) => {
  const khuvuc = req.query.khuvuc;
  req.url = `/theo-khu-vuc/${khuvuc}`;
  productsRoutes(req, res, next);
});

// Warehouse routes
app.use("/khuvuckho", warehouseRoutes);
app.use("/timkiemkhuvuckho", (req, res, next) => {
  req.url = "/khuvuckho/timkiem";
  warehouseRoutes(req, res, next);
});
app.use("/themkhuvuckho", (req, res, next) => {
  req.url = "/khuvuckho";
  req.method = "POST";
  warehouseRoutes(req, res, next);
});
app.use("/xoakhuvuckho", (req, res, next) => {
  req.url = req.url.replace("/xoakhuvuckho", "/khuvuckho");
  req.method = "DELETE";
  warehouseRoutes(req, res, next);
});
app.use("/phieunhap", warehouseRoutes);
app.use("/phieuxuat", warehouseRoutes);
app.use("/tonkho", warehouseRoutes);

// Customer routes
app.use("/khachhang", customersRoutes);
app.use("/addkhachhang", (req, res, next) => {
  req.url = "/";
  req.method = "POST";
  customersRoutes(req, res, next);
});
app.use("/xoakhachhang", (req, res, next) => {
  req.url = req.url.replace("/xoakhachhang", "");
  req.method = "DELETE";
  customersRoutes(req, res, next);
});
app.use("/khachhangcount", (req, res, next) => {
  req.url = "/count/total";
  customersRoutes(req, res, next);
});
app.use("/khachhangdata", (req, res, next) => {
  req.url = "/data/statistics";
  customersRoutes(req, res, next);
});

// Employee routes
app.use("/nhanvien", employeesRoutes);
app.use("/nhanvienId", (req, res, next) => {
  req.url = req.url.replace("/nhanvienId", "/info");
  employeesRoutes(req, res, next);
});
app.use("/nhanviencount", (req, res, next) => {
  req.url = "/count/total";
  employeesRoutes(req, res, next);
});

// Supplier routes
app.use("/nhacungcap", suppliersRoutes);
app.use("/nhacungcapdata", (req, res, next) => {
  req.url = "/data/statistics";
  suppliersRoutes(req, res, next);
});

// Account routes
app.use("/taikhoan", accountsRoutes);
app.use("/taikhoanTheoMaNV", (req, res, next) => {
  req.url = req.url.replace("/taikhoanTheoMaNV", "/taikhoan");
  accountsRoutes(req, res, next);
});
app.use("/nhomquyen", accountsRoutes);
app.use("/themTaiKhoan", accountsRoutes);
app.use("/Edittaikhoan", (req, res, next) => {
  req.url = req.url.replace("/Edittaikhoan", "/taikhoan");
  accountsRoutes(req, res, next);
});

// Lookup routes
app.use("/ram", lookupsRoutes);
app.use("/rom", lookupsRoutes);
app.use("/mausac", lookupsRoutes);
app.use("/hedieuhanh", lookupsRoutes);
app.use("/thuonghieu", lookupsRoutes);
app.use("/xuatxu", lookupsRoutes);

// Additional legacy endpoints that might still be in the original file
// TODO: Review and migrate remaining endpoints

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("✅ Server has been restructured into modular routes!");
  console.log("📁 Routes organized by functionality:");
  console.log("   - /api/products - Product management");
  console.log("   - /api/warehouse - Warehouse & inventory");
  console.log("   - /api/customers - Customer management");
  console.log("   - /api/employees - Employee management");
  console.log("   - /api/suppliers - Supplier management");
  console.log("   - /api/auth - Authentication & accounts");
  console.log("   - /api/lookups - Reference data (RAM, ROM, colors, etc.)");
  console.log(
    "🔄 Legacy endpoints are still supported for backward compatibility"
  );
});

module.exports = app;
