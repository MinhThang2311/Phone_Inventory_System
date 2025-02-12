import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditNhaCungCapForm = ({ show, handleClose, nhacungcap }) => {
  const [formData, setFormData] = useState({
    tennhacungcap: "",
    diachi: "",
    email: "",
    sdt: "",
  });

  useEffect(() => {
    if (nhacungcap) {
      const { tennhacungcap, email, diachi, sdt } = nhacungcap;
      console.log("Editing nhacungcap: ", nhacungcap);
      setFormData({ tennhacungcap, email, diachi, sdt });
    }
  }, [nhacungcap]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/nhacungcap/${nhacungcap.manhacungcap}`,
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

      alert("Cập nhật nhà cung cấp thành công.");
      handleClose();
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật nhà cung cấp.");
      console.error("Error updating nhà cung cấp:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật nhà cung cấp</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="tennhacungcap">
            <Form.Label>Tên nhà cung cấp</Form.Label>
            <Form.Control
              type="text"
              name="tennhacungcap"
              value={formData.tennhacungcap}
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
          <Form.Group controlId="email">
            <Form.Label>Địa chỉ</Form.Label>
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
          <Button variant="primary" type="submit">
            Cập nhật
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditNhaCungCapForm;
