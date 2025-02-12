import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddNhaCungCapForm = ({ show, handleClose }) => {
  const [nhaCungCapData, setnhaCungCapData] = useState({
    manhacungcap: "",
    tennhacungcap: "",
    diachi: "",
    email: "",
    sdt: "",
    trangthai: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setnhaCungCapData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/themnhacungcap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nhaCungCapData),
      });
      if (response.ok) {
        alert("Thêm nhà cung cấp thành công!");
        handleClose();
      } else {
        throw new Error("Có lỗi xảy ra khi thêm khu vực kho.");
      }
    } catch (error) {
      console.error("Error adding storage area:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thêm nhà cung cấp mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="tennhacungcap">
            <Form.Label>Tên nhà cung cấp</Form.Label>
            <Form.Control
              type="text"
              name="tennhacungcap"
              value={nhaCungCapData.tennhacungcap}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="diachi">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              name="diachi"
              value={nhaCungCapData.diachi}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={nhaCungCapData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="sdt">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              name="sdt"
              value={nhaCungCapData.sdt}
              onChange={handleChange}
              required
              pattern="[0-9]*"
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="mr-2">
              Hủy bỏ
            </Button>
            <Button type="submit" variant="primary">
              Thêm nhà cung cấp
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddNhaCungCapForm;
