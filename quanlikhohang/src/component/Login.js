import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css"; // Đảm bảo bạn đã thêm tệp CSS

function Login() {
  const [tendangnhap, setUsername] = useState("");
  const [matkhau, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/taikhoan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tendangnhap, matkhau }),
    });
    const data = await response.json();
    console.log("API Response:", data); // Thêm log để kiểm tra phản hồi từ API

    if (data.success) {
      localStorage.setItem("manv", data.manv);
      localStorage.setItem("hoten", data.hoten);
      localStorage.setItem("manhomquyen", data.manhomquyen);
      localStorage.setItem("tennhomquyen", data.tennhomquyen);
      console.log("manhomquyen stored:", localStorage.getItem("manhomquyen"));

      navigate("/trangchu");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Quản lý kho hàng điện thoại Thắng & Thành</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={tendangnhap}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={matkhau}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default Login;
