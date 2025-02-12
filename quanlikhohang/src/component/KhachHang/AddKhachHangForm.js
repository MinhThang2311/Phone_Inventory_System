import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const AddKhachHangForm = ({ show, handleClose }) => {
  const [khachHangData, setKhachHangData] = useState({
    tenkhachhang: "",
    diachi: "",
    sdt: "",
    ngaythamgia: "",
    trangthai: 1,
  });

  const [khachhang, setkhanhhang] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKhachHangData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/addkhachhang", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(khachHangData), // Không gửi mã khách hàng
      });

      if (response.ok) {
        alert("Thêm khách hàng thành công!");
        handleClose(); // Đóng modal
      } else {
        throw new Error("Có lỗi xảy ra khi thêm khách hàng.");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Khách Hàng Mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Không có trường mã khách hàng */}
          <Row>
            <Col md={6}>
              <Form.Group controlId="tenkhachhang">
                <Form.Label>Tên Khách Hàng</Form.Label>
                <Form.Control
                  type="text"
                  name="tenkhachhang"
                  value={khachHangData.tenkhachhang}
                  onChange={handleChange}
                  required
                  style={{ width: "300px" }} // Chiều dài dài cho tên khách hàng
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="sdt">
                <Form.Label>Số Điện Thoại</Form.Label>
                <Form.Control
                  type="text"
                  name="sdt"
                  value={khachHangData.sdt}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="diachi">
            <Form.Label>Địa Chỉ</Form.Label>
            <Form.Control
              type="text"
              name="diachi"
              value={khachHangData.diachi}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="mr-2">
              Hủy Bỏ
            </Button>
            <Button type="submit" variant="primary">
              Thêm Khách Hàng
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddKhachHangForm;
