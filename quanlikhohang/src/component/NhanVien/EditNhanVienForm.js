import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditNhanVienForm = ({ show, handleClose, nhanvien }) => {
  const [formData, setFormData] = useState({
    hoten: "",
    email: "",
    sdt: "",
    gioitinh: "",
    ngaysinh: "",
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Đảm bảo có 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Trả về định dạng dd/mm/yyyy
  };
  useEffect(() => {
    console.log("Nhan vien data:", nhanvien); // Kiểm tra dữ liệu
    if (nhanvien) {
      const formattedDate = nhanvien.ngaysinh
        ? new Date(nhanvien.ngaysinh).toISOString().split("T")[0]
        : ""; // Nếu không có ngày sinh thì trả về chuỗi rỗng

      setFormData({
        hoten: nhanvien.hoten || "",
        email: nhanvien.email || "",
        sdt: nhanvien.sdt || "",
        gioitinh: nhanvien.gioitinh || "",
        ngaysinh: formattedDate,
      });
    }
  }, [nhanvien]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/suaNhanVien/${nhanvien.manv}`,
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

      alert("Cập nhật nhân viên thành công.");
      handleClose();
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật nhân viên.");
      console.error("Error updating nhân viên:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật nhân viên</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="hoten">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              type="text"
              name="hoten"
              value={formData.hoten}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="gioitinh">
            <Form.Label>Giới tính</Form.Label>
            <Form.Control
              as="select"
              name="gioitinh"
              value={formData.gioitinh}
              onChange={handleChange}
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="ngaysinh">
            <Form.Label>Ngày sinh</Form.Label>
            <Form.Control
              type="date"
              name="ngaysinh"
              value={formData.ngaysinh}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="sdt">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              name="sdt"
              value={formData.sdt}
              onChange={handleChange}
              required
              pattern="[0-9]*"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Cập nhật
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditNhanVienForm;
