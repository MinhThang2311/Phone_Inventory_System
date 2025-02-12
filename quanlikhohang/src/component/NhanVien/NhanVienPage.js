import React, { useState, useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import Sidebar from "../Sidebar";
import "../../App.css"; // Sử dụng chung CSS nếu cần
import TopbarNhanVien from "./TopbarNhanVien";

const NhanVienPage = () => {
  const [nhanVienData, setNhanVienData] = useState([]);
  const [selectedNhanVienId, setSelectedNhanVienId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  useEffect(() => {
    fetch("http://localhost:5000/nhanvien")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Mạng lỗi: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Kiểm tra dữ liệu
        setNhanVienData(data.data || []); // Đảm bảo là mảng
        setFilteredData(data.data || []); // Đảm bảo là mảng
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }, []);

  // Hàm định dạng ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Đảm bảo có 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Trả về định dạng dd/mm/yyyy
  };

  // Hàm xử lý khi nhấp vào hàng
  const handleRowClick = (nv) => {
    setSelectedNhanVienId(nv.manv); // Lưu mã nhân viên đã chọn
    console.log("Mã nhân viên:", nv.manv); // In ra mã nhân viên
  };
  const filteredNhanVienData = nhanVienData.filter((nv) => {
    return (
      nv.hoten.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nv.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nv.sdt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNhanVienData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredNhanVienData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="dashboard d-flex">
      <Sidebar /> {/* Tích hợp Sidebar */}
      <div className="content">
        <TopbarNhanVien
          selectedNhanVienId={selectedNhanVienId}
          onSearch={setSearchTerm} // Truyền hàm setSearchTerm để cập nhật từ Topbar
          nhanVienData={nhanVienData}
        />
        <div className="phieu-xuat-page">
          <h2>Danh sách nhân viên</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Mã NV</th>
                <th>Họ tên</th>
                <th>Giới tính</th>
                <th>Ngày Sinh</th>
                <th>SDT</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((nv) => (
                  <tr
                    key={nv.manv}
                    onClick={() => handleRowClick(nv)}
                    className={
                      selectedNhanVienId === nv.manv ? "table-primary" : ""
                    }
                  >
                    <td>{nv.manv}</td>
                    <td>{nv.hoten}</td>
                    <td>{nv.gioitinh}</td>
                    <td>{formatDate(nv.ngaysinh)}</td>
                    <td>{nv.sdt}</td>
                    <td>{nv.email}</td>
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

export default NhanVienPage;
