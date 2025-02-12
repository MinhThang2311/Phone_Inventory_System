import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit, FaFileExcel } from "react-icons/fa";
import AddPhieuXuatForm from "./AddPhieuXuatForm";
import EditPhieuXuatForm from "./EditPhieuXuatForm";
import PhieuXuatDetailForm from "./PhieuXuatDetailForm"; // Import form chi tiết phiếu xuất
import * as XLSX from "xlsx";
import ChuyenKhoModal from "./ChuyenKho";

const TopbarPhieuXuat = ({
  selectedPhieuXuatId,
  onSearch,
  phieuXuatData,
  nhanvienData,
  khachHangData,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [detailPhieuXuatData, setDetailPhieuXuatData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
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

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };
  const handleShowAddForm = () => setShowAddForm(true);
  const handleCloseAddForm = () => setShowAddForm(false);
  const handleShowDetailForm = async () => {
    if (selectedPhieuXuatId) {
      try {
        const response = await fetch(
          `http://localhost:5000/chiTietPhieuXuat/${selectedPhieuXuatId}`
        );
        if (!response.ok) {
          throw new Error("Lỗi khi lấy thông tin chi tiết phiếu xuất");
        }
        const data = await response.json();
        setDetailPhieuXuatData(data.data); // Lưu dữ liệu chi tiết phiếu xuất
        setShowDetailForm(true); // Hiển thị form chi tiết
      } catch (error) {
        alert("Có lỗi xảy ra khi lấy thông tin chi tiết phiếu xuất.");
        console.error("Error fetching chi tiết phiếu xuất:", error);
      }
    } else {
      alert("Vui lòng chọn phiếu xuất để xem chi tiết.");
    }
  };

  const handleDelete = async () => {
    if (selectedPhieuXuatId) {
      try {
        const response = await fetch(
          `http://localhost:5000/xoaPhieuXuat/${selectedPhieuXuatId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert("Phiếu xuất đã được xóa thành công.");
        // Thực hiện các hành động khác nếu cần, như tải lại danh sách phiếu xuất
      } catch (error) {
        alert("Có lỗi xảy ra khi xóa phiếu xuất.");
        console.error("Error deleting phiếu xuất:", error);
      }
    } else {
      alert("Vui lòng chọn phiếu xuất cần xóa.");
    }
  };

  const handleExportExcel = () => {
    if (
      !phieuXuatData ||
      !Array.isArray(phieuXuatData) ||
      phieuXuatData.length === 0
    ) {
      alert("Không có dữ liệu để xuất.");
      return;
    }

    const exportData = phieuXuatData.map((phieu) => ({
      "Mã phiếu xuất": phieu.maphieuxuat,
      "Khách hàng": khachHangData[phieu.makh] || "Không xác định",
      "Nhân viên xuất":
        nhanvienData[phieu.nguoitaophieuxuat] || "Không xác định",
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
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Phiếu Xuất");
    XLSX.writeFile(wb, "phieu_xuat.xlsx");
  };

  const handleCloseDetailForm = () => setShowDetailForm(false); // Close detail form

  return (
    <div className="topbar d-flex justify-content-between align-items-center">
      <div className="actions">
        <Button variant="primary" onClick={handleShowAddForm}>
          <FaPlus /> Thêm
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          <FaTrash /> Xóa
        </Button>
        <Button variant="primary" onClick={handleShowDetailForm}>
          <FaEdit /> Chi tiết
        </Button>
        <Button variant="success" onClick={handleExportExcel}>
          <FaFileExcel /> Xuất Excel
        </Button>
        {/* <Button variant="primary" onClick={handleShowModal}>
          Chuyển kho
        </Button> */}
        <AddPhieuXuatForm show={showAddForm} handleClose={handleCloseAddForm} />
        <EditPhieuXuatForm
          show={showEditForm}
          phieuXuatId={selectedPhieuXuatId}
        />
        <PhieuXuatDetailForm
          show={showDetailForm}
          handleClose={handleCloseDetailForm}
          maphieuxuat={selectedPhieuXuatId} // Truyền mã phiếu xuất
        />
        <ChuyenKhoModal show={showModal} handleClose={handleCloseModal} />
      </div>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Tìm theo mã,kh,nhân viên"
          className="mr-2"
          onChange={handleSearch}
        />
        <Button variant="outline-success">Tìm kiếm</Button>
      </Form>
    </div>
  );
};

export default TopbarPhieuXuat;
