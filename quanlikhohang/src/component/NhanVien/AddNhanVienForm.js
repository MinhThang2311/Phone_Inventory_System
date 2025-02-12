import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddNhanVienForm = ({ show, handleClose }) => {
  const [NhanVienData, setNhanVienData] = useState({
    hoten: "",
    email: "",
    sdt: "",
    gioitinh: "", // Thêm trường giới tính
    ngaysinh: "", // Thêm trường ngày sinh
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNhanVienData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/themNhanVien", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(NhanVienData),
      });
      if (response.ok) {
        alert("Thêm nhân viên thành công!");
        handleClose();
      } else {
        throw new Error("Có lỗi xảy ra khi thêm nhân viên.");
      }
    } catch (error) {
      console.error("Error adding storage area:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thêm nhân viên mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="tennhacungcap">
            <Form.Label>Họ tên nhân viên</Form.Label>
            <Form.Control
              type="text"
              name="hoten"
              value={NhanVienData.hoten}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={NhanVienData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="sdt">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              name="sdt"
              value={NhanVienData.sdt}
              onChange={handleChange}
              required
              pattern="[0-9]*"
            />
          </Form.Group>
          <Form.Group controlId="gioitinh">
            <Form.Label>Giới tính</Form.Label>
            <Form.Check
              type="radio"
              label="Nam"
              name="gioitinh"
              value="Nam"
              checked={NhanVienData.gioitinh === "Nam"}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              label="Nữ"
              name="gioitinh"
              value="Nữ"
              checked={NhanVienData.gioitinh === "Nữ"}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="ngaysinh">
            <Form.Label>Ngày sinh</Form.Label>
            <Form.Control
              type="date"
              name="ngaysinh"
              value={NhanVienData.ngaysinh}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="mr-2">
              Hủy bỏ
            </Button>
            <Button type="submit" variant="primary">
              Thêm nhân viên
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddNhanVienForm;
