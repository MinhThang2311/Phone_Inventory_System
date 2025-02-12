import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import AddTaiKhoanForm from "./AddTaiKhoanForm";
import EditTaiKhoanForm from "./EditTaiKhoanForm";
import SelectNhanVienForm from "./SelectNhanVienForm"; // New component for selecting employee

const TopbarTaiKhoan = ({ selectedTaiKhoanId, nhomquyenData, onSearch }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editTaiKhoanData, setEditTaiKhoanData] = useState(null);
  const [selectedNhanVien, setSelectedNhanVien] = useState(null);
  const [showSelectEmployeeForm, setShowSelectEmployeeForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State cho tìm kiếm

  const handleShowAddForm = () => setShowAddForm(true);
  const handleCloseAddForm = () => setShowAddForm(false);
  const handleShowSelectEmployeeForm = () => setShowSelectEmployeeForm(true);
  const handleCloseSelectEmployeeForm = () => setShowSelectEmployeeForm(false);
  const handleSelectNhanVien = (nv) => {
    setSelectedNhanVien(nv);
    handleCloseSelectEmployeeForm();
    setShowAddForm(true); // Show AddTaiKhoanForm after selecting employee
  };
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term); // Gọi hàm onSearch từ component cha
  };

  const handleShowEditForm = async () => {
    if (selectedTaiKhoanId) {
      try {
        const response = await fetch(
          `http://localhost:5000/taikhoanTheoMaNV/${selectedTaiKhoanId}`
        );
        if (!response.ok) {
          throw new Error("Lỗi khi lấy thông tin khu vực kho");
        }
        const data = await response.json();
        setEditTaiKhoanData(data);
        setShowEditForm(true);
      } catch (error) {
        alert("Có lỗi xảy ra khi lấy thông tin khu vực kho.");
        console.error("Error fetching khu vuc kho details:", error);
      }
    } else {
      alert("Vui lòng chọn khu vực kho để chỉnh sửa.");
    }
  };
  const handleDeleteNhaCungCap = async () => {
    if (selectedTaiKhoanId) {
      const confirmDelete = window.confirm(
        `Bạn có chắc chắn muốn xóa tài khoản: ${selectedTaiKhoanId}?`
      );
      if (!confirmDelete) return;

      try {
        const response = await fetch(
          `http://localhost:5000/xoataikhoan/${selectedTaiKhoanId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert("Xóa khu vực kho thành công.");
      } catch (error) {
        alert("Có lỗi xảy ra khi xóa khu vực kho.");
        console.error("Error deleting khu vực kho:", error);
      }
    } else {
      alert("Vui lòng chọn khu vực kho để xóa.");
    }
  };
  const handleCloseEditForm = () => setShowEditForm(false);

  return (
    <div className="topbar d-flex justify-content-between align-items-center">
      <div className="actions">
        <Button variant="primary" onClick={handleShowSelectEmployeeForm}>
          <FaPlus /> Thêm
        </Button>
        <Button variant="danger" onClick={handleDeleteNhaCungCap}>
          <FaTrash /> Xóa
        </Button>
        <Button variant="warning" onClick={handleShowEditForm}>
          <FaEdit /> Sửa
        </Button>
      </div>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Tìm theo Tên,Nhóm quyền"
          className="mr-2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button variant="outline-success">Tìm kiếm</Button>
      </Form>
      <AddTaiKhoanForm
        show={showAddForm}
        handleClose={handleCloseAddForm}
        selectedNhanVien={selectedNhanVien}
      />{" "}
      <SelectNhanVienForm
        show={showSelectEmployeeForm}
        handleClose={handleCloseSelectEmployeeForm}
        onSelectNhanVien={handleSelectNhanVien}
      />
      <EditTaiKhoanForm
        show={showEditForm}
        handleClose={handleCloseEditForm}
        taiKhoan={editTaiKhoanData}
        nhomquyenData={nhomquyenData}
      />
    </div>
  );
};

export default TopbarTaiKhoan;
