import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit, FaFileExcel } from "react-icons/fa";
import AddNhaCungCapForm from "./AddNhaCungCapForm";
import EditNhaCungCapForm from "./EditNhaCungCapForm";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
const TopbarNhaCungCap = ({
  selectedNhaCungCapId,
  onSearch,
  nhaCungCapData,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editNhaCungCapData, setEditNhaCungCapData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleShowAddForm = () => setShowAddForm(true);
  const handleCloseAddForm = () => setShowAddForm(false);
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term); // Gọi hàm onSearch từ component cha
  };
  const handleShowEditForm = async () => {
    if (selectedNhaCungCapId) {
      try {
        const response = await fetch(
          `http://localhost:5000/nhacungcap/${selectedNhaCungCapId}`
        );
        if (!response.ok) {
          throw new Error("Lỗi khi lấy thông tin khu vực kho");
        }
        const data = await response.json();
        setEditNhaCungCapData(data);
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
    if (selectedNhaCungCapId) {
      const confirmDelete = window.confirm(
        `Bạn có chắc chắn muốn xóa khu vực kho: ${selectedNhaCungCapId}?`
      );
      if (!confirmDelete) return;

      try {
        const response = await fetch(
          `http://localhost:5000/xoanhacungcap/${selectedNhaCungCapId}`,
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
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(nhaCungCapData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Nhà Cung Cấp");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    FileSaver.saveAs(blob, "DanhSachNhaCungCap.xlsx");
    alert("Xuất file Excel thành công!");
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const rows = jsonData.slice(1); // Bỏ qua hàng đầu tiên (tiêu đề)

      // Gửi dữ liệu đến API để thêm nhà cung cấp
      for (const row of rows) {
        const [tennhacungcap, diachi, email, sdt] = row; // Giả sử tên cột trong Excel là "Tên Nhà Cung Cấp", "Địa Chỉ", "Email", "Số Điện Thoại"
        if (tennhacungcap && diachi && email && sdt) {
          try {
            const response = await fetch(
              "http://localhost:5000/themnhacungcap",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ tennhacungcap, diachi, email, sdt }), // Gửi các trường cần thiết
              }
            );
            if (!response.ok) {
              throw new Error("Có lỗi xảy ra khi thêm nhà cung cấp.");
            }
          } catch (error) {
            console.error("Error adding supplier from Excel:", error);
            alert("Có lỗi xảy ra khi thêm nhà cung cấp từ file Excel.");
          }
        }
      }

      alert("Thêm nhà cung cấp từ file Excel thành công!");
    };

    reader.readAsArrayBuffer(file);
  };
  return (
    <div className="topbar d-flex justify-content-between align-items-center">
      <div className="actions">
        <Button variant="primary" onClick={handleShowAddForm}>
          <FaPlus /> Thêm
        </Button>
        <Button variant="danger" onClick={handleDeleteNhaCungCap}>
          <FaTrash /> Xóa
        </Button>
        <Button variant="warning" onClick={handleShowEditForm}>
          <FaEdit /> Sửa
        </Button>
        <Button variant="success" onClick={handleExportExcel}>
          <FaFileExcel /> Xuất Excel
        </Button>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
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
          placeholder="Nhập nội dung tìm kiếm..."
          className="mr-2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button variant="outline-success">Tìm kiếm</Button>
      </Form>
      <AddNhaCungCapForm show={showAddForm} handleClose={handleCloseAddForm} />
      <EditNhaCungCapForm
        show={showEditForm}
        handleClose={handleCloseEditForm}
        nhacungcap={editNhaCungCapData}
      />
    </div>
  );
};

export default TopbarNhaCungCap;
