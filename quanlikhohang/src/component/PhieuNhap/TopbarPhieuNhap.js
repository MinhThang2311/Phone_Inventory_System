import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit, FaFileExcel } from "react-icons/fa"; // Import biểu tượng Excel
import AddPhieuNhapForm from "./AddPhieuNhapForm";
import PhieuNhapDetailForm from "./PhieuNhapDetailForm"; // Import form chi tiết
import * as XLSX from "xlsx"; // Import thư viện xlsx

const TopbarPhieuNhap = ({
  selectedPhieuNhapId,
  onReloadData,
  onSearch,
  phieuNhapData,
  nhanvienData,
  nhaCungCapData,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [detailPhieuNhapData, setDetailPhieuNhapData] = useState(null); // State cho dữ liệu chi tiết
  const [searchTerm, setSearchTerm] = useState("");
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
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // Gọi hàm onSearch từ props
  };

  const handleShowAddForm = () => setShowAddForm(true);
  const handleCloseAddForm = () => setShowAddForm(false);
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const handleShowDetailForm = async () => {
    if (selectedPhieuNhapId) {
      try {
        const response = await fetch(
          `http://localhost:5000/chiTietPhieuNhap/${selectedPhieuNhapId}`
        );
        if (!response.ok) {
          throw new Error("Lỗi khi lấy thông tin chi tiết phiếu nhập");
        }
        const data = await response.json();
        setDetailPhieuNhapData(data);
        setShowDetailForm(true); // Hiển thị form chi tiết
      } catch (error) {
        alert("Có lỗi xảy ra khi lấy thông tin chi tiết phiếu nhập.");
        console.error("Error fetching chi tiết phiếu nhập:", error);
      }
    } else {
      alert("Vui lòng chọn phiếu nhập để xem chi tiết.");
    }
  };

  const handleDeletePhieuNhap = async () => {
    if (selectedPhieuNhapId) {
      const confirmDelete = window.confirm(
        `Bạn có chắc chắn muốn xóa phiếu nhập: ${selectedPhieuNhapId}?`
      );
      if (!confirmDelete) return;

      try {
        const response = await fetch(
          `http://localhost:5000/xoaphieunhap/${selectedPhieuNhapId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert("Xóa phiếu nhập thành công.");
      } catch (error) {
        alert("Có lỗi xảy ra khi xóa phiếu nhập.");
        console.error("Error deleting phiếu nhập:", error);
      }
    } else {
      alert("Vui lòng chọn phiếu nhập để xóa.");
    }
  };

  const handleCloseDetailForm = () => setShowDetailForm(false); // Close detail form

  const handleExportExcel = () => {
    if (
      !phieuNhapData ||
      !Array.isArray(phieuNhapData) ||
      phieuNhapData.length === 0
    ) {
      alert("Không có dữ liệu để xuất.");
      return;
    }

    const exportData = phieuNhapData.map((phieu) => ({
      "Mã phiếu nhập": phieu.maphieunhap,
      "Nhà cung cấp": nhaCungCapData[phieu.manhacungcap] || "Không xác định",
      "Nhân viên nhập": nhanvienData[phieu.nguoitao] || "Không xác định",
      "Thời gian": formatDateTime(phieu.thoigian),
      "Tổng tiền": formatCurrency(phieu.tongtien),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    ws["!cols"] = [
      { wch: 20 },
      { wch: 30 },
      { wch: 30 },
      { wch: 25 },
      { wch: 20 },
    ];
    const wb = XLSX.utils.book_new(); // Tạo workbook mới
    XLSX.utils.book_append_sheet(wb, ws, "Phiếu Nhập"); // Thêm sheet vào workbook
    XLSX.writeFile(wb, "phieu_nhap.xlsx"); // Xuất file
  };

  return (
    <div className="topbar d-flex justify-content-between align-items-center">
      <div className="actions">
        <Button variant="primary" onClick={handleShowAddForm}>
          <FaPlus /> Thêm
        </Button>
        <Button variant="danger" onClick={handleDeletePhieuNhap}>
          <FaTrash /> Xóa
        </Button>
        <Button variant="primary" onClick={handleShowDetailForm}>
          <FaEdit /> Chi tiết
        </Button>
        <Button variant="success" onClick={handleExportExcel}>
          <FaFileExcel /> Xuất Excel
        </Button>
      </div>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Tìm theo mã,tên,nhân viên"
          className="mr-2"
          onChange={handleSearch}
        />
        <Button variant="outline-success">Tìm kiếm</Button>
      </Form>
      <AddPhieuNhapForm show={showAddForm} handleClose={handleCloseAddForm} />
      <PhieuNhapDetailForm
        show={showDetailForm}
        handleClose={handleCloseDetailForm}
        maphieunhap={selectedPhieuNhapId} // Truyền mã phiếu nhập
      />
    </div>
  );
};

export default TopbarPhieuNhap;
