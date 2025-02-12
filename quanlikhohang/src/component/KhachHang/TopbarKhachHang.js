import React, { useState } from "react";
import { Button, Form, FormControl, Row, Col } from "react-bootstrap";
import {
  FaPlus,
  FaTrash,
  FaEye,
  FaDownload,
  FaFileExcel,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import AddKhachHangForm from "./AddKhachHangForm";
import EditKhachHangForm from "./EditKhachHangForm";

const TopbarKhachHang = ({ selectedKhachHangId, onSearch }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [khachHangData, setKhachHangData] = useState([]);
  const [editingKhachHang, setEditingKhachHang] = useState([]); // Lưu khách hàng để chỉnh sửa
  const [searchTerm, setSearchTerm] = useState("");

  // Hiển thị form thêm khách hàng
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleShowAddForm = () => setShowAddForm(true);
  const handleCloseAddForm = () => setShowAddForm(false);
  const handleExportExcel = async () => {
    try {
      const response = await fetch("http://localhost:5000/khachhang");
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu khách hàng.");
      }
      const data = await response.json();

      if (!data || data.length === 0) {
        alert("Không có dữ liệu để xuất.");
        return;
      }

      const worksheet = XLSX.utils.aoa_to_sheet([
        ["Mã KH", "Tên Khách Hàng", "Địa Chỉ", "SĐT", "Ngày Tham Gia"],
      ]);

      data.forEach((item, index) => {
        const row = [
          item.makh,
          item.tenkhachhang,
          item.diachi,
          item.sdt,
          item.ngaythamgia ? new Date(item.ngaythamgia) : "",
        ];
        XLSX.utils.sheet_add_aoa(worksheet, [row], { origin: `A${index + 2}` });
      });

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "KhachHang");

      worksheet["!cols"] = [
        { wch: 10 },
        { wch: 20 },
        { wch: 50 },
        { wch: 15 },
        { wch: 15, z: "mm/dd/yyyy" },
      ];

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      FileSaver.saveAs(blob, "DanhSachKhachHang.xlsx");

      alert("Xuất file Excel thành công!");
    } catch (error) {
      alert("Có lỗi xảy ra khi xuất file Excel.");
      console.error("Error exporting Excel:", error);
    }
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

      // Gửi dữ liệu đến API để thêm khách hàng
      for (const row of rows) {
        const [tenkhachhang, sdt, diachi] = row; // Giả sử tên cột trong Excel là "Tên Khách Hàng", "Số Điện Thoại", "Địa Chỉ"
        if (tenkhachhang && sdt && diachi) {
          // Kiểm tra xem các trường có tồn tại không
          try {
            const response = await fetch("http://localhost:5000/addkhachhang", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ tenkhachhang, sdt, diachi }), // Gửi các trường cần thiết
            });
            if (!response.ok) {
              throw new Error("Có lỗi xảy ra khi thêm khách hàng.");
            }
          } catch (error) {
            console.error("Error adding customer from Excel:", error);
            alert("Có lỗi xảy ra khi thêm khách hàng từ file Excel.");
          }
        }
      }

      // Sau khi thêm xong, lấy lại dữ liệu khách hàng
      alert("Thêm khách hàng từ file Excel thành công!");
    };

    reader.readAsArrayBuffer(file);
  };
  // Hiển thị form chỉnh sửa khách hàng
  const handleShowEditForm = async () => {
    if (selectedKhachHangId) {
      console.log("Selected Khach Hang ID:", selectedKhachHangId); // Log the ID

      try {
        const response = await fetch(
          `http://localhost:5000/khachhang/${selectedKhachHangId}`
        );
        if (!response.ok) {
          throw new Error("Lỗi khi lấy thông tin khách hàng");
        }
        const data = await response.json();
        setEditingKhachHang(data);
        setShowEditForm(true);
      } catch (error) {
        alert("Có lỗi xảy ra khi lấy thông tin khách hàng.");
        console.error("Error fetching khach hang details:", error);
      }
    } else {
      alert("Vui lòng chọn khách hàng để chỉnh sửa.");
    }
  };

  const handleCloseEditForm = () => setShowEditForm(false);
  const handleDeleteKhachHang = async () => {
    if (!selectedKhachHangId) {
      alert("Vui lòng chọn khách hàng để xóa.");
      return;
    }

    // Hiển thị cảnh báo xác nhận
    const confirmDelete = window.confirm("Bạn muốn xóa khách hàng này chứ?");
    if (!confirmDelete) {
      return; // Nếu người dùng không đồng ý, dừng lại
    }

    try {
      const response = await fetch(
        `http://localhost:5000/xoakhachhang/${selectedKhachHangId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("Khách hàng đã được xóa thành công.");
      setKhachHangData(
        khachHangData.filter((kh) => kh.makh !== selectedKhachHangId)
      );
      setEditingKhachHang(null);
    } catch (error) {
      alert("Có lỗi xảy ra khi xóa khách hàng.");
      console.error("Error deleting customer:", error);
    }
  };
  return (
    <div className="topbar d-flex justify-content-between align-items-center">
      <div className="actions">
        <Button variant="primary" onClick={handleShowAddForm}>
          <FaPlus /> Thêm
        </Button>
        <Button variant="danger" onClick={handleDeleteKhachHang}>
          <FaTrash /> Xóa
        </Button>
        <Button variant="warning" onClick={handleShowEditForm}>
          <FaEye /> Sửa
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
        <Button variant="info" onClick={handleExportExcel}>
          <FaFileExcel /> Xuất Excel
        </Button>
        {/* Form thêm khách hàng */}
        <AddKhachHangForm show={showAddForm} handleClose={handleCloseAddForm} />
        {/* Form chỉnh sửa khách hàng */}
        <EditKhachHangForm
          show={showEditForm}
          handleClose={handleCloseEditForm}
          khachhang={editingKhachHang}
        />
      </div>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Nhập nội dung tìm kiếm..."
          className="mr-2"
          onChange={handleSearch}
        />
        <Button variant="outline-success">Tìm kiếm</Button>
      </Form>
    </div>
  );
};

export default TopbarKhachHang;
