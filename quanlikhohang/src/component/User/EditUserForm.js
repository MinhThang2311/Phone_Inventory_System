import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditUserForm = ({ show, handleClose, manv }) => {
  const [formData, setFormData] = useState({
    email: "",
    sdt: "",
    password: "",
    currentPassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const manv = localStorage.getItem("manv");
    console.log(formData); // Kiểm tra dữ liệu sẽ gửi đi

    fetch(`http://localhost:5000/nhanvien/${manv}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData, // bao gồm email, sdt, password mới
        currentPassword: formData.currentPassword, // mật khẩu hiện tại
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Cập nhật thông tin thành công");
          handleClose();
        } else {
          alert("Lỗi khi cập nhật thông tin");
        }
      })
      .catch((err) => console.error("Error updating user data:", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    if (show) {
      fetch(`http://localhost:5000/nhanvien/${manv}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setFormData({
              email: data.data.email,
              sdt: data.data.sdt,
              matkhau: "",
              currentPassword: "",
            });
          }
        })
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, [show, manv]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật thông tin tài khoản</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
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
          <Form.Group controlId="currentPassword">
            <Form.Label>Mật khẩu hiện tại</Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="matkhau">
            <Form.Label>Mật khẩu mới</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
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

export default EditUserForm;
