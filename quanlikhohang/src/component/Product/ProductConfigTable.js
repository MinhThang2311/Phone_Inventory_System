import React from "react";
import { Table, Button } from "react-bootstrap";

const ProductConfigTable = ({ configurations, onClose }) => {
  return (
    <div>
      <h2>Xem Chi Tiết Sản Phẩm</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>RAM</th>
            <th>ROM</th>
            <th>Màu sắc</th>
            <th>Giá nhập</th>
            <th>Giá xuất</th>
          </tr>
        </thead>
        <tbody>
          {configurations.map((config, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{config.ram}</td>
              <td>{config.rom}</td>
              <td>{config.mausac}</td>
              <td>{config.gianhap}</td>
              <td>{config.giaxuat}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="warning" onClick={onClose}>
        Quay lại trang trước
      </Button>
    </div>
  );
};

export default ProductConfigTable;
