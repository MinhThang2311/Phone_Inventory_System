import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditTaiKhoanForm = ({ show, handleClose, taiKhoan }) => {
  const [formData, setFormData] = useState({
    tendangnhap: "",
    manhomquyen: "",
    trangthai: 1, // 1: Đang hoạt động, 0: Ngừng hoạt động
  });

  const [nhomQuyenData, setNhomQuyenData] = useState([]); // Thêm state để lưu nhóm quyền

  useEffect(() => {
    // Lấy dữ liệu nhóm quyền từ API
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

    fetchNhomQuyen();
  }, []); // Chỉ gọi một lần khi component được mount

  useEffect(() => {
    if (taiKhoan) {
      const { tendangnhap, manhomquyen, trangthai } = taiKhoan;
      console.log("Editing taiKhoan: ", taiKhoan);
      setFormData({ tendangnhap, manhomquyen, trangthai });
    }
  }, [taiKhoan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/Edittaikhoan/${taiKhoan.manv}`, // Cập nhật URL cho tài khoản
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("Cập nhật tài khoản thành công.");
      handleClose();
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật tài khoản.");
      console.error("Error updating tài khoản:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật tài khoản</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="tendangnhap">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              name="tendangnhap"
              value={formData.tendangnhap}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formManhomquyen">
            <Form.Label>Mã Nhóm Quyền</Form.Label>
            <Form.Control
              as="select"
              name="manhomquyen"
              value={formData.manhomquyen}
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
          <Form.Group controlId="trangthai">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Control
              as="select"
              name="trangthai"
              value={formData.trangthai}
              onChange={handleChange}
              required
            >
              <option value={1}>Đang hoạt động</option>
              <option value={0}>Ngừng hoạt động</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Cập nhật
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTaiKhoanForm;
