import React, { useState, useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import Sidebar from "../Sidebar";
import TopbarPhieuXuat from "../PhieuXuat/TopbarPhieuXuat";
import "../../App.css";

const PhieuXuatPage = () => {
  const [phieuXuatData, setPhieuXuatData] = useState([]);
  const [khachHangData, setKhachHangData] = useState({});
  const [nhanvienData, setNhanVienData] = useState({});
  const [selectedPhieuXuatId, setSelectedPhieuXuatId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số lượng phiếu xuất hiển thị trên mỗi trang

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
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetch("http://localhost:5000/phieuxuat")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Mạng lỗi: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setPhieuXuatData(data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });

    const fetchKhachHang = async () => {
      try {
        const khachhangResponse = await fetch(
          "http://localhost:5000/khachhang"
        );
        const khachHangData = await khachhangResponse.json();
        const khachhangMap = Array.isArray(khachHangData)
          ? khachHangData.reduce((map, khachhang) => {
              map[khachhang.makh] = khachhang.tenkhachhang;
              return map;
            }, {})
          : {};
        setKhachHangData(khachhangMap);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu khách hàng:", error);
      }
    };
    fetchKhachHang();

    const fetchNhanVien = async () => {
      try {
        const nhanvienResponse = await fetch("http://localhost:5000/nhanvien");
        const nhanvienData = await nhanvienResponse.json();
        const nhanvienMap = Array.isArray(nhanvienData.data)
          ? nhanvienData.data.reduce((map, taikhoan) => {
              map[taikhoan.manv] = taikhoan.hoten;
              return map;
            }, {})
          : {};
        setNhanVienData(nhanvienMap);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu nhân viên:", error);
      }
    };
    fetchNhanVien();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const filteredPhieuXuatData = phieuXuatData.filter((phieu) => {
    const khachhang = khachHangData[phieu.makh] || "";
    const nhanVien = nhanvienData[phieu.nguoitao] || "";
    return (
      phieu.maphieuxuat.includes(searchTerm) ||
      nhanVien.includes(searchTerm) ||
      khachhang.includes(searchTerm)
    );
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPhieuXuatData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredPhieuXuatData.length / itemsPerPage);

  const handleRowClick = (phieu) => {
    setSelectedPhieuXuatId(phieu.maphieuxuat);
    console.log("Đã chọn mã phiếu xuất: ", phieu.maphieuxuat);
  };

  return (
    <div className="dashboard d-flex">
      <Sidebar />
      <div className="content">
        <TopbarPhieuXuat
          selectedPhieuXuatId={selectedPhieuXuatId}
          onSearch={handleSearch}
          phieuXuatData={phieuXuatData}
          nhanvienData={nhanvienData}
          khachHangData={khachHangData}
        />
        <div className="phieu-xuat-page">
          <h2>Danh sách Phiếu Xuất</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã phiếu xuất</th>
                <th>Khách hàng</th>
                <th>Nhân viên nhập</th>
                <th>Thời gian</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((phieu, index) => (
                  <tr
                    key={phieu.maphieuxuat}
                    onClick={() => handleRowClick(phieu)}
                    className={
                      selectedPhieuXuatId === phieu.maphieuxuat
                        ? "table-primary"
                        : ""
                    }
                  >
                    <td>{index + 1}</td>
                    <td>{phieu.maphieuxuat}</td>
                    <td>{khachHangData[phieu.makh] || "Không xác định"}</td>
                    <td>
                      {nhanvienData[phieu.nguoitaophieuxuat] ||
                        "Không xác định"}
                    </td>
                    <td>{formatDateTime(phieu.thoigian)}</td>
                    <td className="text-end">
                      {formatCurrency(phieu.tongtien)}
                    </td>
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

export default PhieuXuatPage;
