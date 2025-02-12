import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";

const SelectNhanVienForm = ({ show, handleClose, onSelectNhanVien }) => {
  const [nhanVienData, setNhanVienData] = useState([]);

  useEffect(() => {
    const fetchNhanVien = async () => {
      try {
        const response = await fetch("http://localhost:5000/nhanvien");

        // Kiểm tra mã trạng thái HTTP
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Dữ liệu nhận được từ API:", data);

        // Kiểm tra cấu trúc dữ liệu trả về
        if (data && data.success) {
          setNhanVienData(data.data);
        } else {
          console.error(
            "Error fetching nhan vien:",
            data.message || "Không có thông điệp lỗi"
          );
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu nhân viên:", error);
      }
    };

    fetchNhanVien();
  }, []);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chọn Nhân Viên</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Mã NV</th>
              <th>Họ Tên</th>
              <th>Giới Tính</th>
              <th>Ngày Sinh</th>
              <th>SĐT</th>
              <th>Email</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {nhanVienData.length > 0 ? (
              nhanVienData.map((nv) => (
                <tr
                  key={nv.manv}
                  onClick={() => onSelectNhanVien(nv)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{nv.manv}</td>
                  <td>{nv.hoten}</td>
                  <td>{nv.gioitinh}</td>
                  <td>{new Date(nv.ngaysinh).toLocaleDateString()}</td>
                  <td>{nv.sdt}</td>
                  <td>{nv.email}</td>
                  <td>
                    {nv.trangthai === 1 ? "Kích Hoạt" : "Không Kích Hoạt"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Không có dữ liệu để hiển thị.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectNhanVienForm;
