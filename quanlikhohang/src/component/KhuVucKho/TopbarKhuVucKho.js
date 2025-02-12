import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit, FaFileExcel } from "react-icons/fa";
import AddKhuVucKhoForm from "./AddKhuVucKhoForm"; // Import form thêm khu vực kho
import EditKhuVucKhoForm from "./EditKhuVucKhoForm"; // Import form chỉnh sửa khu vực kho
import * as XLSX from "xlsx"; // Import thư viện xlsx

const TopbarKhuVucKho = ({
  selectedKhuVucKho,
  onReloadData,
  khuvuckhoData,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editKhuVucKhoData, setEditKhuVucKhoData] = useState(null);
  const handleShowAddForm = () => setShowAddForm(true);
  const handleCloseAddForm = () => setShowAddForm(false);

  const handleShowEditForm = async () => {
    if (selectedKhuVucKho) {
      try {
        const response = await fetch(
          `http://localhost:5000/khuvuckho/${selectedKhuVucKho.makhuvuc}`
        );
        if (!response.ok) {
          throw new Error("Lỗi khi lấy thông tin khu vực kho");
        }
        const data = await response.json();
        setEditKhuVucKhoData(data);
        setShowEditForm(true);
      } catch (error) {
        alert("Có lỗi xảy ra khi lấy thông tin khu vực kho.");
        console.error("Error fetching khu vuc kho details:", error);
      }
    } else {
      alert("Vui lòng chọn khu vực kho để chỉnh sửa.");
    }
  };
  const handleDeleteKhuVucKho = async () => {
    if (selectedKhuVucKho) {
      const confirmDelete = window.confirm(
        `Bạn có chắc chắn muốn xóa khu vực kho: ${selectedKhuVucKho.tenkhuvuc}?`
      );
      if (!confirmDelete) return;

      try {
        const response = await fetch(
          `http://localhost:5000/xoakhuvuckho/${selectedKhuVucKho.makhuvuc}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert("Xóa khu vực kho thành công.");
        onReloadData(); // Reload data after successful deletion
      } catch (error) {
        alert("Có lỗi xảy ra khi xóa khu vực kho.");
        console.error("Error deleting khu vực kho:", error);
      }
    } else {
      alert("Vui lòng chọn khu vực kho để xóa.");
    }
  };
  const handleCloseEditForm = () => setShowEditForm(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Sử dụng header: 1 để lấy dữ liệu dưới dạng mảng

      // Bỏ qua hàng tiêu đề và chỉ lấy dữ liệu
      const rows = jsonData.slice(1); // Bỏ qua hàng đầu tiên (tiêu đề)

      // Gửi dữ liệu đến API để thêm khu vực kho
      rows.forEach(async (row) => {
        const [tenkhuvuc, ghichu] = row; // Giả sử cột đầu tiên là "Tên Khu Vực" và cột thứ hai là "Ghi Chú"
        if (tenkhuvuc) {
          // Kiểm tra xem tên khu vực có tồn tại không
          try {
            const response = await fetch(
              "http://localhost:5000/themkhuvuckho",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ tenkhuvuc, ghichu }), // Gửi các trường cần thiết
              }
            );
            if (!response.ok) {
              throw new Error("Có lỗi xảy ra khi thêm khu vực kho.");
            }
          } catch (error) {
            console.error("Error adding storage area from Excel:", error);
            alert("Có lỗi xảy ra khi thêm khu vực kho từ file Excel.");
          }
        }
      });
      alert("Thêm khu vực kho từ file Excel thành công!");
      onReloadData(); // Reload data after successful addition
    };

    reader.readAsArrayBuffer(file);
  };
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(khuvuckhoData); // Chuyển đổi dữ liệu thành worksheet
    const workbook = XLSX.utils.book_new(); // Tạo workbook mới
    XLSX.utils.book_append_sheet(workbook, worksheet, "KhuVucKho"); // Thêm worksheet vào workbook

    // Tạo file Excel và tải xuống
    XLSX.writeFile(workbook, "KhuVucKho.xlsx");
  };
  return (
    <div className="topbar d-flex justify-content-between align-items-center">
      <div className="actions">
        <Button variant="primary" onClick={handleShowAddForm}>
          <FaPlus /> Thêm
        </Button>
        <Button variant="danger" onClick={handleDeleteKhuVucKho}>
          <FaTrash /> Xóa
        </Button>
        <Button variant="warning" onClick={handleShowEditForm}>
          <FaEdit /> Sửa
        </Button>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id="excelFileInput"
        />
        <label htmlFor="excelFileInput">
          <Button variant="success" as="span">
            <FaFileExcel /> Nhập Excel
          </Button>
        </label>
        <Button variant="info" onClick={handleExportToExcel}>
          <FaFileExcel /> Xuất Excel
        </Button>
      </div>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Nhập nội dung tìm kiếm..."
          className="mr-2"
        />
        <Button variant="outline-success">Tìm kiếm</Button>
      </Form>
      <AddKhuVucKhoForm show={showAddForm} handleClose={handleCloseAddForm} />
      <EditKhuVucKhoForm
        show={showEditForm}
        handleClose={handleCloseEditForm}
        khuvuckho={selectedKhuVucKho} // Truyền dữ liệu đã fetch từ API
      />
    </div>
  );
};

export default TopbarKhuVucKho;
