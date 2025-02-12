import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddTaiKhoanForm = ({ show, handleClose, selectedNhanVien }) => {
  const [showSelectEmployee, setShowSelectEmployee] = useState(false);
  const [nhanVienData, setNhanVienData] = useState([]);
  const [nhomQuyenData, setNhomQuyenData] = useState([]); // Thêm state để lưu nhóm quyền
  const [taiKhoanData, setTaiKhoanData] = useState({
    tendangnhap: "",
    matkhau: "",
    manhomquyen: "",
    trangthai: 1,
  });

  useEffect(() => {
    const fetchNhanVien = async () => {
      try {
        const response = await fetch("http://localhost:5000/nhanvien");
        const data = await response.json();
        if (data.success) {
          setNhanVienData(data.data);
        } else {
          console.error("Error fetching nhan vien:", data.message);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu nhân viên:", error);
      }
    };

    const fetchNhomQuyen = async () => {
      try {
        const response = await fetch("http://localhost:5000/nhomquyen");
        const data = await response.json();
        if (data.success) {
          setNhomQuyenData(data.data);
        } else {
          console.error("Error fetching nhom quyen:", data.message);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu nhóm quyền:", error);
      }
    };

    fetchNhanVien();
    fetchNhomQuyen(); // Gọi hàm fetch nhóm quyền
  }, []);

  const handleShowSelectEmployee = () => setShowSelectEmployee(true);
  const handleCloseSelectEmployee = () => setShowSelectEmployee(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaiKhoanData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/themTaiKhoan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...taiKhoanData, manv: selectedNhanVien.manv }),
      });
      if (response.ok) {
        alert("Thêm tài khoản thành công!");
        handleClose();
      } else {
        throw new Error("Có lỗi xảy ra khi thêm tài khoản.");
      }
    } catch (error) {
      console.error("Error adding tài khoản:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Tài Khoản</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedNhanVien && (
          <div>
            <h5>Nhân Viên Đã Chọn: {selectedNhanVien.hoten}</h5>
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTendangnhap">
            <Form.Label>Tên Đăng Nhập</Form.Label>
            <Form.Control
              type="text"
              name="tendangnhap"
              value={taiKhoanData.tendangnhap}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formMatkhau">
            <Form.Label>Mật Khẩu</Form.Label>
            <Form.Control
              type="password"
              name="matkhau"
              value={taiKhoanData.matkhau}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formManhomquyen">
            <Form.Label>Mã Nhóm Quyền</Form.Label>
            <Form.Control
              as="select"
              name="manhomquyen"
              value={taiKhoanData.manhomquyen}
              onChange={handleChange}
              required
            >
              <option value="">Chọn Nhóm Quyền</option>
              {nhomQuyenData.map((nhom) => (
                <option key={nhom.manhomquyen} value={nhom.manhomquyen}>
                  {nhom.tennhomquyen}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formTrangthai">
            <Form.Label>Trạng Thái</Form.Label>
            <Form.Control
              as="select"
              name="trangthai"
              value={taiKhoanData.trangthai}
              onChange={handleChange}
            >
              <option value={1}>Kích Hoạt</option>
              <option value={0}>Không Kích Hoạt</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Thêm Tài Khoản
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTaiKhoanForm;
