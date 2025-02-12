import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditKhuVucKhoForm = ({ show, handleClose, khuvuckho }) => {
  const [formData, setFormData] = useState({
    tenkhuvuc: "",
    ghichu: "",
  });

  useEffect(() => {
    if (khuvuckho) {
      setFormData({
        tenkhuvuc: khuvuckho.tenkhuvuc || "",
        ghichu: khuvuckho.ghichu || "",
      });
    }
  }, [khuvuckho]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/khuvuckho/${khuvuckho.makhuvuc}`,
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

      alert("Cập nhật khu vực kho thành công.");
      handleClose();
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật khu vực kho.");
      console.error("Error updating khu vực kho:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật khu vực kho</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="tenkhuvuc">
            <Form.Label>Tên khu vực</Form.Label>
            <Form.Control
              type="text"
              name="tenkhuvuc"
              value={formData.tenkhuvuc}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="ghichu">
            <Form.Label>Ghi chú</Form.Label>
            <Form.Control
              as="textarea"
              name="ghichu"
              value={formData.ghichu}
              onChange={handleChange}
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

export default EditKhuVucKhoForm;
