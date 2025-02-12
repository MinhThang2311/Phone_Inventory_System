import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditPhieuXuatForm = ({ show, handleClose, phieuXuat }) => {
  const [formData, setFormData] = useState({
    maPhieuXuat: "",
    thoigian: "",
    tongtien: "",
    nguoitaophieuxuat: "",
    makh: "",
  });

  // Thiết lập các state cho các tùy chọn
  const [khachHangOptions, setKhachHangOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const khResponse = await fetch("http://localhost:5000/khachhang");
        const khData = await khResponse.json();
        setKhachHangOptions(Array.isArray(khData.data) ? khData.data : []);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    if (phieuXuat) {
      setFormData(phieuXuat);
    }
  }, [phieuXuat]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/phieuxuat/${phieuXuat.maPhieuXuat}`,
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

      alert("Cập nhật phiếu xuất thành công.");
      handleClose(); // Đóng form sau khi cập nhật thành công
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật phiếu xuất.");
      console.error("Error updating phieu xuat:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật phiếu xuất</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="thoigian">
            <Form.Label>Thời gian</Form.Label>
            <Form.Control
              type="datetime-local"
              name="thoigian"
              value={formData.thoigian}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="tongtien">
            <Form.Label>Tổng tiền</Form.Label>
            <Form.Control
              type="number"
              name="tongtien"
              value={formData.tongtien}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="nguoitaophieuxuat">
            <Form.Label>Người tạo phiếu xuất</Form.Label>
            <Form.Control
              type="text"
              name="nguoitaophieuxuat"
              value={formData.nguoitaophieuxuat}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="makh">
            <Form.Label>Khách hàng</Form.Label>
            <Form.Control
              as="select"
              name="makh"
              value={formData.makh}
              onChange={handleChange}
              required
            >
              <option value="">Chọn khách hàng</option>
              {khachHangOptions.map((kh) => (
                <option key={kh.maKhachHang} value={kh.maKhachHang}>
                  {kh.tenKhachHang}
                </option>
              ))}
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

export default EditPhieuXuatForm;
