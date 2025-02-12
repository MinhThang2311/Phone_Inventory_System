import React from "react";
import { Card, Table, Form } from "react-bootstrap";

const KhachHang = ({ filteredKhachHangData, searchTerm, setSearchTerm }) => {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <h5>Thông tin khách hàng</h5>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm khách hàng"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "300px" }}
          />
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã Khách Hàng</th>
              <th>Tên Khách Hàng</th>
              <th>Số lượng Phiếu Xuất</th>
              <th>Tổng Số Tiền</th>
            </tr>
          </thead>
          <tbody>
            {filteredKhachHangData.map((khachhang, index) => (
              <tr key={khachhang.makh}>
                <td>{index + 1}</td>
                <td>{khachhang.makh}</td>
                <td>{khachhang.tenkhachhang}</td>
                <td>{khachhang.soluongphieuxuat}</td>
                <td>
                  {khachhang.tongtien
                    ? khachhang.tongtien.toLocaleString()
                    : "0"}{" "}
                  VND
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default KhachHang;
