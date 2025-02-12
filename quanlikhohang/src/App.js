import React from "react";
import "./App.css";
import Login from "./component/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import PhieuXuatPage from "./component/PhieuXuat/PhieuXuatPage";
import PhieuNhapPage from "./component/PhieuNhap/PhieuNhapPage";
import NhaCungCapPage from "./component/NhaCungCap/NhaCungCapPage";
import KhachHangPage from "./component/KhachHang/KhachHangPage";
import KhuVucKhoPage from "./component/KhuVucKho/KhuVucKhoPage";
import NhanVienPage from "./component/NhanVien/NhanVienPage";
import TaiKhoanPage from "./component/TaiKhoan/TaiKhoanPage";
import ThongKe from "./component/ThongKe/ThongKe";
import ThuocTinhPage from "./component/ThuocTinh/ThuocTinhPage";
import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/trangchu"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Sử dụng ProtectedRoute cho các route cần bảo vệ */}
        <Route
          path="/phieuxuat"
          element={
            <ProtectedRoute requiredRoles={["NQ001", "NQ003"]}>
              <PhieuXuatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/phieunhap"
          element={
            <ProtectedRoute requiredRoles={["NQ001", "NQ002"]}>
              <PhieuNhapPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nhacungcap"
          element={
            <ProtectedRoute requiredRoles={["NQ001"]}>
              <NhaCungCapPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nhanvien"
          element={
            <ProtectedRoute requiredRoles={["NQ001"]}>
              <NhanVienPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/taikhoan"
          element={
            <ProtectedRoute requiredRoles={["NQ001"]}>
              <TaiKhoanPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/khachhang"
          element={
            <ProtectedRoute requiredRoles={["NQ001"]}>
              <KhachHangPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/khuvuckho"
          element={
            <ProtectedRoute requiredRoles={["NQ001"]}>
              <KhuVucKhoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/thongke"
          element={
            <ProtectedRoute requiredRoles={["NQ001"]}>
              <ThongKe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/thuoctinh"
          element={
            <ProtectedRoute requiredRoles={["NQ001", "NQ002", "NQ003"]}>
              <ThuocTinhPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
