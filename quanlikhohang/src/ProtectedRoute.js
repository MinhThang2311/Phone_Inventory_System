import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const storedManv = localStorage.getItem("manv");
  const storedManhomquyen = localStorage.getItem("manhomquyen");

  // Kiểm tra xem người dùng đã đăng nhập và có quyền truy cập
  const isLoggedIn = !!storedManv;
  const hasRequiredRole = requiredRoles
    ? requiredRoles.includes(storedManhomquyen)
    : true;

  if (!isLoggedIn) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    return <Navigate to="/" />;
  }

  if (!hasRequiredRole) {
    alert("Bạn không có quyền truy cập");
    // Nếu không có quyền truy cập, có thể chuyển hướng đến trang khác hoặc thông báo
    return <Navigate to="/trangchu" />; // Hoặc trang khác mà bạn muốn
  }

  return children; // Nếu đã đăng nhập và có quyền, hiển thị children
};

export default ProtectedRoute;
