import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddKhuVucKhoForm = ({ show, handleClose }) => {
  const [khuVucKhoData, setKhuVucKhoData] = useState({
    tenkhuvuc: "",
    ghichu: "",
    trangthai: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKhuVucKhoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/themkhuvuckho", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(khuVucKhoData),
      });
      if (response.ok) {
        alert("Thêm khu vực kho thành công!");
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
        <Modal.Title>Thêm khu vực kho mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="tenkhuvuc">
            <Form.Label>Tên khu vực</Form.Label>
            <Form.Control
              type="text"
              name="tenkhuvuc"
              value={khuVucKhoData.tenkhuvuc}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="ghichu">
            <Form.Label>Ghi chú</Form.Label>
            <Form.Control
              type="text"
              name="ghichu"
              value={khuVucKhoData.ghichu}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="mr-2">
              Hủy bỏ
            </Button>
            <Button type="submit" variant="primary">
              Thêm khu vực
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddKhuVucKhoForm;
