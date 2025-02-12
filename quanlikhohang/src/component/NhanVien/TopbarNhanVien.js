import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaFileExcel,
  FaFileImport,
} from "react-icons/fa";
import AddNhanVienForm from "./AddNhanVienForm";
import EditNhanVienForm from "./EditNhanVienForm";
import * as XLSX from "xlsx";

const TopbarNhanVien = ({ selectedNhanVienId, nhanVienData, onSearch }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editNhanVienData, setEditNhanVienData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State cho tìm kiếm

  const handleShowAddForm = () => setShowAddForm(true);
  const handleCloseAddForm = () => setShowAddForm(false);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(nhanVienData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "NhanVien");
    XLSX.writeFile(wb, "DanhSachNhanVien.xlsx");
  };

  const handleShowEditForm = async () => {
    if (!selectedNhanVienId) {
      alert("Vui lòng chọn nhân viên để chỉnh sửa."); // Xử lý khi chưa chọn nhân viên
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/nhanvienId/${selectedNhanVienId}`
      );

      if (!response.ok) {
        throw new Error("Lỗi khi lấy thông tin nhân viên");
      }

      const data = await response.json();
      setEditNhanVienData(data.data); // Lưu dữ liệu vào state
      setShowEditForm(true); // Mở form chỉnh sửa
    } catch (error) {
      alert("Có lỗi xảy ra khi lấy thông tin nhân viên.");
      console.error("Error fetching nhân viên details:", error);
    }
  };

  const handleDeleteNhanVien = async () => {
    if (selectedNhanVienId) {
      const confirmDelete = window.confirm(
        `Bạn có chắc chắn muốn xóa nhân viên: ${selectedNhanVienId}?`
      );
      if (!confirmDelete) return;

      try {
        const response = await fetch(
          `http://localhost:5000/xoaNhanVien/${selectedNhanVienId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert("Xóa nhân viên thành công.");
      } catch (error) {
        alert("Có lỗi xảy ra khi xóa nhân viên.");
        console.error("Error deleting nhân viên:", error);
      }
    } else {
      alert("Vui lòng chọn nhân viên để xóa.");
    }
  };

  const handleCloseEditForm = () => setShowEditForm(false);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term); // Gọi hàm onSearch từ component cha
  };
  const handleImportExcel = (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Vui lòng chọn file Excel.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Chuyển đổi dữ liệu thành định dạng mà API yêu cầu
      const nhanVienData = jsonData.slice(1).map((row) => ({
        hoten: row[0],
        email: row[1],
        sdt: row[2],
        gioitinh: row[3],
        ngaysinh: row[4],
      }));

      // Gọi API để thêm dữ liệu vào cơ sở dữ liệu
      nhanVienData.forEach(async (item) => {
        try {
          const response = await fetch("http://localhost:5000/themNhanVien", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          });
          if (!response.ok) {
            throw new Error("Có lỗi xảy ra khi thêm nhân viên.");
          }
        } catch (error) {
          console.error("Error adding nhân viên from Excel:", error);
        }
      });

      alert("Nhập dữ liệu từ Excel thành công!");
    };

    reader.readAsArrayBuffer(file);
  };
  return (
    <div className="topbar d-flex justify-content-between align-items-center">
      <div className="actions">
        <Button variant="primary" onClick={handleShowAddForm}>
          <FaPlus /> Thêm
        </Button>
        <Button variant="danger" onClick={handleDeleteNhanVien}>
          <FaTrash /> Xóa
        </Button>
        <Button variant="warning" onClick={handleShowEditForm}>
          <FaEdit /> Sửa
        </Button>
        <Button variant="success" onClick={exportToExcel}>
          <FaFileExcel /> Xuất Excel
        </Button>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleImportExcel}
          style={{ display: "none" }}
          id="excelFileInput"
        />
        <label htmlFor="excelFileInput">
          <Button variant="info" as="span">
            <FaFileExcel /> Nhập Excel
          </Button>
        </label>
      </div>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Tìm theo Tên,Email,Sđt"
          className="mr-2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button variant="outline-success">Tìm kiếm</Button>
      </Form>
      <AddNhanVienForm show={showAddForm} handleClose={handleCloseAddForm} />
      <EditNhanVienForm
        show={showEditForm}
        handleClose={handleCloseEditForm}
        nhanvien={editNhanVienData} // Đảm bảo truyền đúng dữ liệu
      />
    </div>
  );
};

export default TopbarNhanVien;
