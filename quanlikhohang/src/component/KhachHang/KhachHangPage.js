import React, { useState, useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import Sidebar from "../Sidebar";
import "../../App.css";
import TopbarKhachHang from "./TopbarKhachHang";

const KhachHangPage = () => {
  const [khachHangData, setKhachHangData] = useState([]);
  const [selectedKhachHangId, setSelectedKhachHangId] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };
  useEffect(() => {
    fetch("http://localhost:5000/khachhang")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Mạng lỗi hoặc không tìm thấy dữ liệu");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setKhachHangData(data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }, []);
  const handleRowClick = (khachhang) => {
    setSelectedKhachHangId(khachhang.makh);
    console.log("Đã chọn mã kh: ", khachhang.makh);
  };
  const filteredKhachHangData = khachHangData.filter((khachhang) => {
    return (
      khachhang.tenkhachhang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      khachhang.sdt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredKhachHangData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredKhachHangData.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="dashboard d-flex">
      <Sidebar />
      <div className="content">
        <TopbarKhachHang
          selectedKhachHangId={selectedKhachHangId}
          onSearch={handleSearch}
          khachHangData={khachHangData}
        />
        <div className="khach-hang-page">
          <h2>Danh sách Khách Hàng</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã khách hàng</th>
                <th>Tên khách hàng</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Ngày tham gia</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((phieu, index) => (
                  <tr
                    key={phieu.makh}
                    onClick={() => handleRowClick(phieu)}
                    className={
                      selectedKhachHangId === phieu.makh ? "table-primary" : ""
                    }
                  >
                    <td>{index + 1}</td>
                    <td>{phieu.makh}</td>
                    <td>{phieu.tenkhachhang}</td>
                    <td>{phieu.diachi}</td>
                    <td>{phieu.sdt}</td>
                    <td>{formatDateTime(phieu.ngaythamgia)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    Không có dữ liệu để hiển thị.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <Pagination className="justify-content-center">
            {[...Array(totalPages).keys()].map((page) => (
              <Pagination.Item
                key={page + 1}
                active={page + 1 === currentPage}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default KhachHangPage;
