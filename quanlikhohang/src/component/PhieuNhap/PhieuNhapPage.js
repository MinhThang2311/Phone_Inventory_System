import React, { useState, useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import Sidebar from "../Sidebar";
import "../../App.css"; // Sử dụng chung CSS nếu cần
import TopbarPhieuNhap from "./TopbarPhieuNhap";

const PhieuNhapPage = () => {
  const [phieuNhapData, setPhieuNhapData] = useState([]);
  const [nhaCungCapData, setNhaCungCapData] = useState({});
  const [nhanvienData, setNhanVienData] = useState({});
  const [selectedPhieuNhapId, setSelectedPhieuNhapId] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State cho tìm kiếm
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 10;

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

  useEffect(() => {
    // Fetch phiếu nhập
    fetch("http://localhost:5000/phieunhap")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Mạng lỗi: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setPhieuNhapData(data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });

    // Fetch nhà cung cấp
    const fetchNhaCungCap = async () => {
      try {
        const nhacungcapResponse = await fetch(
          "http://localhost:5000/nhacungcap"
        );
        const nhacungcapData = await nhacungcapResponse.json();
        const nhacungcapMap = Array.isArray(nhacungcapData)
          ? nhacungcapData.reduce((map, nhacc) => {
              map[nhacc.manhacungcap] = nhacc.tennhacungcap;
              return map;
            }, {})
          : {};
        setNhaCungCapData(nhacungcapMap);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu nhà cung cấp:", error);
      }
    };
    fetchNhaCungCap();

    // Fetch nhân viên nhập
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

  const handleRowClick = (phieunhap) => {
    setSelectedPhieuNhapId(phieunhap.maphieunhap);
    console.log("Đã chọn mã phiếu nhập: ", phieunhap.maphieunhap);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteredPhieuNhapData = phieuNhapData.filter((phieu) => {
    const nhaCungCap = nhaCungCapData[phieu.manhacungcap] || "";
    const nhanVien = nhanvienData[phieu.nguoitao] || "";
    return (
      phieu.maphieunhap.includes(searchTerm) ||
      nhanVien.includes(searchTerm) ||
      nhaCungCap.includes(searchTerm)
    );
  });

  // Pagination logic for filtered data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPhieuNhapData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredPhieuNhapData.length / itemsPerPage);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="dashboard d-flex">
      <Sidebar />
      <div className="content">
        <TopbarPhieuNhap
          selectedPhieuNhapId={selectedPhieuNhapId}
          onReloadData={fetch}
          onSearch={handleSearch}
          phieuNhapData={filteredPhieuNhapData}
          nhanvienData={nhanvienData}
          nhaCungCapData={nhaCungCapData}
        />
        <div className="phieu-xuat-page">
          <h2>Danh sách phiếu nhập</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã phiếu nhập</th>
                <th>Nhà cung cấp</th>
                <th>Nhân viên nhập</th>
                <th>Thời gian</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((phieu, index) => (
                  <tr
                    key={phieu.maphieunhap}
                    onClick={() => handleRowClick(phieu)}
                    className={
                      selectedPhieuNhapId === phieu.maphieunhap
                        ? "table-primary"
                        : ""
                    }
                  >
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{phieu.maphieunhap}</td>
                    <td>
                      {nhaCungCapData[phieu.manhacungcap] || "Không xác định"}
                    </td>
                    <td>{nhanvienData[phieu.nguoitao] || "Không xác định"}</td>
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

export default PhieuNhapPage;
