import React from "react";
import { Card, Table } from "react-bootstrap";

const BinhQuan = ({ binhQuanData }) => {
  return (
    <Card>
      <Card.Body>
        <h5>Giá Bình Quân Các Mặt Hàng</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã Sản Phẩm</th>
              <th>Tên Sản Phẩm</th>
              <th>Tổng Số Lượng</th>
              <th>Tổng Doanh Thu</th>
              <th>Giá Bình Quân</th>
            </tr>
          </thead>
          <tbody>
            {binhQuanData.map((item, index) => (
              <tr key={item.masp}>
                <td>{index + 1}</td>
                <td>{item.masp}</td>
                <td>{item.tensp}</td>
                <td>{item.tong_soluong}</td>
                <td>{item.tong_doanhthu.toLocaleString()} VNĐ</td>
                <td>{item.gia_binh_quan.toLocaleString()} VNĐ</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default BinhQuan;
