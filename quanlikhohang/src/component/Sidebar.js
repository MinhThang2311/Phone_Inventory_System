import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { FaHome, FaClipboardList, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import EditUserForm from "./User/EditUserForm";
import "./Sidebar.css";
const Sidebar = () => {
  const [hoten, setHoten] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate();
  const [manhomquyen, setManhomquyen] = useState("");
  const [tennhomquyen, setTennhomquyen] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("hoten");
    localStorage.removeItem("manv");
    localStorage.removeItem("manhomquyen");
    localStorage.removeItem("tennhomquyen");

    navigate("/");
  };
  useEffect(() => {
    const storedHoten = localStorage.getItem("hoten");
    const storedManv = localStorage.getItem("manv");
    const storedManhomquyen = localStorage.getItem("manhomquyen");
    const storedTennhomquyen = localStorage.getItem("tennhomquyen");

    console.log("Stored manhomquyen:", storedManhomquyen);
    console.log("Stored tennhomquyen:", storedTennhomquyen); // Thêm log để kiểm tra

    if (storedHoten) {
      setHoten(storedHoten); // Cập nhật họ tên
    }
    if (storedManhomquyen) {
      setManhomquyen(storedManhomquyen);
    }
    if (!storedManv) {
      console.warn("Mã nhân viên không được lưu trữ trong localStorage!");
    }
    if (storedTennhomquyen) {
      setTennhomquyen(storedTennhomquyen); // Lưu tennhomquyen vào state
    }
  }, []);
  const handleAvatarClick = () => {
    setShowEditForm(true);
  };

  const handleCloseForm = () => {
    setShowEditForm(false);
  };

  return (
    <div className="sidebar">
      <div className="user-info" onClick={handleAvatarClick}>
        <img src="user-avatar.png" alt="user" className="avatar" />
        <p> {hoten}</p>
        <p> {tennhomquyen}</p>
      </div>
      <ListGroup variant="flush">
        {/* Các mục chung cho tất cả người dùng */}
        <ListGroup.Item>
          <Link to="/trangchu">
            <FaHome /> Sản phẩm
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/thuoctinh">
            <FaClipboardList /> Thuộc tính
          </Link>
        </ListGroup.Item>

        {/* Kiểm tra quyền truy cập */}
        {manhomquyen === "NQ001" && (
          <>
            <ListGroup.Item>
              <Link to="/khuvuckho">
                <FaClipboardList /> Khu vực kho
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/phieunhap">
                <FaClipboardList /> Phiếu nhập
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/phieuxuat">
                <FaClipboardList /> Phiếu xuất
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/khachhang">
                <FaUser /> Khách hàng
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/nhacungcap">
                <FaUser /> Nhà cung cấp
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/nhanvien">
                <FaUser /> Nhân viên
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/taikhoan">
                <FaUser /> Tài khoản
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/thongke">
                <FaUser /> Thống kê
              </Link>
            </ListGroup.Item>
          </>
        )}
        {/* Kiểm tra quyền truy cập */}
        {manhomquyen === "NQ002" && (
          <>
            <ListGroup.Item>
              <Link to="/phieunhap">
                <FaClipboardList /> Phiếu nhập
              </Link>
            </ListGroup.Item>
          </>
        )}
        {manhomquyen === "NQ003" && (
          <>
            <ListGroup.Item>
              <Link to="/phieuxuat">
                <FaClipboardList /> Phiếu xuất
              </Link>
            </ListGroup.Item>
          </>
        )}
        <ListGroup.Item onClick={handleLogout} style={{ cursor: "pointer" }}>
          <FaSignOutAlt /> Đăng xuất
        </ListGroup.Item>
      </ListGroup>

      <EditUserForm
        show={showEditForm}
        handleClose={handleCloseForm}
        manv={localStorage.getItem("manv")}
      />
    </div>
  );
};

export default Sidebar;
