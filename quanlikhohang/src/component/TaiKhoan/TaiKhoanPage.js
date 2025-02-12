import React, { useState, useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import Sidebar from "../Sidebar";
import TopbarTaiKhoan from "./TopbarTaiKhoan";
import "../../App.css"; // Sử dụng chung CSS nếu cần

const TaiKhoanPage = () => {
  const [taiKhoanData, setTaiKhoanData] = useState([]);
  const [nhomquyenData, setNhomQuyenData] = useState({});
  const [selectedTaiKhoanId, setSelectedTaiKhoanId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchTaiKhoan = async () => {
      try {
        const response = await fetch("http://localhost:5000/taikhoan");
        if (!response.ok) {
          throw new Error("Mạng lỗi: " + response.statusText);
        }
        const data = await response.json();
        setTaiKhoanData(data.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    const fetchNhomQuyen = async () => {
      try {
        const nhomquyenResponse = await fetch(
          "http://localhost:5000/nhomquyen"
        );
        const nhomquyenData = await nhomquyenResponse.json();
        const nhomquyenMap = Array.isArray(nhomquyenData.data)
          ? nhomquyenData.data.reduce((map, nhomquyen) => {
              map[nhomquyen.manhomquyen] = nhomquyen.tennhomquyen;
              return map;
            }, {})
          : {};
        setNhomQuyenData(nhomquyenMap); // Set dữ liệu nhóm quyền
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu nhóm quyền:", error);
      }
    };

    fetchTaiKhoan();
    fetchNhomQuyen();
  }, []);

  // Lọc dữ liệu theo tìm kiếm
  const filteredTaiKhoanData = taiKhoanData.filter((tk) => {
    return (
      tk.tendangnhap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (nhomquyenData[tk.manhomquyen] || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTaiKhoanData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTaiKhoanData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowClick = (tk) => {
    setSelectedTaiKhoanId(tk.manv); // Lưu mã nhân viên đã chọn
    console.log("Mã nhân viên:", tk.manv); // In ra mã nhân viên
  };
  const getTrangThaiText = (trangthai) => {
    return trangthai === 1 ? "Đang hoạt động" : "Ngừng hoạt động";
  };
  return (
    <div className="dashboard d-flex">
      <Sidebar /> {/* Tích hợp Sidebar */}
      <div className="content">
        <TopbarTaiKhoan
          selectedTaiKhoanId={selectedTaiKhoanId}
          onSearch={setSearchTerm} // Truyền hàm setSearchTerm để cập nhật từ Topbar
        />
        <div className="taikhoan-page">
          <h2>Danh sách tài khoản</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Mã NV</th>
                <th>Tên đăng nhập</th>
                <th>Nhóm quyền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((tk, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(tk)}
                      className={
                        selectedTaiKhoanId === tk.manv ? "table-primary" : ""
                      }
                    >
                      <td>{tk.manv}</td>
                      <td>{tk.tendangnhap}</td>
                      <td>
                        {nhomquyenData[tk.manhomquyen] || "Không xác định"}
                      </td>
                      <td>{getTrangThaiText(tk.trangthai)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
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

export default TaiKhoanPage;
