import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditKhachHangForm = ({ show, handleClose, khachhang }) => {
  const [formData, setFormData] = useState({
    tenkhachhang: "",
    diachi: "",
    sdt: "",
  });

  useEffect(() => {
    if (khachhang) {
      const { tenkhachhang, diachi, sdt } = khachhang;
      console.log("Editing Customer: ", khachhang);
      setFormData({ tenkhachhang, diachi, sdt });
    }
  }, [khachhang]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/khachhang/${khachhang.makh}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error:", errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse JSON only after confirming the response is OK
      const responseData = await response.json();
      console.log("Server response:", responseData);

      alert("Cập nhật khách hàng thành công.");
      handleClose(); // Close the form after a successful update
    } catch (error) {
      alert(`Có lỗi xảy ra khi cập nhật khách hàng: ${error.message}`);
      console.error("Error updating customer:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật thông tin khách hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="tenkhachhang">
            <Form.Label>Tên khách hàng</Form.Label>
            <Form.Control
              type="text"
              name="tenkhachhang"
              value={formData.tenkhachhang}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="diachi">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              name="diachi"
              value={formData.diachi}
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
              pattern="[0-9]*" // Chỉ cho phép ký tự số
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

export default EditKhachHangForm;
