import React from "react";
import { Card, Table, Form } from "react-bootstrap";

const NhaCungCap = ({ nhaCungCapData, searchTermNCC, setSearchTermNCC }) => {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <h5>Thông tin nhà cung cấp</h5>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm nhà cung cấp"
            value={searchTermNCC}
            onChange={(e) => setSearchTermNCC(e.target.value)}
            style={{ width: "300px" }}
          />
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã Nhà Cung Cấp</th>
              <th>Tên Nhà Cung Cấp</th>
              <th>Số lượng Phiếu Nhập</th>
              <th>Tổng Số Tiền</th>
            </tr>
          </thead>
          <tbody>
            {nhaCungCapData
              .filter((ncc) => {
                const searchTerm = searchTermNCC.toLowerCase();
                return (
                  ncc.manhacungcap.toLowerCase().includes(searchTerm) || // Tìm kiếm theo mã nhà cung cấp
                  ncc.tennhacungcap.toLowerCase().includes(searchTerm) // Tìm kiếm theo tên nhà cung cấp
                );
              })
              .map((ncc, index) => (
                <tr key={ncc.manhacungcap}>
                  <td>{index + 1}</td>
                  <td>{ncc.manhacungcap}</td>
                  <td>{ncc.tennhacungcap}</td>
                  <td>{ncc.soluongphieunhap}</td>
                  <td>
                    {ncc.tongtien ? ncc.tongtien.toLocaleString() : "0"} VND
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default NhaCungCap;
